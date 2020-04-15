<template>
	<div class="main-container">
		<div class="dv-group">
			<h2 class="group-label">General Statistics</h2>
			<!-- REFACTOR: Convert this to a component -->
			<div class="general-statistics-container">
				<div class="card">
					<!-- <h1>Item 1</h1> -->
				</div>
				<div class="card">
					<!-- <h1>Item 2</h1> -->
				</div>
				<div class="card">
					<!-- <h1>Item 3</h1> -->
				</div>
				<div class="card">
					<!-- <h1>Item 4</h1> -->
				</div>
			</div>
		</div>

		<div class="dv-group">
			<h2 class="group-label">Overall Employee Sentiment (per month)</h2>
			<OverallEmployeeSentiment />
		</div>

		<div class="dv-group dual-column">

			<div class="dv-group-item">
				<h2 class="group-label">Overall Employee Sentiment (by gender)</h2>
				<GenderSentiment />
			</div>

			<div class="dv-group-item">
				<h2 class="group-label">
					Overall Employee Sentiment (by department)
				</h2>
				<DepartmentSentiment />
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
	// DEBUGGING ---------------------------------------
	// background-color: #ffe60036;
	// -------------------------------------------------
	min-width: 1024px;
	max-width: 1522.39px;
	width: 100%;
	padding-bottom: 50px;

	align-self: center;
}

.general-statistics-container {
	// DEBUGGING ---------------------------------------
	// background-color: #ff00003a;
	// border: 1px dashed #727272;
	// -------------------------------------------------
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 5px;
	width: 100%;

	.card {
		// NEOMORPHISM
		/* background: linear-gradient(-230deg, #f0f0f0, #ffffff);
		box-shadow: 6px 6px 12px #eeeeee, -6px -6px 12px #ffffff; */

		background-color: #ffffff;
		border: 0.5px solid #dddddd;

		width: 100%;
		height: 100px;
		padding: 10px;
		border-radius: 10px;

		display: flex;
		justify-content: center;
		align-items: center;

		color: #c531ff44;
	}
}

.dv-group {
	// DEBUGGING ---------------------------------------
	// background-color: #00eaff3b;
	// border: 1px dashed #f82fff91;
	// -------------------------------------------------
	margin-top: 20px;
	width: 100%;

	.group-label {
		font-size: 20px;
		margin-bottom: 10px;
		color: #383838;
	}
}

// Gender & Department Group
.dual-column {
	// DEBUGGING ---------------------------------------
	// background-color: #df41ff36; // FOR DEBUGGING
	// -------------------------------------------------
	display: grid;
	grid-template-columns: 0.8fr 1fr;
	column-gap: 15px;

	.dv-group-item {
		// DEBUGGING ---------------------------------------
		// background-color: red;
		// border: 1px dashed #b4b4b4;
		// -------------------------------------------------
		width: 100%;
	}
}
</style>