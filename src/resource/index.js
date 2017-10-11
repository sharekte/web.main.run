import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

//export const User = Vue.resource('https://api.main.run/user{/action}')
//export const Article = Vue.resource('https://api.main.run/article{/id}{/action}{/id2}')

export const User = Vue.resource('http://127.0.0.1:8000/user{/action}')
export const Article = Vue.resource('http://127.0.0.1:8000/article{/id}')
