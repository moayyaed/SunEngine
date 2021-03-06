// Configuration for your app

require("./build-index");

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const minimist = require('minimist');


module.exports = function (ctx) {
    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        boot: [
            "i18n",
            "axios",
            "apiPath",
            "buildPath",
            "imagePath",
            "avatarPath",
            "formatDate",
            "successNotify",
            "errorNotify",
            "request",
            "api",
            "shared",
            "throttle",
            "vueDevTools",
            "getBreadcrumbs",
            "icons",
            "customJsBoot"
        ],
        css: ["app.scss"],
        extras: [
            "line-awesome",
            "fontawesome-v5"
            //'roboto-font',
            //'material-icons', // optional, you are not bound to it
            //'ionicons-v4',
            //'mdi-v3',
            //'eva-icons'
        ],

        framework: {
            all: "auto",

            // Quasar plugins
            plugins: ["Notify", "Meta", "Dialog", "LocalStorage"],

            animations: ["bounceInDown", "bounceOutUp"],

            iconSet: "line-awesome",
            lang: "ru" // Quasar language
        },

        preFetch: false,
        supportIE: false,

        build: {
            scopeHoisting: true,
            vueRouterMode: "history",
            // vueCompiler: true,
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            extendWebpack(cfg) {
                cfg.resolve.alias.storeInd = path.resolve("./src/store/index/index.js");
                cfg.resolve.alias.router = path.resolve("./src/router/index.js");
                cfg.resolve.alias.App = path.resolve("./src/App.vue");

                cfg.resolve.modules.push(path.resolve("./src"));
                cfg.resolve.modules.push(path.resolve("./src/index"));

                const htmlWebpackPlugin = cfg.plugins.find(
                    x => x.constructor.name === "HtmlWebpackPlugin"
                );
                htmlWebpackPlugin.options.configUId = Math.floor(
                    Math.random() * 1000000
                ).toString();

                cfg.plugins.push(
                    new webpack.ProvidePlugin({
                        Vue: ['vue', 'default'],
                        sunImport: ['src/utils/sunImport', 'default'],
                        request: ['src/utils/request', 'default'],
                        Api: ['src/api/Api', 'default'],
                        AdminApi: ['src/api/AdminApi', 'default'],
                        Page: ['src/mixins/Page', 'default']
                    }));

                if (ctx.dev) {
                    let configPath = "src/config.js";
                    let args = minimist(process.argv.slice(2));

                    if (args.config) {
                        let cpath = path.resolve(args.config)
                        if (fs.existsSync(cpath))
                            configPath = args.config;

                    } else if (fs.existsSync(path.resolve('./src/l.config.js')))
                        configPath = "src/l.config.js";

                    console.log("Using config: " + configPath);

                    cfg.plugins.push(
                        new CopyWebpackPlugin([
                            {from: "src/site/statics", to: "site/statics"},
                            {from: configPath, to: "config.js"},
                            {from: "src/custom.css", to: "custom.css"},
                            {from: "src/custom.js", to: "custom.js"}
                        ])
                    );
                } else {
                    cfg.plugins.push(
                        new CopyWebpackPlugin([{from: "src/site/statics", to: "site/statics"}])
                    );
                }

                cfg.plugins.push(new WebpackDeepScopeAnalysisPlugin());

                cfg.optimization.splitChunks.cacheGroups.sun = {
                    test: /[\\/]src[\\/]/,
                    minChunks: 1,
                    priority: -13,
                    chunks: "all",
                    reuseExistingChunk: true,
                    name: function (module) {
                        const match = module.context.match(/[\\/]src[\\/](.*?)([\\/]|$)/);
                        if (match && match.length >= 1) {
                            if (match[1] === "modules") {
                                const match = module.context.match(/[\\/]src[\\/]modules[\\/](.*?)([\\/]|$)/);
                                return `sun-${match[1]}`;
                            }
                            return `sun-${match[1]}`;
                        } else
                            return "sun-main";
                    }
                };

                cfg.optimization.splitChunks.cacheGroups.admin = {
                    test: /[\\/]src[\\/]admin[\\/]/,
                    minChunks: 1,
                    priority: -12,
                    chunks: "all",
                    reuseExistingChunk: true,
                    name: function (module) {
                        const match = module.context.match(/[\\/]src[\\/]admin[\\/](.*?)([\\/]|$)/);
                        if (match && match.length >= 1)
                            return `admin-${match[1]}`;
                        else
                            return "admin-main";
                    }
                };

                delete cfg.optimization.splitChunks.cacheGroups.app;
                delete cfg.optimization.splitChunks.cacheGroups.common;
            },

            env: {
                PACKAGE_JSON: JSON.stringify(require("./package"))
            }
        },

        devServer: {
            // https: true,
            host: "localhost",
            port: 5005,
            open: true // opens browser window automatically
        },

        // animations: 'all' --- includes all animations
        animations: [],

        ssr: {
            pwa: false
        },

        pwa: {
            // workboxPluginMode: 'InjectManifest',
            // workboxOptions: {},
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: "standalone",
                orientation: "portrait",
                background_color: "#ffffff",
                theme_color: "#027be3",
                icons: [
                    {
                        src: "statics/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-256x256.png",
                        sizes: "256x256",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        },

        cordova: {
            // id: 'org.cordova.quasar.app'
        },

        electron: {
            // bundler: 'builder', // or 'packager'
            extendWebpack(cfg) {
                // do something with Electron process Webpack cfg
            },
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Window only
                // win32metadata: { ... }
            },
            builder: {
                // https://www.electron.build/configuration/configuration
                // appId: 'quasar-app'
            }
        }
    };
};
