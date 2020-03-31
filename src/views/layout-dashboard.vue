<template>
	<div class="main-container">
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

		<div class="dv-group dual-column">
			<div class="dv-group-item">
				<h2 class="group-label">Overall Employee Sentiment (by gender)</h2>
				<GenderSentiment class="sentiment-chart" />
			</div>
			<div class="dv-group-item">
				<h2 class="group-label">
					Overall Employee Sentiment (by department)
				</h2>
				<DepartmentSentiment class="sentiment-chart" />
			</div>
		</div>
	</div>
</template>

<script>
import OverallEmployeeSentiment from "@/components/dashboard/OverallEmployeeSentiment.vue";
import GenderSentiment from "@/components/dashboard/Sentiment-Gender.vue";
import DepartmentSentiment from "@/components/dashboard/Sentiment-Department.vue";

export default {
	data() {
		return {};
	},
	components: {
		OverallEmployeeSentiment,
		GenderSentiment,
		DepartmentSentiment
	},
	created() {}
};
</script>

<style lang="scss" scoped>
.main-container {
	// background-color: #ffe60036; // FOR DEBUGGING
	min-width: 1024px;
	padding-bottom: 50px;
}

.dv-group {
	// background-color: #00eaff3b; // FOR DEBUGGING
	margin-top: 20px;

	.group-label {
		font-size: 20px;
		margin-bottom: 10px;
		color: rgb(56, 56, 56);
	}

	.dv-group-item {
		// background-color: red; // FOR DEBUGGING
		width: 100%;

		&:first-child {
			margin-right: 20px;
		}

		.sentiment-chart {
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			padding: 15px;
			border: 1px solid #e0e0e0;
			border-radius: 8px;
			height: 400px;
		}
	}
}

// Gender & Department Group
.dual-column {
	// background-color: red;
	display: flex;
	justify-content: space-between;
}

.general-statistics-container {
	// background-color: #ff00003a;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	padding: 10px 0px 10px 10px;

	.card {
		background: linear-gradient(-230deg, #f0f0f0, #ffffff);
		box-shadow: 6px 6px 12px #eeeeee, -6px -6px 12px #ffffff;
		// border: 1px solid #dddddd;
		width: 100%;
		height: 180px;
		padding: 10px;
		border-radius: 10px;

		&:not(:last-child) {
			margin-right: 20px;
		}
	}
}
</style>