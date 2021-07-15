/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const isStaging = !!process.env.VUE_APP_STAGINE
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: (isProduction && !isStaging) ? 'https://oss.imooc-lego.com/editor' : '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#3E7FFF',
          },
          javascriptEnabled: true
        }
      }
    }
  },
}