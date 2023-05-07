const path = require('path');

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')
const isProduction = process.env.NODE_ENV === 'production'

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
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@i': path.resolve(__dirname, './src/assets'),
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面两项配置才是 compression-webpack-plugin 压缩配置
      // 压缩成 .gz 文件
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11
          }
        },
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    // 开启分离 js
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV !== 'production') return
  //   return {
  //     plugins: [
  //       // ......
  //     ],
  //     // 看这里：把chunk-vendors.js进行分包，提升资源加载速度，很有必要
  //     optimization: {
  //       /**
  //        * runtimeChunk可选值有：true或'multiple'或'single'
  //        * true或'multiple'会有每个入口对应的chunk。不过一般情况下
  //        * 考虑到要模块初始化，设置为single就够多数情况下使用啦。
  //        * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
  //        * */
  //       runtimeChunk: 'single',
  //       /**
  //        * 以前是CommonsChunkPlugin，现在换成optimization.splitChunks。普通项目下方的配置就足够用啦
  //        * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks
  //        * */
  //       splitChunks: {
  //         chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
  //         maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
  //         minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
  //         maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
  //         cacheGroups: {
  //           vendors: {
  //             test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
  //             priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
  //             name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
  //               const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
  //               return `npm.${packageName.replace('@', '')}`
  //             },
  //           },
  //         },
  //       }
  //     }
  //   }
  // },
};