import LocalStore from "store";
import { login } from "@/api/user";

const user = {
    state: {
        token: LocalStore.get("token"),
        user: {}
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token;
            LocalStore.set("token", token);
        },
        SET_USER (state, user) {
            state.user = user;
        }
    },
    actions: {
        Login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login({username, password}).then(res => {
                    commit("SET_TOKEN", res.data.token);
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            });
        }
    }
}

export default user;
