<template>
  <div class="home">
    <Welcome />
    <el-row class="home-body-wrapper">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="home-body">
          <div class="home-nav-list">
            <Navigator @sendPost="sendPost" />
          </div>
          <div class="home-post-list">
            <OrderDropdown class="order-drop-down" />
            <PostList :posts="discussPosts" />
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
            <div class="load-more">
              <el-pagination
                ref="pagination"
                background
                layout="prev, pager, next"
                :current="currentPage"
                :total="totalPost"
                :hide-on-single-page="true"
                @current-change="loadMore"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <transition>
      <Editor :isPost="true" v-show="showEditor" @closeEditor="hideEditor" @releasePost="releasePost"/>
    </transition>
  </div>
</template>

<script>
import Welcome from "./Welcome";
import Navigator from "./Navigator";
import OrderDropdown from "./OrderDropdown";
import PostList from "./PostList";
import Editor from "components/Editor"
import { getIndexData, getIndexDataNew } from "network/home";


export default {
  name: "home",
  components: {
    Welcome,
    Navigator,
    OrderDropdown,
    PostList,
    Editor
  },
  data() {
    return {
      discussPosts: [],
      totalPost: 0,
      currentPage: 1,
      showEditor: false,
    };
  },
  computed: {
    currentTag() {
      return this.$store.state.tag;
    },
  },
  methods: {
    getIndexData() {
      let _this = this;
      getIndexData().then((res) => {
        console.log(res);
        if(res.code===500) {
          this.$message.error("服务器出错了！");
        }else {
          _this.setDiscussPosts(res);
        }
      });
    },
    changeOrderType(type) {
      let _this = this;
      getIndexDataNew(type, this.currentPage).then((res) => {
        _this.setDiscussPosts(res);
        console.log(_this.$refs.pagination);
        _this.$refs.pagination.currentPage = 1;
      });
      console.log("改变帖子排序方式：" + type);
    },
    sendPost() {
      this.showEditor = true;
      console.log("点击发布主题");
    },
    goToHisPage(id) {
      console.log("点击了用户头像，即将跳转到id为" + id + "的用户的主页");
    },
    goToPostDetail(id) {
      this.$router.push({name: "postDetail", params: {postId: id}});
      console.log("点击了id为" + id + "的帖子，即将跳转到其详情页");
    },
    loadMore(page) {
      let _this = this;
      this.currentPage = page;
      getIndexDataNew(this.currentTag, page).then((res) => {
        _this.setDiscussPosts(res);
      });
      console.log("加载更多帖子");
    },
    setDiscussPosts(data) {
      this.discussPosts = [];
      this.totalPost = data.page.recordTotal;
      this.discussPosts.push(...data.discussPosts);
    },
    hideEditor() {
      console.log("监听关闭编辑器");
      this.showEditor = false;
    },
    releasePost(post) {
      console.log("发布主题", post);
    }
  },
  created() {   
    this.getIndexData();
  },
  mounted() {
    let _this = this;
    this.$bus.$on("selectOrderType", (value) => {
      _this.changeOrderType(value);
    });
    this.$bus.$on("toHisPage", (value) => {
      _this.goToHisPage(value);
    });
    this.$bus.$on("toPostDetail", (value) => {
      _this.goToPostDetail(value);
    });
  },
  destoryed() {
    this.$bus.$off("selectOrderType");
    this.$bus.$off("toHisPage");
    this.$bus.$on("toPostDetail");
  },
};
</script>
<style lang="less">
.home-body-wrapper {
  margin-top: 20px;
}
.home-body {
  display: flex;
  padding: 0 @global-padding;
  .home-nav-list {
    width: 24%;
    margin-right: 15px;
  }
  .home-post-list {
    flex: 1;
    text-align: left;
    .el-input__inner {
      width: 120px;
    }
    .order-drop-down {
      margin-bottom: 20px;
    }
    .load-more {
      width: 100%;
      margin: 30px 0 20px;
      text-align: center;
    }
  }
}
.v-enter-active, .v-leave-active {
  transition: all .3s ease;
}
.v-enter, .v-leave-to {
  transform: translateY(480px);
  opacity: 0;
}
</style>
