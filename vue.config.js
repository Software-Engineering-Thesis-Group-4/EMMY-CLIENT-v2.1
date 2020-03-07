const path = require('path');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, '../EMMY-SERVER/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http:///localhost:3000'
      }
    }
  }
}