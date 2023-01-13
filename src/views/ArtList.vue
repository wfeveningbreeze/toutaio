<template>
  <div>
    <!-- <div>文章列表组件 --- {{channelId}}</div> -->
    <!-- 循环渲染文章的列表 -->
    <!-- <art-item v-for="item in artlist" :key="item.art_id"></art-item> -->
    <!-- List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果。 -->
    <!-- 没有更多数据时，禁用下拉刷新的效果： :disabled="finished" -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <!-- 循环渲染文章的列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 循环渲染文章的列表 -->
        <art-item
          v-for="(item, index) in artlist"
          :key="index"
          :article="item"
        ></art-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入 API 接口
import { getArtListAPI } from "@/api/index.js";
import ArtItem from "@/components/ArtItem.vue";

export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: "ArtList",
  props: {
    // 频道 Id（小驼峰命名法：第一个单词全部小写，后面的单词首字母大写）
    channelId: {
      type: Number, // 数值类型
      required: true, // 必填项
    },
  },
  data() {
    return {
      // 文章列表的数组
      artlist: [],
      // 时间戳。初始的默认值为当前的时间戳
      timestamp: Date.now(),
      // loading 表示是否正在进行上拉加载的请求
      //   每当触发 List 组件的上拉加载更多时，List 组件会自动把 loading 设为 true
      //   每当下一页的数据请求回来以后，需要程序员手动的把 loading 设为 false，
      //   否则：再次触发上拉加载更多时，不会发起请求！！
      loading: false,

      // finished 表示所有数据是否加载完毕
      //    false 表示还有下一页的数据
      //    true  表示所有数据都已加载完毕
      finished: false,
      // 下拉刷新
      refreshing: false,
    };
  },
  components: {
    ArtItem,
  },
  created() {
    // 在组件创建的时候，请求文章的列表数据
    this.initArtList();
  },
  methods: {
    // 初始化文章的列表数据
    async initArtList(isRefresh) {
      // 请求 API 接口
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp);
      // console.log(res);
      const result = res.data[0].data;
      // console.log(result);
      // 判断是否为下拉刷新
      if (isRefresh) {
        // 为时间戳重新赋值
        this.timestamp = result.pre_timestamp;
        // 为 artlist 赋值
        this.artlist = result.results;
        // 下拉刷新
        // 1. “新数据”在前，“旧数据”在后
        this.artlist = [...result.results, ...this.artlist];
        // 2. 重置 isLoading 为 false
        this.isLoading = false;
      } else {
        // 上拉加载
        // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
        this.artlist = [...this.artlist, ...result.results];
        // 2. 重置 loading 为 false
        this.loading = false;
      }
      // console.log(this.artlist);
      // 3. 判断所有的数据是否已加载完毕
      if (this.artlist.length >= 6) {
        this.finished = true;
      }
    },
    // 加载更多的数据
    onLoad() {
      // console.log("触发了上拉加载更多");
      this.initArtList();
    },
    // 下拉刷新
    onRefresh() {
      console.log("触发了下拉刷新");
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.initArtList(true);
    },
  },
};
</script>

<style lang="less" scoped></style>