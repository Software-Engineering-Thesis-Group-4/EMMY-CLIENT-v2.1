<template>
	<div class="layout-container">
		<div class="form-container">
			<v-form
				@submit.prevent="updateProfile"
				class="form"
			>
				<label for="firstname">Firstname</label>
				<v-text-field
					v-model="firstname"
					class="input-field"
					single-line
					outlined
					dense
					color="#779AEC"
				></v-text-field>

				<label for="lastname">Lastname</label>
				<v-text-field
					v-model="lastname"
					class="input-field"
					single-line
					outlined
					dense
					color="#779AEC"
				></v-text-field>

				<label for="username">Username</label>
				<v-text-field
					v-model="username"
					class="input-field"
					single-line
					outlined
					dense
					color="#779AEC"
				></v-text-field>

				<label for="email">Email</label>
				<v-text-field
					v-model="email"
					class="input-field"
					single-line
					outlined
					dense
					color="#779AEC"
				></v-text-field>

				<label for="account-role">Account Role</label>
				<div class="account-role-field">
					<div
						class="crown"
						v-if="isAdmin"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16.731"
							height="13.385"
							viewBox="0 0 16.731 13.385"
						>
							<path
								id="crown"
								d="M13.8,11.712H2.928a.42.42,0,0,0-.418.418v.837a.42.42,0,0,0,.418.418H13.8a.42.42,0,0,0,.418-.418V12.13A.42.42,0,0,0,13.8,11.712Zm1.673-8.366A1.255,1.255,0,0,0,14.222,4.6a1.229,1.229,0,0,0,.115.518L12.444,6.253a.835.835,0,0,1-1.156-.3L9.158,2.222a1.255,1.255,0,1,0-1.584,0L5.443,5.95a.836.836,0,0,1-1.156.3L2.4,5.119a1.254,1.254,0,1,0-1.142.737,1.281,1.281,0,0,0,.2-.021l1.89,5.04H13.385l1.89-5.04a1.281,1.281,0,0,0,.2.021,1.255,1.255,0,0,0,0-2.51Z"
								fill="#ffcc54"
							/>
						</svg>
					</div>
					<span>{{ accountRole }}</span>
				</div>

				<button
					type="submit"
					class="save-button"
				>
					Save Changes
				</button>
			</v-form>
		</div>
		<div
			@submit.prevent=""
			class="column-photo"
		>
			<label class="photo-label">Photo</label>

			<div class="photo-container">
				<v-img
					:src="user_photo || `/placeholder_avatar01.png`"
					class="user-image"
				>
				</v-img>

				<div
					class="edit-photo"
					:class="{ 'hideUpdateButton': fileName }"
				>
					<label
						for="photo"
						class="edit-photo-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="31.527"
							height="31.988"
							viewBox="0 0 31.527 31.988"
						>
							<path
								id="pencil"
								d="M30.683,8.949l-2.839,2.88a.732.732,0,0,1-1.047,0L19.962,4.894a.758.758,0,0,1,0-1.062L22.8.951a2.932,2.932,0,0,1,4.181,0l3.7,3.755A3.025,3.025,0,0,1,30.683,8.949ZM17.523,6.306,1.352,22.713.047,30.3a1.491,1.491,0,0,0,1.712,1.737L9.241,30.71,25.411,14.3a.758.758,0,0,0,0-1.062L18.576,6.306a.739.739,0,0,0-1.053,0Zm-9.859,15a.88.88,0,0,1,0-1.237l9.483-9.622a.85.85,0,0,1,1.219,0,.88.88,0,0,1,0,1.237L8.883,21.307a.85.85,0,0,1-1.219,0ZM5.441,26.562H8.4V28.83l-3.972.706L2.51,27.592l.7-4.03H5.441Z"
								transform="translate(-0.024 -0.075)"
								fill="#646464"
							/>
						</svg>
						<span>Edit</span>
					</label>
					<input
						type="file"
						name="photo"
						id="file-input"
						ref="fileUploadInput"
						@change="updatePhoto"
						accept="image/*"
					>
				</div>
			</div>

			<div
				v-if="fileName"
				class="upload-details"
			>
				File name: <span id="file-name">{{ fileName || "none selected..." }}</span>
				<div class="controls">
					<v-btn
						depressed
						dark
						small
						id="upload-button"
						@click="saveImageFile"
					>Upload</v-btn>
					<v-btn
						depressed
						small
						@click="clearFileUpload"
						id="cancel-button"
					>Cancel</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: this.$store.state.user.email,
			username: this.$store.state.user.username,
			firstname: this.$store.state.user.firstname,
			lastname: this.$store.state.user.lastname,
			isAdmin: this.$store.state.user.isAdmin,
			imageName: this.$store.state.user.photo,

			fileName: null
		};
	},
	computed: {
		accountRole() {
			return this.$store.getters["user/role"];
		},
		user_photo() {
			if (this.$store.state.user.photo) {
				return `/${this.$store.state.user.photo}`;
			}

			return null;
		}
	},
	methods: {
		updatePhoto() {
			this.fileName = this.$refs.fileUploadInput.files[0].name;
		},
		clearFileUpload() {
			this.fileName = "";
			this.$refs.fileUploadInput.value = "";
		},
		saveImageFile() {
			this.$refs.fileUploadInput.files;
		},
		updateProfile() {
			this.$store
				.dispatch("user/UPDATE_USER", {
					email: this.email,
					username: this.username,
					firstname: this.firstname,
					lastname: this.lastname
				})
				.then(success => {
					if (success) {
						alert("Successfully Updated Profile!");
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	display: grid;
	height: 100%;
	// background: #00ffff2c;
	grid-template-columns: 1.2fr 1fr;
	column-gap: 50px;

	.form {
		display: flex;
		flex-direction: column;

		label {
			font-size: 16px;
			font-weight: 500;
		}

		.input-field {
			margin: 0px;
		}

		.account-role-field {
			width: max-content;
			padding: 8px 25px 8px 15px;
			border-radius: 4px;
			border: 0.716667px solid #00000061;
			display: flex;
			transition: border 0.1s;

			&:hover {
				border: 0.716667px solid #000000bb;
			}

			.crown {
				margin-right: 10px;
			}
		}

		.save-button {
			background: linear-gradient(0deg, #31c15c 0%, #36d665 100%);
			font-weight: 500;
			color: white;
			margin-top: 30px;
			padding: 8px 0px;
			border: 1.5px solid #30af5a;
			border-radius: 5px;
			transition: all 0.1s;

			&:hover {
				cursor: pointer;
				filter: brightness(0.95);
			}
		}
	}

	.column-photo {
		.photo-label {
			font-weight: 500;
		}

		.photo-container {
			width: 200px;
			height: 200px;
			// border: 1px dashed black;

			.user-image {
				background-color: white;
				width: 100%;
				height: 100%;
			}

			.edit-photo {
				width: 70px;
				position: relative;
				margin-top: -40px;
				margin-left: 7px;

				.edit-photo-button {
					background-color: #000000a4;
					padding: 5px 10px;
					border-radius: 4px;
					color: white;
					display: flex;
					align-items: center;
					position: absolute;

					svg {
						height: auto;
						// border: 1px dashed white;
						box-sizing: border-box;
						width: 16px;
						margin-right: 6px;

						path {
							fill: white;
						}
					}
				}

				#file-input {
					// display: none;
					width: 100%;
					padding: 3px;
					position: absolute;
					opacity: 0;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}

		.upload-details {
			// background-color: red;
			width: 300px;
			margin-top: 10px;
			overflow: hidden;
			text-overflow: ellipsis;

			#file-name {
				font-weight: 500;
				color: #567dd8;
			}

			.controls {
				margin-top: 5px;
				#upload-button {
					background-color: #567dd8;
					margin-right: 6px;
				}

				#cancel-button {
					border: 0.8px solid lightgray;
					color: #858585;
				}
			}
		}
	}
}

.hideUpdateButton {
	opacity: 0;
}
</style>