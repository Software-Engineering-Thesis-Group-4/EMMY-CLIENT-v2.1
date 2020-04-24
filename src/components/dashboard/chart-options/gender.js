
export const maleChart = {
	data: [84, 97, 10, 17, 35, 69],
	chart: {
		// background: '#ff00004d',
		id: 'male',
		type: 'donut',
		width: '100%',
	},
	colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#B2BEC3"],
	labels: ["Angry", "Sad", "Okay", "Happy", "Amazing", "Unsubmitted"],
	dataLabels: {
		enabled: false,
	},
	tooltip: {
		enabled: true,
	},
	legend: {
		show: false,
		showForSingleSeries: false,
		showForNullSeries: true,
		showForZeroSeries: true,
		position: 'bottom',
		horizontalAlign: 'center',
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
						color: 'black',
					},
					total: {
						show: true,
						showAlways: false,
						label: 'Total',
						fontSize: '22px',
						fontFamily: 'Cera Pro, Arial',
						fontWeight: 600,
						color: '#373d3f',
					},
					value: {
						show: true,
						fontSize: '18px',
						fontFamily: 'Cera Pro, Arial, sans-serif',
						fontWeight: 600,
						color: undefined,
						offsetY: 0,
						formatter: function (val) {
							return val
						}
					},
				}
			}
		},
	},
	yaxis: {
		labels: {
			minWidth: '150px'
		}
	}
}

export const femaleChart = {
	data: [68, 27, 90, 59, 31, 16],
	chart: {
		// background: '#ff00004d',
		id: 'female',
		type: 'donut',
		width: '100%',
	},
	colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#B2BEC3"],
	labels: ["Angry", "Sad", "Okay", "Happy", "Amazing", "Unsubmitted"],
	dataLabels: {
		enabled: false,
	},
	tooltip: {
		enabled: true,
	},
	legend: {
		show: false,
		showForSingleSeries: false,
		showForNullSeries: true,
		showForZeroSeries: true,
		position: 'bottom',
		horizontalAlign: 'center',
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
						color: 'black',
					},
					total: {
						show: true,
						showAlways: false,
						label: 'Total',
						fontSize: '22px',
						fontFamily: 'Cera Pro, Arial',
						fontWeight: 600,
						color: '#373d3f',
					},
					value: {
						show: true,
						fontSize: '18px',
						fontFamily: 'Cera Pro, Arial, sans-serif',
						fontWeight: 600,
						color: undefined,
						offsetY: 0,
						formatter: function (val) {
							return val
						}
					},
				}
			}
		},
	},
	yaxis: {
		labels: {
			minWidth: '150px'
		}
	}
}