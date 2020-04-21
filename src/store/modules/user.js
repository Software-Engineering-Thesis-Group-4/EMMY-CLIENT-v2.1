import Vue from 'vue'

const UserModule = {
	namespaced: true,
	state: {
		error: null,
		username: null,
		email: null,
	},
	mutations: {
		AUTH_ERROR(state, message) {
			state.error = message;
			localStorage.clear();
		},
		AUTH_SUCCESS(state, payload) {
			state.error = null;
			state.username = payload.username;
			state.email = payload.email;

			localStorage.setItem('auth_token', payload.token);
		},
		CLEAR(state) {
			state.error = null;
			state.username = null;
			state.email = null;
			localStorage.clear();
		}
	},
	actions: {
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
				// console.log(response);
				return response;

			} catch (error) {
				// console.dir(error.response);
				context.commit('AUTH_ERROR', error.response.data);
			}
		},
		LOGOUT() {

		},
		async VERIFY(context, token) {
			try {
				let response = await Vue.axios.post('/auth/verify', { token });

				if (response.status === 200) {
					return true;
				} else {
					return false;
				}

			} catch (error) {
				context.commit('CLEAR')
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