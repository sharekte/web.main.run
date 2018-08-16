import Vue from "vue";
import vueResource from "vue-resource";

Vue.use(vueResource);

export const User = Vue.resource("https://main.danclive.com/user{/action}");
export const Article = Vue.resource("https://main.danclive.com/article{/id}");
export const Collect = Vue.resource(
  "https://main.danclive.com/collect{/id}{/action}"
);

//export const User = Vue.resource('http://116.196.122.79:9001/user{/action}')
//export const Article = Vue.resource('http://116.196.122.79:9001/article{/id}')
//export const Collect = Vue.resource('http://116.196.122.79:9001/collect{/id}{/action}')
