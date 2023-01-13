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
// 瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。
import { List } from 'vant';
Vue.use(List);

// 引入amfe-flexible.js
import 'amfe-flexible'
// 引入vuex
import  store from  '@/store/index.js'
//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockSever.js";

// 导入 dayjs 的核心模块
import dayjs from 'dayjs'
// 导入计算相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文语言包
import zh from 'dayjs/locale/zh-cn'
// 配置“计算相对时间”的插件
dayjs.extend(relativeTime)
// 配置中文语言包
dayjs.locale(zh)

// dt 参数是文章的发表时间
Vue.filter('dateFormat', dt => {
  // 调用 dayjs() 得到的是当前的时间
  // .to() 方法的返回值，是计算出来的“相对时间”
  return dayjs().to(dt)
})

// 基于 Vant 的 Lazyload 懒加载，可以轻松实现列表中图片的懒加载效果
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
