<template>
  <div class="post-detail">
    <el-row class="detail-header">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="tag-box">
          <div class="tag" :style="{color:color}"><i :class="icon"></i> {{ tag }}</div>
        </div>
        <div class="detail-title">{{ post.post.title }}</div>
      </el-col>
    </el-row>
    <el-row class="detail-body">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <nav class="detail-nav">
          <ul>
            <el-button type="primary" @click.native="clickReply">回复</el-button>
          </ul>
        </nav>
        <div class="detail-content">
          <PostItem
            :post="post.post"
            :user="post.user"
            :likeStatus="post.likeStatus"
            :likeCount="post.likeCount"
            :commentCount="post.post.commentCount"
            :comments="post.comments"
          >
            <template v-slot:authorFlag>
              <div class="author-flag">楼主</div>
            </template>
          </PostItem>
        </div>
      </el-col>
    </el-row>
    <transition>
      <Editor :isPost="true" v-show="showEditor" @closeEditor="hideEditor" @releasePost="releasePost"/>
    </transition>
  </div>
</template>

<script>
import PostItem from "./PostItem";
import Editor from "components/Editor"
import { getDetailPost } from "network/detail";

export default {
  name: "PostDetail",
  components: {
    PostItem,
    Editor
  },
  data() {
    return {
      post: {
        post: {},
        user: {},
        likeStatus: 0,
        likeCount: 0,
        comments: [],
      },
    };
  },
  computed: {
    tag() {
      return this.$store.state.tagList[this.post.post.tag].title;
    },
    icon() {
      return this.$store.state.tagList[this.post.post.tag].icon;
    },
    color() {
      return this.$store.state.tagList[this.post.post.tag].bgcolor;
    }
  },
  methods: {
    getPostData() {
      getDetailPost(this.$route.params.postId).then((res) => {
        console.log(res);
        this.post = res;
      });
    },
    clickReply() {
      console.log("点击了回复");
    }
  },
  created() {
    // this.getPostData();
    this.post = {
      post: {
        tag: "bulletin",
        title: "广财学习交流社区",
        content:
          "<p><strong style='color: rgb(255, 153, 0);' class='ql-size-large'>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</strong></p>",
        createTime: "2020-12-11 14:00",
        commentCount: 2
      },
      user: {
        username: "八号楼时间",
        headerUrl: "https://th.bing.com/th/id/Rb572cf0dcff93fe13b71af8ab43fd454?rik=g5YdMgIO9siDaA&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20191006%2f20%2f1570365161-shmEFlWfHU.jpg&ehk=u5A16U5IZ7u6Wi3KtC7OBarR5lf1nOd8UfJP0USvLXg%3d&risl=&pid=ImgRaw",
      },
      likeCount: 126,
      likeStatus: 1,
      comments: [{
        comment: {
          content: "<h2><sup style='color: rgb(161, 0, 0);'><strong><em><u>哈西米露压抑了<span class='ql-cursor'>﻿</span></u></em></strong></sup></h2>",
          createTime: "2021-01-30 12:00:08"
        },
        likeCount: 0,
        likeStatus: 0,
        replyCount: 0,
        user: {
          username: "忍者五毒",
          headerUrl: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA2cXfN?f=PNG&h=60&w=60&m=6&q=60&o=t&l=f",
          createTime: "2020-11-28",
        }
      }
        
      ]
    };
  },
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
        padding: 0.2em 0.5em;
        background-color: #fff;
        border-radius: 4px;
      }
    }
    .detail-title {
      color: #fff;
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