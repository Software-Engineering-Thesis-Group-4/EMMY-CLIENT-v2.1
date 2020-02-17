<template>
	<div>
		<h1 class="page-header">Dashboard</h1>

		<div class="dv-group-1" :elevation="3">
			<apexchart
				id="OSP-stacked-bars"
				type="bar"
				height="380"
				:options="OverallSentimentStackedBar.chartOptions"
				:series="OverallSentimentStackedBar.series"
			></apexchart>
		</div>
	</div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import OverallSentimentStackedBar from "@/charts/OverallSentimentStackedBar.js";

export default {
	data() {
		return {
			OverallSentimentStackedBar,
		};
	},
	components: {
		apexchart: VueApexCharts
	}
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