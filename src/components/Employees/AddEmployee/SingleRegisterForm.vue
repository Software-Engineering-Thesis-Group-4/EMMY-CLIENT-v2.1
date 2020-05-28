<template>
	<v-form
		@submit.prevent="registerEmployee"
		class="single-register-form"
		ref="single_register_form"
	>
		<div class="form__inner-container">

			<p class="section_label">Personal Details</p>

			<div class="field-group">
				<v-text-field
					v-model="form_data.firstname"
					placeholder="First Name"
					:error-messages="errors.firstname"
					dense
					filled
					prepend-icon="mdi-account"
					color="black"
					class="textfield textfield--firstname"
				></v-text-field>

				<v-text-field
					v-model="form_data.lastname"
					placeholder="Last Name"
					:error-messages="errors.lastname"
					dense
					filled
					color="black"
					class="textfield textfield--lastname"
				></v-text-field>
			</div>

			<v-select
				v-model="form_data.gender"
				:items="['Male', 'Female']"
				:error-messages="errors.isMale"
				filled
				dense
				color="black"
				prepend-icon="mdi-gender-male-female"
				placeholder="Gender"
			></v-select>

			<v-text-field
				v-model="form_data.email"
				placeholder="Email"
				:error-messages="errors.email"
				dense
				filled
				color="black"
				prepend-icon="mdi-email"
				class="textfield"
			></v-text-field>

			<p class="section_label">Work Details</p>

			<v-text-field
				v-model="form_data.employee_id"
				placeholder="Employee ID"
				dense
				:error-messages="errors.employee_id"
				filled
				color="black"
				class="textfield"
			></v-text-field>

			<v-select
				v-model="form_data.department"
				:items="department_categories"
				:error-messages="errors.department"
				dense
				filled
				color="black"
				placeholder="Department"
			></v-select>

			<v-select
				v-model="form_data.employment_status"
				:error-messages="errors.employment_status"
				:items="employmentStatus"
				item-text="text"
				item-value="value"
				filled
				dense
				color="black"
				placeholder="Employment Type"
			></v-select>

			<v-text-field
				v-model="form_data.job_title"
				:error-messages="errors.job_title"
				placeholder="Job Title"
				dense
				filled
				color="black"
				class="textfield"
			></v-text-field>

			<v-text-field
				v-model="form_data.fingerprint_id"
				:error-messages="errors.fingerprint_id"
				placeholder="Fingerprint Number"
				min="0"
				dense
				filled
				color="black"
				type="number"
				class="textfield"
			></v-text-field>

			<v-file-input
				v-model="form_data.photo"
				accept="image/*"
				placeholder="Upload Photo"
				filled
				dense
				color="black"
				small-chips
				show-size
				prepend-icon="mdi-camera"
				ref="file_input"
			></v-file-input>

		</div>

		<div class="controls-container">
			<button
				type="reset"
				class="form-button form-button--cancel"
				@click="resetForm"
			>Cancel</button>
			<button
				type="submit"
				class="form-button form-button--save"
			>Save</button>
		</div>

	</v-form>
</template>

<script>
export default {
	data() {
		return {
			form_data: {
				firstname: null,
				lastname: null,
				email: null,
				gender: null,
				fingerprint_id: null,
				employee_id: null,
				department: null,
				employment_status: null,
				job_title: null,
				photo: null
			},

			errors: {
				firstname: "",
				lastname: "",
				isMale: "",
				email: "",
				employee_id: "",
				department: "",
				employment_status: "",
				job_title: "",
				fingerprint_id: ""
			},

			department_categories: this.$store.state.employees.departments,

			employmentStatus: [
				{ text: "Full-time", value: 1 },
				{ text: "Part-time", value: 0 }
			]
		};
	},
	computed: {
		isMale() {
			let male = null;

			switch (this.form_data.gender) {
				case "Male":
					male = true;
					break;

				case "Female":
					male = false;
					break;
			}

			return male;
		}
	},
	methods: {
		resetErrors() {
			this.errors.firstname = "";
			this.errors.lastname = "";
			this.errors.isMale = "";
			this.errors.email = "";
			this.errors.employee_id = "";
			this.errors.department = "";
			this.errors.employment_status = "";
			this.errors.job_title = "";
			this.errors.fingerprint_id = "";
		},
		registerEmployee() {
			let new_employee = {
				employee_id: this.form_data.employee_id,
				firstname: this.form_data.firstname,
				lastname: this.form_data.lastname,
				email: this.form_data.email,
				isMale: this.isMale,
				employment_status: this.form_data.employment_status,
				department: this.form_data.department,
				job_title: this.form_data.job_title,
				fingerprint_id: this.form_data.fingerprint_id,
				photo: this.form_data.photo
			};

			console.log(new_employee);

			this.$store
				.dispatch("employees/ADD_EMPLOYEE", new_employee)
				.then(({ success, errors }) => {
					if (!success) {
						// console.log(errors);
						this.resetErrors();
						for (const key in errors) {
							this.errors[key] = errors[key].msg;
						}
					} else {
						console.log(errors);
						this.resetErrors();
						this.$emit("closeForm");
					}
				});
		},
		resetForm() {
			this.resetErrors();
			this.$refs.single_register_form.reset();
			this.$emit("formCancel");
		}
	}
};
</script>

<style lang="scss" scoped>
.single-register-form {
	// background-color: #ff00ff49;
	border-top: 1px solid #00000023;
	height: 31rem;
	display: flex;
	flex-direction: column;
}

.form__inner-container {
	// background-color: #00ffff34;
	// border: 1px dashed #0000004f;
	padding-top: 10px;
	padding-right: 10px;
	height: 100%;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		background: transparent;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #00000025;
		border-radius: 999px;

		&:hover {
			background: #0000003f;
		}
	}
}

.section_label {
	color: #afafaf;
	font-weight: 400;
}

.field-group {
	display: flex;
	// background-color: #32cd3238;
	height: max-content;
	width: 100%;

	.textfield--firstname {
		margin-right: 10px;
	}
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