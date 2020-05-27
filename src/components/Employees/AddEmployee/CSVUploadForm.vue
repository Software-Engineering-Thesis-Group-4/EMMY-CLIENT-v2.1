<template>
	<v-form
		@submit.prevent="uploadCSVFile"
		class="csv-upload-form"
		ref="csv_upload_form"
	>
		<v-file-input
			class="file-input"
			accept=".csv"
			placeholder="Click here to upload a 'CSV' file..."
			color="black"
			show-size
			name="csvImport"
			clearable
			ref="csvImportInput"
			type="file"
			v-model="files"
		></v-file-input>

		<div class="controls-container">
			<button
				type="reset"
				class="form-button form-button--cancel"
				@click="resetForm"
			>Cancel</button>
			<button
				type="submit"
				class="form-button form-button--save"
			>Upload</button>
		</div>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			files: null
		};
	},
	methods: {
		uploadCSVFile() {
			this.$http
				.post(
					"/api/employees/csv/import",
					{
						userId: this.$store.state.user.userId,
						loggedInUsername: this.$store.state.user.username,
						access_token: localStorage.getItem("access_token"),
						csvImport: this.files
					},
					{
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}
				)
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		},
		resetForm() {
			this.$refs.csv_upload_form.reset();
			this.$emit("formCancel");
		}
	}
};
</script>

<style lang="scss" scoped>
.csv-upload-form {
	// background-color: #ff00ff49;
	border-top: 1px solid #00000023;
	// height: 8rem;
	display: flex;
	flex-direction: column;
}

.file-input {
	margin: 10px 15px 0px 0px;
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