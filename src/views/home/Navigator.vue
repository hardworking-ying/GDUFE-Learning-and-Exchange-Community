<template>
  <div class="navigator">
    <div class="release-box">
      <el-button type="primary" :style={backgroundColor:bgColor,borderColor:bgColor}
        @click="clickSendPost">发布主题</el-button>
    </div>
    <ul class="nav-list">
      <li :class="{active: currentTag=='all'}" @click="changeTag('all')">
        <i class="fa fa-comments-o tag-all-icon" aria-hidden="true"></i> 全部主题</li>
      <li v-for="(item, index) in Object.keys(tagList)" :key="index" :title="tagList[item].desc"
        :class="{active: currentTag==item}" @click="changeTag(item)">
        <i :class="tagList[item].icon" aria-hidden="true" :style={color:tagList[item].bgcolor}></i> {{tagList[item].title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  props: {},
  data() {
    return {
      
    }
  },
  computed: {
    currentTag() {
      return this.$store.state.tag;
    },
    tagList() {
      return this.$store.state.tagList;
    },
    bgColor() {
      if(this.$store.state.tag=="all") return "teal";
      else return this.$store.getters.getBgColor;
    }
  },
  methods: {
    changeTag(newTag) {
      if(this.currentTag==newTag) return;
      this.$store.commit("changeTag", {newTag})
    },
    clickSendPost() {
      this.$emit("sendPost");
    },
  }
};
</script>

<style lang="less">
.navigator {
  .release-box {
    margin-bottom: 20px;
    .el-button {
      transition: all .2s;
    }
    .el-button:hover {
      opacity: .8;
    }
  }
  .nav-list {
    li {
      line-height: 2.5;
      &:hover {
        color: @primary;
        cursor: pointer;
      }
      i {
        font-weight: bold;
        margin-right: 4px;
      }
      .tag-all-icon {
        color: @primary;
      }
    }
    .active {
      color: @primary;
    }
  }
}
</style>