let options = {
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
    data: [
        {
            employee: "Saludes, Nathaniel",
            email: "saludes.nathaniel@email.com",
            department: "Faculty",
            jobTitle: "Software Engineering Teacher",
            employmentStatus: "Full-time employee",
        },
        {
            employee: "Latoja, Paolo",
            email: "latoja.paolo@email.com",
            department: "Faculty",
            jobTitle: "Software Engineering Teacher",
            employmentStatus: "Full-time employee",
        },
        {
            employee: "Chua, Hannah",
            email: "chua.hannah@email.com",
            department: "Faculty",
            jobTitle: "Software Engineering Teacher",
            employmentStatus: "Full-time employee",
        },
        {
            employee: "Dineros, Brian",
            email: "dineros.brian@email.com",
            department: "Faculty",
            jobTitle: "Software Engineering Teacher",
            employmentStatus: "Full-time employee",
        },
        {
            employee: "Ong, Michael",
            email: "ong.michael@email.com",
            department: "Faculty",
            jobTitle: "Software Engineering Teacher",
            employmentStatus: "Full-time employee",
        },
    ]
}

export default options