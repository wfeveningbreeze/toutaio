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
        <!-- <van-icon name="search" color="white" size="18" /> -->
        <van-icon name="search" color="white" size="18" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>

    <!-- 频道列表的标签页 -->
    <!-- 为 <van-tabs> 组件添加 sticky 属性，即可在页面纵向滚动时，实现频道列表的吸顶效果： -->
    <!-- 为 <van-tabs> 组件添加 offset-top 属性，即可设置吸顶的距离： -->
    <van-tabs v-model="active" sticky offset-top="1.22666667rem" :before-change="beforeTabsChange"  @change="onTabsChange">
      <!-- <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <van-tab title="标签 7">内容 7</van-tab>
      <van-tab title="标签 8">内容 8</van-tab> -->
      <!-- 循环渲染用户的频道 -->
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        {{ item.name }}
        <!-- 在每一个用户频道下，渲染出对应的“文章列表组件” -->
        <!-- <art-list></art-list> -->
        <!-- 注意：Vue 官方建议在绑定 props 时，把“小驼峰”的属性名，改造成“短横线”的形式使用 -->
        <art-list :channel-id="item.id"></art-list>
      </van-tab>
    </van-tabs>

    <!-- 频道管理的小图标 -->
    <!-- 在点击频道管理的小图标时，将 show 设置为 true，从而展示出频道管理的弹出层： -->
    <!-- 监听 <van-popup> 弹出层关闭完成时的 closed 事件，直接将 isDel 设置为 false 即可： -->
    <van-icon
      name="plus"
      size="16"
      class="plus"
      @click="show = true"
      @closed="isDel = false"
    />

    <!-- 频道管理的弹出层 -->
    <!-- 为 <van-popup> 组件绑定 :close-on-click-overlay="false" 属性，从而防止点击遮罩层时，弹出层自动关闭的效果： -->
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="popup-container">
        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon
              name="cross"
              size="14"
              color="white"
              @click="show = false"
            />
          </template>
        </van-nav-bar>

        <!-- 弹出层的主体区域 -->
        <div class="pop-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <!-- <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <span class="title-gray">点击进入频道</span>
              </div>
              <span class="btn-edit" @click="isDel = !isDel" >编辑</span>
            </div> -->
            <!-- 根据 isDel 的状态，动态渲染按钮的文本和提示的文本： -->
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <!-- 提示的文本 -->
                <span class="title-gray">{{
                  isDel ? "点击移除频道" : "点击进入频道"
                }}</span>
              </div>
              <!-- 按钮的文本 -->
              <span class="btn-edit" @click="isDel = !isDel">{{
                isDel ? "完成" : "编辑"
              }}</span>
            </div>
            <!-- 我的频道列表 -->
            <!-- <van-row type="flex">
              <van-col span="6" v-for="item in userChannel" :key="item.id">
                用户的频道 Item 项
                <div class="channel-item van-hairline--surround">
                  {{ item.name }}
                </div>
              </van-col>
            </van-row> -->
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <!-- 1. 在进行 v-for 循环时，接收索引 index -->
              <van-col
                span="6"
                v-for="(item, index) in userChannel"
                :key="item.id"
              >
                <!-- 用户的频道 Item 项 -->
                <!-- 2. 点击用户频道的 Item 项时，将索引 index 作为参数，传递给 onUserChannelClick 方法 -->
                <div
                  class="channel-item van-hairline--surround"
                  @click="onUserChannelClick(item, index)"
                >
                  {{ item.name }}
                  <!-- 删除的图标 -->
                  <!-- 使用 v-if 控制图标的显示与隐藏： -->
                  <!-- 如果频道的名字是“推荐”，则不渲染删除的小图标： -->
                  <!-- 如果 userChannel 数组中仅剩下两个频道，则不渲染删除的小图标： -->
                  <van-badge
                    color="transparent"
                    class="cross-badge"
                    v-if="
                      isDel && item.name !== '推荐' && userChannel.length > 2
                    "
                  >
                    <template #content>
                      <van-icon
                        name="cross"
                        class="badge-icon"
                        color="#cfcfcf"
                        size="12"
                      />
                    </template>
                  </van-badge>
                </div>
              </van-col>
            </van-row>
          </div>

          <!-- 分隔线 -->
          <div class="van-hairline--top sp-line"></div>

          <!-- 更多频道 -->
          <div class="more-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多频道列表 -->
            <!-- <van-row type="flex">
              <van-col span="6" v-for="item in userChannel" :key="item.id">
                <div class="channel-item van-hairline--surround">
                  {{ item.name }}
                </div>
              </van-col>
            </van-row> -->
            <!-- 更多频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannels" :key="item.id">
                <div
                  class="channel-item van-hairline--surround"
                  @click="addChannel(item)"
                >
                  {{ item.name }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 按需导入 API 接口
import {
  getUserChannelAPI,
  getAllChannelAPI,
  updateUserChannelAPI,
} from "@/api/index.js";
// 导入子组件ArtList
import ArtList from "@/views/ArtList.vue";

// “频道名称”和“滚动条位置”之间的对应关系，格式 { '推荐': 211, 'html': 30, '开发者资讯': 890 }
const nameToTop = {}

export default {
  name: "home",
  data() {
    return {
      // 标签页激活项的索引
      active: 0,
      // 用户的频道列表数组
      userChannel: [],
      // 控制频道管理弹出层的展示与隐藏
      show: false,
      // 所有的频道列表数据
      allChannel: [],
      // 频道数据是否处于删除的状态
      isDel: false,
    };
  },
  // 导航离开该组件的对应路由时调用
// 可以访问组件实例 `this`
beforeRouteLeave(to, from, next) {
  from.meta.top = window.scrollY
  next()
},
  components: {
    ArtList,
  },
  created() {
    // 页面挂载,获取频道的数据
    this.initUserChannel();
    // 请求所有的频道列表数据
    this.initAllChannel();
  },
  computed: {
    // 更多频道的数据
    moreChannels() {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter((item) => {
        // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.userChannel.findIndex((x) => x.id === item.id);
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true;
      });
    },
  },
  methods: {
    // 初始化频道列表数据
    async initUserChannel() {
      // 1. 调用 API 接口
      const { data: res } = await getUserChannelAPI();
      // console.log(res);
      // // 2. 判断请求是否成功
      if (res.code === 200) {
        const result = res.data[0].data.channels;
        // console.log(result);
        // 3. 为用户的频道列表赋值
        this.userChannel = result;
      }
    },
    // 获取所有频道的列表数据
    async initAllChannel() {
      const { data: res } = await getAllChannelAPI();
      // console.log(res, 11111);
      const result = res.data[0].data.channels;
      // console.log(result);
      if (res.code === 200) {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = result;
        console.log(this.allChannel);
      }
    },
    // 新增频道（形参 item 就是当前用户点击的频道信息对象）
    // 格式：{ id, name }
    addChannel(item) {
      // 将用户点击的频道，添加到“用户频道”列表中
      this.userChannel.push(item);

      // TODO：调用 API 接口，将最新的用户频道，存储到后台数据库中
      // 调用 updateChannel 方法，把最新的频道列表数据提交到后端保存
      this.updateChannel();
    },
    // 把用户的频道列表数据提交到后端保存
    async updateChannel(item) {
      // 1. 准备要提交到服务器的数据
      const channels = this.userChannel
        .filter((item) => item.name !== "推荐") // 将“推荐”从频道列表中过滤出去
        .map((item, index) => {
          // 调用数组的 map 循环，最终返回一个处理好的新数组
          return {
            id: item.id,
            seq: index + 1,
          };
        });

      // 2. 调用 API 接口
      const { data: res } = await updateUserChannelAPI(channels);
      if (res.code === 200) {
        // TODO：提示用户更新成功
        // 3. 通过 notify 弹框提示用户更新成功
        this.$notify({ type: "success", message: "更新成功", duration: 1000 });
      }
    },
    // 从用户频道列表中，移除指定 id 的频道
    onUserChannelClick(channel, index) {
      if (this.isDel) {
        // 处于删除状态

        if (channel.name === "推荐" || this.userChannel.length === 2) return;
        // 进行数组的过滤
        this.userChannel = this.userChannel.filter(
          (item) => item.id !== channel.id
        );
        // 将更改过后的用户频道数据，提交到服务器保存
        this.updateChannel();
      } else {
        // 不处于删除状态

        // 1. 修改 Tabs 的激活项的索引值
        this.active = index;
        // 2. 关闭 popup 弹出层
        this.show = false;
      }
    },
    // 从用户频道列表中，移除指定 id 的频道
    // 从用户频道列表中，移除指定 id 的频道
    removeChannel(channel) {
      if (this.isDel) {
        // 处于删除状态
        // 判断用户点击的是否为“推荐” 或 仅剩下两个频道
        if (channel.name === "推荐" || this.userChannel.length === 2) return;

        // 移除频道
        this.userChannel = this.userChannel.filter(
          (item) => item.id !== channel.id
        );
        this.updateChannel();
      } else {
        // 不处于删除状态
      }
    },
    // tabs 发生切换之前，触发此方法
beforeTabsChange() {
  // 把当前"频道名称"对应的"滚动条位置"记录到 nameToTop 对象中
  const name = this.channels[this.active].name
  nameToTop[name] = window.scrollY

  // return true 表示允许进行标签页的切换
  return true
},
// 当 tabs 切换完毕之后，触发此方法
onTabsChange() {
  // 等 DOM 更新完毕之后，根据记录的"滚动条位置"，调用 window.scrollTo() 方法进行滚动
  this.$nextTick(() => {
    const name = this.channels[this.active].name
    window.scrollTo(0, nameToTop[name] || 0)
  })
}
  },
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

// 以下是管道弹出层的样式
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}
</style>