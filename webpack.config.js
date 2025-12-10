/*
 * @Descripttion: 
 * @version: 
 * @Author: huangwei
 * @Date: 2021-03-06 12:45:05
 * @LastEditors: huangwei
 * @LastEditTime: 2021-03-06 12:45:15
 */
const path = require("path");
const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
 
module.exports = {
    devtool: 'source-map',
    // 组件库入口，而不是示例站点入口
    entry: "./src/lib.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vueTreeToTable.min.js',
        library: 'VueTreeToTable',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    // 让使用方自行提供 Vue，避免将 Vue 打包进库
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};