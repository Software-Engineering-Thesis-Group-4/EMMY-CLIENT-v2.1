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
				v-if="isAdmin"
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
					@closeDialog="showAddEmployeeDialog = false"
					@addedNewEmployee="fetchEmployees"
				/>
			</v-dialog>

			<!-- Filters-->
			<v-menu
				offset-y
				:close-on-content-click="false"
				nudge-bottom="5px"
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
						v-model="filters.department"
						color="#5f7bbe"
						class="filter-combobox"
						label="Department"
						:items="departmentCategories"
						outlined
						dense
						@change="filter"
					></v-combobox>
					<v-combobox
						v-model="filters.gender"
						color="#5f7bbe"
						class="filter-combobox"
						label="Gender"
						:items="['Male', 'Female']"
						outlined
						dense
						@change="filter"
					></v-combobox>
					<v-combobox
						v-model="filters.employmentStatus"
						color="#5f7bbe"
						class="filter-combobox"
						label="Employment Status"
						:items="['Full-time', 'Part-time']"
						outlined
						dense
						@change="filter"
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
				<span>Employees: {{ this.employeeCount }}</span>
			</div>
		</div>

		<v-data-table
			ref="employeeList"
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
								:src="item.photo || 'placeholder_avatar02.png'"
								class="employee-image"
							></v-img>
						</div>
						{{ value }}
					</router-link>
				</div>
			</template>

			<template v-slot:item.employmentStatus="{ item, value }">
				<span
					class="employment_status_label"
					:class="{ 'fulltime-text': !!value }"
				>{{ !!value ? "Regular" : "Part-time" }}</span>
			</template>

			<template
				#header.actions
				v-if="!isAdmin"
			></template>

			<template #item.actions="{ item }">

				<div
					class="actions"
					v-if="isAdmin"
				>

					<!-- Edit Employee Details -->
					<button
						class="actions__button"
						@click="editEmployee(item)"
						:disabled="!isAdmin"
					>
						<v-icon>mdi-pencil</v-icon>
					</button>

					<!-- Delete employee -->
					<button
						@click="showConfirDeleteDialog(item)"
						class="actions__button"
						:disabled="!isAdmin"
					>
						<v-icon>mdi-delete</v-icon>
					</button>
				</div>

			</template>

		</v-data-table>

		<!-- Confirm Delete Dialog -->
		<v-dialog
			max-width="290"
			v-model="showDeleteDialog"
			@click:outside="confirmDelete(false)"
		>
			<v-card outlined>
				<v-card-title>Confirm Delete</v-card-title>
				<v-card-text>
					Are you sure you want to mark <strong>{{ terminatedEmployee.firstname }} {{ terminatedEmployee.lastname }}</strong> as terminated?
				</v-card-text>
				<v-card-actions>
					<v-btn
						text
						outlined
						@click="confirmDelete(false)"
					>Cancel</v-btn>
					<v-btn
						depressed
						color="error"
						@click="confirmDelete(true)"
					>Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Delete Snackbar -->
		<v-snackbar
			v-model="snackbar"
			:timeout="snackBarTimeOut"
		>
			<span>Employee Removed.</span>

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
import AddEmployeeForm from "@/components/Employees/AddEmployee/AddEmployee.vue";
import {
	options,
	loadTableData,
	filterData
} from "@/components/Employees/DataTable/options.js";

export default {
	components: {
		AddEmployeeForm
	},
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,

			employeeDataTableOptions: options,
			loadingEmployeeDataTable: false,

			// Add Employee
			departmentCategories: this.$store.state.employees.departments,
			showAddEmployeeDialog: false,

			// Filters
			filters: {
				department: null,
				gender: null,
				employmentStatus: null
			},

			// Confirm Delete Employee
			showDeleteDialog: false,
			terminatedEmployee: {},
			snackbar: false,
			snackBarTimeOut: 2000
		};
	},
	computed: {
		employeeCount: () => {
			return options.data.length;
		}
	},
	methods: {
		editEmployee(employee) {
			if (this.isAdmin) {
				alert("editEmployee() not implemented.");
			}
		},
		showConfirDeleteDialog(employee) {
			this.terminatedEmployee = employee;
			this.showDeleteDialog = true;
		},
		confirmDelete(confirm) {
			if (this.isAdmin) {
				// check if user is admin

				if (confirm) {
					// check if user confirms the deletion
					this.$store
						.dispatch(
							"employees/DELETE_EMPLOYEE",
							this.terminatedEmployee.id
						)
						.then(() => {
							this.snackbar = true;
						})
						.catch(() => {
							console.log("[SERVER ERROR] Unable to remove employee.");
						});
				}

				this.showDeleteDialog = false;
				this.terminatedEmployee = {};
			} else {
				console.log("Not authorized to perform action [DELETE]");
				this.showDeleteDialog = false;
				this.terminatedEmployee = {};
			}
		},
		fetchEmployees() {
			this.$store.dispatch("employees/FETCH_EMPLOYEES").then(employees => {
				loadTableData(employees);
			});
		},
		filter() {
			let { department, gender, employmentStatus } = this.filters;
			filterData(department, gender, employmentStatus);
		},
		clearFilter() {
			loadTableData(this.$store.getters["employees/employees"]);
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

.employment_status_label {
	color: #0000007c;
}

.fulltime-text {
	color: #2b5cff;
}

.actions {
	display: flex;
	flex-direction: row;
	align-items: center;
	// background-color: #ff00ff28;
}

.actions__button {
	::v-deep .v-icon {
		color: #c0c0c0;
		font-size: 20px;
	}

	&:hover {
		::v-deep .v-icon {
			color: #929292;
		}
	}

	&:disabled {
		cursor: not-allowed;
	}

	&:last-child {
		margin-left: 5px;
	}
}

::v-deep .v-dialog {
	border-radius: 0px;
	box-shadow: none;
}
</style>