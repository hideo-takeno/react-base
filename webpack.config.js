const webpack = require('webpack')
const path = require('path');
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		compress: true,
		port: 3000,
	},
	plugins:[
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false	
		}),
		new UglifyEsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),		
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2017']
						]
					}
				}]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
						modules: true
						}
					}
				]
			}
		]
	}
}