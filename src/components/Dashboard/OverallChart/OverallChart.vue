<template>
	<apexchart
		ref="chart"
		type="bar"
		width="100%"
		height="380px"
		:options="chartData.chartOptions"
		:series="chartData.series"
		class="chart"
	></apexchart>
</template>

<script>
import { mapGetters } from "vuex";
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
	computed: {
		...mapGetters({
			logs: `employees/attendanceLogs`
		})
	},
	beforeMount() {
		this.$http
			.get(`/api/employeelogs/year/${this.fetchYear}`)
			.then(response => {
				this.$refs.chart.updateSeries(updateData(response.data), true);
			})
			.catch(error => {
				console.error(error);
			});
	}
};
</script>

<style lang="scss" scoped>
.chart {
	min-width: 700px;
}
</style>