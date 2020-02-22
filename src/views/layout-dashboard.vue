<template>
	<div>
		<h1 class="page-header">Dashboard</h1>

		<div class="dv-group-1" :elevation="3">
			<apexchart
				ref="chart"
				id="OSP-stacked-bars"
				type="bar"
				height="380"
				:options="chartData.chartOptions"
				:series="chartData.series"
			></apexchart>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueApexCharts from "vue-apexcharts";
import { chartData, updateData } from "@/dashboard/chart.overall_sentiment.js";

export default {
	data() {
		return {
			chartData
		};
	},
	components: {
		apexchart: VueApexCharts,
		...mapGetters({
			logs: 'employees/attendanceLogs'
		})
	},
	created() {
		this.$store.dispatch("employees/FETCH_ATTENDANCELOGS").then(logs => {
			this.$refs.chart.updateSeries(updateData(logs), true);
		});
	},
};
</script>

<style lang="scss" scoped>
.dv-group-1 {
	// background-color: red;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border: 1.5px solid #ebebeb;
	// box-shadow: 0px 3px 10px 2px #0000000e;
	border-radius: 8px;
	padding: 20px 20px 0px;
}
</style>