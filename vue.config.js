const path = require('path');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, '../EMMY-SERVER/client'),
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:3000`
      }
    }
  }
}