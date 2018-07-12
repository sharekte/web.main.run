import { Article } from '@/resource'

const EDIT_SET_ARTICLES = 'EDIT_SET_ARTICLES'
const EDIT_PUSH_ARTICLES = 'EDIT_PUSH_ARTICLES'
const EDIT_SET_COUNT = 'EDIT_SET_COUNT'
const EDIT_ADD_PAGE = 'EDIT_ADD_PAGE'
const EDIT_SET_ARTICLE = 'EDIT_SET_ARTICLE'
const EDIT_SET_CURRENT_ARTICLE_ID = 'EDIT_SET_CURRENT_ARTICLE_ID'
const EDIT_SAVE_ARTICLE = 'EDIT_SAVE_ARTICLE'
const EDIT_UPDATE_TITLE = 'EDIT_UPDATE_TITLE'
const EDIT_UPDATE_CONTENT = 'EDIT_UPDATE_CONTENT'
const EDIT_EDSTORY = 'EDIT_EDSTORY'

const state = {
    articles: [],
    page: 1,
    count: 0,
    hasMore: true,
    
    article: {
        id: '',
        title: '',
        content: '',
        image: []
    }
}

const getters = {

}

const actions = {
    edit_get_articles　({commit, state}) {
        Article.get({ page: 1, per_page: 15 }).then(response => {
            if (response.body.success) {
                commit('EDIT_SET_ARTICLES', response.body.data.articles)
                commit('EDIT_SET_COUNT', response.body.data.count)
                commit('EDIT_ADD_PAGE')
            }
        })
    },
    edit_get_articles_more ({commit, state}) {
        Article.get({ page: state.page, per_page: 15 }).then(response => {
            if (response.body.success) {
                commit('EDIT_PUSH_ARTICLES', response.body.data.articles)
                commit('EDIT_SET_COUNT', response.body.data.count)
                commit('EDIT_ADD_PAGE')
            }
        })
    },
    edit_refresh_articles ({commit, state}, plus) {
        Article.get({ page: 1, per_page: state.articles.length + plus}).then(response => {
            if (response.body.success) {
                commit('EDIT_SET_ARTICLES', response.body.data.articles)
            }
        })
    },
    edit_get_article({commit, state}, id) {
        Article.get({ id: id }).then(response => {
            if (response.body.success) {
                console.log(response.body.data)
                commit('EDIT_SET_ARTICLE', response.body.data)
            }
        })
    },
    edit_save_article({dispatch, commit, state}) {
        if (state.article.id == '') {
            Article.save({}, state.article).then(response => {
                if (response.body.success) {
                    commit('EDIT_SET_CURRENT_ARTICLE_ID', response.body.data.article_id)
                    dispatch('edit_refresh_articles', 1)
                }
            })
        } else {
            Article.update({ id: state.article.id }, state.article).then(response => {
                if (response.body.success) {
                    commit('EDIT_SET_CURRENT_ARTICLE_ID', response.body.data.article_id)
                    dispatch('edit_refresh_articles', 0)
                }
            })
        }
    }
}

const mutations = {
    [EDIT_SET_ARTICLES] (state, articles) {
        state.page = 1
        state.count = 0
        state.hasMore = true

        state.articles = articles
    },

    [EDIT_PUSH_ARTICLES] (state, articles) {
        state.articles.push(...articles)
    },

    [EDIT_ADD_PAGE](state) {
        state.page += 1
    },

    [EDIT_SET_COUNT](state, count) {
        state.count = count

        if ((state.articles.length == state.count) && state.count != 0) {
            state.hasMore = false
        }
    },

    [EDIT_SET_ARTICLE](state, article) {
        state.article = article
    },

    [EDIT_SET_CURRENT_ARTICLE_ID](state, id) {
        state.article.id = id
    },

    [EDIT_UPDATE_TITLE](state, title) {
        state.article.title = title
    },

    [EDIT_UPDATE_CONTENT](state, content) {
        state.article.content = content
    },

    [EDIT_EDSTORY](state) {
        state.article = {
            id: '',
            title: '',
            content: '',
            image: []
        }
    }
    
}

export default {
    state,
    getters,
    actions,
    mutations
}
