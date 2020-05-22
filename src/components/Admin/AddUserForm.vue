<template>
	<div class="form-container">
		<v-form
			@submit.prevent="registerUser"
			ref="add_user_form"
			class="add-user-form"
		>
			<p class="form_title">Add New User</p>

			<div class="add-user-form__inner-container">
				<div class="field-group">
					<v-text-field
						v-model="form_data.firstname"
						placeholder="First Name"
						dense
						filled
						prepend-icon="mdi-account"
						color="black"
						class="textfield textfield--firstname"
					></v-text-field>

					<v-text-field
						v-model="form_data.lastname"
						placeholder="Last Name"
						dense
						filled
						color="black"
						class="textfield textfield--lastname"
					></v-text-field>
				</div>

				<v-text-field
					v-model="form_data.email"
					placeholder="Email"
					dense
					filled
					prepend-icon="mdi-email"
					color="black"
				></v-text-field>

				<v-text-field
					v-model="form_data.username"
					placeholder="Username"
					dense
					filled
					color="black"
				></v-text-field>

				<v-select
					v-model="form_data.account_type"
					:items="['Administrator', 'Standard User']"
					filled
					dense
					color="black"
					placeholder="Account Type"
				></v-select>

				<v-text-field
					v-model="form_data.password"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					placeholder="Password"
					dense
					filled
					color="black"
					class="password-field"
				></v-text-field>

				<v-text-field
					v-model="form_data.confirm_password"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					placeholder="Confirm Password"
					dense
					filled
					color="black"
					class="password-field"
				></v-text-field>

				<v-file-input
					v-model="form_data.photo"
					accept="image/*"
					placeholder="Upload Photo"
					filled
					dense
					prepend-icon="mdi-camera"
					color="black"
					small-chips
					show-size
					truncate-length
					:value="fileValue"
				></v-file-input>

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
	</div>
</template>

<script>
export default {
	data() {
		return {
			form_data: {
				firstname: null,
				lastname: null,
				username: null,
				email: null,
				account_type: null,
				isActive: true,
				password: null,
				confirm_password: null,
				photo: null
			},
			fileValue: null,
			showPassword: false
		};
	},
	methods: {
		registerUser() {
			alert("registerUser() NOT IMPLEMENTED.");
		},
		resetForm() {
			this.$refs.add_user_form.reset();
			this.$emit("formCancel");
		}
	}
};
</script>

<style lang="scss" scoped>
.form-container {
	background-color: white;
	min-height: max-content;
	border-radius: 10px;
	padding: 10px;
}

.add-user-form {
	// background-color: #00f7ff52;
	// border: 1px dashed #0000002f;

	display: flex;
	flex-direction: column;
	height: max-content;
}

.form_title {
	// background-color: #ff00ff28;
	text-align: center;
	margin-bottom: 10px;
	padding: 0px;
	font-weight: 500;
	font-size: 20px;
	color: #b1b1b1;
	letter-spacing: -1px;
}

.add-user-form__inner-container {
	// background-color: #00ffff34;
	// border: 1px dashed #0000004f;

	padding-top: 10px;
	padding: 0px 10px;
	height: 100%;
	overflow-y: scroll;

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

.password-field {
	::v-deep input[type="password"] {
		font-family: sans-serif;
	}

	::v-deep input::placeholder {
		font-family: "Cera Pro", sans-serif;
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