// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import LocalStore from 'store'
//import Toasted from 'vue-toasted'

import store from './store'

Vue.config.productionTip = false

import '@/assets/stylus/style.styl'

import '@/assets/css/style.css'
import '@/assets/css/app.css'

Vue.use(vueResource)
/*
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000
})
*/

//Vue.toasted.show('hola billo');
//Vue.toasted.show('hola billo');

//console.log(Vue.resource('http://127.0.0.1:8000/user'))

Vue.http.interceptors.push(function(request, next) {
    //LocalStore.set('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1OTljMGYzMjAwMDAwMDkzNjBiODAxNDciLCJEYXRlIjoxNTAzODk0OTcwfQ.h9wYvVgexD7BLKos-wjZRwr0Fstst2STDbekfag2rcQ')
    
    if (LocalStore.get('Token')) {
        request.headers.set('Token', LocalStore.get('Token'));
    }

    next(function(response) {
        if (response.status == 401) {
            router.push('login')
        }
    })
})

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
