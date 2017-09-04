import { SET_ARTICLES, ADD_PAGE, SET_COUNT, HAS_MORE, SET_ARTICLE_RELEASE } from '../mutation-types'
import { Article } from '@/resource'

const state = {
    articles: [],
    page: 1,
    count: 0,
    hasMore: true,

    article: {}
}

const getters = {
    getArticles: (state) => {
        return state.articles
    },
    hasMore: (state) => {
        return state.hasMore
    },
    getArticleRelease: (state) => {
        return state.article
    }
}

const actions = {
    get_articles ({commit, state}) {
        Article.get({page: state.page, per_page: 2}).then(response => {
            if (response.body.Success) {
                commit('SET_ARTICLES', response.body.Data.Articles)
                commit('SET_COUNT', response.body.Data.Count)
                commit('ADD_PAGE')
            }
        })

        if ((state.articles.length == state.count) && state.count != 0) {
            commit('HAS_MORE', false)
        }
    },
    get_article_release ({commit, state}, params) {
        Article.get({id: params.id, action: 'release', id2: params.id2}).then(response => {
            if (response.body.Success) {
                commit('SET_ARTICLE_RELEASE', response.body.Data)
            }
        })
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
    },

    [SET_ARTICLE_RELEASE] (state, article) {
        state.article = article
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
