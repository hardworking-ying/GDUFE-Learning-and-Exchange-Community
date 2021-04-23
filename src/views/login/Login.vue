<template>
  <CommonForm>
    <template v-slot:header> 登录 </template>
    <template v-slot:body>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            show-password
          ></el-input>
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
        <el-form-item>
          <el-checkbox v-model="remember" true-label="true" false-label="false">记住密码</el-checkbox>
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
import CommonForm from "components/CommonForm";
import { loginCheck, getKaptcha } from "network/login";
import { registerConfirm } from "network/register";
import { getUserInfo } from "network/store.js" ;
import CryptoJS from "crypto-js";

const SECRET = "GDUFESECRETKEY520100";
export default {
  name: "Login",
  components: {
    CommonForm,
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        checkCode: "",
      },
      remember: "false",
      kaptcha: "",
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: "true",
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        checkCode: [
          {
            required: "true",
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {},
  methods: {
    login() {
      const _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return false;
        loginCheck(this.loginForm).then(
          (res) => {
            if (res.code == "200") {
              if (this.remember==="true") {
                _this.setAccountCookie();
              }else {
                _this.clearAccountCookie();
              };
              _this.$store.commit("onLogin");
              console.log(res);
              getUserInfo(res.data.userId).then(result => {
                console.log(result.data.user);
                if(result.code===200) {
                  _this.$store.commit("initUser", { user: result.data.user });
                }else {
                  _this.$message.error(result.msg);
                }
              });
              setTimeout(() => {
                _this.$router.replace("/home");
              }, 500);
            } else if (res.code == "2010") {
              // 刷新化验证码
              _this.refreshKaptcha();
              _this.$message({
                message: res.msg + " 请重新输入!",
                type: "error",
              });
            } else if (res.code == "2011") {
              // 刷新化验证码
              _this.refreshKaptcha();
              _this.$message({
                message: res.passwordMsg || res.usernameMsg,
                type: "error",
              });
            } else if (res.code == "500") {
              _this.refreshKaptcha();
              _this.$message({
                message: res.msg + " 服务器异常！请稍后再试！",
                type: "error",
              });
            } else {
              _this.$message.error(res.msg);
            }
          },
          (error) => {}
        );
      });
      console.log("点击了登录", this.loginForm);
    },
    // 刷新验证码
    refreshKaptcha() {
      // this.$store.state.baseURL + 
      this.kaptcha = this.$store.state.baseURL + "/community/kaptcha?p=" + Math.random();
      //console.log("hh",this.kaptcha)
    },
    // 将密码信息保存至cookie
    setAccountCookie() {
      let secretName = CryptoJS.AES.encrypt(
        this.loginForm.username,
        SECRET
      ).toString();
      this.$cookies.set("username", secretName);
      let secretPwd = CryptoJS.AES.encrypt(
        this.loginForm.password,
        SECRET
      ).toString();
      this.$cookies.set("password", secretPwd);
      this.$cookies.set("remember", this.remember);
    },
    // 从cookie中获取账号信息
    getAccountCookie() {
      let name = this.$cookies.get("username");
      if(name) {
        let nameByte = CryptoJS.AES.decrypt(name, SECRET);
        this.loginForm.username = nameByte.toString(CryptoJS.enc.Utf8);
      }
      let pwd = this.$cookies.get("password");
      if(pwd) {
        let pwdByte = CryptoJS.AES.decrypt(pwd, SECRET);
        this.loginForm.password = pwdByte.toString(CryptoJS.enc.Utf8);
      }
      this.remember = this.$cookies.get("remember");
    },
    // 清楚cookie账号信息
    clearAccountCookie() {
      this.$cookies.remove("username");
      this.$cookies.remove("password");
      this.$cookies.remove("remember");
    },
    //
    getKaptcha() {
      getKaptcha().then(res => {
        console.log("kaptcha", res);
      })
    },
  },
  created() {
    const _this = this;
    const params = this.$route.params;
    if(params.userId && params.code) {
      registerConfirm(params.userId, params.code).then(res => {
        if(res.code === 200) {
          _this.$message.success(res.msg);
        }else {
          _this.$message.error(res.msg);
        }
      })
    };
    console.log('params', params);
    this.getAccountCookie();
    this.refreshKaptcha();
    this.getKaptcha();
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