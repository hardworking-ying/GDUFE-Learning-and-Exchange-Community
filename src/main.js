import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
import VueCookies from 'vue-cookies' 
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);
Vue.use(VueCookies);
Vue.$cookies.config('100d');
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
// 使用mock模拟数据
// import './mock/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
