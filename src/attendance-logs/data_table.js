import moment from 'moment';

// this function is called in the attendance logs vue component (create lifecycle) to render all the items in the attendance logs 
// OR any changes in the attendance logs...
export function loadTableData(logs, /* dateRange */) {
    let attendanceTableData = [];
    // let dateFilter = new Date();

    logs.forEach(log => {
        attendanceTableData.unshift({
            id: log._id,
            firstname: log.employee.firstName,
            lastname: log.employee.lastName,
            employee: `${log.employee.lastName}, ${log.employee.firstName}`,
            department: log.employee.department,
            date: moment(log.dateCreated).format('LL'),
            timeIn: (log.in !== null ? moment(log.in).format('LT') : null),
            timeOut: (log.out !== null ? moment(log.out).format('LT') : null),
            emotionIn: log.emotionIn,
            emotionOut: log.emotionOut,
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
        { text: "TIME-IN", align: "start", value: "timeIn", sortable: true, },
        { text: "TIME-OUT", align: "start", value: "timeOut", sortable: true, },
        { text: "DATE", align:"start", value: "date", sortable: true },
        { text: "EMPLOYEE", align:"start", value: "employee", sortable: true },
        { text: "DEPARTMENT", align:"start", value: "department", sortable: true },
        { text: "EDIT / DELETE", align: "center", value: "actions", sortable: false }
    ],

    // this is where all the data table items will be stored and shown in the page
    data: [],
}