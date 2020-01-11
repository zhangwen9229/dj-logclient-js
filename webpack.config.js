// tslint:disable
const path = require('path');

function resolve(filepath) {
	return path.resolve(__dirname, filepath)
}

module.exports = {
	resolve: {
		extensions: ['.js', '.ts', '.json'],
	},
	devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
	mode: 'development',
	entry: {
		"djreport": resolve('src/index'),
	},
	output: {
		filename: '[name].js',// 生成的fiename需要与package.json中的main一致
		path: path.resolve(__dirname, 'build/umd'),
		libraryTarget: 'umd',
		globalObject: 'this',
		// umdNamedDefine: true,
		library: 'DJReport',
		libraryExport: "default"
	},
	performance: {
		hints: false
	},
	// optimization: { concatenateModules: false, providedExports: false, usedExports: false },
	module: {
		// unknownContextCritical: false,
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							// 必须注释下面的配置
							// 指定特定的ts编译配置，为了区分脚本的ts配置
							// configFile: path.resolve(__dirname, './tsconfig.module.umd.json'),
						},
					}
				],
				exclude: /node_modules/,
			}
		]
	},
	plugins: [
	],
	node: {
		fs: 'empty'
	}
};