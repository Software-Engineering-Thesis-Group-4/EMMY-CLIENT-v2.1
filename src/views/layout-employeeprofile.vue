<template>
	<div
		class="layout-container"
		v-if="!loading"
	>
		<EmployeeDetails :employeeRef="employee" />
		<EmployeeInsights />
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
</template>

<script>
import EmployeeDetails from "@/components/EmployeeProfile/EmployeeDetails.vue";
import EmployeeInsights from "@/components/EmployeeProfile/EmployeeInsights.vue";
export default {
	data() {
		return {
			employeeId: this.$route.params._id,
			employee: {},
			loading: true,

			/* testing ------------------- */
			// TESTING: Remove timeout...
			timeout: null
			/* testing ------------------- */
		};
	},
	components: {
		EmployeeDetails,
		EmployeeInsights
	},
	mounted() {
		// TESTING: Remove timeout...
		this.timeout = setTimeout(() => {
			this.$store.dispatch("employees/FETCH_EMPLOYEES").then(() => {
				let employee = this.$store.getters["employees/getEmployee"](
					this.employeeId
				);

				this.employee = employee;
				this.loading = false;
			});
		}, 1800);
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

	align-items: center;
	justify-content: center;
}

.loading {
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