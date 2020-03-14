<template>
	<div>
		<h1 class="page-header">Account</h1>

		<v-card outlined class="table-container">
			<h2 class="account-header">Basic Information</h2>

			<table>
				<tr>
					<td>Photo</td>
					<td></td>
				</tr>
				<tr>
					<td>Firstname</td>
					<td>
						<v-text-field
							v-model="firstname"
							outlined
							filled
							dense
						></v-text-field>
					</td>
				</tr>
				<tr>
					<td>Lastname</td>
					<td>
						<v-text-field
							v-model="lastname"
							outlined
							filled
							dense
						></v-text-field>
					</td>
				</tr>
				<tr>
					<td>Username</td>
					<td>
						<v-text-field
							v-model="username"
							outlined
							filled
							dense
						></v-text-field>
					</td>
				</tr>
				<tr>
					<td>Email</td>
					<td>
						<v-text-field
							v-model="email"
							outlined
							filled
							dense
						></v-text-field>
					</td>
				</tr>
				<tr>
					<td>Account Type</td>
					<td></td>
				</tr>
			</table>

			<h2 class="account-header">Account Security</h2>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			accountRole: 0,
			firstname: "Gille",
			lastname: "Tolentino",
			email: 'gilletolentino@iacademy.edu.ph'
		};
	},
	computed: {
		username() {
			return `${this.firstname}${this.lastname}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-container {
	width: 50%;
	padding: 20px;
}

table {
	background-color: aqua;
	width: 100%;
}
</style>