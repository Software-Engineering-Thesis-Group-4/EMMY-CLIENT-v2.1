let data = [
    {
        name: "Angry",
        // data: [47, 44, 26, 21, 99, 85, 72, 96, 53, 20, 90, 81]
        data: []
    },
    {
        name: "Unhappy",
        // data: [88, 67, 24, 11, 54, 89, 79, 71, 32, 73, 22, 30]
        data: []
    },
    {
        name: "Okay",
        // data: [56, 92, 92, 97, 39, 65, 95, 39, 28, 95, 93, 96]
        data: []
    },
    {
        name: "Happy",
        // data: [84, 59, 91, 18, 26, 18, 2, 52, 36, 63, 2, 12]
        data: []
    },
    {
        name: "Amazing",
        // data: [96, 44, 98, 38, 40, 84, 90, 83, 19, 8, 45, 31]
        data: []
    },
    {
        name: "Unsubmitted",
        // data: [129, 150, 169, 315, 242, 159, 162, 332, 99, 89, 11, 77]
        data: []
    }
];

export function updateData(logs) {
    // get all the emotions per month
    let emotions = {
        'unsubmitted': [[],[],[],[],[],[],[],[],[],[],[],[]],
        'angry'      : [[],[],[],[],[],[],[],[],[],[],[],[]],
        'unhappy'    : [[],[],[],[],[],[],[],[],[],[],[],[]],
        'okay'       : [[],[],[],[],[],[],[],[],[],[],[],[]],
        'happy'      : [[],[],[],[],[],[],[],[],[],[],[],[]],
        'amazing'    : [[],[],[],[],[],[],[],[],[],[],[],[]],
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
    series: data,
    chartOptions: {
        chart: {
            type: "bar",
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: true,
            },
            offsetX: 0,
        },
        colors: ["#FF8484", "#FFB546", "#FFF23B", "#A8FF84", "#65FBDC", "#EFEFEF"],
        dataLabels: {
            enabled: false
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
            formatter: undefined,
            inverseOrder: true,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: -20,
            offsetY: 30,
            labels: {
                colors: undefined,
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 0,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 2
            },
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            axisTicks: {
                show: false,
                // borderType: 'solid',
                // color: '#78909C',
                // width: 6,
                // offsetX: 0,
                // offsetY: 0
            },
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
                    fontSize: "14px",
                    fontFamily: "Cera Pro",
                    cssClass: "apexcharts-xaxis-label"
                }
            },
        },
        yaxis: {
            title: {
                text: "Entries",
                rotate: 90,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: "#656565",
                    fontSize: "13px",
                    fontFamily: "Cera Pro, sans-serif",
                    fontWeight: "Bold",
                    cssClass: "apexcharts-yaxis-title"
                }
            },
            labels: {
                show: false,
                rotate: 0,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: true,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: "#656565",
                    fontSize: "14px",
                    fontFamily: "Cera Pro",
                    cssClass: "apexcharts-xaxis-label"
                },
            },

        },
        fill: {
            opacity: 1
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
        title: {
            text: "Overall Employee Sentiment",
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "Cera Pro",
                color: "#263238"
            }
        }
    }
}