<template>
  <div class="post-detail">
    <el-row class="detail-header">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="tag-box">
          <div class="tag">{{ post.tagsName }}</div>
          <div class="tag tag-top" v-if="post.post.type === 1">置顶</div>
          <div class="tag tag-good" v-if="post.post.status === 1">精华</div>
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
            <template v-if="$store.state.user.type === 1">
              <li>
                <el-button
                  v-if="post.post.type === 0"
                  type="primary"
                  @click.native="clickSetTop"
                  >置顶</el-button
                >
                <el-button v-else type="primary" @click.native="clickUnSetTop"
                  >取消置顶</el-button
                >
              </li>
              <li>
                <el-button
                  v-if="post.post.status === 0"
                  type="primary"
                  @click.native="clickSetGood"
                  >加精</el-button
                >
                <el-button v-else type="primary" @click.native="clickUnSetGood"
                  >取消加精</el-button
                >
              </li>
              <!-- <li>
                <el-button type="primary" @click.native="clickDeleteByAdmin"
                  >删除</el-button
                >
              </li> -->
            </template>
            <template v-if="$store.state.user.id === post.user.id">
              <li>
                <el-button type="primary" @click.native="clickEdit"
                  >编辑</el-button
                >
              </li>
              <li>
                <el-button type="primary" @click.native="clickDeleteHimself"
                  >删除</el-button
                >
              </li>
            </template>
          </ul>
        </nav>
        <div class="detail-content">
          <PostItem
            :post="post.post"
            :user="post.user"
            :comments="post.comments"
            :replyCount="post.post.commentCount"
            :likeCount="post.likeCount"
            :likeStatus="post.likeStatus"
            :type="1"
          >
            <template v-slot:authorFlag>
              <div class="author-flag">楼主</div>
            </template>
          </PostItem>
          <el-pagination
            ref="pagination"
            background
            layout="prev, pager, next"
            :total="commentPage.total"
            :page-size="commentPage.size"
            :current-page="commentPage.currentPage"
            @current-change="changeCurrentCommentPage"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <transition>
      <Editor
        :isPost="editType === 0"
        :targetUser="replyTargetName"
        :originalPost="originalPost"
        :tagList="tagList"
        v-if="showEditor"
        @closeEditor="hideEditor"
        @releasePost="modifyPost"
        @releaseComment="releaseComment"
      />
    </transition>
    <el-backtop
      target=".main .post-detail"
      :bottom="50"
      :right="215"
    ></el-backtop>
    <el-dialog title="输入删除理由" :visible.sync="showDelTip" width="30%">
      <el-input
        placeholder="请输入删除理由"
        v-model.trim="delReason"
        required
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDelTip">取 消</el-button>
        <el-button type="primary" @click="delPostByAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PostItem from "./PostItem";
