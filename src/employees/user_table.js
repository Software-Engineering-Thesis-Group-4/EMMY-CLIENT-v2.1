export function loadTableData(employees) {
    let employeeTableData = [];

    employees.forEach(employee => {
        let employmentStatus = (employee.employmentStatus ? 'Full-time Employee' : 'Part-time Employee');
        if (!employee.terminated) {
            employeeTableData.push({
                id: employee._id,
                employeeId: employee.employeeId,
                firstname: employee.firstName,
                lastname: employee.lastName,
                name: `${employee.lastName}, ${employee.firstName}`,
                email: employee.email,
                department: employee.department,
                role: employee.role,
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
        { text: "User", align: "left", sortable: true, value: "name" },
        { text: "Email", value: "email", sortable: true },
        { text: "Role", value: "role", sortable: true },
        { text: "Operations", align: "center", value: "actions", sortable: false, }
    ],
    data: [],
}