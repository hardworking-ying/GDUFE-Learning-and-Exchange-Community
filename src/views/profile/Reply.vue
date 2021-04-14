<template>
  <div class="reply">
    <div class="reply-title">
      {{ subject }} 回复了
      <router-link :to="'/detail/' + item.post.id"
        > 帖子:{{ item.post.title }} {{ item.comment.entityType===1? "":"的评论" }}</router-link
      >
    </div>
    <div class="reply-content">
      回复: {{ item.comment.content }}
    </div>
    <div class="reply-time"> {{ item.comment.createTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Reply",
  props: {
    item: {
      type: Object,
      default() {
        return {
          comment: {},
          post: {}
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
  > .reply-content {
    padding: 8px;
    background-color: #eee;
    border-left: 2px solid #aaa;
  }
}
</style>