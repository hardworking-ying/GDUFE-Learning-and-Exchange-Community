<template>
  <div class="replyPost">
    <div class="post-body" @click="toDetail(item.post.id)">
      <div class="post-title">{{ item.post.title }}</div>
      <div class="post-tag-date clearfix">
        <div class="post-tag">{{ item.post.tag }}</div>
        <div class="post-date">{{ item.post.createTime }}</div>
      </div>
      <div class="post-content" v-html="item.post.content "></div>
    </div>
    <div class="like-count">
      <i class="fa fa-heart-o"></i>{{ item.likeCount }}
    </div>
  </div>
</template>

<script>
import { LinkTo } from "assets/util";
export default {
  name: "PostAboutMe",
  props: {
    item: {
      type: Object,
      default() {
        return {
          post: {},
          likeCount: 0,
        };
      },
    },
  },
  methods: {
    LinkTo,
    toDetail(id) {
      this.LinkTo("/detail/"+id, "push");
    },
  },
};
</script>

<style lang="less" scoped>
.replyPost {
  position: relative;
  padding: 16px;
  border: 1px solid rgb(204, 203, 203);
  border-radius: 8px;
  margin-bottom: 18px;
  transition: all .3s;
  cursor: pointer;
  &:hover {
    border: 1px solid teal;
    box-shadow: 0 0 8px 2px #ccc;
  }
  > .post-body {
    margin: 0 20px 0 10px;
    cursor: pointer;
    .post-title {
      font-size: 16px;
    }
    .post-tag-date {
      font-size: 12px;
      padding: 6px 0;
      .post-tag {
        float: left;
        color: @primary;
        // line-height: 30px;
        padding: 0.1em 0.5em;
        background-color: #eeeeee;
        border-radius: 4px;
        margin-right: 10px;
      }
      .post-date {
        float: left;
        height: 20px;
        line-height: 20px;
      }
    }
    .post-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .post-content {
      position: relative;
      line-height: 20px;
      line-height: 20px;
      max-height: 60px;
      overflow: hidden;
    }
  }
  .like-count {
    position: absolute;
    right: 20px;
    bottom: 10px;
    &:hover {
      color: @primary;
    }
  }
}
</style>