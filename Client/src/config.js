﻿﻿/*  This file is Development time hook. Real config.js file is autogenerated by server  */

const config = {
	// auto-start
	Global: {
		Locale: "Russian",
	},
	UrlPaths: {
		Site: "http://localhost:5005",
		Api: "http://localhost:5000",
		UploadImages: "http://localhost:5000/UploadImages",
		Skins: "http://localhost:5005/statics/Skins",
		PartialSkins: "http://localhost:5005/statics/PartialSkins",
	},
	Dev: {
		VueDevTools: true,
		LogInitExtended: true,
		LogRequests: true,
		LogMoveTo: true,
		ShowExceptions: true,
		VueAppInWindow: true
	},
	DbColumnSizes: {
		Categories_Name: 64,
		Categories_Title: 256,
		Categories_Token: 64,
		Categories_CustomUrl: Number.MAX_VALUE,
		Categories_SubTitle: Number.MAX_VALUE,
		Categories_Icon: 64,
		Users_UserName: 64,
		Users_Email: 64,
		Users_Link: 64,
		Users_PasswordMinLength: 6,
		Materials_Name: 64,
		Materials_Title: 256,
		Materials_SubTitle: Number.MAX_VALUE,
		Tags_Name: 64,
		Roles_Name: 64,
		Roles_Title: 64,
		OperationKey_Name: 100,
		MenuItems_Name: 64,
		MenuItems_Title: 256,
		MenuItems_SubTitle: Number.MAX_VALUE,
		MenuItems_RouteName: 64,
		MenuItems_CssClass: 64,
		MenuItems_Icon: 64,
		Components_Name: 64,
		Components_Type: 32
	},
	Admin: {
		RoleUsersMaxUsersTake: 40
	},
	// auto-end
	
	Misc: {
		DefaultAvatar: "default-avatar.svg"
	}
};

if (config.UrlPaths.Site.startsWith("http://"))
	config.UrlPaths.SiteSchema = "http://";
else if (config.UrlPaths.Site.startsWith("https://"))
	config.UrlPaths.SiteSchema = "https://";
else throw "SiteUrl in config.js have to start with 'http://' or 'https://'.";

document.writeln(
	`<link href="${config.UrlPaths.Site}/custom.css?customcssver=0000" rel="stylesheet" />`
);
