<template>
	<div class="component_container">
		<div class="logo">
			<v-img
				src="/logo/logo-light.png"
				class="logo__image"
			/>
		</div>
		<span class="form_title">Forgot your password?</span>
		<span class="form_description">Please enter your email address and we will send you a code to securely reset your password.</span>

		<v-form
			ref="reset_form"
			class="reset_form"
			@submit.prevent="createRequest"
		>
			<v-text-field
				v-model="email"
				placeholder="Email"
				outlined
				dense
				single-line
				color="#82EFCA"
				clearable
				:loading="loading"
			></v-text-field>
			<button
				type="submit"
				class="reset_form__submit-button"
			>Send Code</button>
		</v-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			loading: false
		};
	},
	methods: {
		createRequest() {
			this.loading = true;
			
			this.$http
				.post("/api/users/reset-password", { email: this.email })
				.then(response => {
					this.loading = false;

					if (response.data) {
						this.$router.push({
							name: "code_verification",
							params: {
								reset_token: response.data.resetTok
							}
						});
					}
				})
				.catch(err => {
					console.log(err.response.data);
					this.loading = false;
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
	height: 300px;
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

.form_title {
	font-family: "Cera Pro", sans-serif;
	font-weight: 600;
	font-size: 15px;
	margin-top: 20px;
}

.form_description {
	font-family: "Cera Pro", sans-serif;
	font-weight: 400;
	font-size: 13px;
	color: #8d8d8d;
	text-align: center;
	box-sizing: border-box;
	width: 90%;
}

.reset_form {
	// background-color: hotpink;
	margin-top: 20px;
	width: 90%;
}

.reset_form__submit-button {
	background: linear-gradient(#82efca, #7be0bd);
	padding: 8px;
	border-radius: 4px;
	font-weight: 600;
	color: white;
	width: 100%;
	border: 1px solid #71d1b0;
	margin-top: -10px;

	&:hover {
		filter: brightness(0.95);
	}
}
</style>