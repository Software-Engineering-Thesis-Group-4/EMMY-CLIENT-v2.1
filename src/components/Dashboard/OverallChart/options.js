let data = [
	{ name: "Angry", data: [] },
	{ name: "Unhappy", data: [] },
	{ name: "Okay", data: [] },
	{ name: "Happy", data: [] },
	{ name: "Amazing", data: [] },
	{ name: "Unsubmitted", data: [] }
];

// let data = [
// 	{
// 		name: "Angry",
// 		data: [47, 44, 26, 21, 99, 85, 72, 96, 53, 20, 90, 81]
// 	},
// 	{
// 		name: "Unhappy",
// 		data: [88, 67, 24, 11, 54, 89, 79, 71, 32, 73, 22, 30]
// 	},
// 	{
// 		name: "Okay",
// 		data: [56, 92, 92, 97, 39, 65, 95, 39, 28, 95, 93, 96]
// 	},
// 	{
// 		name: "Happy",
// 		data: [84, 59, 91, 18, 26, 18, 2, 52, 36, 63, 2, 12]
// 	},
// 	{
// 		name: "Amazing",
// 		data: [96, 44, 98, 38, 40, 84, 90, 83, 19, 8, 45, 31]
// 	},
// 	{
// 		name: "Unsubmitted",
// 		data: [129, 150, 169, 315, 242, 159, 162, 332, 99, 89, 11, 77]
// 	}
// ];

export function updateData(logs) {
	if (!logs) {
		return data;
	}

	// get all the emotions per month
	let emotions = {
		'unsubmitted': [[], [], [], [], [], [], [], [], [], [], [], []],
		'angry': [[], [], [], [], [], [], [], [], [], [], [], []],
		'unhappy': [[], [], [], [], [], [], [], [], [], [], [], []],
		'okay': [[], [], [], [], [], [], [], [], [], [], [], []],
		'happy': [[], [], [], [], [], [], [], [], [], [], [], []],
		'amazing': [[], [], [], [], [], [], [], [], [], [], [], []],
	}

	logs.forEach(item => {
		// let stringMonth = (new Date(item.dateCreated).toDateString().substring(4, 7).toLowerCase());
		let numericMonth = (new Date(item.dateCreated).getUTCMonth());
		let emotionIn = Object.keys(emotions)[item.emotionIn];
		let emotionOut = Object.keys(emotions)[item.emotionOut];
		// console.log(numericMonth, emotionIn, emotionOut);

		emotions[emotionIn][numericMonth].push(item.emotionIn);
		emotions[emotionOut][numericMonth].push(item.emotionOut);
	});

	// console.log(emotions);

	data.forEach((item) => {
		emotions[item.name.toLowerCase()].forEach((arrayItem, index) => {
			// console.log(arrayItem.length);
			item.data[index] = arrayItem.length;
		});
	});

	return data;
}

export const chartData = {
	series: [] || data,
	chartOptions: {
		chart: {
			type: "bar",
			stacked: true,
			stackType: '100%',
			toolbar: {
				show: true,
			},
			// background: 'cyan'
			redrawOnParentResize: false
		},
		colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#B2BEC3"],
		dataLabels: {
			enabled: false
		},
		title: {
			text: "Overall Sentiment by Month (Current Year)",
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			style: {
				fontSize: '14px',
				fontWeight: 'Normal',
				fontFamily: "Cera Pro",
				color: '#263238'
			},
		},
		grid: {
			show: false,
		},
		legend: {
			show: true,
			showForSingleSeries: false,
			showForNullSeries: true,
			showForZeroSeries: true,
			position: 'right',
			horizontalAlign: 'center',
			floating: false,
			fontSize: '14px',
			fontFamily: 'Cera Pro',
			inverseOrder: true,
			width: undefined,
			height: 0,
			offsetY: 35,
			itemMargin: {
				// horizontal: 10,
				vertical: 2,
			},
			labels: {
				colors: "#9F9C9C",
				useSeriesColors: false
			},
		},
		xaxis: {
			categories: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			],
			labels: {
				show: true,
				rotate: -45,
				rotateAlways: false,
				hideOverlappingLabels: true,
				showDuplicates: false,
				trim: true,
				minHeight: undefined,
				maxHeight: 120,
				style: {
					colors: "#656565",
					fontSize: "12px",
					fontFamily: "Cera Pro",
					cssClass: "apexcharts-xaxis-label"
				},
				formatter: (value) => {
					return value.substring(0, 3)
				}
			},

		},
		yaxis: {
			show: false,
			labels: {
				show: false,
			},
			// title: {
			// 	text: "Sentiment Logs",
			// 	rotate: 90,
			// 	offsetX: 0,
			// 	offsetY: 0,
			// 	style: {
			// 		color: "#656565",
			// 		fontSize: "13px",
			// 		fontFamily: "Cera Pro, sans-serif",
			// 		fontWeight: "Bold",
			// 		cssClass: "apexcharts-yaxis-title"
			// 	}
			// },
		},
		noData: {
			text: "Loading...",
			align: "center",
			verticalAlign: "middle",
			offsetX: 0,
			offsetY: 0,
			style: {
				color: "#779AEC",
				fontSize: "15px",
				fontFamily: "Cera Pro"
			}
		},
		plotOptions: {
			bar: {
				horizontal: false,
				startingShape: 'flat',
				endingShape: 'flat',
				columnWidth: '70%',
				barHeight: '70%',
				distributed: false,
				rangeBarOverlap: true,
				colors: {
					ranges: [{
						from: 0,
						to: 0,
						color: undefined
					}],
					backgroundBarColors: [],
					backgroundBarOpacity: 1,
					backgroundBarRadius: 0,
				},
				dataLabels: {
					position: 'top',
					maxItems: 100,
					hideOverflowingLabels: true,
					orientation: "horizontal"
				}
			}
		}
	}
}