import axios from 'axios'
// 从vant中导入loading效果的对象
import { Toast } from 'vant'
// 引入store,在请求头的地方配置token
import store from '@/store/index'
const request = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
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
    config.headers.Authorization =`Bearer ${tokenStr}`
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
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  export default request