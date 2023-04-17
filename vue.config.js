module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://47.93.21.142:8080',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/upload': {
        target: 'http://upload.qiniup.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      }
    }
  }
};