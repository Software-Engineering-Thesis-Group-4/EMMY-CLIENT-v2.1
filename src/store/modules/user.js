import Vue from 'vue'

const UserModule = {
	namespaced: true,
	state: {
		error: null,
		username: null,
		email: null,
		isAdmin: false,
	},
	mutations: {
		AUTH_ERROR(state, message) {
			state.error = message;
			localStorage.clear();
		},
		AUTH_SUCCESS(state, payload) {
			state.error    = "";
			state.username = payload.username;
			state.email    = payload.email;
			state.isAdmin  = payload.isAdmin

			// store access token in localStorage
			localStorage.setItem('access_token', payload.token);
		},
		CLEAR(state) {
			state.error = null;
			state.username = null;
			state.email = null;
			state.isAdmin = false;
			localStorage.clear();
		}
	},
	actions: {
		// TODO: Implement fetching of users
		// async FETCH_USERS(context) {
		// 	try {
		// 		let response = await Vue.axios.get('/api/')
		// 	} catch (error) {
				
		// 	}
		// },
		async LOGIN(context, { email, password }) {
			try {

				let response = await Vue.axios.post('/auth/login', { email, password });
				context.commit('AUTH_SUCCESS', response.data);

				return true;

			} catch (error) {
				console.log(error.response.data);
				context.commit('AUTH_ERROR', error.response.data);
				return false;
			}
		},
		LOGOUT() {

		},
		async VERIFY({ commit, state }) {
			try {
				let access_token = localStorage.getItem('access_token');
				let email = state.email;

				let response = await Vue.axios.post('/auth/verify', { access_token, email });

				if (response.status === 200) {
					return true;
				}

				return false;

			} catch (error) {
				console.log(error.response.data);
				commit('CLEAR');
				return false;
			}
		}
	},
	getters: {
		errorMessage: state => state.error,
		username: state => state.username,
		email: state => state.email,
	}
}

export default UserModule;