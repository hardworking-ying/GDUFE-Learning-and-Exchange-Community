<template>
  <div class="tag-banner">
    <div class="tag-title">
      <i :class="targetTag.icon"></i>
      {{ targetTag.title }}
    </div>
    <div class="tag-desc">{{ targetTag.desc }}</div>
  </div>
</template>

<script>
export default {
  name: "TagBanner",
  props: {
    tag: {
      type: String,
      default: "bulletin",
    },
  },
  data() {
    return {};
  },
  computed: {
    targetTag() {
      return this.$store.state.tagList[this.tag];
    },
  },
};
</script>

<style lang="less">
.tag-banner {
  color: #FFF;
  .tag-title {
    font-size: 20px;
    line-height: 50px;
  }
  .tag-desc {
    line-height: 2;
  }
}
</style>