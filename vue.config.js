const path = require('path');
const ip = require('ip');

module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	outputDir: path.resolve(__dirname, '../EMMY-SERVER-v2.0/client'),
	devServer: {
		proxy: {
			'/api': {
				target: `http://${ip.address()}:3000`
			}
		}
	}
}