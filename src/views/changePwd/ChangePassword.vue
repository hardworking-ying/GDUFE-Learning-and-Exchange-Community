<template>
  <CommonForm>
    <template v-slot:header> 修改密码 </template>
    <template v-slot:body>
      <el-form :model="modifyForm" :rules="rules" ref="modifyForm">
        <el-form-item prop="oldPassword">
          <el-input
            v-model="modifyForm.oldPassword"
            placeholder="旧密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="modifyForm.newPassword"
            placeholder="新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordConfirm">
          <el-input
            v-model="modifyForm.newPasswordConfirm"
            placeholder="确认新密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:submit>
      <el-button type="primary" @click="modifyPwd">修改密码</el-button>
    </template>
  </CommonForm>
</template>

<script>
import CommonForm from "components/CommonForm";
import { changePassword } from "network/profile";
import { logoutMixin } from "@/common/mixin"

export default {
  name: "ChangePassword",
  components: {
    CommonForm,
  },
  data() {
    var checkOldPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入旧密码"));
      }
      callback();
    };
    var checkNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.modifyForm.newPasswordConfirm !== "") {
          this.$refs.modifyForm.validateField("newPasswordConfirm");
        }
        callback();
      }
    };
    var checkNewPwdConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.modifyForm.newPassword) {
        callback(new Error("两次输入的新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      modifyForm: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      rules: {
        oldPassword: [{ validator: checkOldPwd, trigger: "blur" }],
        newPassword: [{ validator: checkNewPwd, trigger: "blur" }],
        newPasswordConfirm: [
          { validator: checkNewPwdConfirm, trigger: "blur" },
        ],
      },
    };
  },
  props: {},
  methods: {
    modifyPwd() {
      const _this = this;
      this.$refs.modifyForm.validate((valid) => { 
        console.log("点击了修改密码", this.modifyForm);
        if (!valid) 
        {
          console.log("!valiud");
          return false; 
        }
        changePassword(this.modifyForm).then(
          (res) => {
            if (res.code === 200) {
              _this.logout();
              _this.$message.success("修改成功！请重新登录！");
              setTimeout(() => {
                _this.$router.replace("/login");
              }, 1000);
            } else {
              _this.$message({
                message: res.msg,
                type: "error",
              });
            }
          },
          (error) => {}
        );
      });
     
    },
  },
  created() {},
  mixins: [logoutMixin]
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