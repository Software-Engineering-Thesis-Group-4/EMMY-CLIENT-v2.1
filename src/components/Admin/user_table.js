export function loadTableData(users) {
	let userAccounts = [];
	userAccounts = users;
	options.data = userAccounts;
}

export let options = {
	search: null,
	headers: [
		{ text: "User", align: "start", value: "user" },
		{ text: "Email", value: "email" },
		{ text: "Account Type", value: "type" },
		{ text: "Status", value: "isActive" },
		{ text: "Actions", value: "actions" }
	],
	data: [],
}