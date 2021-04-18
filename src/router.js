import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Profile = () => import('views/profile/Profile.vue')
const Login = () => import('views/login/Login.vue')
const Register = () => import('views/register/Register.vue')
const Activation = () => import("views/register/Activation.vue");
const PostDetail = () => import('views/detail/PostDetail.vue')
const Message = () => import('views/message/Message.vue')

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
    path: '/profile/:userId',
    name: 'profile',
    component: Profile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/:userId/:code',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: "/activation/:userId/:code",
    name: "activation",
    component: Activation
  },
  {
    path: '/detail/:postId',
    name: 'postDetail',
    component: PostDetail
  },
  {
    path: '/message',
    name: "message",
    component: Message
  }
  ]
})
