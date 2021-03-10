import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
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
