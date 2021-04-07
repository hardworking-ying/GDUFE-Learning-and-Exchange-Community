<template>
  <div class="profile">
    <div class="profile-head-wrapper">
      <el-row class="profile-body-wrapper">
        <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
          <div class="profile-head">
            <div class="profile-head-left">
              <img
                src="https://tse2-mm.cn.bing.net/th/id/OIP.6wbm76XJRfMKuNZhIKcKfQAAAA?w=200&h=200&c=7&o=5&dpr=1.12&pid=1.7"
                alt=""
              />
            </div>
            <div class="profile-head-right">
              <div class="profile-name">hargworking-ying</div>
              <div class="profile-createtime">注册于 2020年11月20日</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="profile-body-wrapper">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <el-tabs type="border-card">
          <el-tab-pane label="我的帖子">
            <PostAboutMe v-for="item in myPosts" :key="item.id" :post="item"/>
          </el-tab-pane>
          <el-tab-pane label="我的评论">回复</el-tab-pane>
          <el-tab-pane label="我的点赞">点赞</el-tab-pane>
          <el-tab-pane label="我的关注">关注</el-tab-pane>
          <el-tab-pane label="我的粉丝">粉丝</el-tab-pane>
          <!-- <el-tab-pane label="个人中心">个人中心</el-tab-pane> -->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostAboutMe from "./PostAboutMe"
export default {
  name: "Profile",
  components: {
    PostAboutMe,
  },
  data() {
    return{
      myPosts: [],
    }
  },
  created() {
    this.myPosts = [{
      title: "测试帖子",
      content: "Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。"
    }, {
      title: "呼伦贝睿大草原",
      content: "蓝蓝的天空，青青的草原，红红的枫叶，白白的云"
    }];
  }
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
      }
    }
  }
  > .profile-body-wrapper {
    // height: 100%;
    padding-top: 20px;
    > div {
      height: 100%;
      .el-tabs {
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
  }
}
</style>