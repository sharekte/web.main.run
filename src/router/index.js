import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'
import Main from '@/components/Main'
import View from '@/components/View'
import New  from '@/components/New'
import Collect from '@/components/Collect'
import CollectView from '@/components/CollectView'
import c404 from '@/components/404'

import Demo from '@/components/Demo'
import Login from '@/components/Login'

import NewEditor from '@/components/editor/edit'

import Edit from '@/views/Edit'

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
      }, {
        path: '/view/:id([a-z0-9]{24})',
        name: 'view',
        component: View
      }, {
        path: '/new',
        name: 'new',
        component: New
      }, {
        path: '/collect',
        name: 'collect',
        component: Collect
      }, {
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: c404
    },
    {
      path: '/new-editor',
      component: Edit
    }
  ]
})
