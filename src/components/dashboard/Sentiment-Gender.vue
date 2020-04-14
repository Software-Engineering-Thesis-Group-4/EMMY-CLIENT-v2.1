<template>
	<div class="chart-container">

		<!-- MALE CHART -->
		<apexcharts
			class="chart"
			id="male"
			ref="maleGenderChart"
			type="donut"
			:options="options"
			:series="male"
		/>

		<!-- FEMALE CHART -->
		<apexcharts
			class="chart"
			id="female"
			ref="femaleGenderChart"
			type="donut"
			:options="options"
			:series="female"
		/>

	</div>
</template>

<script>
import apexcharts from "vue-apexcharts";
import { chartOptions, male, female } from "./chart-options/gender.js";

export default {
	data() {
		return {
			options: chartOptions,
			male,
			female
		};
	},
	components: {
		apexcharts
	}
};
</script>

<style lang="scss" scoped>
.chart-container {
	background-color: #ffffff;
	border: 1px solid #e0e0e0;
	border-radius: 8px;

	height: 400px;
	width: 100%;
	padding: 10px;
	margin: 0px;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 10px;
}

.chart {
	// DEBUGGING ---------------------------------------
	// background-color: #66ff004d;
	border: 1px dashed #555555;
	// -------------------------------------------------
	width: 100%;
	// height: 100%;
}
</style>