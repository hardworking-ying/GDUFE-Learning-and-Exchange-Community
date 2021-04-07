<template>
  <div class="post">
    <div class="postman">
      <div class="postman-avatar" @click="clickUserAvatar">
        <el-tooltip
          class="item"
          effect="dark"
          :content="post.user.username"
          placement="right"
        >
          <el-button><img :src="post.user.headerUrl" alt="" /></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="post-body" @click="clickPost">
      <div class="post-title">{{ post.post.title }}</div>
      <div class="post-tag-date clearfix">
        <div class="post-tag">{{ post.post.tag }}</div>
        <div class="post-date">{{ post.post.createTime }}</div>
      </div>
      <div class="post-content">{{ post.post.content }}</div>
    </div>
    <div class="post-data" @click="clickPost">
      <div class="post-comment-num">
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        {{ post.post.commentCount }}
      </div>
      <div class="like-num">
        <i class="fa fa-heart-o" aria-hidden="true"></i> {{ post.post.likeCount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    clickUserAvatar() {
      this.$bus.$emit("toHisPage", this.post.user.id);
    },
    clickPost() {
      this.$bus.$emit("toPostDetail", this.post.post.id);
    },
  },
};
</script>

<style lang="less">
.post {
  width: 100%;
  padding: 16px;
  display: flex;
  transition: all 0.2s;
  &:hover {
    background-color: rgb(247, 247, 247);
    border-radius: 16px;
    box-shadow: 0 0 10px -2px rgb(218, 215, 215);
  }
  .postman {
    .postman-avatar {
      width: 36px;
      height: 36px;
      .el-button {
        padding: 0;
        border: none;
        img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }
      }
    }
  }
  .post-body {
    margin: 0 20px 0 10px;
    flex: 1;
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
      // &::after {
      //   content: "...";
      //   position: absolute;
      //   bottom: 0;
      //   right: 0;
      //   padding-left: 40px;
      //   background: -webkit-linear-gradient(left, transparent, #fff 55%);
      //   background: -o-linear-gradient(right, transparent, #fff 55%);
      //   background: -moz-linear-gradient(right, transparent, #fff 55%);
      //   background: linear-gradient(to right, transparent, #fff 55%);
      // }
    }
  }
  .post-data {
    cursor: pointer;
    .post-comment-num,
    .post-like-num {
      line-height: 2;
    }
  }
}
</style>