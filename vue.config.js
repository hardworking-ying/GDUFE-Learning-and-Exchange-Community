const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  devServer: {
    proxy: {
      '': {
        // target: 'http://localhost:9000',
        target: 'http://192.168.43.77:8080',
        // target: 'http://localhost:8080',
        changeOrigin: true
      },
    },
    port: 9006,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('network', resolve('./src/network'))
      .set('plugins', resolve('./src/plugins'))
    //注意 store 和 router 没必要配置
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: `true; @import '~@/assets/style/var.less';`
        }
      }
    }
  }
}
