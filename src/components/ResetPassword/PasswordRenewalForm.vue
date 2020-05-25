<template>
	<div class="component_container">
		<div class="logo">
			<v-img
				src="/logo/logo-light.png"
				class="logo__image"
			/>
		</div>

		<v-form
			ref="reset_form"
			class="form"
			@submit.prevent="verifyCode"
		>
			<span class="form__field_label">New Password</span>
			<v-text-field
				v-model="password"
				outlined
				dense
				single-line
				color="#82EFCA"
				@click:append="showPassword = !showPassword"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPassword ? 'text' : 'password'"
				:loading="loading"
				class="form__field_password"
			></v-text-field>

			<span class="form__field_label">Confirm Password</span>
			<v-text-field
				v-model="confirmPassword"
				outlined
				dense
				single-line
				color="#82EFCA"
				@click:append="showPassword = !showPassword"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPassword ? 'text' : 'password'"
				:loading="loading"
				class="form__field_password"
			></v-text-field>

			<button
				type="submit"
				class="form__submit_button"
			>Submit</button>
		</v-form>
	</div>
</template>

<script>
export default {
	props: ["user"],
	data() {
		return {
			password: null,
			confirmPassword: null,
			loading: false,
			showPassword: false
		};
	},
	methods: {
		verifyCode() {
			this.$http
				.post("/api/users/reset-password-final", {
					user: this.user,
					password: this.password,
					confirmPassword: this.confirmPassword
				})
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.component_container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 400px;
	padding: 20px;
	background-color: white;
	box-shadow: 1px 1px 10px 0px #0000001c;
	border-radius: 3px;

	font-size: 14px;
	font-family: "Cera Pro", sans-serif;
}

.logo {
	// background-color: red;
}

.logo__image {
	width: 130px;
}

.form {
	// background-color: hotpink;
	margin: 20px;
	width: 90%;
}

.form__field_label {
	font-size: 14px;
}

.form__field_password {
	::v-deep {
		input {
			font-family: sans-serif;
		}
	}
}

.form__submit_button {
	background: linear-gradient(#82efca, #7be0bd);
	padding: 8px;
	border-radius: 4px;
	font-weight: 600;
	color: white;
	width: 100%;
	border: 1px solid #71d1b0;

	&:hover {
		filter: brightness(0.95);
	}
}
</style>