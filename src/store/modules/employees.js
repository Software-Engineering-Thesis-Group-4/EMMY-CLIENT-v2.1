import Vue from 'vue';
import { loadTableData } from '../../components/employees/data-table-options/data_table.js';

const EmployeesModule = {
	namespaced: true,
	// --------------------------------------------------------------------------------------------------
	state: {
		employees: [],
		attendanceLogs: [],
	},
	// --------------------------------------------------------------------------------------------------
	mutations: {
		LOAD_EMPLOYEES(state, employees) {
			state.employees = employees;
		},
		LOAD_ATTENDANCELOGS(state, attendanceLogs) {
			state.attendanceLogs = attendanceLogs;
		},
		DELETE_EMPLOYEE(state, employee) {
			state.employees = state.employees.filter(item => item._id !== employee._id);
			loadTableData(state.employees);
		}
	},
	// --------------------------------------------------------------------------------------------------
	actions: {
		async FETCH_EMPLOYEES(context) {

			try {
				let response = await Vue.axios.get('/api/employees');
				context.commit('LOAD_EMPLOYEES', response.data);
				return response.data;

			} catch (error) {
				console.error(error);
			}

		},
		async FETCH_ATTENDANCELOGS(context) {
			try {
				let response = await Vue.axios.get('/api/employeelogs');
				context.commit('LOAD_ATTENDANCELOGS', response.data);
				return response.data;

			} catch (error) {
				console.error(error);
			}
		},
		async DELETE_EMPLOYEE(context, id) {
			try {

				Vue.axios.delete(`/api/employees/${id}`);
				context.commit('DELETE_EMPLOYEE', id);

			} catch (error) {
				console.error(error);
				// TODO: create and show an error banner when an error occurs
			}
		},
		// TODO: create "Add Employee" functionality
		/* async ADD_EMPLOYEE(context, employee) {
			 try {
				  let response = await Vue.axios.post(`/api/employees/enroll`)
			 } catch (error) {
				  
			 }
		} */
	},
	// --------------------------------------------------------------------------------------------------
	getters: {
		employees: state => {
			return state.employees
		},
		attendanceLogs: state => {
			return state.attendanceLogs
		}
	}
}

export default EmployeesModule