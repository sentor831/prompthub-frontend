module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://47.93.21.142:8080',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/img': {
        target: 'http://rtjsbslgo.hb-bkt.clouddn.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/img': ''
        }
      }
    }
  }
};