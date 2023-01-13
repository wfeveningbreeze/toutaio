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
