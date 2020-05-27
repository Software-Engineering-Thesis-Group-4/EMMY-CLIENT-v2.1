<template>
	<div class="chart-container">
		<span>Sentiment of the Week</span>
		<div
			class="sentiment-container"
			v-if="sentimentOfTheWeek.length > 0"
		>
			<div
				v-for="item in sentimentOfTheWeek"
				:key="item.emotionValue"
				class="item"
			>
				<v-img
					:src="`/emotions/${item.emotionValue}.png`"
					class="emotion"
				>
				</v-img>
				<span class="item-emotion">{{ item.emotion }}</span>
			</div>
		</div>
		<div
			class="sentiment-container"
			v-else
		>
			<v-img
				src="/emotions/0.png"
				class="emotion"
			></v-img>
		</div>
		<!-- <span class="emotion-quantity">{{ emotions.angry }} - Angry</span>
		<span class="emotion-quantity">{{ emotions.sad }} - Sad</span>
		<span class="emotion-quantity">{{ emotions.okay }} - Okay</span>
		<span class="emotion-quantity">{{ emotions.happy }} - Happy</span>
		<span class="emotion-quantity">{{ emotions.amazing }} - Amazing</span> -->
	</div>
</template>

<script>
import moment from "moment";

export default {
	data() {
		return {
			sentimentOfTheWeek: [],
			emotions: {
				angry: 0,
				sad: 0,
				okay: 0,
				happy: 0,
				amazing: 0
			}
		};
	},
	computed: {},
	methods: {
		async getSentimentOfTheWeek() {
			await this.$store.dispatch("employees/FETCH_ATTENDANCELOGS");
			let logs = this.$store.getters["employees/attendanceLogs"];
			let today = moment("2020-12-26"); // FIX: remove date
			let startOfWeek = moment(today).day("Monday");

			if (logs.length > 0) {
				logs = logs.filter(
					item =>
						moment(item.dateCreated).isSameOrAfter(startOfWeek) &&
						moment(item.dateCreated).isSameOrBefore(today)
				);

				let emotions = [];
				logs.forEach(item => {
					item.emotionIn ? emotions.push(item.emotionIn) : null;
					item.emotionOut ? emotions.push(item.emotionOut) : null;
				});

				emotions.forEach(emotion => {
					switch (emotion) {
						case 1:
							++this.emotions.angry;
							break;
						case 2:
							++this.emotions.sad;
							break;
						case 3:
							++this.emotions.okay;
							break;
						case 4:
							++this.emotions.happy;
							break;
						case 5:
							++this.emotions.amazing;
							break;
					}
				});

				let max = 0;
				for (const emotion in this.emotions) {
					if (this.emotions[emotion] > max) {
						max = this.emotions[emotion];
					}
				}

				if (max > 0) {
					for (let emotion in this.emotions) {
						if (this.emotions[emotion] === max) {
							switch (emotion) {
								case "angry":
									this.sentimentOfTheWeek.push({
										emotionValue: 1,
										emotion: "angry"
									});
									break;
								case "sad":
									this.sentimentOfTheWeek.push({
										emotionValue: 2,
										emotion: "sad"
									});
									break;
								case "okay":
									this.sentimentOfTheWeek.push({
										emotionValue: 3,
										emotion: "okay"
									});
									break;
								case "happy":
									this.sentimentOfTheWeek.push({
										emotionValue: 4,
										emotion: "happy"
									});
									break;
								case "amazing":
									this.sentimentOfTheWeek.push({
										emotionValue: 5,
										emotion: "amazing"
									});
									break;
							}
						}
					}
				}
			}
		}
	},
	created() {
		this.getSentimentOfTheWeek();
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

.item {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #a5a5a5;
	text-transform: capitalize;
}

.emotion {
	min-width: 4.2rem;
	max-width: 5rem;

	&:hover {
		filter: brightness(0.9);
		cursor: pointer;
	}

	&:active {
		filter: brightness(0.95);
		cursor: pointer;
	}
}

.emotion-quantity {
	text-align: left;
}
</style>