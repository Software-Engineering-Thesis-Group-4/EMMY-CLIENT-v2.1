import Vue from 'vue';

const NotificationsModule = {
	namespaced: true,
	state: {
		hasNew: false,
		emotion_notifications: [],
		crud_notifications: [],
	},
	mutations: {
		SOCKET_newEmotionNotification(state, payload) {
			console.log(`%c VUEX SOCKET: NEW SENTIMENT NOTIFICATION!`, 'color: lightgreen;');
			state.hasNew = true;
		},
		SOCKET_newCRUDNotification(state, payload) {
			console.log(`%c VUEX SOCKET: NEW CRUD NOTIFICATION!`, 'color: lightgreen;');
			state.hasNew = true;
		},
		LOAD_EMOTION_NOTIFICATIONS(state, payload) {
			state.emotion_notifications = payload;
		},
		LOAD_CRUD_NOTIFICATIONS(state, payload) {
			state.crud_notifications = payload
		},
		MARK_AS_READ(state) {
			console.log(`%c VUEX SOCKET: MARKED NOTIFICATIONS AS READ!`, 'color: lightgreen;');
			state.hasNew = false;
		}
	},
	actions: {
		async FETCH_NOTIFICATIONS_EMOTION(context) {
			try {
				let response = await Vue.axios.get('/api/users/emotion-notifications');

				if (response.data) {
					context.commit('LOAD_EMOTION_NOTIFICATIONS', response.data);
				} else {
					context.commit('LOAD_EMOTION_NOTIFICATIONS', [])
				}

				return true;

			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async FETCH_NOTIFICATIONS_CRUD(context) {
			try {
				let response = await Vue.axios.get('/api/users/crud-notifications');

				if (response.data) {
					context.commit('LOAD_CRUD_NOTIFICATIONS', response.data);
				} else {
					context.commit('LOAD_EMOTION_NOTIFICATIONS', [])
				}

				return true;

			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async MARK_AS_READ(context, payload) {
			try {
				// await Vue.axios.post('/api/users/seenEmotionNotifs', payload);
				context.commit('MARK_AS_READ')
			} catch (error) {
				console.log(error)
			}
		}
	},
	getters: {
		hasNew: state => state.hasNew,
		getEmotionNotifications: state => state.emotion_notifications,
		getCrudNotifications: state => state.crud_notifications,
		getUnreadNotifications: state => email => state.emotion_notifications.filter(notif => !notif.seenBy.includes(email)),

	},
}

export default NotificationsModule
