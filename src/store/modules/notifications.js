import Vue from 'vue';

const NotificationsModule = {
	namespaced: true,
	state: {
		emotion_notifications: [],
		crud_notifications: [],
	},
	mutations: {
		LOAD_EMOTIONS_NOTIFS(state, items) {
			state.emotion_notifications = items;
		},
		LOAD_CRUD_NOTIFS(state, items) {
			state.crud_notifications = items;
		},
	},
	actions: {
		async FETCH_ALL() {
			let response = Vue.axios.get('');
		},
	},
	getters: {
		hasNotifications: (state) => {
			if (state.emotion_notifications.length > 0 || state.crud_notifications.length > 0) {
				return true
			}

			return false;
		}
	}
}