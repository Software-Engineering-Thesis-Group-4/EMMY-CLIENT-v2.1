<template>
	<div>
		<div class="controls">
			<!-- Search Field ------------------------------------------------------------------------------------- -->
			<div class="search-field">
				<v-autocomplete
					:search-input.sync="searchInput"
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
					nudge-top="15px"
					nudge-right="30px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="dateRangeValue"
							color="#779AEC"
							label="Date range filter"
							prepend-icon="mdi-calendar"
							readonly
							v-on="on"
						></v-text-field>
					</template>

					<v-date-picker
						ref="dateRangeFilter"
						v-model="dates"
						:max="maxDate"
						range
						color="#567DD8"
						@change="filterOnDateRange"
					>
						<v-spacer></v-spacer>

						<button
							class="date-picker-reset"
							@click="resetDateRangeFilter"
						>Reset</button>
					</v-date-picker>
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
						v-model="filters.department"
						color="#5f7bbe"
						class="filter-input"
						label="Department"
						:items="departmentCategories"
						outlined
						dense
						clearable
						@change="filterData"
					></v-combobox>
					<v-combobox
						v-model="filters.gender"
						color="#5f7bbe"
						class="filter-input"
						label="Gender"
						:items="['Male', 'Female']"
						outlined
						dense
						clearable
						@change="filterData"
					></v-combobox>
					<v-select
						class="filter-input"
						v-model="filters.employmentStatus"
						:items="employmentStatus"
						item-text="text"
						item-value="value"
						label="Employment Status"
						dense
						outlined
						clearable
						@change="filterData"
					></v-select>
					<v-select
						class="filter-input"
						v-model="filters.emotionIn"
						:items="sentiments"
						chips
						label="Time In Emotion"
						multiple
						dense
						outlined
						clearable
						@change="filterData"
					></v-select>
					<v-select
						class="filter-input"
						v-model="filters.emotionOut"
						:items="sentiments"
						chips
						dense
						label="Time Out Emotion"
						multiple
						outlined
						clearable
						@change="filterData"
					></v-select>

					<!-- TODO: Time in and out filter -->

					<button
						class="button-clear-filters"
						@click="resetFilters"
					>
						Reset
					</button>
				</v-form>
			</v-menu>
		</div>

		<!-- Employee Log List ---------------------------------------------------------------------------------- -->
		<EmployeeLogsTable
			ref="EmployeeLogTable"
			:searchInput.sync="searchInput"
			:filters.sync="filters"
			:dateRange.sync="dates"
		/>
	</div>
</template>

<script>
import EmployeeLogsTable from "@/components/DailyAttendanceLog/EmployeeLogs.vue";
import moment from "moment";

export default {
	components: { EmployeeLogsTable },
	data() {
		return {
			admin: this.$store.state.user.isAdmin,
			dates: [moment().format(), moment().format()],
			departmentCategories: this.$store.state.employees.departments,
			searchInput: null,

			filters: {
				department: null,
				gender: null,
				employmentStatus: null,
				emotionIn: [],
				emotionOut: []
			},

			sentiments: [
				"Amazing",
				"Happy",
				"Okay",
				"Sad",
				"Angry",
				"Unsubmitted"
			],
			employmentStatus: [
				{ text: "Full-time", value: "1" },
				{ text: "Part-time", value: "0" }
			]
		};
	},
	computed: {
		maxDate() {
			let today = moment().format();
			return today;
		},
		dateRangeValue() {
			let now = moment();
			let value = null;

			if (this.dates.length === 2) {
				let selectedDates = [
					new Date(this.dates[0]),
					new Date(this.dates[1])
				].sort((a, b) => a - b);

				value = `${moment(selectedDates[0]).format("LL")} - ${moment(
					selectedDates[1]
				).format("LL")}`;

				return value;
			}

			if (this.dates.length === 1) {
				if (moment(this.dates[0]).format("LL") === moment().format("LL")) {
					value = "Today";
					return value;
				}

				value = moment(this.dates[0]).format("LL");
				return value;
			}

			return moment(this.dates[0]).format("LL");
		}
	},
	methods: {
		resetFilters() {
			this.filters = {
				department: null,
				gender: null,
				employmentStatus: null,
				emotionIn: [],
				emotionOut: []
			};

			this.$refs.EmployeeLogTable.parseTableItems(
				this.$store.state.employees.attendanceLogs
			);
		},
		resetDateRangeFilter() {
			this.dates = [
				moment()
					.utcOffset(8)
					.format(),
				moment()
					.utcOffset(8)
					.format()
			];

			this.$refs.EmployeeLogTable.parseTableItems(
				this.$store.state.employees.attendanceLogs
			);
		},
		filterData() {
			this.$refs.EmployeeLogTable.filterLogs();
		},
		filterOnDateRange() {
			this.$refs.EmployeeLogTable.filterByDateRange(
				this.dates[0],
				this.dates[1]
			);
		}
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

.date-picker-reset {
	background: -webkit-gradient(
		linear,
		left bottom,
		left top,
		from(#5a79c2),
		to(#7198f3)
	);
	background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);
	color: white;
	font-weight: 500;
	height: 40px;
	padding: 5px 15px;
	width: 100%;
	border: 1px solid #6c8cd6;
	border-radius: 5px;
	text-align: center;

	&:hover {
		filter: brightness(0.95);
	}

	&:active {
		filter: brightness(0.9);
	}
}

.filter-menu-container {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px;
	width: 350px;

	.filter-input {
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

.actions {
	// background-color: #ff00ff28;
	display: flex;
	flex-direction: row;
	align-items: center;
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
</style>