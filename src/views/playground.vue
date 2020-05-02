<template>
	<div class="layout-container">
		<OverallChart />
	</div>
</template>

<script>
import OverallChart from '@/components/Dashboard/OverallChart/OverallChart.vue'
import moment from "moment";

export default {
	data() {
		return {}
	},
	components: {
		OverallChart,
	},
	created() {
		let sentiments = [
			{
				name: "Angry",
				data: []
			},
			{
				name: "Sad",
				data: []
			},
			{
				name: "Okay",
				data: []
			},
			{
				name: "Happy",
				data: []
			},
			{
				name: "Amazing",
				data: []
			},
			{
				name: "Unsubmitted",
				data: []
			}
		];

		this.$http
			.get(`/api/employeelogs/year/${this.fetchYear}`)
			.then(response => {
				let logs = response.data;
				logs.forEach(item => {
					// TODO: -----------------------------------
				});
			}).catch(error => {
				console.log(error.response.data);
			})
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// border: 1px dashed black;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #ff00002d;
}

.card {
	min-height: 100px;
	min-width: 1000px;
	padding: 10px;
	background-color: white;
	border-radius: 5px;
	box-shadow: 1px 1px 1px 1px #00000011;
}

</style>