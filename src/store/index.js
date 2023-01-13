//仓库
import Vuex from 'vuex';
import Vue from 'vue';
//安装插件
Vue.use(Vuex);

import  user from './user'

export default new Vuex.Store({
    //大仓库需要注册全部小仓库
    //vuex新增的一个配置项:模块式开发.右侧V也是对象
    modules: {
        user
    }
})