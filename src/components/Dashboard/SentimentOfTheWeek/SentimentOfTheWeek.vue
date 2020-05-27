<template>
	<div class="chart-container">
		<span>Sentiment of the Week</span>
		<div class="sentiment-container">
			<v-img
				v-for="n in 5"
				:key="n"
				:src="`/emotions/${n}.png`"
				class="emotion"
			></v-img>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		getSentimentOfTheWeek() {
			let logs = this.$store.getters["employees/attendanceLogs"];
			if (logs.length > 0) {
				return logs;
			}

			return [];
		}
	},
	created() {
		console.log(this.getSentimentOfTheWeek());
	}
};
</script>

<style lang="scss" scoped>
.chart-container {
	font-size: 14px;
	display: flex;
	flex-direction: column;
	font-family: "Cera Pro", sans-serif;
	height: 100%;
}

.sentiment-container {
	display: flex;
	align-items: center;
	justify-content: center;
	// border: 1px dashed #0000002d;
	height: 100%;
}

.emotion {
	max-width: 4.2rem;
}
</style>