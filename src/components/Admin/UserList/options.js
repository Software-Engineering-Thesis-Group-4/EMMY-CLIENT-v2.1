export function loadTableData(users) {

	let userAccounts = [];

	userAccounts = users.map(user => {
		return {
			_id: user._id,
			user: `${user.lastname} ${user.firstname}`,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			isAdmin: user.isAdmin,
			accountType: user.isAdmin ? 'Administrator' : 'Standard User',
			photo: user.photo,
			username: user.username,
			isActive: user.isActive,
		}
	});

	options.data = userAccounts;
}

export let options = {
	search: null,
	headers: [
		{ text: "User", align: "start", value: "user" },
		{ text: "Email", value: "email" },
		{ text: "Account Type", value: "accountType" },
		{ text: "Actions", value: "actions", sortable: false }
	],
	data: [],
}