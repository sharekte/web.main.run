import { SET_ARTICLES, ADD_PAGE, SET_COUNT, HAS_MORE } from '../mutation-types'
import { Article } from '@/resource'

const state = {
    articles: [],
    page: 0,
    count: 0,
    hasMore: true
}

const getters = {
    getArticles: (state) => {
        return state.articles
    },
    hasMore: (state) => {
        return state.hasMore
    }
}

const actions = {
    get_article ({commit, state}) {
        commit('ADD_PAGE')

        Article.get({page: state.page, per_page: 2}).then(response => {
            if (response.body.Success) {
                commit('SET_ARTICLES', response.body.Data.Articles)
                commit('SET_COUNT', response.body.Data.Count)
            }
        })

        if ((state.articles.length == state.count) && state.count != 0) {
            commit('HAS_MORE', false)
        }
    }
}

const mutations = {
    [SET_ARTICLES] (state, articles) {
        state.articles.push(...articles)
    },

    [ADD_PAGE] (state) {
        state.page += 1
    },

    [SET_COUNT] (state, count) {
        state.count = count
    },

    [HAS_MORE] (state, hasMore) {
        state.hasMore = hasMore
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
