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
            if (response.body.Success) {
                commit('SAVE_TOKEN', response.body.Data.Token)
                LocalStore.set('Token', response.body.Data.Token)
            }
        })
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
