<template>
  <div class="profile">
    <el-row class="profile-body-wrapper">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <el-tabs type="border-card">
          <el-tab-pane label="我的帖子">
            <p>用户管理</p>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
            <h1>用户管理</h1>
          </el-tab-pane>
          <el-tab-pane label="我的评论">回复</el-tab-pane>
          <el-tab-pane label="我的点赞">点赞</el-tab-pane>
          <el-tab-pane label="我的关注">关注</el-tab-pane>
          <el-tab-pane label="我的粉丝">粉丝</el-tab-pane>
          <el-tab-pane label="个人中心">个人中心</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style lang="less">
.profile{
  height: 100%;
  .profile-body-wrapper {
    height: 100%;
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