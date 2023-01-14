import request from "@/utils/request";
import mockRequest from "@/utils/mockRequest";
// 用户登录
export const reqLogin = (data) => {
  console.log(333);
  return mockRequest({
    url: "/user",
    method: "post",
    // params:data
  });
};
// 请求用户频道列表数据的 API
export const getUserChannelAPI = () => {
  return mockRequest.get("/channels");
};

// 根据频道 Id 请求频道下的文章列表数据
export const getArtListAPI = (id, time) => {
  return mockRequest.get("/articles", {
    // params: {
    //   channel_id: id, // 频道的 Id
    //   timestamp: time, // 时间戳
    // }
  });
};

// 将文章设置为不感兴趣
export const dislikeArticleAPI = () => {
  return mockRequest.get("/dislikes");
};

// 举报文章的 API
export const reportArticleAPI = (target, type) => {
  return mockRequest.post(
    "/reports"
    // {
    //   target, // 文章的 Id
    //   type // 举报的类型
    // }
  );
};

// 获取所有频道数据的 API
export const getAllChannelAPI = () => {
  return mockRequest.get("/channels");
};

// 更新用户频道列表数据的 API
// 注意：形参 channels 是一个数组，格式： [ {id, seq} ]
export const updateUserChannelAPI = (channels) => {
  return mockRequest.put( "/channels",
    //  {
    //   channels
    // }
  );
};


// 获取搜索建议列表数据的 API
export const getSuggestListAPI = kw => {
  return mockRequest.get('/suggestion', {
    // 注意：GET 请求的参数，要通过 params 提供
    // params: {
    //   q: kw
    // }
  })
}


// 封装搜索文章数据的 API
export const getSearchResultAPI = (kw, page) => {
  return mockRequest.get('/search', {
    // params: {
    //   q: kw, // 搜索关键词
    //   page // 页码值
    // }
  })
}


// 获取文章详情的 API（形参中的 id 是文章的 id）
export const getArticleDetailAPI = id => {
  // return mockRequest.get(`/articles/${id}`)
  return mockRequest.get('/articlesdetail')
}


// 关注用户的 API（形参中的 userId 是文字作者的 id）
export const followUserAPI = userId => {
  return mockRequest.post('/followings',
  //  {
  //   target: userId
  // }
  )
}


// 取消关注用户的 API
export const unfollowUserAPI = userId => {
  // return mockRequest.delete(`/v1_0/user/followings/${userId}`)
  return mockRequest.delete('/followings')
}


// 点赞的 API（形参中的 artId 是文章的 Id）
export const addLikeAPI = artId => {
  return mockRequest.post('/likings', 
  // {
  //   target: artId
  // }
  )
}


// 取消点赞的 API（形参中的 artId 是文章的 Id）
export const delLikeAPI = artId => {
  // return mockRequest.delete(`/v1_0/article/likings/${artId}`)
  return mockRequest.delete(`/likings`)
}


// 获取文章下评论数据的 API
export const getCmtListAPI = (artId, offset) => {
  return mockRequest.get('/comments',
  //  {
  //   params: {
  //     // a 表示获取文章下的评论
  //     type: 'a',
  //     // 文章的 Id
  //     source: artId,
  //     // 获取评论数据的偏移量，值为评论的 id。表示从此 id 的数据向后取，不传表示从第一页开始读取数据
  //     offset
  //   }
  // }
  )
}


// 评论点赞的 API
export const addLikeCmtAPI = cmtId => {
  return mockRequest.post('/likings',
  //  {
  //   target: cmtId
  // }
  )
}

// 评论取消点赞的 API
export const delLikeCmtAPI = cmtId => {
  return mockRequest.delete(`/likings`)
}

// 发表评论的 API（形参中的 artId 是文章的 id；content 是评论的内容）
export const pubCommentAPI = (artId, content) => {
  return mockRequest.post('/comments',
  //  {
  //   target: artId,
  //   content
  // }
  )
}

// 请求用户基本信息的 API
export const getUserInfoAPI = () => {
  return mockRequest.get('/user')
}

// 请求用户简介信息的 API
export const getUserProfileAPI = () => {
  return mockRequest.get('/profile')
}

// 修改用户简介信息的 API（形参中的 obj 是对象格式的简介信息）
// 可能的格式有以下两种：
// { name: 'xxx' } 或 { birthday: '2012-12-12' }
export const updateUserProfileAPI = obj => {
  return mockRequest.patch('/profile',
  //  obj
   )
}

// 修改头像的 API（形参中的 fd 表示 FormData 格式的表单数据）
export const updateUserAvatarAPI = fd => {
  // return mockRequest.patch('/v1_0/user/photo', fd)
  return mockRequest.patch('/photo')
}