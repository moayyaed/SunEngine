﻿﻿
export default {
	name: "Articles",

	getRoutes(section) {
		const name = section.name;
		const nameLower = name.toLowerCase();

		return [
			{
				name: `comp-${name}`,
				path: "/" + nameLower,
				components: {
					default: sunImport("blog","BlogMultiCatPage"),
					navigation: null
				},
				props: {
					default: {
						sectionName: nameLower
					}
				},
				meta: {
					section: section
				}
			}
		];
	}
};
