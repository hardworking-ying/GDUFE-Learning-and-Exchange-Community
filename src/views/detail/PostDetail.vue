<template>
  <div class="post-detail">
    <el-row class="detail-header">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="tag-box">
          <div class="tag">{{ post.post.tag }}</div>
        </div>
        <div class="detail-title">{{ post.post.title }}</div>
      </el-col>
    </el-row>
    <el-row class="detail-body">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <nav class="detail-nav">
          <ul>
            <li>
              <el-button type="primary" @click.native="clickReply"
                >回复</el-button
              >
            </li>
            <li>
              <el-button type="primary" @click.native="clickSetTop"
                >置顶</el-button
              >
            </li>
            <li>
              <el-button type="primary" @click.native="clickSetGood"
                >加精</el-button
              >
            </li>
            <li>
              <el-button type="primary" @click.native="clickDelete"
                >删除</el-button
              >
            </li>
          </ul>
        </nav>
        <div class="detail-content">
          <PostItem
            :post="post.post"
            :user="post.user"
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
      <Editor
        :isPost="false"
        v-show="showEditor"
        @closeEditor="hideEditor"
        @releasePost="releasePost"
      />
    </transition>
    <el-backtop target=".main .post-detail" :bottom="50" :right="215"></el-backtop>
  </div>
</template>

<script>
import PostItem from "./PostItem";
import Editor from "components/Editor";
import { getPostDetail } from "network/detail";

export default {
  name: "PostDetail",
  components: {
    PostItem,
    Editor,
  },
  data() {
    return {
      postId: -1,
      post: {
        post: {},
        user: {},
        comments: [],
      },
      showEditor: false,
    };
  },
  computed: {
  },
  methods: {
    getPostData() {
      const _this = this;
      getPostDetail(this.postId).then((res) => {
        if (res.code === 200) {
          _this.post = res.data;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    clickReply() {
      this.showEditor = true;
      console.log("点击了回复");
    },
    clickSetTop() {
      console.log("置顶");
    },
    clickSetGood() {
      console.log("加精");
    },
    clickDelete() {
      console.log("删除");
    },
    hideEditor() {
      this.showEditor = false;
    },
    releasePost() {
      console.log("fabu");
    },
  },
  created() {
    this.postId = this.$route.params.postId;
    this.getPostData();
  },
};
</script>

<style lang="less" scoped>
.post-detail {
  height: 100%;
  overflow-y: scroll;
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
      > ul {
        position: fixed;
        top: 200px;
        right: 200px;
        > li {
          margin-bottom: 20px;
        }
      }
    }
    .detail-content {
      margin-right: 225px;
    }
  }
}
</style>