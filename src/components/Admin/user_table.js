
// TODO: Implement function for loading user data into the data table for user accounts
export function loadTableData(users) {
	let userAccounts = [];

	users.forEach(user => {
		// extract all required user information
		// push user to the 'userAccounts' array
	});

	options.data = userAccounts;
}

export let options = {
	search: null,
	selected: [],
	headers: [
		{ text: "USER", align: "left", sortable: true, value: "name" },
		{ text: "EMAIL", value: "email", sortable: true },
		{ text: "ROLE", value: "role", sortable: true },
		{ text: "EDIT / DELETE", align: "center", value: "actions", sortable: false, }
	],
	data: [],
}