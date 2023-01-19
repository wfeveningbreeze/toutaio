import Vue from 'vue'
import VueRouter from 'vue-router'

import   store  from  '@/store/index'

Vue.use(VueRouter)

//引入路由相关的配置项
import routes from './routes'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
      //代表真:代表着两个形参接受参数【箭头函数】
      originReplace.call(this, location, resolve, reject);
  } else {
      originReplace.call(this, location, () => { }, () => { });
  }
}



const router = new VueRouter({
  routes
})

// 所有有权限页面的路径，都在这个数组之中
const pagePathArr = ['/user', '/user/edit']

// 2. 为路由的实例对象挂载全局前置守卫
router.beforeEach((to, from, next) => {
    // if (to.path === '/user' || to.path === '/user/edit') {
    //   // 2.1 访问的是有权限的页面，需要判断用户是否登录
    //   next()
    // } else {
    //   // 2.2 访问的是没有权限的页面
    //   next()
    // }
    if (pagePathArr.indexOf(to.path) !== -1) {
        // 访问的是有权限的页面，需要判断用户是否登录,如果有token值,则表示用户已经登录了
         // 1. 从 store 中获取 token 的值
         const tokenStr = store.state.user.token
         console.log(tokenStr);
         if (tokenStr) {
            // 1.1 token 有值，已登录过（操作：直接放行）
            next()
          } else {
            // 1.2 token 不存在，没有登录（操作：强制跳转到登录页）
            // next('/login')
            // now：没有登录，强制跳转到登录页，并携带路由的 "query 查询参数"
         next(`/login?pre=${to.fullPath}`)
          }
      } else {
        // 访问的是没有权限的页面
        next()
      }

  })

export default router