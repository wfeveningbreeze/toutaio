import axios from 'axios'
// 从vant中导入loading效果的对象
import { Toast } from 'vant'
// 引入store,在请求头的地方配置token
import store from '@/store/index'
// 导入 router 实例对象
import router from '@/router/index.js'


const request = axios.create({
    baseURL: '/api',
    timeout: 1000,
  });

  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
     // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    
    // 配置请求头的token
    // 1. 获取 token 值
  const  token=store.state.user.token
  // 2.判断token的值是否为空
  if(token){
     // 3. 添加身份认证字段
    config.headers.Authorization =`Bearer ${token}`
  }
    return config;
  }, function (error) {
    // 结束loading效果
      // 手动清除 Toast
      Toast.clear();
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 隐藏 loading 提示效果
    Toast.clear()
    return response;
  }, function (error) {
    // 对响应错误做点什么
     // 在请求失败的时候，关闭 loading 提示效果
     Toast.clear()
 // 如果有响应的结果，并且响应的状态码是 401，则证明 Token 过期了
 if (error.response && error.response.status === 401) {
  console.log('token 过期啦')
  // TODO1：清空 vuex 和 localStorage 中的数据
  store.commit('removeUserInfo')
  // TODO2：强制跳转到登录页，并通过路由的 query 查询参数，把当前用户访问未遂的路由地址带给登录页
router.push(`/login?pre=${router.currentRoute.fullPath}`)
}
    return Promise.reject(error);
  });


  export default request