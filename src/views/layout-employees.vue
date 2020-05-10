<template>
	<div>
		<div class="controls">

			<!-- Search -->
			<div class="search-field">
				<v-autocomplete
					:search-input.sync="employeeDataTableOptions.search"
					clearable
					hide-no-data
					color="#779AEC"
					label="Search Employees"
					prepend-icon="mdi-database-search"
				></v-autocomplete>
			</div>

			<!-- Add Employee -->
			<v-dialog
				max-width="600px"
				v-model="showAddEmployeeDialog"
			>
				<template v-slot:activator="{ on }">
					<button
						id="button-add-employee"
						v-on="on"
					>
						<v-icon class="button-icon">mdi-plus</v-icon>Add New Employee
					</button>
				</template>

				<AddEmployeeForm
					@closeDialog="toggleAddEmployeeDialog"
					@addedNewEmployee="fetchEmployees"
				/>
			</v-dialog>

			<!-- Filters-->
			<v-menu
				offset-y
				:close-on-content-click="false"
			>
				<template v-slot:activator="{ on }">
					<button
						id="button-filters"
						v-on="on"
					>
						<v-icon class="button-icon">mdi-filter</v-icon>Filters
						<v-icon class="button-icon-right">mdi-chevron-down</v-icon>
					</button>
				</template>

				<v-form
					@submit.prevent
					ref="filterDropdown"
					class="filter-menu-container"
				>
					<v-combobox
						color="#5f7bbe"
						class="filter-combobox"
						label="Department"
						:items="departmentCategories"
						outlined
						dense
						clearable
						@change="filterData"
					></v-combobox>
					<v-combobox
						color="#5f7bbe"
						class="filter-combobox"
						label="Gender"
						:items="['Male', 'Female']"
						outlined
						dense
						clearable
						@change="filterData"
					></v-combobox>
					<v-combobox
						color="#5f7bbe"
						class="filter-combobox"
						label="Employment Status"
						:items="['Full-time', 'Part-time']"
						outlined
						dense
						clearable
						@change="filterData"
					></v-combobox>

					<button
						class="button-clear-filters"
						@click="clearFilter"
					>
						Reset
					</button>
				</v-form>
			</v-menu>

			<!-- Employee Count -->
			<div class="employee-count">
				<span>Employee count: {{ this.employeeCount }}</span>
			</div>
		</div>

		<v-data-table
			v-model="employeeDataTableOptions.selected"
			:headers="employeeDataTableOptions.headers"
			:items="employeeDataTableOptions.data"
			:search="employeeDataTableOptions.search"
			:loading="loadingEmployeeDataTable"
			loading-text="Loading... Please wait"
			item-key="id"
			sort-by="name"
			class="elevation-1"
		>
			<template v-slot:item.name="{ item, value }">
				<div class="employee">
					<router-link
						:to="{ path: `/employee/${item.employeeId}`}"
						class="employee-link"
					>
						<div class="employee-photo">
							<v-img
								:src="item.photo || 'default.jpg'"
								class="employee-image"
							></v-img>
						</div>
						{{ value }}
					</router-link>
				</div>
			</template>

			<template v-slot:item.actions="{ item }">
				<!-- Edit Employee Details -->
				<button
					class="action-button"
					@click="editEmployee(item)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15.865"
						height="14.1"
						viewBox="0 0 15.865 14.1"
					>
						<path
							d="M11.089,2.389l2.484,2.484a.269.269,0,0,1,0,.38L7.558,11.269,5,11.553a.536.536,0,0,1-.592-.592L4.694,8.4l6.016-6.016a.269.269,0,0,1,.38,0Zm4.462-.631L14.207.414a1.077,1.077,0,0,0-1.52,0l-.975.975a.269.269,0,0,0,0,.38L14.2,4.254a.269.269,0,0,0,.38,0l.975-.975A1.077,1.077,0,0,0,15.552,1.758ZM10.577,9.633v2.8H1.763V3.623h6.33a.339.339,0,0,0,.234-.1l1.1-1.1a.331.331,0,0,0-.234-.565H1.322A1.322,1.322,0,0,0,0,3.182v9.7A1.322,1.322,0,0,0,1.322,14.2h9.7a1.322,1.322,0,0,0,1.322-1.322V8.531a.331.331,0,0,0-.565-.234l-1.1,1.1A.339.339,0,0,0,10.577,9.633Z"
							transform="translate(0 -0.1)"
							fill="#c5c5c5"
						/>
					</svg>
				</button>

				<!-- Delete employee -->
				<button
					class="action-button action-delete"
					@click="deleteEmployee(item)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12.25"
						height="14"
						viewBox="0 0 12.25 14"
					>
						<path
							d="M.875,12.687A1.312,1.312,0,0,0,2.187,14h7.875a1.312,1.312,0,0,0,1.312-1.312V3.5H.875Zm7.437-7a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0ZM11.812.875H8.531L8.274.363A.656.656,0,0,0,7.686,0H4.561a.649.649,0,0,0-.585.364L3.719.875H.437A.437.437,0,0,0,0,1.312v.875a.437.437,0,0,0,.437.437H11.812a.437.437,0,0,0,.437-.437V1.312A.437.437,0,0,0,11.812.875Z"
							transform="translate(0 0)"
							fill="#c5c5c5"
						/>
					</svg>
				</button>
			</template>
		</v-data-table>

		<v-snackbar
			v-model="snackbar"
			:timeout="snackBarTimeOut"
		>
			{{ text }}
			<v-btn
				color="#779AEC"
				text
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import AddEmployeeForm from "@/components/Employees/AddEmployeeForm.vue";
import {
	options,
	loadTableData
} from "@/components/Employees/DataTable/options.js";

