import Vue from 'vue'
import Vuex from 'vuex'

import EmotionModule from './modules/module.dailysentiment.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    emotions: EmotionModule
  }
})
