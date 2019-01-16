var path = require("path");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "output"),
		filename: "bundle.js"
	},
	devServer: {
		port: 8080,
		contentBase: path.resolve(__dirname, "output"),
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader:"babel-loader",
				options: {
		          presets: ["react","es2015"]
		        },
			},
			{
		    	test: /\.css$/,
		    	use: [
		    		{loader: "style-loader"},
		    		{loader: "css-loader"},
		    	]
		    },
		]
	},
	mode: "development",
	// mode: "production",
}