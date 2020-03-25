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
import VueApexCharts from "vue-apexcharts";

export default {
	data() {
		return {
		};
	},
	components: {
	},
	created() {
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