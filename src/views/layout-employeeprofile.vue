<template>
	<div>
		<p>Employee ID: {{ employeeId }}</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			employeeId: this.$route.params._id,
			employeeRef: null,
		};
	},
	// TODO: Enable lifecycle hook
	// created() {
	// 	let employees = this.$store.getters["employees/employees"];

	// 	if (!!employees || employees == false) {
	// 		this.$store.dispatch("employees/FETCH_EMPLOYEES").then(() => {
	// 			console.log('fetched employees');
	// 			this.employeeRef = this.$store.getters["employees/getEmployee"](this.employeeId);
	// 			console.log(this.employeeRef);
	// 		});
	// 	} else {
	// 		this.employeeRef = this.$store.getters["employees/getEmployee"](this.employeeId);
	// 		console.log(this.employeeRef);
	// 	}
	// }
};
</script>

<style lang="scss" scoped>
</style>