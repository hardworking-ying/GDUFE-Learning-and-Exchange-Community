<template>
  <div class="reply">
    <div class="reply-title">
      {{ subject }} 回复了
      <router-link :to="'/detail/' + reply.targetId"
        >{{ reply.targetUsername }}的{{ reply.targetTypeName }}</router-link
      >
    </div>
    <div class="reply-content">
      回复 @ {{ reply.targetUsername }}: {{ reply.replyContent }}
    </div>
    <div class="target-content">
      {{ reply.targetUsername }}: {{ reply.originalContent }}
    </div>
    <div class="reply-time"> {{ reply.createTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Reply",
  props: {
    reply: {
      type: Object,
      default() {
        return {
          id: -1,
          userId: -1,
          username: "",
          targetId: -1,
          targetUserId: -1,
          targetUsername: "",
          targetType: 1,
          targetTypeName: "评论",
          replyContent: "",
          originalContent: "",
          createTime: ""
        }
      }
    },
    subject: {
      type: String,
      default: ""
    }
  },
};
</script>

<style lang="less" scoped>
.reply {
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
  > div {
    margin-bottom: 10px;
  }
  > .reply-title {
    font-size: 16px;
  }
  > .target-content {
    padding: 8px;
    background-color: #eee;
    border-left: 2px solid #aaa;
  }
}
</style>