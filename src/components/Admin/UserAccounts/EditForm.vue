<template>
	<v-dialog
		v-model="activate"
		@click:outside="$emit('closeDialog')"
		max-width="30rem"
	>
		<v-form
			@submit.prevent="updateUser"
			class="edit-user-form"
			ref="editUserForm"
		>
			<p class="form-title">
				<span class="edit-icon">
					<v-icon small>mdi-pencil</v-icon>
				</span>
				EDIT
			</p>

			<div class="inner-container">
				<div class="field-group">
					<v-text-field
						v-model="form_data.firstname"
						label="First Name"
						dense
						filled
						prepend-icon="mdi-account"
						color="black"
						class="textfield textfield--firstname"
					></v-text-field>

					<v-text-field
						v-model="form_data.lastname"
						label="Last Name"
						dense
						filled
						color="black"
						class="textfield textfield--lastname"
					></v-text-field>
				</div>

				<v-text-field
					v-model="form_data.email"
					label="Email"
					dense
					filled
					color="black"
					prepend-icon="mdi-email"
					class="textfield"
				></v-text-field>

				<v-text-field
					v-model="form_data.username"
					label="Username"
					dense
					filled
					color="black"
					class="textfield"
				></v-text-field>

				<v-select
					v-model="form_data.isAdmin"
					:items="accountTypes"
					item-text="type"
					item-value="value"
					dense
					filled
					return-object
					color="black"
					label="Account Type"
				></v-select>

				<v-text-field
					v-model="form_data.password"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					label="Password"
					filled
					color="black"
					class="password-field"
				></v-text-field>

				<v-text-field
					v-model="form_data.confirmPassword"
					:error-messages="errors.confirmPassword"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					label="Confirm Password"
					filled
					color="black"
					class="password-field"
				></v-text-field>
			</div>

			<div class="controls-container">
				<button
					type="reset"
					class="form-button form-button--cancel"
					@click="resetForm"
				>Cancel</button>
				<button
					type="submit"
					class="form-button form-button--save"
				>Save</button>
			</div>

		</v-form>

	</v-dialog>
</template>

<script>
export default {
	props: ["activate"],
	data() {
		return {
			form_data: {
				firstname: null,
				lastname: null,
				email: null,
				username: null,
				isAdmin: null,
				password: null,
				confirmPassword: null
			},
			accountTypes: [
				{ type: "Administrator", value: true },
				{ type: "Standard User", value: false }
			],
			showPassword: false,

			errors: {
				firstname: "",
				lastname: "",
				username: "",
				email: "",
				account_type: "",
				password: "",
				confirmPassword: ""
			}
		};
	},
	computed: {
		userRef() {
			return this.user_ref;
		}
	},
	methods: {
		editEmployeeClicked(user) {
			this.form_data = {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				username: user.username,
				isAdmin: user.isAdmin,
				password: null,
				confirmPassword: null
			};
		},
		resetForm() {
			this.$emit("closeDialog");
		},
		updateUser() {
			// FIX: ------------------------------------------------
			this.$http
				.patch("/api/users/change-user-profile", {
					userId: this.$store.state.user.userId,
					loggedInUsername: this.$store.state.user.username,
					access_token: localStorage.getItem("access_token"),
					...this.form_data
				})
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
			// FIX: ------------------------------------------------
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
	box-shadow: none;
	border-radius: 10px;
	background-color: white;
	width: 28rem;
	padding: 15px;
}

.edit-user-form {
	// background-color: #00ffff34;
	height: max-content;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.form-title {
	background-color: #00000013;
	text-align: center;
	font-size: 16px;
	color: #808080;
	font-weight: 600;
	padding: 5px 0px;
	margin-bottom: 15px;

	.edit-icon {
		// background-color: red;
		display: inline-flex;

		::v-deep i {
			color: inherit;
		}
	}
}

.inner-container {
	// border: 1px dashed #0000004f;
	padding: 0px 10px 0px 5px;
	height: max-content;

	&::-webkit-scrollbar {
		background: transparent;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #00000025;
		border-radius: 999px;

		&:hover {
			background: #0000003f;
		}
	}
}

.field-group {
	display: flex;
	// background-color: #32cd3238;
	height: max-content;
	width: 100%;

	.textfield--firstname {
		margin-right: 10px;
	}
}

.controls-container {
	display: flex;
	flex-direction: row;
	margin-top: 10px;
}

.form-button {
	font-size: 16px;
	font-weight: 500;
	padding: 8px;
	width: 100%;
	border-radius: 6px;
	outline: none;

	&:first-child {
		margin-right: 10px;
	}

	&:hover {
		filter: brightness(1.03);
	}

	&:active {
		filter: brightness(0.95);
	}
}

.form-button--save {
	background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);
	// background-color: #078fff;
	border: 1.2px solid #5978c0;
	color: white;
}

.form-button--cancel {
	// background: linear-gradient(0deg, #b8b8b8 0%, #dddddd 100%);
	background-color: white;
	border: 1.2px solid #cccccc;
	color: #969696;
}
</style>