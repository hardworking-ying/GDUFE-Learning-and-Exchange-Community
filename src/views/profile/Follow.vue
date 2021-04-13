<template>
  <div class="info">
    <div class="avatar"><img :src="info.headerUrl" alt="" /></div>
    <div class="name" title="">
      {{ info.username }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Follow",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less">
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 120px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  .avatar {
    > img {
      width: 80px;
      height: 80px;
      border-radius: 20%;
    }
  }
  .name {
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>