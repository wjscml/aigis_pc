const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
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
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
