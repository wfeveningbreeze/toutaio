<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 上拉加载更多 -->
    <!-- immediate-check	是否在初始化时立即执行滚动位置检查 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="onLoad"
      :immediate-check="false"
    >

      <!-- 文章的 Item 项 -->
      <!-- 在 SearchResult.vue 组件中使用 ArtItem.vue 组件时，不展示关闭按钮：:closable="false" -->
      <art-item
        v-for="item in searchList"
        :key="item.art_id.toString()"
        :article="item"
     :closable="false"
      ></art-item>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from "@/api/index";
// 导入文章的 Item 项组件
import ArtItem from "@/components/ArtItem.vue";

export default {
  name: "SearchResult",
  data() {
    return {
      // 页码值
      page: 1,
      // 搜索的结果
      searchList: [],
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 所有数据是否已经加载完毕
      finished: false,
    };
  },
  components: {
    ArtItem,
  },
  created() {
    this.initSearchList();
  },
  methods: {
    // 触发了上拉加载更多
    onLoad() {
      this.initSearchList();
    },
    // 获取搜索的结果
    async initSearchList() {
      // 调用 API 接口
      const { data: res } = await getSearchResultAPI(this.kw, this.page);
      //   console.log(res);
      const result = res.data.data;
      //   console.log(result);
      if (res.code === 200) {
        // 为 searchList 赋值
        // this.searchList =result.results;
        //  console.log( this.searchList);
        // 1. 拼接数据：“旧数据”在前，“新数据”在后
        this.searchList = [...this.searchList, ...result.results];

        // 2. 将 loading 设置为 false
        this.loading = false;
        // 3. 判断数据是否加载完毕
        if (result.results.length === 0) {
          this.finished = true;
        }
        // 4. 让页码值 +1
        this.page += 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
  .van-nav-bar {
    color: white;
  }
}
</style>