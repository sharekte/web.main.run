import { SET_ARTICLES, ADD_PAGE, SET_COUNT, HAS_MORE, SET_ARTICLE,
 SET_CURRENT_ARTICLE_ID} from '../mutation-types'
import { Article } from '@/resource'

const state = {
    articles: [],
    page: 1,
    count: 0,
    hasMore: true,

    article: {},

    currentArticleId: '',

    pic_next: 1
}

const getters = {
    getArticles: (state) => {
        return state.articles
    },
    hasMore: (state) => {
        return state.hasMore
    },
    getArticle: (state) => {
        return state.article
    },
    getCurrentArticleId: (state) => {
        return state.currentArticleId
    }
}

const actions = {
    get_articles ({commit, state}) {
        Article.get({page: state.page, per_page: 10}).then(response => {
            if (response.body.success) {
                commit('SET_ARTICLES', response.body.data.articles)
                commit('SET_COUNT', response.body.data.count)
                commit('ADD_PAGE')
            }
        })

        if ((state.articles.length == state.count) && state.count != 0) {
            commit('HAS_MORE', false)
        }
    },
    get_article ({commit, state}, params) {
        Article.get({id: params.id}).then(response => {
            if (response.body.success) {
                commit('SET_ARTICLE', response.body.data)
            }
        })
    },
    new_article ({commit, state}, params) {
        Article.save({}, params).then(response => {
            if (response.body.success) {
                commit('SET_CURRENT_ARTICLE_ID', response.body.data.article_id)
            }
        })
    },
    update_article ({commit, state}, params) {
        Article.update({id: state.article.id}, params).then(response => {
            if (response.body.success) {
                commit('SET_CURRENT_ARTICLE_ID', response.body.data.article_id)
            }
        })
    }
}

const mutations = {
    [SET_ARTICLES] (state, articles) {
        articles.forEach(function(value, index, array) {
            value.img = 'https://cdn1.01io.com/temp/' + state.pic_next + '.png'
            state.pic_next += 1
            if (state.pic_next > 12 ) {
                state.pic_next = 1
            }
        })

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

    [SET_ARTICLE] (state, article) {
        state.article = article
    },

    [SET_CURRENT_ARTICLE_ID] (state, id) {
        state.currentArticleId = id
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
