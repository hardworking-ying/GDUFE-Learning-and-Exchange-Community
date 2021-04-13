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
                :on-success="handleAvatarSuccess"
              >
                <img :src="userInfo.headerUrl" class="avatar" />
              </el-upload>

              <!-- <img :src="userInfo.headerUrl" alt="" title="修改头像" /> -->
            </div>
            <div class="profile-head-right">
              <div class="profile-name">{{ userInfo.username }}</div>
              <div class="profile-createtime">
                注册于 {{ userInfo.createTime }}
              </div>
              <div class="modify-account">
                <el-button size="small" type="primary" @click="changePassword"
                  ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  >修改密码</el-button
                >
              </div>
            </div>
            <div class="profile-head-btn">
              <template v-if="userInfo.id !== $store.state.user.id">
                <el-button v-if="userInfo.hasFollowed" @click="clickUnFollow"
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
          <el-tab-pane :label="subject + '的帖子'">
            <PostAboutMe v-for="item in myPosts" :key="item.id" :post="item" />
          </el-tab-pane>
          <el-tab-pane :label="subject + '的评论'">
            <Reply
              v-for="item in myComments"
              :key="item.id"
              :reply="item"
              :subject="subject"
            />
          </el-tab-pane>
          <el-tab-pane :label="subject + '的点赞'">
            <ThumbUp
              v-for="item in myThumbs"
              :key="item.id"
              :thumb="item"
              :subject="subject"
            />
          </el-tab-pane>
          <el-tab-pane :label="subject + '的关注'">
            <div class="profile-follow">
              <div
                class="profile-follow-item"
                v-for="item in myFollowees"
                :key="item.id"
              >
                <router-link :to="'/profile/' + item.id">
                  <Follow :info="item" />
                </router-link>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="subject + '的粉丝'">
            <div class="profile-follow">
              <div
                class="profile-follow-item"
                v-for="item in myFans"
                :key="item.id"
              >
                <router-link :to="'/profile/' + item.id">
                  <Follow :info="item" />
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
} from "network/profile";

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
      myPosts: [],
      myFollowees: [],
      myFans: [],
      myComments: [],
      myThumbs: [],
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
      if (this.id === this.$store.state.user.id) {
        this.subject = "我";
      } else {
        this.subject = "TA";
      }
      this.getBasicInfo();
      this.getPosts();
      this.getFollowees();
      this.getFans();
      this.getThumbs();
      this.getComments();
    },
    // 获取用户基本信息
    getBasicInfo() {
      const _this = this;
      getUserInfo(this.id).then((res) => {
        if (res.code == "200") {
          _this.userInfo = { ...res.data };
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户的帖子
    getPosts() {
      const _this = this;
      getMyPosts(this.id).then((res) => {
        if (res.code == "200") {
          _this.myPosts = [];
          console.log(res);
          _this.myPosts.push(...res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户评论
    getComments() {
      const _this = this;
      getMyComments(this.id).then((res) => {
        console.log("comments", res);
        if (res.code == "200") {
          _this.myComments = [];
          _this.myComments.push(...res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户收到的赞
    getThumbs() {
      const _this = this;
      getMyThumbs(this.id).then((res) => {
        console.log("thumbs", res);
        if (res.code == "200") {
          _this.myThumbs = [];
          _this.myThumbs.push(...res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 获取用户粉丝
    getFans() {
      const _this = this;
      getMyFans(this.id).then((res) => {
        console.log("fans", res);
        if (res.code == "200") {
          _this.myFans = [];
          _this.myFans.push(...res.data);
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
        if (res.code == "200") {
          _this.myFollowees = [];
          _this.myFollowees.push(...res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 点击关注
    clickFollow() {
      const _this = this;
      follow(this.userInfo.id).then((res) => {
        if (res.code == "200") {
          _this.userInfo.hasFollowed = true;
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
        if (res.code == "200") {
          _this.userInfo.hasFollowed = false;
          _this.$message.success("取关成功！");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 修改密码
    changePassword() {
      console.log("修改密码");
    },
    handleAvatarSuccess() {
      console.log("上传头像成功！");
    }
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