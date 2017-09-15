var path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    entry: './src/index.js',
    assetsRoot: path.resolve(__dirname, '../lib')
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    entry: './example/main.js',
    port: 8080,
    autoOpenBrowser: true
  }
}
