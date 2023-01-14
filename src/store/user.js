import { setToken, getToken } from "@/utils/token";
// 获取用户基本信息的接口
import { getUserInfoAPI, getUserProfileAPI } from "@/api/index.js";

const state = {
  // 令牌,从本读取
  token: getToken(),
  // 用户的基本信息
  userInfo: {},
  // 用户的简介信息
  userProfile: {},
};
const mutations = {
  // 存储token
  setToken(state, token) {
    // vuex存储一份
    state.token = token;
    // 本地存储一份
    setToken(token);
  },
  // 更新 userInfo 的方法
  updateUserInfo(state, userInfo) {
    // 1. 把用户信息转存到 state 中
    state.userInfo = userInfo;
    // 2. 将最新的 state 对象持久化存储到本地
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // console.log(userInfo,'你会呀');
  },

  // // TODO：实现退出的登录操作：
  // 1. 清空 vuex 中的数据
  // 2. 清空本地的数据
  // 3. 跳转到登录页
  removeUserInfo(state) {
    // console.log(1111);
    // 1. 清空 vuex 中的数据
    state.token = "";
    state.userInfo = {};
    // 清空用户的简介信息
    state.userProfile = {};
    // 2. 清空本地的数据
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userProfile");
  },

  // 更新 userProfile 的方法
  updateUserProfile(state, payload) {
    state.userProfile = payload;
    // 本地存储用户简介信息
    localStorage.setItem('userProfile',payload)
  },
};
const actions = {
  // 初始化用户的基本信息
  async initUserInfo(ctx) {
    // 调用 API 接口
    const { data: res } = await getUserInfoAPI();
    // console.log(res);
    const result = res.data[1].data;
    console.log(result);
    if (res.code === 200) {
      // TODO：把数据转交给 Mutation 方法   ctx.commit('Mutation方法名')
      ctx.commit("updateUserInfo", result);
    }
  },
  // 初始化用户的简介信息
  async initUserProfile(ctx) {
    // 调用 API 接口
    const { data: res } = await getUserProfileAPI();
    // console.log(res,'你好呀');
    const result=res.data[0].data
    // console.log(result,'哈');
    if (res.code === 200) {
      // TODO：把请求到的数据转交给 Mutation 方法   ctx.commit('Mutation方法名')
      ctx.commit("updateUserProfile", result);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
