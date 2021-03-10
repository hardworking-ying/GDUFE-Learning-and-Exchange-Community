<template>
  <div class="post-detail">
    <el-row class="detail-header">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="tag-box">
          <div class="tag">公告</div>
        </div>
        <div class="detail-title">宝塔 Linux 面板安装 Flarum</div>
      </el-col>
    </el-row>
    <el-row class="detail-body">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <nav class="detail-nav">
          <ul>
            <li>登陆以回复</li>
          </ul>
        </nav>
        <PostItem class="detail-content"
          :post="post.post"
          :user="post.user"
          :likeStatus="post.likeStatus"
          :likeCount="post.likeCount"
          :commentCount="post.post.commentCount">
          <template v-slot:authorFlag>
            <div class="author-flag">
              楼主
            </div>
          </template>
        </PostItem>
        <PostItem v-for="(item, index) in post.comments" :key="index"
         class="detail-content"
         :post="item.comment"
         :likeCount="item.likeCount"
         :likeStatus="item.likeStatus"
         :user="item.user"
         :commentCount="item.replyCount">
        </PostItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostItem from "./PostItem"
import { getDetailPost } from "network/detail"

export default {
  name: "PostDetail",
  components: {
    PostItem,
  },
  data() {
    return {
      post: {
        post: {},
        user: {},
        likeStatus: 0,
        likeCount: 0,
        comments: []
      },
    };
  },
  created() {
    this.getPostData();
  },
  methods: {
    getPostData() {
      getDetailPost(this.$route.params.postId).then(res => {
        console.log(res);
        this.post = res;
      })
    }
  }
};
</script>

<style lang="less">
.post-detail {
  .detail-header {
    padding: 20px @global-padding;
    background-color: @primary;
    .tag-box {
      .tag {
        display: inline-block;
        padding: .2em .5em;
        background-color: #fff;
        border-radius: 4px;
      }
    }
    .detail-title {
      color: #FFF;
      font-size: 22px;
      margin-top: 20px;
    }
  }
  .detail-body {
    padding: 0 @global-padding;
    margin-top: 20px;
    .author-flag {
      height: 24px;
      line-height: 24px;
      padding: 0 6px;
      background-color: @primary;
      color: #fff;
      border-radius: 2px;
    }
    .detail-nav {
      float: right;
      // ul {
      //   width: 150px;
      //   position: fixed;
      //   margin-top: 30px;
      // }
    }
    .detail-content {
      margin-right: 225px;
    }
  }
}
</style>