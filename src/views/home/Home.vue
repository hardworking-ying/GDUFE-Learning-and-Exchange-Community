<template>
  <div class="home" @scroll="listenScroll($event)">
    <!-- 欢迎栏开始 -->
    <!-- <el-row
      class="welcome"
      :style="{ backgroundColor: currentTag ? currentTag.color : '#ededed' }"
    >
      <el-col :md="{ span: 24, offset: 0 }" :lg="{ span: 18, offset: 3 }">
        <template v-if="currentTagId === 0">
          <div class="welcome-words">欢迎来到 GDUFE 学习交流社区</div>
          <p>社区由众多爱好者共同维护</p>
          <p>QQ群：<span>1234567890</span> 进群密码：<span>888</span></p>
        </template>
        <template v-else>
          <div class="tag-banner">
            <div class="tag-title">
              <i :class="currentTag.icon"></i>
              {{ currentTag.name }}
            </div>
            <div class="tag-desc">{{ currentTag.describe }}</div>
          </div>
        </template>
      </el-col>
    </el-row> -->
    <!-- 欢迎栏结束 -->
    <!-- 主体内容开始 -->
    <el-row class="home-body-wrapper">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
        <div class="home-body">
          <!-- 左侧标签导航开始 -->
          <div class="home-nav-list">
            <div class="navigator">
              <div class="release-box">
                <el-button type="primary" @click="clickReleasePost"
                  >发布主题</el-button
                >
              </div>
              <ul class="nav-list">
                <li
                  :class="{ active: currentTagId === 0 }"
                  @click="changeTag(0)"
                >
                  <i
                    class="fa fa-comments-o tag-all-icon"
                    aria-hidden="true"
                  ></i>
                  全部主题
                </li>
                <li
                  v-for="item in tagList"
                  :key="item.tagsId"
                  :title="item.tagsName"
                  :style="{
                    color: currentTagId === item.tagsId ? item.tagsColor : '#808080',
                    fontWeight: currentTagId === item.tagsId ? 'bold' : 'normal',
                  }"
                  @click="changeTag(item.tagsId)"
                >
                  <i
                    :class="item.tagsIcon"
                    aria-hidden="true"
                    :style="{ color: item.tagsColor }"
                  ></i>
                  {{ item.tagsName }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 左侧标签导航结束 -->
          <!-- 右侧内容开始 -->
          <div class="home-post-list">
            <OrderDropdown
              class="order-drop-down"
              @changeOrderType="selectOrderType"
            />
            <div class="post-list-wrapper" ref="postList">
              <PostList :posts="postList" />
              <div class="load-more">
                <el-pagination
                  v-if="page.total > 0"
                  ref="pagination"
                  background
                  layout="prev, pager, next"
                  :total="page.total"
                  :page-size="page.size"
                  :current-page="page.current"
                  @current-change="changeCurrentPage"
                >
                </el-pagination>
                <p class="no-more-data" v-else>没有更多数据啦~</p> 
              </div>
            </div>
          </div>
          <!-- 右侧内容结束 -->
        </div>
      </el-col>
    </el-row>
    <!-- 主体内容结束 -->
    <transition>
      <Editor
        :isPost="true"
        :tagList="tagList"
        v-show="showEditor"
        @closeEditor="hideEditor"
        @releasePost="releasePost"
      />
    </transition>
    <el-backtop
      target=".home .post-list-wrapper"
      :bottom="50"
      :right="215"
    ></el-backtop>
  </div>
</template>

<script>
import OrderDropdown from "./OrderDropdown";
import PostList from "./PostList";
import Editor from "components/Editor";
import { getAllPost, searchPost, releasePost } from "network/home";
import { tagMixin, checkMixin } from "@/common/mixin";

export default {
  name: "home",
  components: {
    OrderDropdown,
    PostList,
    Editor,
  },
  data() {
    return {
      postList: [],
      showEditor: false,
      // 标签列表
      tagList: [],
      // 当前标签
      currentTagId: 0,
      // 分页
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      // 排序类型
      orderType: 0, // 0:最新 1:最热
    };
  },
  props: {
    keyword: "",
  },
  watch: {
    // 监听搜索框变化
    keyword(newValue, oldValue) {
      // 重新获取数据
      let value = (typeof newValue)==="undefined" ? "":value;
      if(value==="") {
        this.getAllPost();
      }else {
        this.searchPost(value);
      }
    },
  },
  computed: {},
  methods: {
    // 更换标签
    changeTag(tagId) {
      this.currentTagId = tagId;
      this.page.current = 1;
      this.getAllPost();
    },
    // 获取帖子列表
    getAllPost() {
      const _this = this;
      getAllPost({
        currentPage: this.page.current,
        pageSize: this.page.size,
        orderMode: this.orderType,
        tagsId: this.currentTagId
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          _this.postList = [];
          _this.postList.push(...res.data.discussPosts);
          _this.page.total = res.data.page.recordTotal;
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    // 搜索帖子
    searchPost() {
      searchPost({
        currentPage: this.page.current,
        pageSize: this.page.size,
        keyword: this.keyword
      }).then(res => {
        console.log("搜索", res);
        if(res.code===200) {
          this.postList = [];
          this.postList.push(...res.data.discussPosts)
          this.page.total = res.data.page.recordTotal;
        }else {
          this.$message.error(res.msg);
        }
      })
    },
    loadMore() {
      this.getAllPost();
    },
    // 点击发布主题
    clickReleasePost() {
      if(!this.checkAuth()) return false;
      this.showEditor = true;
      console.log("点击发布主题");
    },
    // 选择排序方式
    selectOrderType(type) {
      this.orderType = type;
      this.getAllPost();
    },
    // 更换当前页
    changeCurrentPage(current) {
      this.page.current = current;
      this.getAllPost();
      this.$refs.postList.scrollTo(0, 0);
    },
    // 进入用户主页
    goToHisPage(id) {
      this.$router.push({ name: "profile", params: { userId: id } });
      console.log("点击了用户头像，即将跳转到id为" + id + "的用户的主页");
    },
    // 进入帖子详情
    goToPostDetail(id) {
      this.$router.push({ name: "postDetail", params: { postId: id } });
    },
    // 关闭编辑器
    hideEditor() {
      this.showEditor = false;
    },
    // 发布帖子
    releasePost(post) {
      const _this = this;
      releasePost(post).then((res) => {
        if (res.code === 200) {
          _this.$message.success(res.msg);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    this.getAllPost();
  },
  mounted() {
    let _this = this;
    this.$bus.$on("toHisPage", (value) => {
      _this.goToHisPage(value);
    });
    this.$bus.$on("toPostDetail", (value) => {
      _this.goToPostDetail(value);
    });
  },
  beforeDestory() {
    this.$bus.$off("toHisPage");
    this.$bus.$on("toPostDetail");
  },
  mixins: [tagMixin, checkMixin],
};
</script>
<style lang="less">
.home {
  height: 100%;
  overflow: hidden;
  padding-top: 20px;
  > .welcome {
    color: #808080;
    padding-bottom: 16px;
    border-bottom: 4px solid @primary;
    text-align: center;
    transition: all 0.2s;
    .welcome-words {
      font-size: 20px;
      line-height: 50px;
    }
    p {
      line-height: 2;
      span {
        color: @primary;
      }
    }
    .tag-banner {
      color: #fff;
      .tag-title {
        font-size: 20px;
        line-height: 50px;
      }
      .tag-desc {
        line-height: 2;
      }
    }
  }
  > .home-body-wrapper {
    height: 100%;
    > .el-col {
      height: 100%;
    }
    .home-body {
      height: 100%;
      display: flex;
      padding: 0 @global-padding;
      > .home-nav-list {
        width: 24%;
        > .navigator {
          .release-box {
            margin-bottom: 20px;
            .el-button {
              transition: all 0.2s;
            }
            .el-button:hover {
              opacity: 0.8;
            }
          }
          .nav-list {
            li {
              line-height: 2.5;
              &:hover {
                color: @primary;
                cursor: pointer;
              }
              i {
                font-weight: bold;
                margin-right: 4px;
              }
              .tag-all-icon {
                color: @primary;
              }
            }
            .active {
              color: @primary;
            }
          }
        }
      }
      > .home-post-list {
        height: 100%;
        flex: 1;
        text-align: left;
        > .order-drop-down {
          margin-bottom: 20px;
          margin-left: 16px;
        }
        > .post-list-wrapper {
          height: calc(100% - 60px);
          overflow: scroll;
        }
        .el-input__inner {
          width: 120px;
        }
        .load-more {
          width: 100%;
          margin: 30px 0 20px;
          text-align: center;
        }
        .no-more-data {
          padding: 20px 0;
          color: #777;
          text-align: center;
        }
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-enter,
.v-leave-to {
  transform: translateY(480px);
  opacity: 0;
}
</style>
