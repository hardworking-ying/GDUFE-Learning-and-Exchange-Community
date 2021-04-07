import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'
import Profile from 'views/profile/Profile.vue'

Vue.use(Router)
// 解决Error: Avoided redundant navigation to current location路由重复报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: route => ({ keyword:route.query.keyword })
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('views/register/Register.vue')
  },
  {
    path: '/detail/:postId',
    name: 'postDetail',
    component: () => import('views/detail/PostDetail.vue')
  }
  ]
})
