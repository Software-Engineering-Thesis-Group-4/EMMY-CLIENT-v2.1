import Vue from 'vue';

const EmotionModule = {
	namespaced: true,
	state: {
		employeeLog: "",
		employee: "",
		status: "",
		message: "",
	},
	mutations: {
		SOCKET_employeeLog(state, { reference, employee, status }) {
			state.employeeLog = reference;
			state.employee = employee;
			state.status = status;
		},
		SOCKET_logError(state, payload) {
			state.message = payload.message;
		},
		SOCKET_reset(state) {
			state.employeeLog = "";
			state.employee = "";
			state.status = "";
			state.message = "";
		},
		CLEAR(state) {
			state.employeeLog = "";
			state.employee = "";
			state.status = "";
			state.message = "";
		}
	},
	actions: {
		async SUBMIT_SENTIMENT(context, payload) {
			try {
				await Vue.axios.patch('/api/employeelogs/sentiment', payload);
			} catch (error) {
				console.log(error);
			}
		},
	},
	getters: {
		employee: state => state.employee,
		employeeLog: state => state.employeeLog,
		status: state => state.status,
		errorMessage: state => state.message,
	},
}

export default EmotionModule;