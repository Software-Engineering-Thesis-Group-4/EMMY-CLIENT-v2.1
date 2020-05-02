<template>
	<div class="chart-container">

		<!-- MALE CHART -->
		<div class="chart">
			<span class="chart-title">Male</span>
			<apexcharts
				id="male"
				ref="maleGenderChart"
				:options="maleChart"
				:series="maleChart.data"
			/>
		</div>

		<!-- FEMALE CHART -->
		<div class="chart">
			<span class="chart-title">Female</span>
			<apexcharts
				id="female"
				ref="femaleGenderChart"
				:options="femaleChart"
				:series="femaleChart.data"
			/>
		</div>

	</div>
</template>

<script>
import apexcharts from "vue-apexcharts";
import { maleChart } from "./male_options";
import { femaleChart } from "./female_options";

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
	// DEBUGGING ---------------------------------------
	// background-color: #8400ff4d;
	// border: 1px dashed #555555;
	// -------------------------------------------------
	background-color: #ffffff;
	border: 1px solid #e0e0e0;
	border-radius: 8px;

	min-height: max-content;
	width: 100%;
	margin: 0px;

	padding: 10px;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	column-gap: 0px;

	justify-items: center;
	align-items: center;
}

.chart {
	// DEBUGGING ---------------------------------------
	// background-color: #66ff004d;
	// border: 1px dashed #555555;
	// -------------------------------------------------
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 450px;
	padding: 10px;

	.chart-title {
		// DEBUGGING ---------------------------------------
		// background-color: #66ff004d;
		// border: 1px dashed #555555;
		// -------------------------------------------------
		font-size: 25px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 10px;
	}
}
</style>