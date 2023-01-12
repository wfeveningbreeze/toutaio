
import {setToken,getToken} from '@/utils/token'

const state = {
  // 令牌,从本读取
  token: getToken(),
};
const mutations = {
  setToken(state, token) {
    // vuex存储一份
    state.token = token;
    // 本地存储一份
    setToken(token)
  },
};
const actions = {};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
