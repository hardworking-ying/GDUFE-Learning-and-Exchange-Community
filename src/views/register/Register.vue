<template>
  <CommonForm>
    <template v-slot:header> 注册 </template>
    <template v-slot:body>
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            placeholder="确认密码"
            type="password"
          ></el-input>
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
import { sendRegister } from "network/register";
import { LinkTo } from "@/assets/util";
export default {
  name: "register",
  components: {
    CommonForm,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空!"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空!"));
      } else {
        const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!regEmail.test(value)) {
          return callback(new Error("邮箱格式不正确！"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          {
            validator: validateUsername,
          },
        ],
        email: [
          {
            validator: validateEmail,
          },
        ],
        password: [
          {
            validator: validatePass,
          },
        ],
        confirmPassword: [
          {
            validator: validateConfirmPass,
          },
          {},
        ],
      },
    };
  },
  props: {},
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (!valid) return false;
        let { username, email, password, confirmPwd } = this.registerForm;
        sendRegister(username, password, email).then((res) => {
          if (res.code == "200") {
            this.$message.success("注册成功！点击邮件中的链接激活账号即可登录！");
            LinkTo("/login", "replace");
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
  },
  created() {

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