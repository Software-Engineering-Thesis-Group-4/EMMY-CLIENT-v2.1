export const maleChart = {
	series: [44, 55, 13, 33, 15, 26],
	chartOptions: {
		chart: {
			width: '50px',
			height: '100px',
			type: 'donut',
		},
		// Angry, Sad, Okay, Happy, Amazing, Unsubmitted
		colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#E2E2E2"],
		labels: ["Angry", "Sad", "Okay", "Happy", "Amazing", "Unsubmitted"],
		dataLabels: {
			enabled: false
		},
		// responsive: [{
		// 	breakpoint: 480,
		// 	options: {
		// 		chart: {
		// 			width: 200
		// 		},
		// 		legend: {
		// 			show: false
		// 		}
		// 	}
		// }],
		legend: {
			show: false,
			position: 'right',
			offsetY: 0,
			height: 230,
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
	}
}

export const femaleChart = {
	series: [44, 55, 13, 33, 15, 26],
	chartOptions: {
		chart: {
			width: 380,
			type: 'donut',
		},
		// Angry, Sad, Okay, Happy, Amazing, Unsubmitted
		colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#E2E2E2"],
		dataLabels: {
			enabled: false
		},
		// responsive: [{
		// 	breakpoint: 480,
		// 	options: {
		// 		chart: {
		// 			width: 200
		// 		},
		// 		legend: {
		// 			show: false
		// 		}
		// 	}
		// }],
		legend: {
			show: false,
			position: 'right',
			offsetY: 0,
			height: 230,
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
	}
}