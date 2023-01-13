<template>
  <div>
    <!-- 文章的信息 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <!-- <img
            alt=""
            class="thumb"
            v-if="article.cover.type === 1"
            :src="article.cover.images[0]"
          /> -->
          <!-- 使用图片懒加载 -->
          <!-- 单张图片 -->
          <img
            alt=""
            class="thumb"
            v-if="article.cover.type === 1"
            v-lazy="article.cover.images[0]"
          />
        </div>
        <!-- 三张图片 -->
        <!-- <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            alt=""
            class="thumb"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          />
        </div> -->
        <!-- 使用图片懒加载 -->
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            alt=""
            class="thumb"
            v-for="(item, index) in article.cover.images"
            :key="index"
            v-lazy="item"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论
            &nbsp;&nbsp; {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <!-- 通过 .stop 事件修饰符，阻止点击事件的冒泡 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈的动作面板 -->
    <!-- 监听 <van-action-sheet> 的 @closed 事件，当动作面板完全关闭且结束动画以后，将 isFirst 设置为 true。保证下次打开动作面板时，默认展示第一个反馈面板： -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      @closed="isFirst = true"
      get-container="body"
    >
      <!-- 第一级反馈面板 -->
      <div v-if="isFirst">
        <!-- 循环渲染可选项 -->
        <!-- 为一级选项绑定名为 onCellClick 的点击事件处理函数，同时把当前选项的 name 作为参数，传递给事件处理函数： -->
        <van-cell
          :title="item.name"
          clickable
          class="center-title"
          v-for="item in actions"
          :key="item.name"
          @click="onCellClick(item.name)"
        />
      </div>
      <!-- 第二级反馈面板 -->
      <div v-else>
        <!-- <van-cell title="返回" clickable title-class="center-title" /> -->
        <!-- 当点击二级反馈面板中的返回时，将 isFirst 设置为 true，从而展示一级反馈面板： -->
        <van-cell
          title="返回"
          clickable
          title-class="center-title"
          @click="isFirst = true"
        />
        <van-cell
          :title="item.label"
          clickable
          title-class="center-title"
          v-for="item in reports"
          :key="item.type"
          @click="reportArticle(item.type)"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// 在 ArtItem.vue 组件中，导入 /src/api/reports.js 模块：
import reports from "@/api/reports";
// 按需导入 API 接口
import { dislikeArticleAPI, reportArticleAPI } from "@/api/index.js";

export default {
  name: "ArtItem",
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true, // 必填项
    },
  },
  data() {
    return {
      // 是否展示反馈面板
      show: false,
      // 第一个面板的可选项列表
      actions: [
        { name: "不感兴趣" },
        { name: "反馈垃圾内容" },
        { name: "拉黑作者" },
      ],
      // 是否展示第一个反馈面板
      isFirst: true,
      // 第二个面板的可选项列表，数组中每一项的格式 { type, label }
      reports: reports,
    };
  },
  computed: {
    // 文章 Id 的计算属性
    artId() {
      // 注意：文章对象的 art_id 是大数对象，需要调用 .toString() 方法转换为字符串形式
      return this.article.art_id.toString();
    },
  },
  methods: {
    // 一级选项的点击事件处理函数
    async onCellClick(name) {
      if (name === "不感兴趣") {
        console.log("不感兴趣");
        // 调用 API 接口，将文章设置为不感兴趣
        const { data: res } = await dislikeArticleAPI(this.artId);
        console.log(res);
        const result = res.data[0].data;
        // this.artId = result.target;
        if (res.code === 200) {
          // TODO：炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
          this.$emit("remove-article", this.artId);
        }
        this.show = false;
      } else if (name === "拉黑作者") {
        console.log("拉黑作者");
        this.show = false;
      } else if (name === "反馈垃圾内容") {
        // TODO：展示二级反馈面板
        this.isFirst = false;
      }
    },
    // 举报文章（形参 type 是举报的类型值）
    async reportArticle(type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.artId, type);
      // console.log(res);
      if (res.code === 200) {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit("remove-article", this.artId);
      }
      // 3. 关闭动作面板
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}

.center-title {
  text-align: center;
}
</style>