<template>
  <el-row class="header">
    <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 18, offset: 3 }">
      <div class="header-body">
        <div class="logo">
          <i class="fa fa-university" aria-hidden="true"></i> GDUFE 交流社区
        </div>
        <ul class="navigator">
          <li><router-link to="/home">首页</router-link></li>
        </ul>
        <div class="search-box">
          <el-input placeholder="搜索" size="mini" v-model="keyWord"  v-on:keyup.enter.native="search"
            ><i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i
          ></el-input>
        </div>
        <div class="personal-box" v-show="isLogin">
          <div>
            <span class="notify"
              ><i class="fa fa-bell" aria-hidden="true"></i
            ></span>
          </div>
          <div
            class="top-operation"
            @mouseenter="showOperation"
            @mouseleave="showOperation"
          >
            <span class="personal-info">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
            <transition name="slide">
              <ul class="my-operation" v-show="showOperate">
                <li>
                  <router-link to="/profile"
                    ><i class="fa fa-user-o" aria-hidden="true"></i>
                    个人中心</router-link
                  >
                </li>
                <li>
                  <i class="fa fa-sign-out" aria-hidden="true"></i> 退出登录
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="login-box" v-show="!isLogin">
          <router-link to="/register">注册</router-link>
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showOperate: false,
      keyWord: "",
    };
  },
  props: {},
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    showOperation() {
      this.showOperate = !this.showOperate;
    },
    search() {
      this.$router.push('/home?keyword=' + this.keyWord);
    }
  },
};
</script>

<style lang="less">
.header {
  background-color: @primary;
  .header-body {
    display: flex;
    padding: 0 @global-padding;
    height: @head-height;
    line-height: @head-height;
    color: @white;
    .logo {
      font-size: 18px;
      margin-right: @top-margin-right;
      i {
        color: #fff;
      }
    }
    .navigator {
      flex: 1;
      display: flex;
      a {
        color: #fff;
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    .search-box {
      margin-right: @top-margin-right;
    }
    .personal-box {
      display: flex;
      > .top-operation {
        position: relative;
        > .my-operation {
          position: absolute;
          top: 67px;
          right: 0;
          width: 100px;
          padding: 5px 0;
          background-color: @primary;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 0 3px 2px #666;
          li {
            cursor: pointer;
            text-align: center;
            line-height: 45px;
            &:hover {
              background-color: rgb(119, 161, 161);
            }
            > a {
              color: #fff;
            }
          }
        }
      }
      span {
        margin-left: @top-margin-right;
        cursor: pointer;
        i {
          font-size: 18px;
          &:hover {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
    .login-box {
      a {
        color: #fff;
        margin-left: @top-margin-right;
        cursor: pointer;
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>