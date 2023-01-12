import Vue from 'vue'
import App from './App.vue'
// 引入路由
import  router from "@/router/index"

// 全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// 引入amfe-flexible.js
import 'amfe-flexible'
// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
