﻿import { getThreadTopics } from "forum";
import { getNewTopics } from "forum";
import app from "App";

export default {
	name: "Forum2",
	title: "Forum with 2 level threads",

	setCategoryRoute(category) {
		category.route = {
			name: `cat-${category.name}`,
			params: {}
		};

		for (const cat0 of category.subCategories) {
			for (const cat1 of cat0.subCategories) {
				cat1.route = {
					name: `cat-${category.name}-cat`,
					params: {
						categoryName: cat1.name
					}
				};
			}
		}
	},

	getRoutes(category) {
		const name = category.name;
		const nameLower = name.toLowerCase();

		return [
			{
				name: `cat-${name}`,
				path: "/" + nameLower,
				components: {
					default: sunImport("forum", "Thread"),
					navigation: sunImport("forum", "ForumPanel")
				},
				props: {
					default: {
						categoryName: name,
						loadTopics: getNewTopics,
						pageTitle: category.title +  Vue.prototype.i18n.t("Thread.titlePartNewTopics")
					},
					navigation: {
						categories: sunImport("categories", "Categories1"),
						categoryName: name
					}
				},
				meta: {
					category: category
				}
			},
			{
				name: `cat-${name}-cat`,
				path: `/${nameLower}/:categoryName`,
				components: {
					default: sunImport("forum", "Thread"),
					navigation: sunImport("forum", "ForumPanel")
				},
				props: {
					default: route => {
						return {
							categoryName: route.params.categoryName,
							loadTopics: getThreadTopics
						};
					},
					navigation: {
						categories: sunImport("categories", "Categories1"),
						categoryName: name
					}
				},
				meta: {
					category: category
				}
			},
			{
				name: `cat-${name}-cat-mat`,
				path: `/${nameLower}/:categoryName/:idOrName`,
				components: {
					default: sunImport("material", "Material"),
					navigation: sunImport("forum", "ForumPanel")
				},
				props: {
					default: route => {
						return {
							categoryName: route.params.categoryName,
							idOrName: route.params.idOrName
						};
					},
					navigation: {
						categories: sunImport("categories", "Categories1"),
						categoryName: name
					}
				},
				meta: {
					category: category
				}
			}
		];
	}
};
