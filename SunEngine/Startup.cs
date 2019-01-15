﻿using System.Text;
using AspNetCore.CacheOutput.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SunEngine.Authorization;
using SunEngine.Commons.DataBase;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using SunEngine.Commons.Models;
using SunEngine.Commons.Models.UserGroups;
using SunEngine.Commons.Services;
using SunEngine.Commons.TextProcess;
using SunEngine.Infrastructure;
using SunEngine.Services;
using SunEngine.Stores;

namespace SunEngine
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        private IConfiguration Configuration { get; }

        private IHostingEnvironment CurrentEnvironment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            if (CurrentEnvironment.IsDevelopment())
            {
                services.AddCors();
            }

            services.AddOptions();
            services.AddSunEngineOptions(Configuration);


            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            var dataBaseConfiguration = Configuration.GetSection("DataBaseConnection");
            var providerName = dataBaseConfiguration["Provider"];
            var connectionString = dataBaseConfiguration["ConnectionString"];
            var dataProvider = DataBaseConnection.GetDataProvider(providerName, connectionString);
            MyMappingSchema mappingSchema = new MyMappingSchema();


            services.AddScoped(x => new DataBaseConnection(dataProvider, connectionString, mappingSchema));

            var dataBaseFactory = new DataBaseFactory(dataProvider, connectionString, mappingSchema);

            services.AddSingleton<IDataBaseFactory>(dataBaseFactory);


            // Add Singleton Stores
            var userGroupStore = new UserGroupStore(dataBaseFactory);

            services.AddSingleton<IUserGroupStore>(userGroupStore);

            services.AddSingleton<ICategoriesStore, CategoriesStore>();

            services.AddSingleton<IImagesNamesService, ImagesNamesService>();
            
            services.AddSingleton<ImagesService>();
            
            services.AddSingleton<SpamProtectionStore>();


            services.AddIdentity<User, UserGroupDB>(
                    options =>
                    {
                        options.Password.RequireDigit = false;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequiredUniqueChars = 2;
                        options.Password.RequiredLength = 6;
                    })
                .AddLinqToDBStores<int>(dataBaseFactory)
                .AddUserManager<UserManager<User>>()
                .AddRoleManager<RoleManager<UserGroupDB>>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(config =>
                {
                    config.RequireHttpsMetadata = false;
                    config.SaveToken = true;

                    config.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        //ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecurityKey"]))
                    };
                });

            services.AddTransient<IEmailSender, EmailSender>();

            services.AddSingleton<OperationKeysContainer>();


            services.AddScopedEntityServices();


            services.AddSingleton<IAuthorizationService, AuthorizationService>();

            services.AddScopedControllersAuthorizationServices();

            services.AddSingleton<Sanitizer>();

            services.AddMemoryCache();
            
            //services.AddMyInMemoryCacheOutput();
            //services.AddSingleton<GroupCacheKeyGenerator>();

            services.AddMvcCore(options => { options.Filters.Add(new MyAuthUserFilter(userGroupStore)); })
                .AddApiExplorer()
                .AddAuthorization()
                .AddJsonFormatters()
                .AddCors()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }


        public void Configure(IApplicationBuilder app)
        {
            if (CurrentEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }


            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseCookiePolicy();

            if (CurrentEnvironment.IsDevelopment())
            {
                app.UseCors(builder =>
                    builder.WithOrigins(
                            "http://localhost:5005",
                            "https://localhost:5005",
                            "http://sunengine.mi:5005",
                            "https://sunengine.mi:5005",
                            "http://sunengine.local:5005",
                            "https://sunengine.local:5005")
                        .AllowCredentials().AllowAnyHeader().AllowAnyMethod());
            }

            app.UseAuthentication();


            app.UseCacheOutput();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}");
            });
        }
    }
}