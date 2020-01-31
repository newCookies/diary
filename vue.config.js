module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
	outputDir: "dist",
	assetsDir: "static",
	indexPath: "index.html",
	filenameHashing: true,
	lintOnSave: false,
	runtimeCompiler: false,
	// transpileDependencies: [],
	productionSourceMap: false,
	// crossorigin: "",
	integrity: false,
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'views': '@/views',
			}
		}
	},
	css: {
		sourceMap: false,
		loaderOptions: {
			less: {
				modifyVars: {
					'nav-bar-icon-color': '#323233',
					'nav-bar-text-color': '#323233'
				}
			}
		},
		modules: false
	},
	devServer: {
		port: 8080,
		host: "0.0.0.0",
		https: false,
		// 自动启动浏览器
		open: false,
// 		proxy: {
// 		}
	}
};
