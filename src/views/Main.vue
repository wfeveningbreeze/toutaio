<template>
  <div>
    <!-- 点击 tabBar 实现 Home 页面和 User 页面切换展示的时候，发现 Home 组件的状态每次都会被刷新 -->
    <!-- 在 Main.vue 组件中，在 <router-view> 路由占位符之外包裹一层 <keep-alive> 组件，从而实现 Home 组件的状态保持： -->
  <!-- 二级路由出口 -->
   <keep-alive>
  <router-view></router-view>
   </keep-alive>
   <!-- 通过步骤 1，的确实现了 Home 组件的状态保持。
   但是随之而来的，User.vue 组件也被缓存了，导致修改用户头像后，头像不刷新的问题。
   可以在被缓存的 User.vue 组件中，声明 activated 和 deactivated 声明周期函数，来监听组件被激活和被缓存的状态变化： -->
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