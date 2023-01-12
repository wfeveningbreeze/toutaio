import  request from '@/utils/index'

export  const  reqLogin=(data)=>{
    return  request({
        url:'/v1_0/authorizations',
        method:'post',
        params:data
    })
}