const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/js/index.ts',
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
			JS: path.resolve(__dirname, './src/js'),
			View: path.resolve(__dirname, './src/js/view'),
			Router: path.resolve(__dirname, './src/js/router'),
			Utils: path.resolve(__dirname, './src/js/utils'),
			Page: path.resolve(__dirname, './src/pages'),
			CSS: path.resolve(__dirname, './src/css'),
			Image: path.resolve(__dirname, './src/assets/image'),
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
