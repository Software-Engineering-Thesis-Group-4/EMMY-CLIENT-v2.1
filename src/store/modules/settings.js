import Vue from 'vue';

const SettingsModule = {
	namespaced: true,
	state: {

		// Department Settings
		departments: [
			"Admissions",
			"Registrar",
			"Finance",
			"Human Resources",
			"Office of Student Affairs",
			"Office of Student Experience and Advancement",
			"Office of the President",
			"Office of the COO",
			"IT",
			"Corporate Communications",
			"Purchasing",
			"Admin and Facilities",
			"Academics College",
			"Academics SHS",
			"Clinic",
		],

		// Auto email
		auto_email: true,
		auto_email_template: ``,

		// Database Backup
		backup_schedule: null,
	},
	mutations: {
		LOAD_APP_SETTINGS(state, payload) {
			state.auto_email = payload.autoEmailButton;
			state.auto_email_template = payload.emailTemplateTemplate;
		}
	},
	actions: {
		async FETCH_SETTINGS_STATE(context) {
			try {
				let response = await Vue.axios.get('/api/admin', {
					params: {
						userId: context.rootState.user.userId,
						loggedInUsername: context.rootState.user.username,
						access_token: localStorage.getItem('access_token'),
					}
				});

				if (response.status === 200) {
					context.commit('LOAD_APP_SETTINGS', response.data);
					return true;
				}

			} catch (error) {
				console.error(error);
				return false;
			}
		},
		async UPDATE_AUTO_EMAIL(context, payload) {
			try {
				let response = await Vue.axios.post('/api/admin/change-autoemail-status', {
					userId: context.rootState.user.userId,
					loggedInUsername: context.rootState.user.username,
					access_token: localStorage.getItem('access_token'),
					autoEmailStatus: payload
				});

				if (response.status === 200) {
					alert(response.data)
				}
			} catch (error) {
				console.error(error)
			}
		}
	},
	getters: {
		autoEmail: state => state.auto_email
	}
}

export default SettingsModule