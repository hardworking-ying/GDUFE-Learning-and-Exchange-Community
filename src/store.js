import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      id: -1,
      type: 0,
      name: "",
      headerUrl: "",
      createTime: "",
    },
    baseURL: "http://localhost:8080",
    // baseURL: "http://192.168.43.77:8080/community",
    // baseURL: "http://10.101.188.98:8080/community",
  },
  getters: {

  },
  mutations: {
    onLogin(state) {
      state.isLogin = true;
    },
    offLogin(state) {
      state.isLogin = false;
      state.user = {
        id: -1,
        name: "",
        headerUrl: "",
      };
    },
    initUser(state, playLoad) {
      state.user = playLoad.user;
      console.log("111", state.user);
    } 
  },
  actions: {
  }
})
