<template>
	<div>
		<h1 class="page-header">Account</h1>

		<v-card outlined class="table-container">
			<h2 class="account-header">Basic Information</h2>

			<table>
				<tr>
					<td class="label-column">
						<span class="label">Photo</span>
					</td>
					<td>
						<div>
							<img :src="imagePath" alt="" />
						</div>
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Firstname</span>
					</td>
					<td>
						<input v-model="firstname" class="input-field" type="text" />
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Lastname</span>
					</td>
					<td>
						<input v-model="lastname" class="input-field" type="text" />
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Username</span>
					</td>
					<td>
						<input v-model="username" class="input-field" type="text" />
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Email</span>
					</td>
					<td>
						<input v-model="email" class="input-field" type="text" />
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Account Type</span>
					</td>
					<td>
						<div class="accountRole">
							<img
								v-if="accountRole == 1"
								src="@/assets/images/crown.svg"
								class="crown"
							/>
							<span v-if="accountRole == 1">Administrator</span>
							<span v-else-if="accountRole == 0">Standard User</span>
						</div>
					</td>
				</tr>
				<tr>
					<td class="label-column">
						<span class="label">Password</span>
					</td>
					<td>
						<button class="changePasswordButton">Change password</button>
					</td>
				</tr>
			</table>

			<button class="saveButton">Save Changes</button>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			accountRole: 1,
			firstname: "Gille",
			lastname: "Tolentino",
			email: "gilletolentino@iacademy.edu.ph"
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
	display: flex;
	flex-direction: column;

	.account-header {
		font-size: 20px;
		color: #c0c0c0;
		font-weight: normal;
		letter-spacing: -1px;
	}

	table {
		// background-color: aqua;
		width: 100%;
		margin-bottom: 20px;

		td {
			padding-bottom: 15px;
			margin: 0px;
			// background-color: red;

			.input-field {
				background-color: #f0f0f0;
				width: 100%;
				padding: 7px 10px;
				border-radius: 5px;
				border: 1px solid #c0c0c0;
			}
		}

		.label-column {
			// text-align: end;
			width: 18%;

			.label {
				box-sizing: border-box;
				margin-right: 10px;
				font-weight: bold;
			}
		}

		.accountRole {
			// background:red;
			width: max-content;
			padding: 7px 10px;
			border-radius: 5px;
			border: 0.5px solid #c0c0c0;

			span {
				font-weight: bold;
			}

			.crown {
				margin-right: 7px;
			}
		}
	}

	.changePasswordButton {
		color: white;
		background-color: #85bdfd;
		font-size: 15px;
		width: 200px;
		padding: 8px;
		border-radius: 5px;

		&:hover {
			filter: brightness(1.1);
		}
	}

	.saveButton {
		color: white;
		background-color: #82efca;
		padding: 10px;
		border-radius: 5px;
		font-weight: bold;

		&:hover {
			filter: brightness(1.05);
		}
	}
}
</style>