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
					dense
					filled
					prepend-icon="mdi-account"
					color="black"
					class="textfield textfield--firstname"
				></v-text-field>

				<v-text-field
					v-model="form_data.lastname"
					placeholder="Last Name"
					dense
					filled
					color="black"
					class="textfield textfield--lastname"
				></v-text-field>
			</div>

			<v-select
				:items="['Male', 'Female']"
				filled
				dense
				color="black"
				prepend-icon="mdi-gender-male-female"
				placeholder="Gender"
			></v-select>

			<v-text-field
				placeholder="Email"
				dense
				filled
				color="black"
				prepend-icon="mdi-email"
				class="textfield"
			></v-text-field>

			<p class="section_label">Work Details</p>

			<v-text-field
				placeholder="Employee ID"
				dense
				filled
				color="black"
				class="textfield"
			></v-text-field>

			<v-select
				:items="department_categories"
				dense
				filled
				color="black"
				placeholder="Department"
			></v-select>

			<v-select
				:items="['Full-time', 'Part-time']"
				filled
				dense
				color="black"
				placeholder="Employment Type"
			></v-select>

			<v-text-field
				placeholder="Job Title"
				dense
				filled
				color="black"
				class="textfield"
			></v-text-field>

			<v-file-input
				accept="image/*"
				placeholder="Upload Photo"
				filled
				dense
				color="black"
				small-chips
				show-size
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
				job_title: null
			},

			department_categories: this.$store.state.employees.departments
		};
	},
	methods: {
		registerEmployee() {
			alert("registerEmployee() NOT IMPLEMENTED.");
			// TODO: create POST request to add a new employee
			// if request is success, (emit an event | show a confirmation dialog)
		},
		resetForm() {
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