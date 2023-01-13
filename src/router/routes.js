


// 引入一级路由组件
import  Login from '@/views/Login'
import  Main from '@/views/Main'
import  Home from '@/views/Home'
import  User from '@/views/User'

// 清空路由规则
export  default   [
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