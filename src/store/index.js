import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

import EmotionModule from './modules/dailysentiment';
import EmployeesModule from './modules/employees';
import UserModule from './modules/user';
import NotificationsModule from './modules/notifications';
import SettingsModule from './modules/settings';

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
		user: UserModule,
		notifications: NotificationsModule,
		settings: SettingsModule
	},
	plugins: [vuexLocalStorage.plugin]
})
