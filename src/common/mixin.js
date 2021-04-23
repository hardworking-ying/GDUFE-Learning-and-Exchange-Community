import { getTagList } from '@/network/home'
import { logout } from "network/login"

export const tagMixin = {
  data() {
    return {
      tagList: [],
    }
  },
  methods: {
    // 获取标签列表
    getTagList() {
      const _this = this;
      getTagList().then((res) => {
        console.log("标签列表", res);
        if (res.code === 200) {
          _this.tagList = [];
          _this.tagList.push(...res.data);
          console.log(res.data);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    this.getTagList();
  }
}

function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

export const logoutMixin = {
  methods: {
    logout() {
      // logout();
      // clearAllCookie();
      document.cookie ='ticket=0;expires=' + new Date(0).toUTCString()
      console.log("cookie", document.cookie);
      sessionStorage.removeItem("store");
      this.$store.commit("offLogin");
      if (this.$websocket) {
        this.$websocket.close();
      }
    }
  }
}

export const checkMixin = {
  computed: {
    ifLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    checkAuth() {
      if (this.ifLogin) {
        return true;
      } else {
        this.$router.push("/login");
        return false;
      }
    }
  }
}