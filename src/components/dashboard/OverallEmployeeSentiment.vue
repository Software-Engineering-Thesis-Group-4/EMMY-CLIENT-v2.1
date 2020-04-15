<template>
	<div class="container">
		<apexchart
			ref="chart"
			id="OSP-stacked-bars"
			type="bar"
			height="380"
			:options="chartData.chartOptions"
			:series="chartData.series"
		></apexchart>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import apexchart from "vue-apexcharts";
import {
	chartData,
	updateData
} from "./chart-options/overall-employee-sentiment.js";

export default {
	data() {
		return {
			chartData
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
		this.$store.dispatch("employees/FETCH_ATTENDANCELOGS").then(logs => {
			this.$refs.chart.updateSeries(updateData(logs), true);
		});
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;

	border: 1px solid #e0e0e0;
	border-radius: 8px;

	width: 100%;
	padding: 20px 20px 0px;
}
</style>