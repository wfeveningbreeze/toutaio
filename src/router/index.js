import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 引入一级路由组件
import  Login from '@/views/Login'

// 清空路由规则
const routes = [
  {path:'/login',name: 'login',component:Login}
]

const router = new VueRouter({
  routes
})

export default router