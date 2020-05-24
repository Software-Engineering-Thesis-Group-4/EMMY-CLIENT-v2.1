import Vue from 'vue';

const NotificationsModule = {
	namespaced: true,
	state: {
		emotion_notifications: [],
		crud_notifications: [],
	},
	mutations: {
		SOCKET_newEmotionNotification(state, payload) {
			// TODO: (SERVER SIDE) emit a socket event in server side when a new emotion notification is created.
		},
		SOCKET_newCRUDNotification(state, payload) {
			// TODO: (SERVER SIDE) emit a socket event in server side when a new crud notification is created.
		},
		LOAD_ALL_NOTIFICATIONS(state, payload) {
			// TODO: (SERVER SIDE) create an API for fetching ALL types of notifications
		},
		LOAD_EMOTION_NOTIFICATIONS(state, payload) {
			state.emotion_notifications = payload;
		},
		LOAD_CRUD_NOTIFICATIONS(state, payload) {
			state.crud_notifications = payload
		}
	},
	actions: {
		async FETCH_ALL_NOTIFICATIONS() {
			// TODO: (SERVER SIDE) create an API for fetching ALL types of notifications
			console.log(
				`%c TODO: fetch all notifications [VUEX ACTION]!`,
				`color: lightgreen;`
			);

			return true;
		},
		async FETCH_NOTIFICATIONS_EMOTION(context) {
			try {
				let response = await Vue.axios.get('/api/users/emotion-notifications');

				if (response.data && typeof response.data === 'object') {
					context.commit('LOAD_EMOTION_NOTIFICATIONS', response.data);
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

				if (response.data && typeof response.data === 'object') {
					context.commit('LOAD_CRUD_NOTIFICATIONS', response.data);
				}

				return true;

			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
	getters: {
		hasUnreadNotifications: state => false, // TODO: create a getter for determining if there are unread notifications (will be used in TopHeader notification bell icon)
	},
}

export default NotificationsModule