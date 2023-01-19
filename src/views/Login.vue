<template>
  <div class="login-container">
    <!-- NavBar 组件：只需提供 title 标题 -->
    <van-nav-bar title="黑马头条 - 登录" fixed />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.mobile"
        type="tel"
        name="用户的手机号"
        label="用户的手机号"
        placeholder="用户的手机号"
        :rules="[{ required: true, message: '请填写用户的手机号' }]"
      />
      <van-field
        v-model="form.code"
        type="password"
        name="登录的密码"
        label="登录的密码"
        placeholder="登录的密码"
        :rules="[{ required: true, message: '请填写登录的密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin } from "@/api/index";

export default {
  name: "login",
  data() {
    return {
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        // 用户的手机号
        mobile: "",
        // 登录的密码
        code: "",
      },
    };
  },
  methods: {
    async onSubmit(values) {
      // console.log("submit", values);
      // 注意:这个values是一个对象,里面收集了用户名和密码.{用户的手机号: 'admin', 登录的密码: '666666'}
      // 调用接口发请求, 把用户的信息发给服务器

      // 只有当表单数据校验通过之后，才会调用此 login 函数
      // const res = await reqLogin();
      // // 当数据请求成功之后，res.data 中存储的就是服务器响应回来的数据
      // console.log(res);
      const { data: res } = await reqLogin(this.form);
      const { data } = res;
      // console.log(res);
      const result = data[0].data;
      // console.log(result);
      // // 判断是否登录成功了
      if (res.code === 200) {
        // TODO1：把登录成功的结果，存储到 vuex 中
        // console.log(this.$store);
        this.$store.commit('setToken',result.token)
        // TODO2：登录成功后，跳转到主页
        // console.log(this.$router);
        // this.$router.push('/home')
          // 2. 要跳转到首页  跳转到上次访问未遂的路由地址
    const navPath = this.$route.query.pre || '/'
    this.$router.replace(navPath)
      }
    },
  },
};
</script>

<style  lang='less' scoped>
.login-container {
  padding-top: 46px;
}
</style>