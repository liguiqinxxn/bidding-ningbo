import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {
    },
  },
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {},
  modules: {},
});
