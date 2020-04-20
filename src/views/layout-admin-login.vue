<template>
	<div class="root">
		<v-container class="root-container">
			<v-card
				class="form-container"
				:elevation="2"
			>
				<div class="logo-container">
					<img
						src="/logo/logo-dark@2x.png"
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
							v-model="email"
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
							v-model="password"
						/>
					</div>

					<div
						v-if="errorMessage"
						class="login-error-message"
					>
						{{ errorMessage }}
					</div>

					<input
						type="submit"
						value="LOGIN"
						class="login-button"
					/>
					<router-link
						to="/forgotpassword"
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
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.root-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form-container {
	position: relative;
	background-color: #3c454d;
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
			background-color: #2c3237;
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
		color: #ffffff;
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

.root {
	background: rgb(123, 194, 255);
	background: url("../assets/images/hexagon-pattern.svg") no-repeat -100px 200px,
		linear-gradient(
			138deg,
			rgba(123, 194, 255, 1) 0%,
			rgba(87, 136, 251, 1) 100%
		);
	background-attachment: fixed;
	background-size: contain;
	padding: 0px;
	margin: 0px;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>