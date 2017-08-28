// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'

import store from './store'

Vue.config.productionTip = false

import '@/assets/css/style.css'
import '@/assets/css/grid.css'
import '@/assets/css/app.css'

Vue.use(vueResource)

//console.log(Vue.resource('http://127.0.0.1:8000/user'))

Vue.http.interceptors.push(function(request, next) {
    request.headers.set('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1OTljMGYzMjAwMDAwMDkzNjBiODAxNDciLCJEYXRlIjoxNTAzODk0OTcwfQ.h9wYvVgexD7BLKos-wjZRwr0Fstst2STDbekfag2rcQ');
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
