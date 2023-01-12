import Vue from 'vue'
import App from './App.vue'
// 引入路由
import  router from "@/router/index"

// 全局引入vant
import Vant from 'vant';
// 这里要把 .css 后缀名改为 .less
import 'vant/lib/index.css';
// 导入全局样式表
 import '@/css/index.less'

Vue.use(Vant);


// 引入amfe-flexible.js
import 'amfe-flexible'
// 引入vuex
import  store from  '@/store/index'

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
