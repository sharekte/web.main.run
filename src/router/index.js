import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Collect from '@/components/Collect'
import CollectView from '@/components/CollectView'

import Demo from '@/components/Demo'

import Main from '@/components/layouts/Main'

import Home from '@/views/Home'
import Edit from '@/views/Edit'
import View from '@/views/View'
import Login from '@/views/Login'
import c404 from '@/views/404'

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
      	path: '',
        name: 'home',
      	component: Home
      },
      {
        path: '/view/:id([a-z0-9]{24})',
        name: 'view',
        component: View
      },
      {
        path: '/collect',
        name: 'collect',
        component: Collect
      },
      {
        path: '/collect/:id([a-z0-9]{24})',
        name: 'collect_view',
        component: CollectView
      },
      {
        path: '/demo',
        component: Demo
      }]
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: c404
    }
  ]
})
