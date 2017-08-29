import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'

Vue.use(Router)

import Home from '@/components/Home'
import Main from '@/components/Main'
import Demo from '@/components/Demo'
import Editor from '@/components/Editor'
import cc from '@/components/cc'
import Login from '@/components/Login'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
      	path: '',
        name: 'home',
      	component: Home
      }, {
      	path: '/demo',
      	component: Demo
      }, {
        path: '/editor',
        component: Editor
      }, {
        path: '/cc',
        component: cc
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
