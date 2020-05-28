<template>
	<div class="layout-container">
		<v-form
			@submit.prevent="updatePassword"
			class="form"
		>
			<label>New Password</label>
			<v-text-field
				v-model="form_data.password"
				class="input-field"
				single-line
				outlined
				dense
				color="#779AEC"
				type="password"
				autocomplete="false"
			></v-text-field>

			<label>Confirm Password</label>
			<v-text-field
				v-model="form_data.confirmPassword"
				class="input-field"
				single-line
				outlined
				dense
				color="#779AEC"
				type="password"
				autocomplete="false"
			></v-text-field>

			<div>
				<button
					type="submit"
					class="save-button"
				>
					Update Password
				</button>
				<router-link
					:to="{ name: 'password_reset' }"
					class="forgot-password-link"
				>
					<span>I forgot my password</span>
				</router-link>
			</div>
		</v-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form_data: {
				password: null,
				confirmPassword: null
			}
		};
	},
	methods: {
		updatePassword() {
			this.$http
				.post("/api/users/change-password", {
					loggedInUsername: this.$store.state.user.username,
					userId: this.$store.state.user.userId,
					access_token: localStorage.getItem("access_token"),
					...this.form_data
				})
				.then(response => {
					if (response.status === 200) {
						alert("Successfully changed password!");
					}
				})
				.catch(errors => {
					alert(errors.response.data);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: #00ffff23;

	.form {
		display: flex;
		flex-direction: column;

		// border: 1px dashed lightslategray;
		min-width: 400px;

		label {
			font-weight: 500;
		}

		.input-field {
			::v-deep {
				input {
					font-family: sans-serif;
				}
			}
		}

		.save-button {
			background: linear-gradient(0deg, #31c15c 0%, #36d665 100%);

			// font
			color: white;
			font-weight: 500;

			// spacing
			padding: 8px 0px;
			margin-right: 10px;

			border: 1.5px solid #30af5a;
			border-radius: 5px;
			transition: all 0.1s;

			// dimension
			width: 50%;

			&:hover {
				cursor: pointer;
				filter: brightness(0.95);
			}
		}

		.forgot-password-link {
			font-size: 14px;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>