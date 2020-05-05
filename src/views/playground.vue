<template>
	<div class="layout-container">
		<div class="card">
			<apexchart
				height="100%"
				:options="chartOptions"
				:series="series"
				class="chart"
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
					type: "line",
					background: "white",
					toolbar: {
						show: false,
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
					text: "Employee Satisfaction",
					align: "left",
					margin: 10,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: "14px",
						fontWeight: "400",
						fontFamily: "Cera Pro, sans serif",
						color: "#263238"
					}
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: "smooth",
					lineCap: "butt",
					width: 3,
					colors: "#80D1B5"
				},
				xaxis: {
					type: "datetime",
					labels: {
						show: false
					},
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false,
						borderType: "solid",
						height: 6,
						offsetX: 0,
						offsetY: 0
					},
					tooltip: {
						enabled: false,
						formatter: undefined,
						offsetY: 0,
						style: {
							fontSize: 0,
							fontFamily: 0
						}
					}
				},
				yaxis: {
					show: false,
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
	created() {
		let past = moment()
			.subtract(15, "days")
			.format();

		this.$store.dispatch("employees/FETCH_ATTENDANCELOGS").then(logs => {
			logs.sort((a, b) => new Date(a.in) - new Date(b.in));

			// get all logs that was created 1 week from now
			let logsOfTheWeek = logs.filter(log => {
				let logDate = moment(log.dateCreated);
				if (
					logDate.isSameOrAfter(past) &&
					logDate.isSameOrBefore(moment().format())
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

			// console.log(newSeries.map(({ x }) => moment(x).fromNow()));

			console.log(newSeries);

			this.series = [
				{
					name: "satisfaction score",
					data: newSeries
				}
			];
		});
	}
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
	height: 168px;
	min-width: 200px;
	padding: 10px;
	background-color: white;
	border-radius: 5px;
	box-shadow: 1px 1px 1px 1px #00000011;
}

.chart {
}
</style>