import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters"
import site from "./modules/site"
import user from "./modules/user"
import article from "./modules/article"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        site,
        user,
        article
    },
    getters
});

export default store;
