import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/User/Profile.vue'
import Community from '@/views/connections/Community'
import Signup from '@/views/User/Signup'
import Signin from '@/views/User/Signin'
import EditProfile from '@/views/User/Edit'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
      path:'/connect',
      name: 'Community',
      component: Community
  },
  {
      path:'/profile',
      name: 'Profile',
      component: Profile
  },
  {
      path:'/signup',
      name: 'Signup',
      component: Signup
  },
  {
      path:'/signin',
      name: 'Signin',
      component: Signin
  },
  {
      path:'/EditProfile',
      name: 'EditProfile',
      component: EditProfile
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
