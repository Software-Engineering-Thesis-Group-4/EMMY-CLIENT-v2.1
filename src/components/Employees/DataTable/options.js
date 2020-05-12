// this function is called in the employee-list vue component to load all the employees OR update the list of employees
export function loadTableData(employees) {
	let employeeTableData = [];

	if (!employees) {
		return false;
	}

	employees.forEach(employee => {
		if (!employee.terminated) {
			employeeTableData.push({
				id               : employee._id,
				employeeId       : employee.employeeId,
				firstname        : employee.firstName,
				lastname         : employee.lastName,
				name             : `${employee.lastName}, ${employee.firstName}`,
				email            : employee.email,
				department       : employee.department,
				jobTitle         : employee.jobTitle,
				employmentStatus : employee.employmentStatus,
			});
		}
	});

	options.data = employeeTableData;

	return true;
}

export function getData() {
	return options.data;
}

export let options = {
	search: null,
	selected: [],
	headers: [
		{
			text: "EMPLOYEE",
			value: "name",
			align: "left",
			sortable: true,
		},
		{
			text: "EMAIL",
			value: "email",
			sortable: true
		},
		{
			text: "DEPARTMENT",
			value: "department",
			sortable: true
		},
		{
			text: "JOB TITLE",
			value: "jobTitle",
			sortable: true
		},
		{
			text: "EMPLOYMENT STATUS",
			value: "employmentStatus",
			sortable: true,
		},
		{
			text: "EDIT / DELETE",
			align: "center",
			value: "actions",
			sortable: false,
		}
	],
	data: [],
}