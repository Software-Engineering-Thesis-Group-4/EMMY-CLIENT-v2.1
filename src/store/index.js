import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

import EmotionModule from './modules/dailysentiment.js';
import EmployeesModule from './modules/employees.js';
import UserModule from './modules/user.js';
// TODO: Store module for 'Notifications'

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.localStorage,
	reducer: state => ({
		user: state.user,
	})
})

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		emotions: EmotionModule,
		employees: EmployeesModule,
		user: UserModule
	},
	plugins: [vuexLocalStorage.plugin]
})
