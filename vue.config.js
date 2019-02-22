const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/apis': {
        target: 'http://api.dev.aigis.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      },
      '/markets': {
        target: '101.201.149.90',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/markets': ''
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
