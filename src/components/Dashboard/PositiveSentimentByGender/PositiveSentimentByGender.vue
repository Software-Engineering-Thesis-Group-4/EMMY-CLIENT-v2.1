<template>
	<apexchart
		type="area"
		width="100%"
		height="250px"
		:options="options"
		:series="series"
		class="chart"
	></apexchart>
</template>

<script>
import apexchart from "vue-apexcharts";

export default {
	data() {
		return {
			series: [
				{
					name: "male",
					data: [31, 40, 28, 51, 42, 109, 100]
				},
				{
					name: "female",
					data: [11, 32, 45, 32, 34, 52, 41]
				}
			],
			options: {
				chart: {
					toolbar: {
						show: true,
						offsetX: 0,
						offsetY: 0,
						tools: {
							download: true,
							selection: false,
							zoom: false,
							zoomin: false,
							zoomout: false,
							pan: false,
							reset: false
						},
						autoSelected: "zoom"
					},
					redrawOnParentResize: false
				},
				title: {
					text: "Positive Sentiment By Gender",
					align: "left",
					margin: 10,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: "14px",
						fontWeight: "400",
						fontFamily: "Cera Pro, sans-serif",
						color: "#263238"
					}
				},
				dataLabels: {
					enabled: false
				},
				colors: ["#82AAEF", "#DDA2FF"],
				stroke: {
					curve: "smooth",
					width: 3
				},
				xaxis: {
					type: "numeric",
					labels: {
						show: true,
						style: {
							colors: [],
							fontSize: "12px",
							fontFamily: "Cera Pro, sans-serif",
							fontWeight: 400,
							cssClass: "apexcharts-xaxis-label"
						}
					},
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: true,
						borderType: "solid",
						height: 6,
						offsetX: 0,
						offsetY: 0
					},
					tooltip: {
						enabled: false
					}
				},
				yaxis: {
					show: true,
					labels: {
						style: {
							colors: [],
							fontSize: "12px",
							fontFamily: "Cera Pro, Arial, sans-serif",
							fontWeight: 400,
							cssClass: "apexcharts-yaxis-label"
						},
						offsetX: -10
					}
				}
			}
		};
	},
	components: {
		apexchart
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.chart {
	width: 100%;
}
</style>