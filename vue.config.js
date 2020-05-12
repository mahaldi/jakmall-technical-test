module.exports = {
	configureWebpack: {
		optimization: {
		  runtimeChunk: 'single',
		  splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
			  vendor: {
				test: /[\\/]node_modules[\\/]/,
				name(module) {
				  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
				  return `npm.${packageName.replace('@', '')}`;
				},
			  },
			},
		  },
		},
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "./src/assets/styles/variables.scss";
					@import "./src/assets/styles/mixins.scss";
					@import "./src/assets/styles/base.scss";
					@import "./src/assets/styles/reset.scss";
					@import "./src/assets/styles/icons.scss";
				`
			}
		}
	}
}