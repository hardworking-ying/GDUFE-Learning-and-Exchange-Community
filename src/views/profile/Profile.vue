<template>
  <div class="profile">
    <div class="profile-head-wrapper">
      <el-row class="profile-body-wrapper">
        <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
          <div class="profile-head">
            <div class="profile-head-left">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarChange"
                :disabled="!isHimself"
              >
                <img :src="userInfo.headerUrl" class="avatar" />
              </el-upload>

              <!-- <img :src="userInfo.headerUrl" alt="" title="修改头像" /> -->
            </div>
            <div class="profile-head-right">
              <div class="profile-name">{{ userInfo.username }}</div>
              <span class="profile-type">
                {{ userInfo.type === 1 ? "管理员" : "普通用户" }}
              </span>
              <div class="modify-account" v-if="isHimself">
                <el-button size="small" type="primary" @click="changePassword"
                  ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  >修改密码</el-button
                >
              </div>
            </div>
            <div class="profile-head-btn">
              <template v-if="!isHimself">
                <el-button v-if="hasFollowed" @click="clickUnFollow"
                  >取消关注</el-button
                >
                <el-button v-else @click="clickFollow">关注</el-button>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="profile-body-wrapper">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <el-tabs type="border-card">
          <el-tab-pane :label="subject + '的帖子(' + postNum + ')'">
            <PostAboutMe
              v-for="item in myPosts"
              :key="item.post.id"
              :item="item"
            />
            <el-pagination
              ref="pagination1"
              background
              layout="prev, pager, next"
              :total="postPage.total"
              :page-size="postPage.size"
              :current-page="postPage.currentPage"
              @current-change="changeCurrentPostPage"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="subject + '的评论(' + commentNum + ')'">
            <Reply
              v-for="item in myComments"
              :key="item.comment.id"
              :item="item"
              :subject="subject"
            />
            <el-pagination
              ref="pagination2"
              background
              layout="prev, pager, next"
              :total="commentPage.total"
              :page-size="commentPage.size"
              :current-page="commentPage.currentPage"
              @current-change="changeCurrentCommentPage"
            >
            </el-pagination>
          </el-tab-pane>
          <!-- <el-tab-pane :label="subject + '的点赞(' + likeNum + ')'">
            <ThumbUp
              v-for="item in myThumbs"
              :key="item.id"
              :thumb="item"
              :subject="subject"
            />
          </el-tab-pane> -->
          <el-tab-pane :label="subject + '的关注(' + followeeNum + ')'">
            <div class="profile-follow">
              <div
                class="profile-follow-item"
                v-for="item in myFollowees"
                :key="item.id"
              >
                <router-link :to="'/profile/' + item.user.id">
                  <Follow :info="item.user" />
                </router-link>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="subject + '的粉丝(' + fansNum + ')'">
            <div class="profile-follow">
              <div
                class="profile-follow-item"
                v-for="item in myFans"
                :key="item.id"
              >
                <router-link :to="'/profile/' + item.user.id">
                  <Follow :info="item.user" />
                </router-link>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostAboutMe from "./PostAboutMe";
import Follow from "./Follow";
import ThumbUp from "./ThumbUp";
import Reply from "./Reply";
import {
  getUserInfo,
  getMyPosts,
  getMyComments,
  getMyFans,
  getMyFollowees,
  getMyThumbs,
  follow,
  unFollow,
  uploadAvatar,
} from "network/profile";
import LoginVue from "../login/Login.vue";

