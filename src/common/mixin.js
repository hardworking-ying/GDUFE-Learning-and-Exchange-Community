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

export const logoutMixin = {
  methods: {
    logout() {
      logout();
      sessionStorage.removeItem("store");
      this.$store.commit("offLogin");
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
      if(this.ifLogin) {
        return true;
      }else {
        this.$router.push("/login");
        return false;
      }
    }
  }
}