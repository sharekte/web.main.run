import LocalStore from 'store'

import { SAVE_TOKEN, SAVE_USER } from '../mutation-types'
import { User } from '@/resource'

const state = {
    token: '',
    user: {},
}

const getters = {
    getToken: (state) => {
        return state.token
    }
    //getToken: state => state.token
}

const actions = {
    login ({commit, state}, data) {
        User.save({action: 'login'}, data).then(response => {
            if (response.body.success) {
                commit('SAVE_TOKEN', response.body.data.token)
                LocalStore.set('Token', response.body.data.token)
            }
        })
    },
    set_token ({commit, state}, token) {
        commit('SAVE_TOKEN', token)
    }
}

const mutations = {
    [SAVE_TOKEN] (state, token) {
        state.token = token
    },
    [SAVE_USER] (state, user) {
        state.user = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
