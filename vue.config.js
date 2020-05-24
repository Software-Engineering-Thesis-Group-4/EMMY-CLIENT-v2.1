const path = require('path');

module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	outputDir: path.resolve(__dirname, '../EMMY-SERVER/client'),
	productionSourceMap: false,
	devServer: {
		proxy: 'http://[::1]:3000/'
	}
}