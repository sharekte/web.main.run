import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import article from './modules/article'
import collect from './modules/collect'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        article,
        collect
    },
    strict: debug
})
