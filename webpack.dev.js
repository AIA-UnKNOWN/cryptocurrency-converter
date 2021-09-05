const path = require( 'path' );
const HhtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { merge } = require( 'webpack-merge' );
const common = require( './webpack.common' );

module.exports = merge( common, {
	mode: "development",
	output: {
		filename: 'main.bundle.js',
		path: path.join( __dirname, 'dist' )
	},
	plugins: [
		new HhtmlWebpackPlugin({
			template: './src/template.html'
		})
	]
});