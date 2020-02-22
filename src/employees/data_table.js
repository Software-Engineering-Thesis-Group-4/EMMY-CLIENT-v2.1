// this function is called in the employee-list vue component to load all the employees OR update the list of employees
export function loadTableData(employees) {
    let employeeTableData = [];

    employees.forEach(employee => {
        let employmentStatus = (employee.employmentStatus ? 'Full-time Employee' : 'Part-time Employee');
        if (!employee.terminated) {
            employeeTableData.push({
                objectId: employee._id,
                employeeId: employee.employeeId,
                employee: `${employee.lastName}, ${employee.firstName}`,
                email: employee.email,
                department: employee.department,
                jobTitle: employee.jobTitle,
                employmentStatus: employmentStatus,
            });
        }
    });

    options.data = employeeTableData;
}

export let options = {
    search: null,
    selected: [],
    headers: [
        { text: "NAME", align: "left", sortable: true, value: "employee" },
        { text: "EMAIL", value: "email", sortable: true },
        { text: "DEPARTMENT", value: "department", sortable: true },
        { text: "JOB TITLE", value: "jobTitle", sortable: true },
        { text: "EMPLOYMENT STATUS", value: "employmentStatus", sortable: true },
        { text: "", value: "actions", sortable: false }
    ],
    data: [],
}