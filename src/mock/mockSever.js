// 引入mockjs插件开始模拟数据
import Mock from "mockjs";
// 引入数据格式 :json
// 引入图片, json资源 [里面不能写export关键字] 这些资源默认对外暴露

import user from "./user.json";
import channels from "./channels.json";
import articles from "./articles.json";
import dislikes from "./dislikes.json";
import reports from "./reports.json";

// 接口:相当于nodejs里面的中间件
// 第一个参数: 接口的地址  第二个参数:向这个接口发请求获取数据
// Mock插件:中间件默认是get请求
Mock.mock("/mock/user", { code: 200, data: user });
Mock.mock("/mock/channels", { code: 200, data: channels });
Mock.mock("/mock/articles", { code: 200, data: articles });
Mock.mock("/mock/dislikes", { code: 200, data: dislikes });
Mock.mock("/mock/reports", { code: 200, data: reports });
