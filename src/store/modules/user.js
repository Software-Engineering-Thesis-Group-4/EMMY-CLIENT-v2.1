import Vue from 'vue'
import moment from 'moment';

const UserModule = {
	namespaced: true,
	state: {
		error: null,
		username: null,
		firstname: null,
		lastname: null,
		email: null,
		isAdmin: false,
		photo: null,
	},
	mutations: {
		AUTH_ERROR(state, message) {
			state.error = message;
			localStorage.clear();
		},
		AUTH_SUCCESS(state, user) {
			state.error = "";
			state.username = user.username;
			state.email = user.email;
			state.isAdmin = user.isAdmin;
			state.firstname = user.firstname;
			state.lastname = user.lastname;
			state.photo = user.photo;
		},
		CLEAR(state) {
			state.error = null;
			state.username = null;
			state.firstname = null;
			state.lastname = null;
			state.email = null;
			state.isAdmin = false;
			state.photo = null;

			localStorage.clear();
		}
	},
	actions: {
		// TODO: Implement fetching of users
		/* async FETCH_USERS(context) {
			try {
				let response = await Vue.axios.get('/api/')
			} catch (error) {
				
			}
		}, */
		async LOGIN(context, { email, password }) {
			try {

				const response = await Vue.axios.post('/auth/login', { email, password });
				context.commit('AUTH_SUCCESS', response.data);

				// store access token in localStorage
				localStorage.setItem('access_token', response.data.token);

				console.log(`%c Login Success.`, `color: lightgreen;`);
				return true;

			} catch (error) {
				console.log(`%c Login Failed. (${moment().format('LTS')})`, `color: red;`);
				context.commit('AUTH_ERROR', error.response.data);
				return false;
			}
		},
		async LOGOUT({ commit, state }) {
			try {
				await Vue.axios.post('/auth/logout', { email: state.email });
				commit('CLEAR');

				console.log(`%c Logged Out.`, `color: lightgreen;`);
				return true;

			} catch (error) {
				console.log(`%c Logout Error. ${error.response.data}. (${moment().format('LTS')})`, "color: red;");
				return false;
			}
		},
		async VERIFY({ commit, state }) {
			try {
				let access_token = localStorage.getItem('access_token');
				let email = state.email;

				let response = await Vue.axios.post('/auth/verify', { access_token, email });

				if (response.status === 200) {
					if (response.data.token) {
						localStorage.setItem('access_token', response.data.token);
						return true;
					}
					return true;
				}

				return false;

			} catch (error) {
				console.log(`%c ${error.response.data} (${moment().format('LTS')})`, 'color:red;');
				commit('CLEAR');
				return false;
			}
		}
	},
	getters: {
		errorMessage: state => state.error,
		fullname: state => `${state.firstname} ${state.lastname}`,
		username: state => state.username,
		email: state => state.email,
		role: state => (state.isAdmin ? 'Administrator' : 'Standard User'),
	}
}

export default UserModule;