import Editor from "components/Editor";
import {
  getPostDetail,
  delPostSelf,
  delPostByAdmin,
  like,
  unLike,
  setTop,
  unSetTop,
  setWonderful,
  unSetWonderful,
  modifyPost,
  addComment,
} from "network/detail";
import { LinkTo } from "assets/util";
import { checkMixin, tagMixin } from "@/common/mixin";

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
        likeCount: 0,
        likeStatus: 0,
        tagsName: "",
        comments: [],
        // comments: new Map(),
      },
      showEditor: false,
      showDelTip: false,
      delReason: "",
      editType: 0, // 0:帖子 1:评论
      replyTarget: {
        entityType: 1,
        entityId: -1,
        targetId: -1,
      },
      replyTargetName: "",
      originalPost: {
        tagsId: "",
        title: "",
        content: "",
      },
      commentPage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  methods: {
    // 获取帖子详情
    getPostData() {
      const _this = this;
      getPostDetail(this.postId, {
        currentPage: this.commentPage.currentPage,
        pageSize: 10,
      }).then((res) => {
        console.log("帖子详情", res);
        if (res.code === 200) {
          _this.commentPage.total = res.data.post.commentCount;
          _this.post.post = res.data.post;
          _this.post.user = res.data.user;
          // res.data.comments.forEach(item => _this.post.comments.set(item.comment.id, item));
          _this.post.comments = res.data.comments;
          _this.post.likeCount = res.data.likeCount;
          _this.post.likeStatus = res.data.likeStatus;
          _this.post.tagsName = res.data.tagsName;
          console.log(_this.post.comments);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    changeCurrentCommentPage(current) {
      this.commentPage.currentPage = current;
      this.getPostData();
    },
    // 点击回复按钮
    clickReply() {
      if (!this.checkAuth()) return false;
      this.editType = 1;
      this.replyTarget.entityId = this.post.post.id;
      this.replyTarget.targetId = this.post.user.id;
      this.replyTarget.userId = this.$store.state.user.id;
      this.replyTargetName = this.post.user.username;
      this.showEditor = true;
      console.log("点击了回复");
    },
    // 点击置顶按钮
    clickSetTop() {
      console.log("置顶");
      const _this = this;
      this.$confirm("确定置顶该帖子吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.setTop();
        })
        .catch(() => {
          return false;
        });
    },
    setTop() {
      const _this = this;
      setTop(this.post.post.id).then((res) => {
        if (res.code === 200) {
          _this.post.post.type = 1;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 取消置顶
    clickUnSetTop() {
      console.log("取消置顶");
      const _this = this;
      this.$confirm("确定取消置顶该帖子吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("确定操作");
        _this.unSetTop();
      });
      // .catch(() => {
      //   console.log("取消操作");
      //   // return false;
      // });
    },
    unSetTop() {
      const _this = this;
      unSetTop(this.post.post.id).then((res) => {
        if (res.code === 200) {
          _this.post.post.type = 0;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 点击加精按钮
    clickSetGood() {
      const _this = this;
      console.log("加精");
      this.$confirm("确定设置该帖子为精帖吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.setGood();
        })
        .catch(() => {
          return false;
        });
    },
    setGood() {
      const _this = this;
      setWonderful(this.post.post.id).then((res) => {
        console.log(res);
        if (res.code === 200) {
          _this.post.post.status = 1;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 取消加精
    clickUnSetGood() {
      const _this = this;
      console.log("加精");
      this.$confirm("确定设置该帖子为精帖吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.unSetGood();
        })
        .catch(() => {
          return false;
        });
    },
    unSetGood() {
      const _this = this;
      unSetWonderful(this.post.post.id).then((res) => {
        if (res.code === 200) {
          _this.post.post.status = 0;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 用户自己点击删除按钮
    clickDeleteHimself() {
      const _this = this;
      _this
        .$confirm("此操作将永久删除该帖子及相关评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          console.log("确定删除");
          _this.delPostSelf();
          _this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      // .catch(() => {
      //   console.log("取消删除");
      //   _this.$message({
      //     type: "info",
      //     message: "已取消删除",
      //   });
      // });
    },
    delPostSelf() {
      const _this = this;
      delPostSelf(this.postId).then((res) => {
        console.log("删除帖子！", res);
        if (res.code === 200) {
          _this.post.post.status = 2;
          _this.LinkTo("/home", "replace");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 管理员点击删除
    clickDeleteByAdmin() {
      this.showDelTip = true;
    },
    delPostByAdmin() {
      const _this = this;
      if (this.delReason === "") {
        this.$message.error("请输入删除理由！");
        return false;
      }
      // {
      //   postId: this.post.post.id,
      //   reason: this.delReason,
      // }
      delPostByAdmin(this.post.post.id).then((res) => {
        if (res.code === 200) {
          _this.showDelTip = false;
          _this.delReason = "";
          _this.LinkTo("/home", "replace");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    closeDelTip() {
      this.showDelTip = false;
      this.delReason = "";
    },
    // 关闭编辑页面
    hideEditor() {
      this.showEditor = false;
    },
    // 编辑帖子
    modifyPost(post) {
      const _this = this;
      modifyPost({
        discussPostId: this.postId,
        ...post,
      }).then((res) => {
        if (res.code === 200) {
          _this.$message.success("修改成功！");
          _this.getPostData();
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    //发布评论
    releaseComment(comment) {
      this.replyTarget.content = comment;
      console.log("发布评论", this.replyTarget);
      const _this = this;
      addComment(this.replyTarget, this.postId).then((res) => {
        if (res.code === 200) {
          _this.$message.success("评论成功！");
          _this.getPostData();
        } else {
          console.log("失败");
          _this.$message.error(res.msg);
        }
      });
    },
    // 点击编辑
    clickEdit() {
      this.editType = 0;
      this.originalPost.tagsId = this.post.post.tagsId;
      this.originalPost.title = this.post.post.title;
      this.originalPost.content = this.post.post.content;
      this.showEditor = true;
    },
    // 清空originalPost
    clearOriginalPost() {
      this.originalPost.tagsId = 0;
      this.originalPost.title = "";
      this.originalPost.content = "";
    },
    LinkTo,
  },
  created() {
    this.postId = this.$route.params.postId;
    this.getPostData();
    console.log("qqq", this.$store.state.user.type);
  },
  mounted() {
    this.$bus.$on(
      "clickReply",
      (entityType, targetId, targetUserId, targetUsername) => {
        this.replyTarget.entityType = entityType;
        this.replyTarget.entityId = targetId;
        this.replyTarget.targetId = targetUserId;
        this.replyTarget.userId = this.$store.state.user.id;
        this.replyTargetName = targetUsername;
        this.editType = 1;
        this.showEditor = true;
      }
    );
  },
  beforeDestroy() {
    this.$bus.$off("clickReply");
  },
  mixins: [checkMixin, tagMixin],
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
        margin-right: 16px;
      }
      .tag-top {
        color: #fff;
        background-color: red;
      }
      .tag-good {
        color: #fff;
        background-color: rgb(2, 182, 182);
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