export default {
	data() {
		return {
			employeeDataTableOptions: options,
			loadingEmployeeDataTable: false,
			showAddEmployeeDialog: false,
			departmentCategories: this.$store.state.employees.departments,
			snackbar: false,
			text: "Employee Removed.",
			snackBarTimeOut: 2000
		};
	},
	components: {
		AddEmployeeForm
	},
	computed: {
		employeeCount: () => {
			return options.data.length;
		},
		employees() {
			let employees = options.data.map(employee => {
				return employee.name;
			});

			return employees;
		}
	},
	methods: {
		editEmployee(employee) {
			// TODO: Implement Edit Employee functionality
			employee;
			alert("TODO: Implement edit employee functionality");
		},
		deleteEmployee(employee) {
			// TODO: show a confirmation dialog to the user before commiting to make an employee as "terminated"
			this.$store
				.dispatch("employees/DELETE_EMPLOYEE", employee.id)
				.then(() => {
					this.snackbar = true;
				});
		},
		toggleAddEmployeeDialog() {
			this.showAddEmployeeDialog = false;
		},
		fetchEmployees() {
			this.$store.dispatch("employees/FETCH_EMPLOYEES").then(employees => {
				loadTableData(employees);
			});
		},
		filterData() {
			// TODO: Implement Filter Functionality
		},
		clearFilter() {
			this.$refs.filterDropdown.reset();
		}
	},
	created() {
		this.fetchEmployees();
	}
};
</script>

<style lang="scss" scoped>
.controls {
	// FOR DEBUGGING ---------------------------------------------
	// background-color: #00ffff42;
	// border: 1px dashed #0000003a;
	// -----------------------------------------------------------
	display: flex;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;

	.search-field {
		// background-color: #ff00002d;
		// border: 1px dashed lightslategray;
		display: flex;
		align-items: center;
		height: 58px;
		width: 400px;
		margin-top: 10px;
	}

	.button-icon {
		font-size: 16px;
		margin-right: 5px;
		margin-left: -5px;
		color: white;
		opacity: 0.6;
	}

	.button-icon-right {
		font-size: 18px;
		margin-left: 8px;
		color: white;
		opacity: 0.6;
	}

	.employee-count {
		// background-color: #7198f3;
		flex-grow: 1;
		align-self: flex-end;
		text-align: end;

		span {
			font-size: 14px;
			color: #aaaaaa;
		}
	}

	#button-add-employee {
		background-color: #7198f3;
		background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);

		display: flex;
		align-items: center;
		justify-content: center;

		height: 40px;

		padding: 5px 15px;
		margin-left: 20px;

		font-weight: 500;
		color: white;

		border: 1.5px solid #5f7bbe;
		border-radius: 5px;
		transition: filter 0.1s ease;

		&:hover {
			filter: brightness(0.95);
		}
	}

	#button-filters {
		background-color: #7198f3;
		background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);

		display: flex;
		align-items: center;
		justify-content: center;

		height: 40px;

		padding: 5px 9px 5px 15px;
		margin-left: 10px;

		font-weight: 500;
		color: white;

		border: 1.5px solid #5f7bbe;
		border-radius: 5px;
		transition: filter 0.1s ease;

		&:hover {
			filter: brightness(0.95);
		}
	}
}

.filter-menu-container {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px;
	width: 350px;

	.filter-combobox {
		width: 100%;
	}

	.button-clear-filters {
		background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);
		color: white;
		font-weight: 500;
		height: 40px;
		padding: 5px 15px;
		width: 100%;
		border: 1.5px solid #5f7bbe;
		border-radius: 5px;
		text-align: center;

		&:hover {
			filter: brightness(0.95);
		}
	}
}

.employee {
	// border: 1px dashed lightslategray;
	display: flex;
	align-items: center;
	height: max-content;
	min-height: 30px;

	.employee-link {
		display: flex;
		align-items: center;
		height: 20px;
		text-decoration: none;
		font-weight: 400;
		font-size: 15px;

		&:hover {
			text-decoration: underline;
		}

		.employee-photo {
			background-color: #e7e7e7;
			display: flex;
			height: 30px;
			width: 30px;
			border: 1px solid #bebebe;
			border-radius: 5px;
			overflow: hidden;
			margin-right: 10px;

			.employee-image {
				object-fit: contain;
				object-position: center;
				height: 100%;
			}
		}
	}
}

.action-button {
	// background-color: red;
	border: none;
	padding: 0px 5px;

	&:hover {
		cursor: pointer;
		filter: brightness(80%);
	}
}

.action-delete:hover path {
	filter: brightness(100%);
	fill: rgb(255, 140, 140);
}
</style>