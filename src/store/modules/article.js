import { GET_ARTICLES } from '../mutation-types'

const state = {
    articles: []
}

const getters = {
    getArticles: (state) => {
        return state.articles
    }
}

const actions = {

}

const mutations = {
    [GET_ARTICLES] (state, articles) {
        state.articles = articles
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
