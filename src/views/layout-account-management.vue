<template>
  <div class="main-container">
    <div>
      <div class="controls">
        <v-dialog v-model="showAddEmployeeForm" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <!-- Add Employee Button -->
            <button id="button-add-employee" v-on="on">
              <v-icon class="button-icon">mdi-plus</v-icon>Add New Employee
            </button>
          </template>
          <AddEmployeeForm @close="closeAddEmployeeForm()" />
        </v-dialog>
      </div>
    </div>

    <v-data-table dark
      v-model="employeeDataTableOptions.selected"
      :headers="employeeDataTableOptions.headers"
      :items="employeeDataTableOptions.data"
      :loading="loadingEmployeeDataTable"
      loading-text="Loading... Please wait"
      item-key="id"
      show-select
      sort-by="role"
      class="elevation-1"
    >
      <template v-slot:items.name="{ item }">
        <router-link to>{{ item.name }}</router-link>
      </template>

      <template v-slot:item.actions="{ item }">
        <!-- Edit Employee Details -->
        <button class="action-button">
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
        <button class="action-button action-delete" @click="deleteEmployee(item)">
          <svg xmlns="http://www.w3.org/2000/svg" width="12.25" height="14" viewBox="0 0 12.25 14">
            <path
              d="M.875,12.687A1.312,1.312,0,0,0,2.187,14h7.875a1.312,1.312,0,0,0,1.312-1.312V3.5H.875Zm7.437-7a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0ZM11.812.875H8.531L8.274.363A.656.656,0,0,0,7.686,0H4.561a.649.649,0,0,0-.585.364L3.719.875H.437A.437.437,0,0,0,0,1.312v.875a.437.437,0,0,0,.437.437H11.812a.437.437,0,0,0,.437-.437V1.312A.437.437,0,0,0,11.812.875Z"
              transform="translate(0 0)"
              fill="#c5c5c5"
            />
          </svg>
        </button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AddEmployeeForm from "@/components/employees/AddEmployeeForm.vue";
import { options, loadTableData } from "@/components/employees/data-table-options/user_table.js";

export default {
	components: {
		AddEmployeeForm
	},
	data() {
		return {
			showAddEmployeeForm: false,
			employeeDataTableOptions: options,
			loadingEmployeeDataTable: false
		};
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
		closeAddEmployeeForm() {
			this.showAddEmployeeForm = false;
		},
		deleteEmployee(employee) {
			this.$store.dispatch("employees/DELETE_EMPLOYEE", employee.id);
		}
	},
	created() {
		this.$store.dispatch("employees/FETCH_EMPLOYEES").then(employees => {
			loadTableData(employees);
		});
	}
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  margin-top: 13px;
  margin-bottom: 5px;

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
}

.page-header {
  color: #707070;
}

.main-container {
  background: #26282b;
  height: 100vh;
}

.elevation-1 {
  background-color: #202224;
  
}

.theme--dark.v-data-table thead tr th {
  color: #57a48a;
}


#button-add-employee {
  background-color: #3ec497;

  display: flex;
  justify-content: flex-end;

	height: 40px;

	padding: 5px 15px;
	margin-left: 20px;

	font-weight: 500;
	color: white;
	border-radius: 5px;
}

.action-button {
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