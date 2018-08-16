import {
  SET_COLLECTS,
  PUSH_COLLECTS,
  SET_COLLECT,
  SET_CURRENT_COLLECT_ID,
  ADD_PAGE,
  SET_COUNT,
  HAS_MORE,
  HAS_UPDATE,
  HAS_UPDATE_RESET,
  SET_COLLECT_NAME,
  SET_COLLECT_DESCRIPTION,
  SET_ARTICLES
} from "../mutation-types";
import { Collect } from "@/resource";

const state = {
  collects: [],
  page: 1,
  count: 0,
  hasMore: true,

  collect: {},

  currentCollectId: "",

  has_update: 0,

  articles: []
};

const getters = {
  getCollects: state => {
    return state.collects;
  },
  hasCollects: state => {
    return state.hasMore;
  },
  getCollect: state => {
    return state.collect;
  },
  getCurrentCollectId: state => {
    return state.currentCollectId;
  },
  hasCollectUpdate: state => {
    return state.has_update > 0;
  },
  getCollectCount: state => {
    return state.count;
  }
};

const actions = {
  get_collects({ commit, state }) {
    Collect.get({ page: 1, per_page: 20 }).then(response => {
      if (response.body.success) {
        commit("SET_COLLECTS", response.body.data.collects);
        commit("SET_COUNT", response.body.data.count);
        commit("ADD_PAGE");
      }
    });
  },
  get_collects_more({ commit, state }) {
    Collect.get({ page: state.page, per_page: 20 }).then(response => {
      if (response.body.success) {
        commit("PUSH_COLLECTS", response.body.data.collects);
        commit("SET_COUNT", response.body.data.count);
        commit("ADD_PAGE");
      }
    });
  },
  get_collect({ commit, state }, params) {
    Collect.get({ id: params.id }).then(response => {
      if (response.body.success) {
        commit("SET_COLLECT", response.body.data);
      }
    });
  },
  new_collect({ commit, state }, params) {
    Collect.save({}, params).then(response => {
      if (response.body.success) {
        commit("SET_CURRENT_COLLECT_ID", response.body.data.collect_id);
        commit("HAS_UPDATE");
      }
    });
  },
  update_collect({ commit, state }, params) {
    Collect.update({ id: state.collect.id }, params).then(response => {
      if (response.body.success) {
        commit("SET_CURRENT_COLLECT_ID", response.body.data.collect_id);
        commit("HAS_UPDATE");
      }
    });
  },
  has_update_reset({ commit, state }) {
    commit("HAS_UPDATE_RESET");
  },
  push_articles_to_collect({ commit, state }, params) {},
  pop_articles_from_collect({ commit, state }, params) {},
  get_articles_by_collect({ commit, state }, params) {
    Collect.get({ id: params.id, action: "articles" }).then(response => {
      console.log(response);
      if (response.body.success) {
        commit("SET_ARTICLES", response.body.data.articles);
      }
    });
  }
};

const mutations = {
  [SET_COLLECTS](state, collects) {
    // refrash
    state.page = 1;
    state.count = 0;
    state.hasMore = true;

    state.collects = collects;
  },

  [PUSH_COLLECTS](state, collects) {
    state.collects.push(...collects);
  },

  [ADD_PAGE](state) {
    state.page += 1;
  },

  [SET_COUNT](state, count) {
    state.count = count;

    if (state.collects.length == state.count && state.count != 0) {
      state.hasMore = false;
    }
  },

  // [HAS_MORE] (state, hasMore) {
  //     state.hasMore = hasMore
  // },

  [SET_COLLECT](state, collect) {
    state.collect = collect;
  },

  [SET_CURRENT_COLLECT_ID](state, id) {
    state.currentCollectId = id;
  },

  [HAS_UPDATE](state) {
    state.has_update += 1;
  },

  [HAS_UPDATE_RESET](state) {
    state.has_update = 0;
  },

  [SET_COLLECT_NAME](state, name) {
    state.collect.name = name;
  },

  [SET_COLLECT_DESCRIPTION](state, description) {
    state.collect.description = description;
  },

  [SET_ARTICLES](state, articles) {
    state.articles = articles;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
