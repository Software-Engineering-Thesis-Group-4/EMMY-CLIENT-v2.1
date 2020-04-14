export let male = [44, 55, 13, 33, 15, 26];
export let female = [44, 55, 13, 33, 15, 26];

export const chartOptions = {
	chart: {
		type: 'donut',
		// background: '#ff00004d',
		// height: 'auto'
	},
	// Angry, Sad, Okay, Happy, Amazing, Unsubmitted
	colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#E2E2E2"],
	labels: ["Angry", "Sad", "Okay", "Happy", "Amazing", "Unsubmitted"],
	dataLabels: {
		enabled: false,
	},
	tooltip: {
		enabled: true,
	},
	// title: {
	// 	text: "Title",
	// 	align: 'center',
	// 	margin: 10,
	// 	offsetX: 0,
	// 	offsetY: 0,
	// 	floating: false,
	// 	style: {
	// 		fontSize: '25px',
	// 		fontWeight: 'bold',
	// 		fontFamily: "Cera Pro",
	// 		color: '#263238'
	// 	},
	// },
	legend: {
		show: true,
		showForSingleSeries: false,
		showForNullSeries: true,
		showForZeroSeries: true,
		position: 'bottom',
		horizontalAlign: 'left',
		floating: false,
		fontSize: '14px',
		fontFamily: 'Cera Pro, Arial',
		fontWeight: 400,
		height: undefined,
		offsetX: 0,
		offsetY: 5,
		labels: {
			colors: undefined,
			useSeriesColors: false
		},
	},
	noData: {
		text: "Loading data...",
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
		pie: {
			customScale: 1,
			expandOnClick: false,
			// offsetY: 10,
			donut: {
				size: '65%',
				labels: {
					show: true,
					name: {
						show: true,
						fontSize: '15px',
						fontFamily: 'Cera Pro, Arial',
						color: 'black'
					},
					total: {
						show: true,
						showAlways: false,
						label: 'Total',
						fontSize: '22px',
						fontFamily: 'Cera Pro, Arial',
						fontWeight: 600,
						color: '#373d3f',
					}
				}
			}
		},
	}
}