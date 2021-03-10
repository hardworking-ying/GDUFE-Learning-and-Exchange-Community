import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getUserInfo } from "network/store.js" 
export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    baseURL: "http://localhost:8080/community",
    tag: "all",
    tagList: {
      bulletin: {
        title: "公告",
        desc: "GDUFE COMMUNITY 社区的公告",
        bgcolor: "#EF564F",
        icon: "fa fa-bullhorn",
      },
      help: {
        title: "求助",
        desc: "获取社区管理员和小伙伴的帮助",
        bgcolor: "#4B93D1",
        icon: "fa fa-wrench"
      },
      share: {
        title: "分享",
        desc: "欢迎分享你的资源、经历和感悟",
        bgcolor: "#6DBB3E",
        icon: "fa fa-share-alt"
      },
      chat: {
        title: "闲聊",
        desc: "feel free to flood",
        bgcolor: "#888",
        icon: "fa fa-beer"
      },
      feedback: {
        title: "反馈",
        desc: "对于 GDUFE COMMUNITY 在设计上、功能上有什么好的建议呢？",
        bgcolor: "#9354CA",
        icon: "fa fa-commenting-o"
      },
    },
  },
  getters: {
    getBgColor(state) {
      if(state.tag=="all") return "#ededed";
      else return state.tagList[state.tag].bgcolor;
    }
  },
  mutations: {
    changeTag(state, playLoad) {
      state.tag = playLoad.newTag;
    },
    onLogin(state) {
      state.isLogin = true;
    },
    offLogin(state) {
      state.isLogin = false;
      state.user = {};
    },
    initUser(state, playLoad) {
      state.user = playLoad.user;
    } 
  },
  actions: {
    initLogin(context, playLoad) {
      getUserInfo(playLoad.userId).then(res => {
        console.log(res);
        context.commit("initUser", {user: res.user})
      })
    }
  }
})
