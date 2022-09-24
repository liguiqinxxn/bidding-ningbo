import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {
      lenvel: "1",
      uid: "1",
      info: "浙江省工程勘察院",
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
