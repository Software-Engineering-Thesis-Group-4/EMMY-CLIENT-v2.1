<template>
	<apexchart
		ref="chart"
		type="bar"
		width="100%"
		height="310px"
		:options="chartData.chartOptions"
		:series="chartData.series"
		class="chart"
	></apexchart>
</template>

<script>
import apexchart from "vue-apexcharts";
import { chartData, updateData } from "./options.js";

export default {
	data() {
		return {
			chartData,
			fetchYear: 2020
		};
	},
	components: {
		apexchart
	},
	computed: {},
	async mounted() {
		await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");
		let logs = this.$store.getters["employees/attendanceLogs"];
		this.$refs.chart.updateSeries(updateData(logs), true);
	}
};
</script>

<style lang="scss" scoped>
.chart {
	min-width: 500px;
	// height: 300px;
	// background-color: wheat;
}
</style>