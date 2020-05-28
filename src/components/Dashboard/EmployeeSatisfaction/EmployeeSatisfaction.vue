<template>
	<apexchart
		height="90%"
		width="100%"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>

<script>
import apexchart from "vue-apexcharts";
import moment from "moment";

export default {
	data() {
		return {
			series: [
				{
					data: [
						{ x: "05/06/2014", y: 54 },
						{ x: "05/08/2014", y: 17 },
						{ x: "05/28/2014", y: 26 },
						{ x: "05/28/2014", y: 26 },
						{ x: "05/28/2014", y: 26 }
					]
				}
			],
			chartOptions: {
				chart: {
					type: "area",
					background: "white",
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
					text: "Employee Satisfaction Score",
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
				grid: {
					show: true,
					borderColor: "#E4E4E4",
					strokeDashArray: 1
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "smooth",
					width: 4
				},
				colors: ["#82EFCA"],
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
					show: false
				},
				tooltip: {
					enabled: true,
					x: {
						formatter: value => {
							return moment(value).format("ll");
						}
					},
					fixed: {
						enabled: false,
						position: "topRight",
						offsetX: 0,
						offsetY: 0
					},
					style: {
						fontSize: "12px",
						fontFamily: "Cera Pro"
					},
					marker: {
						show: false
					}
				},
				markers: {
					size: 0,
					colors: "#80D1B5",
					strokeColors: "#80D1B5",
					strokeWidth: 2,
					strokeOpacity: 0.9,
					strokeDashArray: 0,
					fillOpacity: 1,
					discrete: [],
					shape: "circle",
					radius: 2,
					offsetX: 0,
					offsetY: 0,
					onClick: undefined,
					onDblClick: undefined,
					showNullDataPoints: true,
					hover: {
						size: 5,
						sizeOffset: 3
					}
				}
			}
		};
	},
	components: {
		apexchart
	},
	async beforeMount() {
		await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");

		let past = moment()
			.subtract(15, "days").startOf('day')

		let logs = this.$store.getters["employees/attendanceLogs"];

		logs.sort((a, b) => new Date(a.in) - new Date(b.in));

		// get all logs that was created 1 week from now
		let logsOfTheWeek = logs.filter(log => {
			let logDate = moment(log.dateCreated);
			if (
				logDate.isSameOrAfter(past) &&
				logDate.isSameOrBefore(moment().endOf('day'))
			) {
				return log;
			}
		});

		let newSeries = logsOfTheWeek.map(
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

		this.series = [
			{
				name: "satisfaction score",
				data: newSeries
			}
		];
	}
};
</script>

<style lang="scss" scoped>
</style>