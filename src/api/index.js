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