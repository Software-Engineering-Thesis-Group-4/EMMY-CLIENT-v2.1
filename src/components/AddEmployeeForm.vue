<template>
	<div>
		<!-- FIXME: Change the form into vuetify's form -->
		<!-- TODO: add the upload csv button for adding multiple employees -->
		<form method="POST" v-on:submit.prevent="addEmployee">
			<h1>Add New Employee</h1>

			<label for="firstname">Firstname</label>
			<input type="text" name="firstname" v-model="formData.firstname" />

			<label for="">Lastname</label>
			<input type="text" name="lastname" v-model="formData.lastname" />

			<div class="field-group">
				<div class="gender-field-group">
					<label for="gender">Gender</label><br />
					<input
						type="radio"
						name="gender"
						value="true"
						v-model="formData._isMale"
					/>
					Male
					<input
						type="radio"
						name="gender"
						value="false"
						v-model="formData._isMale"
					/>
					Female
				</div>

				<div class="fingerprint-field-group">
					<label for="fingerprint_number">Fingerprint Number</label><br />
					<input
						type="number"
						name="fingerprint_number"
						min="1"
						v-model="formData.fingerprint_id"
					/>
				</div>

				<div class="email-field-group">
					<label for="email">Email</label>
					<input type="email" name="email" v-model="formData.email" />
				</div>
			</div>

			<label for="employee_id">Employee ID</label>
			<input type="text" name="employee_id" v-model="formData.employee_id" />

			<label for="department">Department</label>
			<input type="text" name="department" v-model="formData.department" />

			<label for="employment_status">Employment Status:</label>
			<input
				type="text"
				name="employment_status"
				v-model="formData.employment_status"
			/>

			<label for="job_title">Job Title</label>
			<input type="text" name="job_title" v-model="formData.job_title" />

			<div class="form-button-group">
				<input class="form-button" type="submit" value="Save" />
				<button
					class="form-button closeButton"
					@click="closeForm()"
				>
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "AddEmployeeForm",
	data: () => {
		return {
			userIsAdmin: true,
			passwordHidden: false,
			formData: {
				firstname: "Nathaniel",
				lastname: "Saludes",
				_isMale: true,
				fingerprint_id: 1,
				email: "saludesnathaniel@gmail.com",
				employee_id: "2015-02034",
				department: "HR",
				employment_status: 1,
				job_title: "HR Assitant"
			}
		};
	},
	methods: {
		closeForm() {
			this.$emit("close");
		},
		addEmployee() {
			this.$store.dispatch("employees/addEmployee", this.formData).then(() => {
				this.closeForm();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	// position: relative;
	background-color: white;
	color: #656565;
	padding: 28px 25px;
	box-shadow: 4px 6px 4px 4px #00000025;
	display: flex;
	flex-direction: column;
}

h1 {
	margin-bottom: 10px;
	color: #779aec;
}

.close-button {
	position: absolute;
	z-index: 3;
	right: 668px;
	top: 135px;
	height: 12px;
}

.form-graphics {
	z-index: 2;
	height: 150px;
	position: absolute;
	top: 50px;
	left: 850px;
}

label {
	font-family: "Cera Pro", sans-serif;
	font-size: 13px;
	margin-bottom: 2px;
}

input[type="text"],
input[type="email"],
input[type="number"] {
	padding: 10px;
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	margin-bottom: 10px;
}

.field-group {
	display: flex;
	flex-direction: row;
	// background-color: blue;

	.fingerprint-field-group {
		// background-color: red;
		width: 150px;
		margin-right: 15px;
		input {
			width: 100%;
		}
	}

	.email-field-group {
		flex-grow: 1;
		// background-color: red;

		input {
			width: 100%;
		}
	}

	.gender-field-group {
		width: 140px;
	}
}

.form-button-group {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin-top: 5px;
	// background-color: blue;

	.form-button {
		padding: 10px;
		font-family: "Product Sans Medium", sans-serif;
		font-size: 16px;
	}

	input[type="submit"] {
		background-color: #779aec;
		color: white;
		border-radius: 5px;
		width: 130px;
		margin-right: 10px;
	}

	.closeButton {
		background-color: transparent;
		color: #d8d8d8;
		border: 1px solid #e1e1e1;
		border-radius: 5px;
		width: 130px;
	}
}
</style>