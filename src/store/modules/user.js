import Vue from 'vue'
import moment from 'moment';

const UserModule = {
	namespaced: true,
	state: {
		username: null,
		firstname: null,
		lastname: null,
		email: null,
		isAdmin: false,
		photo: null,
		userId: null,
	},
	mutations: {
		AUTH_ERROR() {
			localStorage.clear();
		},
		AUTH_SUCCESS(state, user) {
			state.username = user.username;
			state.email = user.email;
			state.isAdmin = user.isAdmin;
			state.firstname = user.firstname;
			state.lastname = user.lastname;
			state.photo = user.photo;
			state.userId = user.userId
		},
		CLEAR(state) {
			state.username = null;
			state.firstname = null;
			state.lastname = null;
			state.email = null;
			state.isAdmin = false;
			state.photo = null;
			state.userId = null;

			localStorage.clear();
		},
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
				return { login_success: true, message: null };

			} catch (error) {
				console.log(`%c Login Failed. (${moment().format('LTS')})`, `color: red;`);
				context.commit('AUTH_ERROR');
				return { login_success: false, message: error.response.data };
			}
		},
		async LOGOUT({ commit, state }) {
			try {

				await Vue.axios.post('/auth/logout', {
					email: state.email,
					loggedInUsername: state.username,
					userId: state.userId,
					access_token: localStorage.getItem('access_token')
				});

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
						console.log(`%c Access token expired.(${moment().format('LTS')})`, 'color: yellow;');
						localStorage.setItem('access_token', response.data.token);
						console.log(`%c  Access Token Renewed.(${moment().format('LTS')})`, 'color: lightgreen;');
						console.log(`%c Token: ${localStorage.getItem('access_token')}`, 'color: cyan;')
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