<template>
  <CommonForm>
    <template v-slot:header>
      登录
    </template>
    <template v-slot:body>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="checkCode">
            <el-input
              size="large"
              class="ccode_input"
              v-model="loginForm.checkCode"
              placeholder="验证码"
            ></el-input>
            <div class="ccode_image">
              <img :src="kaptcha + '1'" alt="" @click="refreshKaptcha" />
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox
            v-model="loginForm.remember"
            >记住我的登陆状态</el-checkbox
          >
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:submit>
      <el-button type="primary" @click="login">登录</el-button>
    </template>
    <template v-slot:footer>
      <div><a href="">忘记密码</a></div>
      <div>还没有账户？<router-link to="/register">立即注册</router-link></div>
    </template>
  </CommonForm>
</template>

<script>
import CommonForm from "components/CommonForm"
import { loginCheck } from "network/login"
// import { setLoginCookie } from "@/plugins/vue-cookies"
export default {
  name: "Login",
  components: {
    CommonForm,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
        checkCode: "",
        remember: true,
      },
      kaptcha: "",
      rules: {
        email: [{
          required: true,
          message: "请输入邮箱",
          trigger: "blur"
        }, {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: "blur"
        }],
        password: [{
          required: "true",
          message: "请输入密码",
          trigger: "blur"
        }],
        checkCode: [{
          required: "true",
          message: "请输入验证码",
          trigger: "blur"
        }]
      }
    };
  },
  props: {},
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if(!valid) return false;
        loginCheck(this.loginForm).then(res => {
          if (res.code == "200") {
            this.$message.success("登录成功，即将跳转到首页");
            setTimeout(() => {
              // LGSC将store中的isLogin切换为true表示已登录
              // 延时跳转
              this.$store.commit("onLogin");
              this.$store.dispatch("initLogin", { userId: res.msg });
              // // 将登录id保存到cookie中，设置过期时间为1d，后续可以在plugin/vue-cookies中修改
              // setLoginCookie(res.msg);
              // this.LinkTo("/home", "replace");
              this.$router.replace("/home");
            }, 2000);
          } else if (res.code == "2006") {
            // 刷新化验证码
            this.refreshKaptcha();
            this.$message({
              message: res.msg + " 请重新输入!",
              type: "error",
            });
          } else if (res.code == "2007") {
            // 刷新化验证码
            this.refreshKaptcha();
            this.$message({
              message: res.passwordMsg || res.usernameMsg,
              type: "error",
            });
          } else if(res.code == "500") {
            console.log("500");
            this.refreshKaptcha();
            this.$message({
              message: res.msg + " 服务器异常！请稍后再试！",
              type: "error",
            });
          }
        }, error => {
          
        })
      })
      console.log("点击了登录", this.loginForm);
    },
    // 刷新验证码
    refreshKaptcha() {
      this.kaptcha = this.$store.state.baseURL + "/kaptcha?p=" + Math.random();
    },
  },
  created() {
    this.refreshKaptcha();
    console.log("Login");
  },    
};
</script>

<style lang="less">
.checkCode {
  display: flex;
  .ccode_input {
    flex: 1;
  }
  .ccode_image {
    flex: 1;
    img {
      float: right;
      cursor: pointer;
    }
  }
}

</style>