<template>
  <div>
  <!-- 二级路由出口 -->
  <router-view></router-view>
    <!-- 底部的 TabBar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
   data() {
    return {
      active: 0,
    };
  },
}
</script>

<style lang="less" scoped></style>