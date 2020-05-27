<template>
	<div class="main-container">

		<div class="chart_group-1">
			<div class="cg1_subgroup">
				<div class="subgroup_container">
					<EmployeeSatisfaction />
				</div>
				<div class="subgroup_container">
					<SentimentOfTheWeek />
				</div>
			</div>
			<div class="overallchart_container">
				<!-- TODO: insert button for selecting year -->
				<OverallChart />
			</div>
		</div>

		<div class="chart_group-2">
			<div class="cg2_subgroup">
				<PositiveSentimentByGender />
			</div>
			<div class="cg2_subgroup">
				<NegativeSentimentByGender />
			</div>
			<div class="cg2_subgroup">
				Negative Sentiments By Log Mode
			</div>
		</div>

		<div class="chart_group-3">
			<DepartmentChart />
		</div>
	</div>
</template>

<script>
import OverallChart from "@/components/Dashboard/OverallChart/OverallChart.vue";
import EmployeeSatisfaction from "@/components/Dashboard/EmployeeSatisfaction/EmployeeSatisfaction.vue";
import SentimentOfTheWeek from "@/components/Dashboard/SentimentOfTheWeek/SentimentOfTheWeek.vue";
import PositiveSentimentByGender from "@/components/Dashboard/PositiveSentimentByGender/PositiveSentimentByGender.vue";
import NegativeSentimentByGender from "@/components/Dashboard/NegativeSentimentByGender/NegativeSentimentByGender.vue";
import DepartmentChart from "@/components/Dashboard/DepartmentChart/DepartmentChart.vue";

export default {
	data() {
		return {};
	},
	components: {
		OverallChart,
		EmployeeSatisfaction,
		SentimentOfTheWeek,
		PositiveSentimentByGender,
		NegativeSentimentByGender,
		DepartmentChart
	},
	async mounted() {
		await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");
	}
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
	padding-top: 7px;
}

.chart_group-1 {
	display: grid;
	width: 100%;
	min-height: 300px;

	grid-template-columns: 400px 1fr;
	column-gap: 14px;
	font-size: 14px;

	.cg1_subgroup {
		display: grid;
		width: 100%;
		min-height: 100%;
		height: max-content;
		grid-template-rows: 1fr 1fr;
		row-gap: 14px;

		.subgroup_container {
			display: flex;
			flex-direction: column;
			background-color: white;
			border: 0.5px solid #dedede;
			border-radius: 5px;
			padding: 10px;
		}
	}

	.overallchart_container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: white;
		border: 0.5px solid #dedede;
		border-radius: 5px;
		padding: 10px;
	}
}

.chart_group-2 {
	display: grid;
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: 14px;
	margin-top: 14px;
	font-size: 14px;
	max-height: 300px;

	.cg2_subgroup {
		display: flex;
		background-color: white;
		border: 0.5px solid #dedede;
		border-radius: 5px;
		width: 100%;
		height: 100%;
		padding: 10px;
	}
}

.chart_group-3 {
	// background-color: white;
	// border: 1px dashed #00000027;
	display: grid;
	min-height: 300px;
	height: max-content;
	margin-top: 14px;
}
</style>