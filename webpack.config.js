const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/ts/index.ts',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true, // webpack5에서튼 CleanWebpackPlugin을 사용하지 않고 내장되어 있는 옵셥으로 설정
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true,
		port: 8000,
		historyApiFallback: {
			index: '/index.html',
		},
	},
	resolve: {
		alias: {
			TS: path.resolve(__dirname, './src/ts'),
			View: path.resolve(__dirname, './src/ts/view'),
			Util: path.resolve(__dirname, './src/ts/util'),
			Router: path.resolve(__dirname, './src/ts/router'),
			Utils: path.resolve(__dirname, './src/ts/utils'),
			Page: path.resolve(__dirname, './src/pages'),
			CSS: path.resolve(__dirname, './src/css'),
			Image: path.resolve(__dirname, './src/assets/image'),
			Icon: path.resolve(__dirname, './src/assets/icon'),
			Type: path.resolve(__dirname, './src/types'),
			handlebars: 'handlebars/dist/handlebars.min.js',
		},
		extensions: ['', '.ts', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/i,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.hbs$/i,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src/pages'),
				use: ['handlebars-loader'],
			},
			{
				test: /\.css/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|jpeg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'image/[name].[ext]',
				},
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024,
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'font/[name].[ext]',
				},
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024, // 4kb
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
