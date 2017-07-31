import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

import Home from 'components/Home'
import Main from 'components/Main'
import Demo from 'components/Demo'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
      	path: '',
      	component: Home
      }, {
      	path: '/demo',
      	component: Demo
      }]
    }
  ]
})
