<template>
  <div>
    <!-- 一级路由出口 -->
    <!-- 路由占位符 -->
    <!-- 在 App.vue 组件中，在 <router-view> 路由占位符之外包裹一层 <keep-alive> 组件，从而实现 Main 组件的状态保持： -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 通过步骤 1，的确实现了 Main 组件的状态保持。但是随之而来的：详情页也被缓存了，导致了文章数据不会动态刷新的问题。

可以在 ArticleDetail.vue 组件中，定义 watch 侦听器来监视 props 中 id 值的变化，从而动态请求文章的详情数据： -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped></style>