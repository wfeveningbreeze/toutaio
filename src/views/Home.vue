<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../assets/images/ldh.jpg" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>

    <!-- 频道列表的标签页 -->
    <!-- 为 <van-tabs> 组件添加 sticky 属性，即可在页面纵向滚动时，实现频道列表的吸顶效果： -->
    <!-- 为 <van-tabs> 组件添加 offset-top 属性，即可设置吸顶的距离： -->
    <van-tabs v-model="active" sticky offset-top="1.22666667rem">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <van-tab title="标签 7">内容 7</van-tab>
      <van-tab title="标签 8">内容 8</van-tab>
       <!-- 循环渲染用户的频道 -->
  <!-- <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">{{item.name}}</van-tab> -->
    </van-tabs>
    <!-- 频道管理的小图标 -->
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
// 按需导入 API 接口
import { getUserChannelAPI } from '@/api/index.js'

export default {
  name: "home",
  data() {
    return {
      // 标签页激活项的索引
      active: 0,
      // 用户的频道列表数组
    userChannel: []
    };
  },
  created() {
    // 页面挂载,获取频道的数据
  this.initUserChannel()
},
  methods:{
    // 初始化频道列表数据
    async initUserChannel() {
    // 1. 调用 API 接口
    const { data: res } = await getUserChannelAPI()
    // 2. 判断请求是否成功
    if (res.message === 'OK') {
      // 3. 为用户的频道列表赋值
      this.userChannel = res.data.channels
    }
  }
  }
};
</script >

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
}
// logo 样式
.logo {
  height: 80%;
}
// 为 tabs 容器设置右 padding
// 注意:第三方库的样式,一般需要加 /deep/
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}
// 频道管理小图标的定位
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
</style>