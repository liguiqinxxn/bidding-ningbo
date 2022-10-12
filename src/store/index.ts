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
  },
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {},
  modules: {},
});
