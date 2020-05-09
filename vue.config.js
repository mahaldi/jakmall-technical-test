module.exports = {
	// options...
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "./src/assets/styles/variables.scss";
					@import "./src/assets/styles/mixins.scss";
					@import "./src/assets/styles/base.scss";
					@import "./src/assets/styles/reset.scss";
				`
			}
		}
	}
}