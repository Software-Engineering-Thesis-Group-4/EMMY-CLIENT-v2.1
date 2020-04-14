<template>
	<div class="chart-container">

		<!-- MALE CHART -->
		<apexcharts
			class="chart"
			id="male"
			ref="maleGenderChart"
			type="donut"
			width="380"
			:options="maleChart.chartOptions"
			:series="maleChart.series"
		/>

		<!-- FEMALE CHART -->
		<!-- <apexcharts
			class="chart"
			id="female"
			ref="femaleGenderChart"
			type="donut"
			width="380"
			:options="femaleChart.chartOptions"
			:series="femaleChart.series"
		/> -->

	</div>
</template>

<script>
import apexcharts from "vue-apexcharts";
import { maleChart, femaleChart } from "./chart-options/gender.js";

export default {
	data() {
		return {
			maleChart,
			femaleChart
		};
	},
	components: {
		apexcharts
	}
};
</script>

<style lang="scss" scoped>
.chart-container {
	// background-color: cyan;
	width: 100%;
}

.chart {
	// background-color: red;
	width: max-content;
}
</style>