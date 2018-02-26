import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'
import Main from '@/components/Main'
import View from '@/components/View'
import Component from '@/components/Collection' 
import New  from '@/components/New'
import c404 from '@/components/404'

import Demo from '@/components/Demo'
import Login from '@/components/Login'

import NewEditor from '@/components/editor/edit'

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
        path: '/collection',
        name: 'collection',
        component: Component
      }, {
        path: '/new',
        name: 'new',
        component: New
      }, {
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
      component: NewEditor
    }
  ]
})
