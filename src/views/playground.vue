<template>
	<div class="layout-container">
		<div class="card">
			<apexchart
				type="area"
				height="100%"
				:options="options"
				:series="series"
			></apexchart>
		</div>
	</div>
</template>

<script>
import apexchart from "vue-apexcharts";
import moment from "moment";

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
					}
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
					},
				}
			}
		};
	},
	components: {
		apexchart
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// border: 1px dashed black;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #ff00002d;
}

.card {
	height: 300px;
	min-width: 500px;
	padding: 10px;
	background-color: white;
	border-radius: 5px;
	box-shadow: 1px 1px 1px 1px #00000011;
}

.chart {
}
</style>