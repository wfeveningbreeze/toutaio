// 引入mockjs插件开始模拟数据
import Mock from "mockjs";
// 引入数据格式 :json
// 引入图片, json资源 [里面不能写export关键字] 这些资源默认对外暴露

import user from "./user.json";
import channels from "./channels.json";
import articles from "./articles.json";
import dislikes from "./dislikes.json";
import reports from "./reports.json";
import allChannels from "./allChannels.json";
import suggestion from "./suggestion.json";
import search from "./search.json";
import articlesdetail from "./articlesdetail.json";
import followings from "./followings.json";
import likings from "./likings.json";

// 接口:相当于nodejs里面的中间件
// 第一个参数: 接口的地址  第二个参数:向这个接口发请求获取数据
// Mock插件:中间件默认是get请求
Mock.mock("/mock/user", { code: 200, data: user });
Mock.mock("/mock/channels", { code: 200, data: channels });
Mock.mock("/mock/articles", { code: 200, data: articles });
Mock.mock("/mock/dislikes", { code: 200, data: dislikes });
Mock.mock("/mock/reports", { code: 200, data: reports });
Mock.mock("/mock/allChannels", { code: 200, data: allChannels });
Mock.mock("/mock/suggestion", { code: 200, data: suggestion });
Mock.mock("/mock/search", { code: 200, data: search });
Mock.mock("/mock/articlesdetail", { code: 200, data: articlesdetail });
Mock.mock("/mock/followings", { code: 200, data: followings });
Mock.mock("/mock/likings", { code: 200, data: likings });
