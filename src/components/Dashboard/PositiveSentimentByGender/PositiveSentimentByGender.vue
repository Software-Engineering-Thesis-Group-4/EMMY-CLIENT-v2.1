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
import moment from "moment";

export default {
	components: {
		apexchart
	},
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
					type: "datetime",
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
	computed: {},
	methods: {
		initializeChart() {
			let allLogs = this.$store.getters["employees/attendanceLogs"];
			let filtered = [];

			let startDate = moment()
				.subtract(2, "weeks")
				.startOf("day");
			let endDate = moment().endOf("day");

			let male = [];
			let female = [];

			if (allLogs.length > 0) {
				filtered = allLogs.filter(
					item =>
						moment(item.dateCreated).isSameOrAfter(startDate) &&
						moment(item.dateCreated).isSameOrBefore(endDate)
				);
			}

			filtered.forEach(item => {
				if (item.employeeRef.isMale) {
					male.push(item);
				} else {
					female.push(item);
				}
			});

			let male_positiveSentiments = [];
			let female_positiveSentiments = [];

			male_positiveSentiments = male.map(
				({ emotionIn, emotionOut, dateCreated }) => {
					let satisfaction = 0;

					switch (emotionIn) {
						case 3:
							satisfaction += 1;
							break;
						case 4:
							satisfaction += 2;
							break;
						case 5:
							satisfaction += 3;
							break;
					}

					switch (emotionOut) {
						case 3:
							satisfaction += 1;
							break;
						case 4:
							satisfaction += 2;
							break;
						case 5:
							satisfaction += 3;
							break;
					}

					return {
						x: dateCreated,
						y: satisfaction
					};
				}
			);

			female_positiveSentiments = female.map(
				({ emotionIn, emotionOut, dateCreated }) => {
					let satisfaction = 0;

					switch (emotionIn) {
						case 3:
							satisfaction += 1;
							break;
						case 4:
							satisfaction += 2;
							break;
						case 5:
							satisfaction += 3;
							break;
					}

					switch (emotionOut) {
						case 3:
							satisfaction += 1;
							break;
						case 4:
							satisfaction += 2;
							break;
						case 5:
							satisfaction += 3;
							break;
					}

					return {
						x: dateCreated,
						y: satisfaction
					};
				}
			);

			this.series[0].data = male_positiveSentiments.sort(
				(a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
			);
			this.series[1].data = female_positiveSentiments.sort(
				(a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
			);
		}
	},
	async mounted() {
		await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");
		this.initializeChart();
	}
};
</script>

<style lang="scss" scoped>
.chart {
	width: 100%;
}
</style>