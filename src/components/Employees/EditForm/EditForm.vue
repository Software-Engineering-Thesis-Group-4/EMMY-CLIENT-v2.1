<template>
	<v-dialog
		v-model="activate"
		@click:outside="$emit('closeDialog')"
		max-width="30rem"
	>
		<v-form
			@submit.prevent="updateEmployee"
			class="edit-employee-form"
			ref="edit_employee_form"
		>
			<p class="form-title">
				<span class="edit-icon">
					<v-icon small>mdi-pencil</v-icon>
				</span>
				EDIT
			</p>
			<div class="inner-container">
				<p class="section_label">Personal Details</p>

				<div class="field-group">
					<v-text-field
						:value="employee.firstname"
						label="First Name"
						dense
						filled
						prepend-icon="mdi-account"
						color="black"
						class="textfield textfield--firstname"
					></v-text-field>

					<v-text-field
						:value="employee.lastname"
						label="Last Name"
						dense
						filled
						color="black"
						class="textfield textfield--lastname"
					></v-text-field>
				</div>

				<v-select
					:value="employee.gender"
					:items="['Male', 'Female']"
					filled
					dense
					color="black"
					prepend-icon="mdi-gender-male-female"
					label="Gender"
				></v-select>

				<v-text-field
					:value="employee.email"
					label="Email"
					dense
					filled
					color="black"
					prepend-icon="mdi-email"
					class="textfield"
				></v-text-field>

				<p class="section_label">Work Details</p>

				<v-text-field
					:value="employee.employeeId"
					label="Employee ID"
					dense
					filled
					color="black"
					class="textfield"
				></v-text-field>

				<v-select
					:value="employee.department"
					:items="department_categories"
					dense
					filled
					color="black"
					label="Department"
				></v-select>

				<v-select
					:value="getEmploymentType"
					:items="['Full-time', 'Part-time']"
					filled
					dense
					color="black"
					label="Employment Type"
				></v-select>

				<v-text-field
					:value="employee.jobTitle"
					label="Job Title"
					dense
					filled
					color="black"
					class="textfield"
				></v-text-field>

				<v-text-field
					:value="employee.fingerprintId"
					label="Fingerprint Number"
					min="0"
					dense
					filled
					color="black"
					type="number"
					class="textfield"
				></v-text-field>
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

	</v-dialog>
</template>

<script>
export default {
	props: {
		activate: Boolean,
		employee_ref: Object
	},
	data() {
		return {
			department_categories: this.$store.state.employees.departments
		};
	},
	computed: {
		employee() {
			return this.employee_ref;
		},
		getEmploymentType() {
			return this.employee.employmentStatus === 1
				? "Full-time"
				: "Part-time";
		}
	},
	methods: {
		resetForm() {
			this.$emit("closeDialog");
		},
		updateEmployee() {
			alert("updateEmployee() Not yet Implemented.");
		}
	},
	beforeMount() {}
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
	box-shadow: none;
	border-radius: 10px;
	background-color: white;
	width: 28rem;
	padding: 15px;
}

.edit-employee-form {
	// background-color: #00ffff34;
	height: 32rem;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.form-title {
	background-color: #00000013;
	text-align: center;
	font-size: 16px;
	color: #808080;
	font-weight: 600;
	padding: 5px 0px;
	margin-bottom: 5px;

	.edit-icon {
		// background-color: red;
		display: inline-flex;

		::v-deep i {
			color: inherit;
		}
	}
}

.inner-container {
	// border: 1px dashed #0000004f;
	padding: 0px 10px 0px 5px;
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

.sample-field {
	height: 2.5rem;
	border: 1px dashed #00000034;
	border-radius: 5px;
	margin-bottom: 2rem;
}
</style>