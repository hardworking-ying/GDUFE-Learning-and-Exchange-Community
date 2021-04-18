<template>
  <div>
    <el-row>
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
      >
        {{ "激活成功，" + num + "秒内将跳转到登录页面" }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { registerConfirm } from "@/network/register";
import { LinkTo } from "@/assets/util";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      num: 5
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.userId = this.$route.params;
  },
  mounted() {
    const { userId, code } = this.$route.params;
    const _this = this;
    registerConfirm(userId, code)
      .then(res => {
        console.log("向服务端发送确认信息！", res);
        if(res.code=="200") {
          const interval = setInterval(() => {
            if (_this.num >= 1) {
              _this.num -= 1;
            }
          }, 1000);
          const t = setTimeout(()=>{
            window.clearInterval(interval);
            LinkTo("/login", "replace");
          },6000)
        }else {
          _this.$message.error(res.msg);
          const t = setTimeout(()=>{
            window.clearTimeout(t);
            LinkTo("/index", "replace");
          },2000)
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped></style>
