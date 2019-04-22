import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions : []
  },
  mutations: {
    fetchQuestion(state, payload) {
      state.questions = payload
    }
  },
  actions: {
    fetchQuestion(context, payload) {
        context.commit('fetchQuestion', payload)
    
    }
  },
});
