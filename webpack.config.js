var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "./app/main.js")
			// entry:顾名思义入口文件,app/main.js,输入名字为 app.js
	},
	output: {
		path: path.resolve(__dirname, "./output/static"), //输出路径
		publicPath: '/', //调试或者 CDN 之类的域名,稍候会用到
		filename: "[name].js" //配置生成的文件名
	},
	resolve: {
		root: __dirname, //模块从里开始查找
		extensions: ['', '.js', '.vue'] //模块后缀名，先这么些，稍候会用到
	},
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue'
			}, {
				test: /\.js$/,
				loader: 'babel',
				query: {
			        presets: ['es2015']
			    },
				include: "/",
				exclude: /node_modules/
			}]
			//模块加载器，默认null
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env': {
			  NODE_ENV: '"development"'
			}
	    }),
		// Webpack 1.0 
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),

		new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './app/views/index.html'),
            inject: true
        })
	],
	devServer: {
	  inline: true,
	  hot:false
	} 
}

/*
module.exports = {
	entry: {
		app: path.resolve(__dirname, "./app/main.js") 
	},
	output: {
		path: path.resolve(__dirname, "./output/static"),
		publicPath: 'static/',
		filename: "[name].js"
	},
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, './node_modules')],
		alias: {
			vue: path.resolve(__dirname, "./components/vue/dist/vue.js"),
		}
	},
	module: {
		loaders: []
	},
	plugins: []
}
*/