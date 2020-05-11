<template>
	<div>
		<div class="controls">
			<!-- Search Field ------------------------------------------------------------------------------------- -->
			<div class="search-field">
				<v-autocomplete
					:search-input.sync="dataTableOptions.search"
					color="#779AEC"
					clearable
					:hide-no-data="true"
					label="Search Employees"
					prepend-icon="mdi-database-search"
				></v-autocomplete>
			</div>

			<!-- Datepicker Field ------------------------------------------------------------------------------------- -->
			<div class="datepicker-field">
				<v-menu
					:close-on-content-click="false"
					transition="scale-transition"
					offset-y
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="dateRangeText"
							color="#779AEC"
							label="Date range filter"
							prepend-icon="mdi-calendar"
							readonly
							v-on="on"
						></v-text-field>
					</template>

					<v-date-picker
						v-model="dates"
						:max="maxDate"
						range
						color="#567DD8"
						@change="filterOnDateRange()"
					></v-date-picker>
				</v-menu>
			</div>

			<!-- Filters Button ------------------------------------------------------------------------------------- -->
			<v-menu
				offset-y
				:close-on-content-click="false"
			>
				<template v-slot:activator="{ on }">
					<button
						id="button-filters"
						v-on="on"
					>
						<v-icon class="button-icon">mdi-filter</v-icon> Filters
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

					<!-- TODO: Time in and out filter -->

					<button
						class="button-clear-filters"
						@click="clearFilter"
					>
						Reset
					</button>
				</v-form>
			</v-menu>

		</div>

		<v-data-table
			v-model="dataTableOptions.selected"
			:headers="dataTableOptions.headers"
			:items="dataTableOptions.data"
			:search="dataTableOptions.search"
			:loading="loadingEmployeeDataTable"
			loading-text="Loading... Please wait"
			item-key="id"
			multi-sort
			class="elevation-1"
		>
			<template v-slot:item.timeIn="{ item }">
				<div class="time">
					<img
						:src="getEmotionImagePath(item.emotionIn)"
						v-if="admin"
						class="emotion-log"
					/>{{ item.timeIn }}
				</div>
			</template>

			<template v-slot:item.timeOut="{ item }">
				<div
					v-if="item.timeOut"
					class="time"
				>
					<img
						:src="getEmotionImagePath(item.emotionOut, item.timeOut)"
						v-if="admin"
						class="emotion-log"
					/>{{ item.timeOut }}
				</div>

				<div
					v-else
					class="no-timeout"
				>
					--
				</div>
			</template>

			<template v-slot:item.employee="{ item, value }">
				<router-link :to="{ path: `/employee/${item.ref.employeeId}` }">{{ value }}</router-link>
			</template>

			<template v-slot:item.actions="{ item }">
				<button
					class="action-button"
					@click="editLog(item)"
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
				<button
					class="action-button action-delete"
					@click="deleteLog(item)"
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
	</div>
</template>

<script>
import moment from "moment";
import {
	options,
	loadEmployeeLogs
} from "@/components/DailyAttendanceLog/DataTable/options.js";

export default {
	data() {
		return {
			admin: true,
			dataTableOptions: options,
			loadingEmployeeDataTable: false,
			dates: [new Date().toISOString().substr(0, 10)],
			selectedItems: options.selected,
			departmentCategories: this.$store.state.employees.departments
		};
	},
	computed: {
		dateRangeText() {
			let today = new Date().toISOString().substr(0, 10);

			if (this.dates.length === 1) {
				if (this.dates[0] === today) {
					return "Today";
				}

				return moment(this.dates[0]).format("ll");
			} else if (this.dates.length === 2) {
				if (this.dates[0] === today) {
					return "Today";
				} else if (this.dates[0] === this.dates[1]) {
					return moment(this.dates[0]).format("ll");
				}

				let d1 = moment(this.dates[0]).format("ll");
				let d2 = moment(this.dates[1]).format("ll");

				return `${d1} - ${d2}`;
			}

			return "Invalid Date";
		},
		autocompleteItems() {
			let employees = options.data.map(item => {
				return item.employee;
			});

			return employees;
		},
		maxDate() {
			let today = moment().format();
			return today;
		}
	},
	methods: {
		getEmotionImagePath(emotion, timeOut) {
			if (timeOut === null) {
				return null;
			}

			return `/emotions/${emotion}.png`;
		},
		filterOnDateRange() {
			console.log("TODO: Implement Date Range Filter");
		},
		filterData() {},
		clearFilter() {
			this.$refs.filterDropdown.reset();
		},
		editLog(item) {
			item;
			// TODO: Implement edit log functionality
			alert(`TODO: Implement edit log functionality`);
		},
		deleteLog(item) {
			// TODO: make a confirmation dialog to confirm if the user wants to delete the sentiment log
			console.log(item);

			// item.id (is the objectId of the sentiment log)
			this.$store.dispatch("employees/DELETE_EMPLOYEELOG", item._id);
		}
	},
	created() {
		this.$store.dispatch("employees/FETCH_ATTENDANCELOGS").then(logs => {
			loadEmployeeLogs(logs);
		});
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

	.datepicker-field {
		// background-color: blue;
		height: 58px;
		width: 300px;
		margin-left: 20px;
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

.time {
	// background-color: red;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.no-timeout {
	color: #d3d3d3;
	font-weight: 500;
}

.emotion-log {
	height: 20px;
	margin-right: 8px;
	border-radius: 3px;
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