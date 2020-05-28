<template>
	<div class="layout-container">
		<router-link
			to="/employees"
			class="employee-list-link"
		>&lt; Employee List</router-link>

		<div
			class="main-container"
			v-if="!loading"
		>
			<EmployeeDetails :employeeRef="employee" />
			<EmployeeInsights v-if="isAdmin" />
		</div>

		<div
			v-else
			class="loading"
		>
			<v-progress-circular
				indeterminate
				:size="50"
			></v-progress-circular>
		</div>

	</div>

</template>

<script>
import EmployeeDetails from "@/components/EmployeeProfile/EmployeeDetails.vue";
import EmployeeInsights from "@/components/EmployeeProfile/EmployeeInsights.vue";

export default {
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,
			employeeId: this.$route.params._id,
			employee: {},
			loading: true
		};
	},
	components: {
		EmployeeDetails,
		EmployeeInsights
	},
	mounted() {
		this.$store.dispatch("employees/FETCH_EMPLOYEES").then(() => {
			let employee = this.$store.getters["employees/getEmployee"](
				this.employeeId
			);

			this.employee = employee;
			this.loading = false;
		});
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: #ff00ff2d;
	// border: 1px dashed #0000002d;
	min-height: 35rem;
	margin-top: 20px;
}

.employee-list-link {
	// background-color: red;
	padding: 5px;
	margin-bottom: 10px;
}

.main-container {
	// background-color: #ff00ff2d;
	// border: 1px dashed #0000002d;
	margin-top: 10px;
	display: grid;
	grid-template-columns: max-content 1fr;
	column-gap: 15px;

	align-items: center;
	justify-content: center;
}

.loading {
	// background-color: #ff00ff25;
	min-height: 70vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	::v-deep .v-progress-circular {
		opacity: 0.3;
	}
}
</style>