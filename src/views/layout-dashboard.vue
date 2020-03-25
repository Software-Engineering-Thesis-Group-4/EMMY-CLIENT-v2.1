<template>
	<div class="main-container">
		<h1 class="page-header">Dashboard</h1>
		<v-divider></v-divider>

		<div class="dv-group">
			<h2 class="group-label">General Statistics</h2>
			<!-- REFACTOR: Convert this to a component -->
			<div class="general-statistics-container">
				<div class="card"></div>
				<div class="card"></div>
				<div class="card"></div>
				<div class="card"></div>
			</div>
		</div>

		<div class="dv-group">
			<h2 class="group-label">Overall Employee Sentiment (per month)</h2>
			<OverallEmployeeSentiment />
		</div>

		<div class="dv-group">
			<!-- TODO: Create a component composing both the gender and department charts -->
		</div>
	</div>
</template>

<script>
import OverallEmployeeSentiment from "@/components/dashboard/OverallEmployeeSentiment.vue";

export default {
	data() {
		return {};
	},
	components: {
		OverallEmployeeSentiment
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.main-container {
	// background-color: #00ffbf36;
	min-width: 1024px;
}

.dv-group {
	// background-color: red;
	margin-top: 20px;
}

.group-label {
	font-size: 20px;
	margin-bottom: 10px;
	color: rgb(56, 56, 56);
}

.general-statistics-container {
	// background-color: #ff00003a;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	padding: 10px 0px 10px 10px;
}

.card {
	background: linear-gradient(-230deg, #f0f0f0, #ffffff);
	box-shadow: 6px 6px 12px #eeeeee, -6px -6px 12px #ffffff;
	// border: 1px solid #dddddd;
	width: 100%;
	height: 180px;
	margin-right: 30px;
	padding: 10px;
	border-radius: 10px;
}

// .red {
// 	background: linear-gradient(145deg, #ff8181, #e66d6d);
// 	box-shadow: inset 5px 5px 8px #e86e6e, inset -5px -5px 8px #ff8484;
// }
</style>