export default {
  name: "Profile",
  components: {
    PostAboutMe,
    Follow,
    ThumbUp,
    Reply,
  },
  data() {
    return {
      id: -1,
      subject: "我",
      userInfo: {
        id: -1,
        type: 0,
        username: "",
        email: "",
        headerUrl: "",
        createTime: "",
      },
      isHimself: false,
      hasFollowed: false,
      postNum: 0,
      commentNum: 0,
      likeNum: 0,
      fansNum: 0,
      followeeNum: 0,
      myPosts: [],
      myFollowees: [],
      myFans: [],
      myComments: [],
      // myThumbs: [],
      postPage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      commentPage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  methods: {
    // 初始化页面数据
    initData() {
      this.id = this.$route.params.userId;
      this.getBasicInfo();
      this.getPosts();
      this.getFollowees();
      this.getFans();
      // this.getThumbs();
      this.getComments();
    },
    // 获取用户基本信息
    getBasicInfo() {
      const _this = this;
      getUserInfo(this.id).then((res) => {
        console.log("个人信息", res);
        if (res.code === 200) {
          _this.userInfo = res.data.user;
          _this.hasFollowed = res.data.hasFollowed;
          _this.isHimself = res.data.user.id === this.$store.state.user.id;
          _this.likeNum = res.data.likeCount;
          _this.fansNum = res.data.followerCount;
          _this.followeeNum = res.data.followeeCount;
          console.log("dddd", _this.followeeNum);
          _this.subject = _this.isHimself ? "我" : "TA";
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户的帖子
    getPosts() {
      const _this = this;
      getMyPosts(this.id, {
        currentPage: this.postPage.currentPage,
        pageSize: 10,
      }).then((res) => {
        console.log("comments", res, "当前页", _this.postPage.currentPage);
        if (res.code === 200) {
          _this.myPosts = [];
          _this.myPosts.push(...res.data.discussPosts);
          _this.postNum = res.data.page.recordTotal;
          _this.postPage.total = res.data.page.recordTotal;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    changeCurrentPostPage(current) {
      this.postPage.currentPage = current;
      this.getPosts();
    },
    changeCurrentCommentPage(current) {
      this.commentPage.currentPage = current;
      this.getComments();
    },
    // 获取用户评论
    getComments() {
      const _this = this;
      getMyComments(
        this.id,
        {currentPage: this.commentPage.currentPage,
        pageSize: 10,
      }).then((res) => {
        console.log("comments", res, "当前页", _this.commentPage.currentPage);
        if (res.code === 200) {
          _this.myComments = [];
          _this.myComments.push(...res.data.replyPosts);
          _this.commentNum = res.data.totalPostSize;
          _this.commentPage.total = res.data.totalPostSize;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户收到的赞
    // getThumbs() {
    //   const _this = this;
    //   getMyThumbs(this.id).then((res) => {
    //     console.log("thumbs", res);
    //     if (res.code == "200") {
    //       _this.myThumbs = [];
    //       _this.myThumbs.push(...res.data);
    //     } else {
    //       _this.$message.error(res.msg);
    //     }
    //   });
    // },
    // 获取用户粉丝
    getFans() {
      const _this = this;
      getMyFans(this.id).then((res) => {
        console.log("fans", res);
        if (res.code === 200) {
          _this.myFans = [];
          _this.myFans.push(...res.data.users);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户的关注
    getFollowees() {
      const _this = this;
      getMyFollowees(this.id).then((res) => {
        console.log("follows", res);
        if (res.code === 200) {
          _this.myFollowees = [];
          _this.myFollowees.push(...res.data.users);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 点击关注
    clickFollow() {
      const _this = this;
      follow(this.userInfo.id).then((res) => {
        if (res.code === 200) {
          _this.initData();
          _this.hasFollowed = true;
          console.log("aaa");
          _this.$message.success("关注成功！");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 点击取消关注
    clickUnFollow() {
      const _this = this;
      unFollow(this.userInfo.id).then((res) => {
        if (res.code === 200) {
          _this.initData();
          _this.hasFollowed = false;
          _this.$message.success("取关成功！");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 修改密码
    changePassword() {
      this.$router.push("/changepwd");
    },
    handleAvatarChange(file) {
      let formData = new FormData();
      formData.append("headerImage", file.raw);
      const _this = this;
      uploadAvatar(formData).then((res) => {
        console.log("上传图片", res);
        if (res.code === 200) {
          _this.userInfo.headerUrl = URL.createObjectURL(file.raw);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="less" scoped>
.profile {
  height: 100%;
  > .profile-head-wrapper {
    background-color: @primary;
    padding: 20px 0;
    .profile-head {
      display: flex;
      align-items: center;
      > .profile-head-left {
        img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 4px solid #fff;
        }
      }
      > .profile-head-right {
        flex: 1;
        margin-left: 20px;
        color: #fff;
        > .profile-name {
          font-size: 24px;
          padding: 10px 0;
        }
        > .profile-type {
          padding: 0.2em 0.4em;
          color: @primary;
          background-color: #fff;
          border-radius: 4px;
        }
        > .modify-account {
          margin-top: 10px;
        }
      }
    }
  }
  > .profile-body-wrapper {
    height: calc(100% - 160px);
    padding-top: 20px;
    > div {
      height: 100%;
      /deep/.el-tabs {
        height: 100%;
        .el-tabs__content {
          height: calc(100% - 69px);
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
    .profile-follow {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>