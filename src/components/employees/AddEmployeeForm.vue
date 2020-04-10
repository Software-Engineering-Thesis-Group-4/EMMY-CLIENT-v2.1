<template>
	<v-card class="form_container">
		<v-toolbar
			flat
			dense
			dark
			color="#567DD8"
			short
			min-width="100%"
		>
			<span>Register Employees</span>

			<v-btn
				class="fileUploadToggleButton"
				small
				dark
				outlined
				@click="toggleFileUpload"
			>
				<span v-if="multipleUpload">&lt; Back</span>
				<span v-else>Import CSV</span>
			</v-btn>
		</v-toolbar>

		<!-- <p class="upload_file-label">Upload a CSV file:</p> -->
		<v-form
			@submit.prevent="upload_csv"
			ref="csvFileUpload"
			v-if="multipleUpload"
		>
			<div class="file_input">
				<v-file-input
					name="csv_employees"
					placeholder="Click here to select a file..."
					hint="Upload a CSV file to register multiple employees instead"
					accept=".csv"
					v-model="file"
					:error-messages="fileUploadErrorMessage"
					:error="fileUploadError"
					persistent-hint
					chips
					:loading="uploadFileLoading"
					show-size
				/>

				<v-btn
					color="#567DD8"
					dark
					class="file_upload_button_save"
					type="submit"
				>Save</v-btn>
				<v-btn
					color="#567DD8"
					outlined
					style="margin-left: 10px; width: 90px"
					@click="closeDialog"
				>Cancel</v-btn>
			</div>
		</v-form>

		<v-divider />

		<!-- FIXME: Change the form into vuetify's form -->
		<!-- TODO: add the upload csv button for adding multiple employees -->
		<v-form
			class="addEmployeeForm"
			method="POST"
			v-if="!multipleUpload"
			@submit.prevent="addEmployee"
			ref="addEmployeeForm"
			color="#567DD8"
		>
			<v-text-field
				color="#567DD8"
				class="form-input"
				name="firstname"
				v-model="firstname"
				label="Firstname"
				outlined
				clearable
				dense
			/>

			<v-text-field
				color="#567DD8"
				class="form-input"
				name="lastname"
				v-model="lastname"
				label="Lastname"
				outlined
				clearable
				dense
			/>

			<v-text-field
				color="#567DD8"
				class="form-input"
				name="email"
				v-model="email"
				label="Email"
				type="email"
				outlined
				clearable
				dense
			/>

			<v-radio-group
				class="form-input gender-input-group"
				name="gender"
				v-model="isMale"
				dense
				label="Gender"
			>
				<v-radio
					class="gender-input"
					label="Male"
					:value="true"
					color="#567DD8"
				/>
				<v-radio
					class="gender-input"
					label="Female"
					:value="false"
					color="#567DD8"
				/>
			</v-radio-group>

			<v-text-field
				color="#567DD8"
				class="form-input"
				name="employee_id"
				v-model="employee_id"
				label="Employee ID"
				outlined
				clearable
				dense
			/>

			<v-combobox
				color="#567DD8"
				class="form-input"
				:items="departmentCategories"
				v-model="department"
				label="Department"
				outlined
				dense
			/>

			<v-text-field
				color="#567DD8"
				class="form-input"
				name="job_title"
				v-model="job_title"
				label="Job Title"
				outlined
				clearable
				dense
			/>

			<v-combobox
				color="#567DD8"
				class="form-input"
				v-model="employment_status"
				:items="['Part-time', 'Full-time']"
				label="Employment Status"
				outlined
				dense
			/>

			<v-text-field
				color="#567DD8"
				class="form-input"
				name="fingerprint_number"
				v-model="fingerprint_id"
				label="Fingerprint Number"
				type="number"
				outlined
				clearable
				dense
			/>

			<div class="button_group">
				<v-btn
					color="#567DD8"
					large
					dark
					class="form_button"
					type="submit"
				>Save</v-btn>

				<v-btn
					color="#567DD8"
					large
					outlined
					class="form_button"
					@click="closeDialog"
				>Cancel</v-btn>
			</div>
		</v-form>
	</v-card>
</template>

<script>
export default {
	name: "AddEmployeeForm",
	data: () => {
		return {
			// sample form data ---------------------------------------------------
			// firstname: "Nathaniel",
			// lastname: "Saludes",
			// email: "saludesnathaniel@gmail.com",
			// isMale: true,
			// fingerprint_id: 1,
			// employee_id: "2015-02034",
			// department: "HR",
			// employment_status: null,
			// job_title: "HR Assitant",
			// --------------------------------------------------------------------

			firstname: null,
			lastname: null,
			email: null,
			isMale: null,
			fingerprint_id: null,
			employee_id: null,
			department: null,
			employment_status: null,
			job_title: null,

			// toggle CSV file upload form
			multipleUpload: false,

			// department categories
			departmentCategories: [
				"Human Resources",
				"Finance",
				"Faculty",
				"IT Department"
			],

			// csv upload
			uploadFileLoading: false,
			file: null,
			fileUploadError: false,
			fileUploadErrorMessage: ""
		};
	},
	methods: {
		addEmployee() {
			// alert('addEmployee()');
			this.$store
				.dispatch("employees/addEmployee", this.formData)
				.then(() => {
					this.closeDialog();
				});
		},
		upload_csv() {
			if (!this.file) {
				this.fileUploadError = true;
				this.fileUploadErrorMessage = "No file provided.";
				return false;
			}

			// TODO: Implement HTTP request for CSV upload through store actions...

			return alert("upload_csv() not implemented!");
		},
		resetFormData() {
			this.firstname         = null;
			this.lastname          = null;
			this.email             = null;
			this.isMale            = null;
			this.fingerprint_id    = null;
			this.employee_id       = null;
			this.department        = null;
			this.employment_status = null;
			this.job_title         = null;
		},
		resetCSVFileUploadForm() {
			this.$refs.csvFileUpload.reset();
			this.uploadFileLoading = false;
			this.file = null;
			this.fileUploadError = false;
			this.fileUploadErrorMessage = "";
		},
		closeDialog() {
			if (this.multipleUpload) {
				this.resetCSVFileUploadForm();
				this.resetFormData();
				this.multipleUpload = false;
				return this.$emit("closeDialog");
			}

			this.$refs.addEmployeeForm.reset();
			this.$emit("closeDialog");
		},
		toggleFileUpload() {
			this.multipleUpload = !this.multipleUpload;
		}
	}
};
</script>

<style lang="scss" scoped>
.form_container {
	display: flex;
	flex-direction: column;
}

.fileUploadToggleButton {
	position: absolute;
	right: 10px;
}

.file_input {
	width: 93%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0px 0px 10px 20px;

	.file_upload_button_save {
		margin-left: 20px;
	}
}

.addEmployeeForm {
	background-color: white;
	color: #656565;
	padding: 28px 25px;
	box-shadow: 4px 6px 4px 4px #00000025;
	display: flex;
	flex-direction: column;

	.form-input {
		padding: 0px !important;
		margin: 0px;
	}

	.button_group {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

		.form_button {
			width: 150px;

			&:first-child {
				margin-right: 10px;
			}
		}
	}
}

.hideFileUpload {
	display: none;
}

// .gender-input-group >>> .v-input--radio-group__input {
// 	display: flex;
// 	flex-direction: row !important;
// 	width: 50%;
// 	background-color: red;

// 	.gender-input {
// 		background-color: aqua;
// 		display: flex;
// 		width: 50%;
// 		padding: 0px;
// 		margin: 0px;
// 	}
// }
</style>
