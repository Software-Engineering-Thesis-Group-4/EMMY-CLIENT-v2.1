<template>
	<v-container class="root-container">
		<v-card
			class="form-container"
			:elevation="2"
		>
			<div class="logo-container">
				<img
					src="/logo/logo-light@2x.png"
					class="logo"
					alt
					srcset
				/>
			</div>

			<form
				class="login-form"
				@submit.prevent="login()"
			>
				<div class="field">
					<img
						src="@/assets/images/input-field-icon_user.svg"
						alt
						srcset
					/>
					<input
						type="text"
						name="email"
						placeholder="Email"
						v-model="form_email"
						autocomplete="off"
					/>
				</div>
				<div class="field">
					<img
						src="@/assets/images/input-field-icon_padlock.svg"
						alt
						srcset
					/>
					<input
						type="password"
						name="password"
						id="password_field"
						placeholder="Password"
						v-model="form_password"
						autocomplete="off"
					/>
				</div>

				<v-alert
					type="error"
					dense
					dismissible=""
					min-width="100%"
					v-model="showErrorMessage"
					:value="!!errorMessage"
				>
					{{ errorMessage }}
				</v-alert>

				<input
					type="submit"
					value="LOGIN"
					class="login-button"
				/>
				<router-link
					:to="{ name: 'password_reset' }"
					class="forgot-password"
				>Forgot your password?</router-link>
			</form>
			<div class="no-account">
				Don't have an account? Please contact your administrator
			</div>
		</v-card>

		<a
			href="https://iacademy.edu.ph"
			class="iacademy-link"
		>
			<img
				class="iacademy"
				src="@/assets/images/iACADEMY_Seal.svg"
				alt
				srcset
			/>
			&nbsp; www.iacademy.edu.ph
		</a>
	</v-container>
</template>

<script>
export default {
	data: () => {
		return {
			// form data ---------------------------------
			form_email: null,
			form_password: null,

			// error alert options -----------------------
			errorMessage: "",
			showErrorMessage: false
		};
	},
	computed: {},
	methods: {
		login() {
			this.$store
				.dispatch("user/LOGIN", {
					email: this.form_email,
					password: this.form_password
				})
				.then(({ login_success, message }) => {
					if (login_success) {
						this.errorMessage = "";
						this.showErrorMessage = false;
						this.$router.push("/dashboard");
					} else {
						this.errorMessage = message;
						this.showErrorMessage = true;
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.root-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form-container {
	position: relative;
	background-color: white;
	padding: 50px;
	// border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	min-width: 600px;
	max-width: max-content;

	.logo-container {
		margin-right: 40px;
		// background-color: red;

		.logo {
			height: 100px;
		}
	}

	.login-form {
		// background-color: #ffb7b7;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 80px 0px;

		max-width: 400px;

		.field {
			background-color: #e2e2e2;
			padding: 0px 22px;
			border-radius: 5px;
			margin-bottom: 10px;

			input {
				background: none;
				border: none;
				padding: 15px;
				width: 250px;
				font-size: 15px;
				outline: none;

				&::placeholder {
					color: #5f5f5f;
					letter-spacing: 0px;
				}
			}

			#password_field {
				letter-spacing: 2px;
			}
		}

		.login-error-message {
			margin-bottom: 10px;
			color: red;
			font-size: 15px;
			transition: all ease 0.3s;
		}

		.login-button {
			background: linear-gradient(#82efca, #7be0bd);
			background-color: #82efca;
			width: 100%;
			border-radius: 5px;
			border: 1px solid #7be0bd;
			padding: 10px;
			color: white;
			font-weight: bold;
			letter-spacing: 1px;
			// margin: 20px 0px 0px 0px;

			&:hover {
				cursor: pointer;
				filter: brightness(0.95);
			}
		}

		.forgot-password {
			margin-top: 5px;
			color: #c5c5c5;
			font-size: 13px;
		}
	}

	.no-account {
		position: absolute;
		bottom: 10px;
		color: #bdbdbd;
		font-family: "Cera Pro", sans-serif;
		font-size: 13px;
		// display: none;
	}
}

.iacademy-link {
	// background-color: violet;
	text-decoration: none;
	text-align: center;
	margin: 20px 0px 0px;
	color: white;
	font-family: "Cera Pro", sans-serif;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	// opacity: 0.5;

	img {
		margin-right: 5px;
	}
}
</style>