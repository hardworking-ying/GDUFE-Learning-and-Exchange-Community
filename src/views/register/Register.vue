<template>
  <CommonForm>
    <template v-slot:header> 注册 </template>
    <template v-slot:body>
      <el-form :model="registerForm">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox
            v-model="registerForm.agree"
            :true-label="1"
            :false-label="0"
            >我已阅读并同意<a href="#">隐私政策</a></el-checkbox
          >
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:submit>
      <el-button type="primary" @click="register">注册</el-button>
    </template>
    <template v-slot:footer>
      <p>已有账号？<router-link to="/login">立即登录</router-link></p>
    </template>
  </CommonForm>
</template>

<script>
import CommonForm from "components/CommonForm";
export default {
  name: "register",
  components: {
    CommonForm,
  },
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        agree: 0,
      },
    };
  },
  props: {},
  methods: {
    register() {
      console.log("点击了注册", this.registerForm);
    },
  },
  created() {
    console.log("register");
  },
};
</script>

<style lang="less">
.register {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px 2px #eee;
  border-radius: 16px;
  .register-header {
    position: relative;
    text-align: center;
    padding: 25px;
    font-size: 20px;
    border-radius: 16px 16px 0 0;
  }
  .register-body {
    background-color: #ededed;
    padding: 25px 30px;
    color: #808080;
    .register-btn {
      .el-button {
        width: 100%;
      }
    }
  }
  .register-footer {
    padding: 20px;
    color: #808080;
    text-align: center;
    background-color: #fff;
    border-radius: 0 0 16px 16px;
    p {
      margin-bottom: 10px;
    }
  }
}
</style>