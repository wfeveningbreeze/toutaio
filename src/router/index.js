import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 引入一级路由组件
import  Login from '@/views/Login'
import  Main from '@/views/Main'
import  Home from '@/views/Home'
import  User from '@/views/User'

// 清空路由规则
const routes = [
  {path:'/login',name: 'login',component:Login},
  {path:'/',
  name: 'main',
  component:Main,
  redirect: '/home',
  children:[
    {path:'home',name: 'home',component:Home},
    {path:'user',name: 'user',component:User},
  ]
},

]

const router = new VueRouter({
  routes
})

export default router