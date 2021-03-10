<template>
  <el-row class="welcome" :style="{backgroundColor: $store.getters.getBgColor}">
    <el-col :md="{ span: 24, offset: 0 }" :lg="{ span: 18, offset: 3 }">
      <template v-if="tag === 'all'">
        <div class="welcome-words">欢迎来到 GDUFE 学习交流社区</div>
        <p>社区由众多爱好者共同维护</p>
        <p>QQ群：<span>1234567890</span> 进群密码：<span>888</span></p>
      </template>
      <template v-else>
        <TagBanner :tag="tag"></TagBanner>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import TagBanner from "./TagBanner";
export default {
  name: "Welcome",
  props: {},
  components: {
    TagBanner,
  },
  data() {
    return {
    
    }
  },
  computed: {
    tag() {
      return this.$store.state.tag;
    },
    
  },
  created() {},
};
</script>

<style lang="less">
.welcome {
  color: #808080;
  padding-bottom: 16px;
  border-bottom: 4px solid @primary;
  text-align: center;
  transition: all .2s;
  .welcome-words {
    font-size: 20px;
    line-height: 50px;
  }
  p {
    line-height: 2;
    span {
      color: @primary;
    }
  }
}
</style>