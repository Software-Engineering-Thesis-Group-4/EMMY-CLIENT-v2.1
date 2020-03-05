import Vue from 'vue'
import Vuex from 'vuex'

import EmotionModule from './modules/dailysentiment.js';
import EmployeesModule from './modules/employees.js';
import UserModule from './modules/user.js';

Vue.use(Vuex)

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
	}
})
