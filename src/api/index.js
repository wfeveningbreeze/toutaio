import  request from '@/utils/index'

// 用户登录
export  const  reqLogin=(data)=>{
    return  request({
        url:'/v1_0/authorizations',
        method:'post',
        params:data
    })
}
// 请求用户频道列表数据的 API
export const getUserChannelAPI = () => {
    return request.get('/v1_0/user/channels')
  }