<template>
	<div class="layout-container">

		<div class="section user-section">

			<button class="dropdown-button"></button>

			<div class="user-section__division top-division">

				<!-- employee photo -->
				<div class="employee-photo">
					<v-img :src="getEmployeePhoto || '/placeholder_avatar02.png'"></v-img>
					<button class="edit-button">
						<v-icon>mdi-pencil</v-icon>
					</button>
				</div>

				<div class="employee-details">
					<span class="employee-name">{{ getEmployeeName }}</span>
					<span class="employee-job_title">{{ employee.jobTitle }}</span>
					<span class="employee-department">{{ employee.department }}</span>
				</div>
			</div>

			<!-- Work Details -->
			<div class="user-section__division bottom-division">

				<div class="employee-data-field">
					<label class="employee-data-field__label">Email</label>
					<span class="employee-data-field__value">{{ employee.email }}</span>
				</div>
				<div class="employee-data-field">
					<label class="employee-data-field__label">Employee ID</label>
					<span class="employee-data-field__value">{{ employee.employeeId }}</span>
				</div>
				<div class="employee-data-field">
					<label class="employee-data-field__label">Employment Type</label>
					<span class="employee-data-field__value">{{ getEmploymentType }}</span>
				</div>
				<div class="employee-data-field">
					<label class="employee-data-field__label">Gender</label>
					<span class="employee-data-field__value">{{ getGender }}</span>
				</div>
				<div class="employee-data-field">
					<label class="employee-data-field__label">Fingerprint ID</label>
					<span class="employee-data-field__value">{{ employee.fingerprintId }}</span>
				</div>

			</div>

		</div>

		<div class="section insights-section">

		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			employeeId: this.$route.params._id,
			employee: {}
		};
	},
	computed: {
		getEmployeePhoto() {
			if (this.employee.photo) {
				return `/${this.employee.photo}`;
			}

			return null;
		},
		getEmploymentType() {
			return this.employee.employmentStatus === 1
				? "Full-time Employee"
				: "Part-time Employee";
		},
		getGender() {
			return this.employee.isMale ? "Male" : "Female";
		},
		getEmployeeName() {
			return `${this.employee.firstName} ${this.employee.lastName}`;
		}
	},
	created() {
		this.$store.dispatch("employees/FETCH_EMPLOYEES").then(() => {
			let employee = this.$store.getters["employees/getEmployee"](
				this.employeeId
			);

			this.employee = employee;
		});
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: #ff00ff2d;
	// border: 1px dashed #0000002d;
	min-height: 35rem;

	display: grid;
	grid-template-columns: max-content 1fr;
	column-gap: 15px;
	margin-top: 20px;
}

.section {
	background-color: white;
	border: 1px solid #00000023;
	border-radius: 5px;
	padding: 20px;
}

.user-section {
	width: 20rem;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.user-section__division {
	min-height: 5rem;
	width: 100%;
	// border: 1px dashed #0000002d;
}

.top-division {
	min-height: max-content;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	.employee-photo {
		width: 10rem;
		position: relative;

		::v-deep .v-image {
			border-radius: 999px;
		}

		.edit-button {
			background-color: #ffffff;
			padding: 8px;
			border-radius: 999px;
			box-shadow: 1px 1px 5px #0000002c;
			position: absolute;
			bottom: 0px;
			right: 8px;

			&:hover {
				filter: brightness(0.95);
			}

			&:active {
				filter: brightness(0.9);
			}

			&::-moz-focus-inner {
				border: none;
			}
		}
	}

	.employee-details {
		display: flex;
		flex-direction: column;
		align-items: center;

		// border: 1px dashed #ff149165;
		width: 100%;
		margin: 10px 0px;

		.employee-name {
			text-align: center;
			font-size: 20px;
			font-weight: 500;
			font-family: "Cera Pro", sans-serif;
		}

		.employee-job_title {
			text-align: center;
			font-size: 14px;
			font-family: "Cera Pro", sans-serif;
			color: #030303;
		}
		.employee-department {
			text-align: center;
			font-size: 13px;
			font-family: "Cera Pro", sans-serif;
			color: #a0a0a0;
			letter-spacing: 1.2px;
		}
	}
}

.bottom-division {
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 10px 0px;
	border: 1px solid #00000023;
	border-style: solid none;

	.employee-data-field {
		// background-color: #e4e4e4;
		// border: 1px dashed #0000002c;
		padding: 8px 0px;

		display: flex;
		flex-direction: column;
		line-height: 20px;

		label {
			color: #b1b1b1;
			font-size: 14px;
		}

		.employee-data-field__value {
			font-size: 15px;
		}
	}
}

.insights-section {
	width: 100%;
}
</style>