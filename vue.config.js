const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: [
    'webpack-dev-server/client',
  ],
  devServer: {
    proxy: {
      '^~ /websocket': {
        // target: 'https://117.50.49.131/8988',
        target: 'https://aigis.leadfintech.com/wss',
        ws: true,
        changeOrigin: true
      },
      '/apis/news': {
        target: 'https://api.cnibd.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis/news': ''
        }
      },
      '/apis': {
        target: 'https://aigis.leadfintech.com:8888',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  },
  chainWebpack: config => {
    path.resolve('config')
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('base', resolve('src/base'))
      .set('api', resolve('src/api'))
      .set('src', resolve('src'))
  }
}
