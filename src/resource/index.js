import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

export const User = Vue.resource('https://test.mcorce.com:8000/user{/action}')
export const Article = Vue.resource('http://127.0.0.1:8000/article')

