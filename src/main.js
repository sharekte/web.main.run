// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import LocalStore from "store";
//import Toasted from 'vue-toasted'

import store from "./store";

Vue.config.productionTip = false;

import "@/assets/stylus/style.styl";

import UI from "@/ui";
import "@/ui/style/style.styl";

Vue.use(UI);
/*
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000
})
*/

//Vue.toasted.show('hola billo');
//Vue.toasted.show('hola billo');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
