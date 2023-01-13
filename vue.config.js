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

})
