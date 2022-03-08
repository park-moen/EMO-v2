const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/index.ts',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true, // webpack5에서튼 CleanWebpackPlugin을 사용하지 않고 내장되어 있는 옵셥으로 설정
	},
	resolve: {
		alias: {
			Resource: path.resolve(__dirname, './src/js'),
			Router: path.resolve(__dirname, './src/router'),
			CSS: path.resolve(__dirname, './src/css'),
			Image: path.resolve(__dirname, './src/assets/image'),
		},
		extensions: ['.ts', '.js', '.json'],
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
