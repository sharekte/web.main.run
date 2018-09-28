import { listArticle } from "@/api/article";

const article = {
    state: {
        articles: [],
        count: 0,
        page: 1,
        per_page: 20
    },
    mutations: {
        PUSH_ARTICLES (state, articles) {
            state.articles.push(...articles);
        },
        SET_COUNT (state, count) {
            state.count = count;
        }
    },
    actions: {
        GetMore({ commit, state }) {
            return new Promise((resolve, reject) => {
                listArticle({page: state.page, per_page: state.per_page}).then(res => {
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}

export default article;
