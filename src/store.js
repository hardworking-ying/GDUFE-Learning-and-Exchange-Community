import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getUserInfo } from "network/store.js" 
export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    baseURL: "http://localhost:8080/community",
  },
  getters: {

  },
  mutations: {
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
