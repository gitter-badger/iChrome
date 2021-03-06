/*
 * The Top Sites widget.
 */
define(["jquery", "browser/api"], function($, Browser) {
	return {
		id: 12,
		size: 2,
		order: 19,
		nicename: "topsites",
		sizes: ["variable"],
		settings: [
			{
				type: "text",
				nicename: "title",
				label: "i18n.settings.title",
				placeholder: "i18n.settings.title_placeholder"
			},
			{
				type: "number",
				nicename: "show",
				label: "i18n.settings.show",
				min: 1,
				max: 20
			},
			{
				type: "radio",
				nicename: "target",
				label: "i18n.settings.open",
				options: {
					_self: "i18n.settings.open_options.current",
					_blank: "i18n.settings.open_options.blank"
				}
			}
		],
		config: {
			show: 5,
			target: "_self",
			size: "variable"
		},
		refresh: function() {
			this.render();
		},
		render: function() {
			var that = this;

			Browser.topSites.get(function(sites) {
				that.utils.render({
					title: that.config.title || false,
					newTab: that.config.target == "_blank",
					sites: sites.slice(0, that.config.show).map(function(e) {
						e.favicon = Browser.getFavicon(e.url);

						return e;
					})
				});
			});
		}
	};
});