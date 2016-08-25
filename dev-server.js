var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

/**
 * 引入webpack 及其 配置config
 */
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

// var devClient = 'webpack-hot-middleware/client?noInfo=true&reload=true';
var devClient = './dev-client';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
    var extras = [devClient]
    webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name])
})
//调用配置
var compiler = webpack(webpackConfig); 

//这里是重点，使用 webpack-dev-middleware 插件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})


// 注册中间件
app.use(devMiddleware);
app.use(hotMiddleware);

// 使用静态资源
app.use(express.static(__dirname+'/'));

app.listen(port, function (err){
	if (err) {
		throw err;    
	}
	console.log('Listening at http://localhost:' + port + '\n')
})

