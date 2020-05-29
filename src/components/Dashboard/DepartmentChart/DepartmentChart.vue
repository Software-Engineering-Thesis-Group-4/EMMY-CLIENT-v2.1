<template>
	<div class="chart-container">
		<span>Overall Sentiment By Department</span>

		<div class="department-selection">
			<v-select
				:items="departmentCategories"
				v-model="selectedDepartment"
				placeholder="Select a department..."
				outlined
				label="Department"
				clearable
				dense
				@change="changeDepartment"
			></v-select>
		</div>
		<apexchart
			ref="departmentChart"
			type="bar"
			width="100%"
			height="310px"
			:options="chartData.chartOptions"
			:series="chartData.series"
			class="chart"
		></apexchart>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import apexchart from "vue-apexcharts";
import { chartData, updateData } from "./options.js";
export default {
	components: {
		apexchart
	},
	data() {
		return {
			departmentCategories: this.$store.state.employees.departments,
			chartData,
			selectedDepartment: "Admissions"
		};
	},
	computed: {
		...mapGetters({
			logs: `employees/attendanceLogs`
		})
	},
	methods: {
		changeDepartment(department) {
			let allLogs = [];
			if (department) {
				if (this.logs) {
					allLogs = this.logs.filter(
						item =>
							item.employeeRef.department === department &&
							item.employeeRef.employmentStatus === 1
					);
				}
			} else {
				this.$refs.departmentChart.updateSeries(
					updateData(this.logs),
					true
				);
				return;
			}

			this.$refs.departmentChart.updateSeries(updateData(allLogs), true);
			return;
		}
	},
	async mounted() {
		await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");
		let fulltimeEmployees = this.logs.filter(
			item => item.employeeRef.employmentStatus === 1
		);
		// this.$refs.departmentChart.updateSeries(
		// 	updateData(fulltimeEmployees),
		// 	true
		// );
		this.changeDepartment(this.selectedDepartment);
	}
};
</script>

<style lang="scss" scoped>
.chart-container {
	background-color: #ffffff;
	width: 100%;
	height: max-content;
	font-size: 14px;

	display: flex;
	flex-direction: column;

	padding: 10px 20px;
	border: 1px solid #e0e0e0;
	border-radius: 5px;
}

.department-selection {
	width: 100%;
	margin-top: 10px;
	// background-color: #ff00ff28;
	display: flex;
	align-items: center;

	::v-deep .v-input {
		max-width: 30rem;
	}

	::v-deep .v-text-field__details {
		display: none;
		// margin-bottom: -5rem;
	}
}
</style>