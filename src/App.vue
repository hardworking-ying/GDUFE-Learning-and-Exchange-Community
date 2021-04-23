<template>
  <div id="app">
    <Header />
    <div class="main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "components/Header";
import Footer from "components/Footer";
import { getMessageList } from "network/message"
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      hasMag: false
    }
  },
  computed: {
    userId() {
      return this.$store.state.user ? this.$store.state.user.id : "";
    }
  },
  watch: {
    userId(newVal, oldVal) {
      console.log("userId改变");
      this.getMsgList();
      this.initWebsocket(newVal)
    }
  },
  methods: {
    initWebsocket(userId) {
      this.$websocket = new WebSocket("ws://192.168.43.77:8080/community/websocket/" + userId);
      // this.$websocket = new WebSocket("ws://localhost:8080/community/websocket/" + userId);
      this.$websocket.onopen = this.websocketonopen;
      this.$websocket.onerror = this.websocketonerror;
      this.$websocket.onmessage = this.websocketonmessage;
      this.$websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("websocket 连接成功");
    },
    websocketonerror() {
      console.log("websocket 连接出错");
    },
    websocketonmessage(e) {
      // let data = JSON.parse(e.data);
      // if(data.data.code===9) {
      //   this.$hasMsg = true;
      // }else {
      //   this.hasMsg = false;
      // }
      this.$store.commit("setHasMsg", {hasMsg: true})
      console.log("websocket 监听");
    },
    websocketclose() {
      console.log("websocket 连接关闭");
    },
    getMsgList() {
      getMessageList().then(res => {
        console.log("消息", res);
      })
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  beforeDestroy() {
    if(this.$websocket) {
      this.$websocket.close();
    }
  }
};
</script>

<style lang="less">
html {
  height: 100%;
  width: 100%;
  min-width: 768px;
}
body {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
a {
  color:@primary;
  font-size: 14px;
  text-decoration: none;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #808080;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 1px 0 8px 1px #666;
  }
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 67px;
    padding-bottom: 50px;
    overflow-y: hidden;
  }
}
*::-webkit-scrollbar {
  display: none;
}
.el-backtop {
  background-color: @primary !important;
  color: #fff !important;
}
</style>
