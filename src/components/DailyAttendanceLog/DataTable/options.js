import moment from 'moment';

// this function is called in the attendance logs vue component (create lifecycle) to render all the items in the attendance logs 
// OR any changes in the attendance logs...
export function loadEmployeeLogs(logs, /* dateRange */) {
	let attendanceTableData = [];
	// let dateFilter = new Date();

	logs.forEach(log => {
		attendanceTableData.unshift({
			_id       : log._id,
			employee  : `${log.employeeRef.lastName}, ${log.employeeRef.firstName}`,
			department: log.employeeRef.department,
			date      : moment(log.dateCreated).format('LL'),
			timeIn    : (log.in !== null ? moment(log.in).format('LT') : null),
			timeOut   : (log.out !== null ? moment(log.out).format('LT') : null),
			emotionIn : log.emotionIn,
			emotionOut: log.emotionOut,
			// additional data ------------------------------------------------------
			ref: log.employeeRef,
		})
	});

	options.data = attendanceTableData;
}

export let options = {
	// the search textfield value is binded to this and filters the items from the data table that matches the input value.
	search: null,

	selected: [],

	// these are the data table headers
	headers: [
		{
			text: "TIME-IN",
			value: "timeIn",
			align: "start",
			sortable: false,
		},
		{
			text: "TIME-OUT",
			value: "timeOut",
			align: "start",
			sortable: false,
		},
		{
			text: "DATE",
			value: "date",
			align: "start",
			sortable: false
		},
		{
			text: "EMPLOYEE",
			value: "employee",
			align: "start",
			sortable: true
		},
		{
			text: "DEPARTMENT",
			value: "department",
			align: "start",
			sortable: true
		},
		{
			text: "EDIT / DELETE",
			value: "actions",
			align: "center",
			sortable: false
		}
	],

	// this is where all the data table items will be stored and shown in the page
	data: [],
}