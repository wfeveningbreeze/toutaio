const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint的语法检查
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.liulongbin.top:8000',
        // target: 'http://localhost:8080/',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
   // 增强 vue-cli 的 webpack 配置项
   configureWebpack: {
    // 打包优化
    externals: {
      // import 时的包名称: window 全局的成员名称
      // import 时的包名称: window 全局的成员名称
    'highlight.js': 'hljs',
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    vant: 'vant',
    dayjs: 'dayjs',
    'socket.io-client': 'io',
    popmotion: 'popmotion'
    }
  }

})
