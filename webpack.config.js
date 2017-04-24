var path = require("path");

module.exports = {
	context: path.join(__dirname, "src"),
	entry: {
		auth:  "./auth/App.jsx",
		dashboard: "./dashboard/App.jsx"
	},
	resolve: {
	 extensions: ['.js', '.jsx']
  },
	output: {
	   path: path.join(__dirname, "public"),
	   filename: "./js/[name].bundled.js"
	},
	module: {
	   rules: [
		{
		  test: /\.jsx{0,1}$/,
			include: path.join(__dirname, "src"),
		  loader: "babel-loader",
			query: {
				presets: ['es2015', 'react']
			}
		}
	   ]
	}
}
