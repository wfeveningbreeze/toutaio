


// 引入一级路由组件
import  Login from '@/views/Login'
import  Main from '@/views/Main'
// 引入二级路由
import  Home from '@/views/Home'
import  User from '@/views/User'
import  Search from '@/views/Search'
import  SearchResult from '@/views/SearchResult'
import  ArticleDetail from '@/views/ArticleDetail'
import  UserEdit from '@/views/UserEdit'

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
      {path:'/search',name: 'search',component:Search},
      {path:'/search/:kw?',name: 'search-result',component:SearchResult, props: true},
       // 文章详情的路由规则
      {path:'/article/:id?',name:  'art-detail' ,component:ArticleDetail, props: true},
       // 编辑用户资料的路由规则
      {path:'/useredit',name:  'user-edit' ,component:UserEdit, props: true},
    ]
  },
  
  ]