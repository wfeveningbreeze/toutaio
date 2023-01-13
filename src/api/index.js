import  request from '@/utils/request'
import mockRequest from '@/utils/mockRequest';
// 用户登录
export  const  reqLogin=(data)=>{
  console.log(333);
    return  mockRequest({
        url:'/user',
        method:'post',
        // params:data
    })
}
// 请求用户频道列表数据的 API
export const getUserChannelAPI = () => {
    return mockRequest.get('/channels')
  }

  // 根据频道 Id 请求频道下的文章列表数据
export const getArtListAPI = (id, time) => {
    return mockRequest.get('/articles', {
      // params: {
      //   channel_id: id, // 频道的 Id
      //   timestamp: time, // 时间戳
      // }
    })
  }