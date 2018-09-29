import { listArticle } from "@/api/article";

const article = {
    state: {
        articles: [],
        count: 0,
        page: 1,
        per_page: 50
    },
    mutations: {
        PUSH_ARTICLES (state, articles) {
            state.articles.push(...articles);
        },
        SET_COUNT (state, count) {
            state.count = count;
        },
        SET_PAGE (state, page) {
            state.page = page;
        }
    },
    actions: {
        GetArticles({ commit, state }) {
            return new Promise((resolve, reject) => {
                listArticle({page: state.page, per_page: state.per_page}).then(res => {
                    commit("PUSH_ARTICLES", res.data.articles);
                    commit("SET_COUNT", res.data.count);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}

export default article;
