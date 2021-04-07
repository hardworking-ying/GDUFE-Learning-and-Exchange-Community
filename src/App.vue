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
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
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
    overflow: hidden;
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
