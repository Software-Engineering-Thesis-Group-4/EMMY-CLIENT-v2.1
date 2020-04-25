import Vue from 'vue';
import { loadTableData } from '../../components/employees/data-table-options/data_table';
import { loadEmployeeLogs } from "../../components/attendance-logs/data_table";

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
			"Human Resources ",
			"Office of Student Affairs",
			"Office of Student Experience and Advancement ",
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
			loadEmployeeLogs(state.attendanceLogs);
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
				let logs = response.data.filter(item => !item.deleted);
				context.commit('LOAD_ATTENDANCELOGS', logs);
				return logs;

			} catch (error) {
				console.error(error);
			}
		},
		async ADD_EMPLOYEE(context, formData) {
			try {
				let response = await Vue.axios.post(`/api/employees/enroll`, formData);
				console.log(response);
				context;
			} catch (error) {
				console.error(error.response.data);
			}
		},
		async DELETE_EMPLOYEE(context, id) {
			try {
				Vue.axios.delete(`/api/employees/${id}`);
				context.commit('DELETE_EMPLOYEE', id);
			} catch (error) {
				console.error(error.response.data);
			}
		},
		async DELETE_EMPLOYEELOG(context, id) {
			try {
				Vue.axios.delete(`/api/employeelogs/${id}`);
				context.commit('DELETE_EMPLOYEELOG', id);
			} catch (error) {
				console.error(error.response.data);
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
		getEmployee: (state) => (id) => {
			return state.employees.find(employee => employee.employeeId === id)
		}
	}
}

export default EmployeesModule