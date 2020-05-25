import Vue from 'vue';
import { loadTableData } from '@/components/Employees/DataTable/options.js';

const EmployeesModule = {
	namespaced: true,
	// --------------------------------------------------------------------------------------------------
	state: {
		employees: [],
		attendanceLogs: [],
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
		]
	},
	// --------------------------------------------------------------------------------------------------
	mutations: {
		LOAD_EMPLOYEES(state, employees) {
			state.employees = employees;
		},
		LOAD_ATTENDANCELOGS(state, attendanceLogs) {
			state.attendanceLogs = attendanceLogs
		},
		DELETE_EMPLOYEE(state, id) {
			state.employees = state.employees.filter(item => item._id !== id);
			loadTableData(state.employees);
		},
		DELETE_EMPLOYEELOG(state, id) {
			state.attendanceLogs = state.attendanceLogs.filter(item => item._id !== id);
		}
	},
	// --------------------------------------------------------------------------------------------------
	actions: {
		async FETCH_EMPLOYEES(context, state) {
			try {
				let response = await Vue.axios.get('/api/employees', {
					params: {
						userId: context.rootState.user.userId,
						access_token: localStorage.getItem('access_token')
					}
				});

				context.commit('LOAD_EMPLOYEES', response.data);
				return response.data;

			} catch (error) {
				console.dir(error);
			}

		},
		async FETCH_ATTENDANCELOGS(context, state) {
			try {
				let response = await Vue.axios.get('/api/employeelogs', {
					params: {
						userId: context.rootState.user.userId,
						access_token: localStorage.getItem('access_token')
					}
				});

				if (typeof response.data === 'object') {
					let logs = response.data.filter(item => !item.deleted);
					context.commit('LOAD_ATTENDANCELOGS', logs);
					return logs;
				}

				return [];

			} catch (error) {
				console.error(error);
			}
		},
		async ADD_EMPLOYEE(context, formData) {
			try {
				let response = await Vue.axios.post(`/api/employees/enroll`, {
					userId: context.rootState.user.userId,
					access_token: localStorage.getItem('access_token'),
					...formData
				});
				console.log(response);
				context;
			} catch (error) {
				console.error(error.response.data);
			}
		},
		async DELETE_EMPLOYEE(context, id) {
			try {
				Vue.axios.delete(`/api/employees/${id}`, {
					params: {
						userId: context.rootState.user.userId,
						access_token: localStorage.getItem('access_token'),
					}
				});
				context.commit('DELETE_EMPLOYEE', id);
			} catch (error) {
				console.error(error.response.data);
			}
		},
		async DELETE_EMPLOYEELOG(context, id) {
			try {
				await Vue.axios.delete(`/api/employeelogs/${id}`, {
					params: {
						userId: context.rootState.user.userId,
						access_token: localStorage.getItem('access_token'),
					}
				});
				context.commit('DELETE_EMPLOYEELOG', id);
				return true;

			} catch (error) {
				console.error(error.response.data);
				return false;
			}
		}
	},
	// --------------------------------------------------------------------------------------------------
	getters: {
		employees: state => {
			return state.employees
		},
		attendanceLogs: state => {
			return state.attendanceLogs
		},
		getEmployee: state => id => {
			let employee = state.employees.find(item => item.employeeId === id);
			if (employee) {
				return employee;
			}

			return {};
		},
	}
}

export default EmployeesModule