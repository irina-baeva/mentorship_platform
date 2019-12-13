import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Profile from '../views/User/Profile.vue'
import Community from '@/views/connections/Community'
import Sessions from '@/views/connections/Sessions'
import Session from '@/views/connections/Session'
import Invite from '@/views/connections/Invite'
import Signup from '@/views/User/Signup'
import Signin from '@/views/User/Signin'
import EditProfile from '@/views/User/Edit'
import Inbox from '@/views/User/Inbox'
// import AuthGuard from './auth-guard'



Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  { path: '*', redirect: '/profile' },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    // beforeEnter: AuthGuard

  },
  {
      path:'/connect',
      name: 'Community',
      component: Community,

  },
  {
      path:'/invite',
      name: 'Invite',
      component: Invite,
      // beforeEnter: AuthGuard

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
      path:'/Edit',
      name: 'EditProfile',
      component: EditProfile
  },
  {
      path:'/sessions',
      name: 'Sessions',
      component: Sessions,

  },
  {
    path:'/sessions/:id',
    name: 'Session',
    props: true,
    component: Session
},
{
  path:'/inbox',
  name: 'Inbox',
  props: true,
  component: Inbox
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
