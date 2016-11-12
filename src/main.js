import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueRouter)

import 'assets/css/style.css'
import 'assets/css/grid.css'
import 'assets/css/app.css'

import Home from 'components/Home'
import Main from 'components/Main'
import Demo from 'components/Demo'

const router = new VueRouter({
  mode: 'history',
  routes :[
    // { path: '/home', component: Main },
    // { path: '/about', component: About },
    // { path: '/', redirect: '/home' },
    // { path: '*', component: Home }
    { path: '/', component: Main,
      children: [{
        path: '', component: Home
      }, {
        path: '/demo', component: Demo
      }]
    }
  ]
})
new Vue({
  //el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
}).$mount('#app')

//window.router = router
