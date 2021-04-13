<template>
  <div class="thumb-up">
    <div class="thumb-title">
      <router-link :to="'/profile/' + thumb.userId"><span class="thumber-name">{{ subject }} </span></router-link
      >点赞了 <router-link :to="'/detail/'+thumb.targetId">{{ thumb.targetUsername }}的{{ thumb.thumbTypeName }}</router-link>
    </div>
    <div class="thumb-content">{{ thumb.targetUsername }}: {{ thumb.thumbContent }}</div>
  </div>
</template>

<script>
export default {
  name: "ThumbUp",
  props: {
    thumb: {
      type: Object,
      default() {
        return {
          userId: -1,
          username: "",
          thumbType: 0,
          thumbTypeName: "帖子",
          thumbContent: "dfgsdfg",
          targetId: -1,
          targetUserId: -1,
          targetUsername: "招募",
        };
      },
    },
    subject: {
      type: String,
      default: ""
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.thumb-up {
  position: relative;
  padding: 16px;
  border: 1px solid rgb(204, 203, 203);
  border-radius: 8px;
  margin-bottom: 18px;
  transition: all 0.3s;
  &:hover {
    border: 1px solid teal;
    box-shadow: 0 0 8px 2px #ccc;
  }
  > .thumb-title {
    font-size: 16px;
    margin-bottom: 10px;
    .thumber-name {
      &:hover {
        font-weight: bold;
      }
    }
  }
  > .thumb-content {
    padding: 8px;
    background-color: #eee;
    border-left: 2px solid #aaa;
  }
}
</style>