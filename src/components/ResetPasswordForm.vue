<template>
	<div class="container">
		<img src="/logo/logo-light.png" alt srcset class="logo" />

		<div class="description">
			<h3>Reset Password</h3>
			<span>Enter your email address to request a password reset link.</span>
		</div>

		<form action="/auth/reset-password" method="POST">
			<div class="email-field">
				<input type="email" name="email" placeholder="someone@email.com" />
			</div>

			<input type="submit" value="Send reset link" />
		</form>
	</div>
</template>

<script>
	export default {
		name: "ResetPasswordForm"
	};
</script>

<style lang="scss" scoped>
	.container {
		background-color: white;
		padding: 100px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		max-width: max-content;
	}

	.logo {
		margin-bottom: 10px;
	}

	.description {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 30px 0px 20px 0px;
		/* width: 350px; */
		text-align: center;
		color: rgb(116, 116, 116);
	}

	.description h3,
	.description span {
		padding: 0px;
		margin: 0px;
	}

	label {
		text-align: center;
		/* background-color: red; */
		color: rgb(180, 180, 180);
		margin-bottom: 5px;
		display: block;
	}

	.email-field {
		background-color: rgb(231, 231, 231);
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.email-field input {
		border: none;
		background-color: transparent;
		padding: 12px 14px;
		font-size: 16px;
		width: 350px;
		border-radius: 5px;
	}

	input[type="submit"] {
		background-color: #82efca;
		color: white;
		font-family: "Cera Pro";
		font-weight: bold;
		font-size: 16px;
		padding: 12px;
		width: 100%;
		border: none;
		border-radius: 5px;
	}

	input[type="submit"]:hover {
		cursor: pointer;
	}

	input[type="submit"]:active {
		background-color: rgb(118, 216, 183);
	}
</style>