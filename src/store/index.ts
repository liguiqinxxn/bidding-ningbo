import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {
      uid: "",
      level: "",
      logo: "",
      info: "",
      name: "",
    },
    keyword: "",
    isFloating: false,
  },
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = value;
    },
    setKeyword(state, value) {
      state.keyword = value;
    },
    setIsFloating(state, value) {
      state.isFloating = value;
    },
  },
  actions: {},
  modules: {},
});
