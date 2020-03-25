<template>
	<v-container class="root-container">
		<v-card class="form-container" :elevation="2">
			<div class="logo-container">
				<img src="@/assets/images/Logo.svg" class="logo" alt srcset />
			</div>

			<form class="login-form" @submit.prevent="login()">
				<div class="field">
					<img src="@/assets/images/input-field-icon_user.svg" alt srcset />
					<input
						type="text"
						name="email"
						placeholder="Email"
						v-model="email"
						autocomplete="off"
					/>
				</div>
				<div class="field">
					<img src="@/assets/images/input-field-icon_padlock.svg" alt srcset />
					<input
						type="password"
						name="password"
						id="password_field"
						placeholder="Password"
						v-model="password"
						autocomplete="off"
					/>
				</div>

				<div v-if="errorMessage" class="login-error-message">
					{{ errorMessage }}
				</div>

				<input type="submit" value="LOGIN" class="login-button" />
				<router-link to="/forgotpassword" class="forgot-password"
					>Forgot your password?</router-link
				>
			</form>
			<div class="no-account">
				Don't have an account? Please contact your administrator
			</div>
		</v-card>

		<a href="https://iacademy.edu.ph" class="iacademy-link">
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
import { mapGetters } from "vuex";

export default {
	data: () => {
		return {
			email: null,
			password: null
		};
	},
	computed: {
		...mapGetters({
			errorMessage: "user/errorMessage"
		})
	},
	methods: {
		login() {
			this.$store.dispatch("user/LOGIN", {
				email: this.email,
				password: this.password
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
	// box-shadow: 5px 5px 30px 2px #bafdf2;
	// box-shadow: 10px 10px 10px 5px #00000021;

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

		.field {
			background-color: #e2e2e2;
			padding: 0px 22px;
			border-radius: 5px;
			margin-bottom: 10px;

			input {
				background: none;
				border: none;
				padding: 15px;
				width: 230px;
				font-size: 15px;
				outline: none;

				&::placeholder {
					color: #bbbbbb;
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
			background-color: #82efca;
			width: 100%;
			border-radius: 5px;
			border: none;
			padding: 15px;
			color: white;
			font-weight: bold;
			letter-spacing: 1px;
			// margin: 20px 0px 0px 0px;

			&:hover {
				cursor: pointer;
				background-color: #8bffd8;
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