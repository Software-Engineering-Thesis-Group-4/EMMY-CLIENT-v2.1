<template>
	<div class="root-container">
		<form
			v-if="employee"
			method="POST"
			v-on:submit.prevent
			id="emotion-selection-form"
		>
			<div class="content-container">
				<div class="greeting">
					<h1>
						Hello, <span id="employee-name">{{ employee }}!</span><br />
						How are you feeling today?
					</h1>
				</div>

				<div class="emotion-container">
					<button type="submit" @click="submitEmotion(1)">
						<img class="emotion-image" src="/emotions/1.svg" />
					</button>
					<button type="submit" @click="submitEmotion(2)">
						<img class="emotion-image" src="/emotions/2.svg" />
					</button>
					<button type="submit" @click="submitEmotion(3)">
						<img class="emotion-image" src="/emotions/3.svg" />
					</button>
					<button type="submit" @click="submitEmotion(4)">
						<img class="emotion-image" src="/emotions/4.svg" />
					</button>
					<button type="submit" @click="submitEmotion(5)">
						<img class="emotion-image" src="/emotions/5.svg" />
					</button>
				</div>

				<span class="bottom-tip">
					Choose an emotion that best describes what you feel right now.
				</span>

				<div id="countdown">
					<div id="countdown-number"></div>
					<svg>
						<circle r="15" cx="20" cy="20"></circle>
					</svg>
				</div>

				<div class="chosen_emotion_container" v-if="showEmotionOverlay">
					<div class="overlay">
						<img
							:src="`/emotions/${emotionPicked || 5}.svg`"
							id="chosen_emotion_image"
						/>
					</div>
				</div>
			</div>
		</form>

		<div v-else-if="errorMessage" id="error">
			<h1>{{ errorMessage }}</h1>
		</div>

		<div v-else class="welcome">
			<img
				src="@/assets/images/iACADEMY_Seal.png"
				alt="iacademy"
				id="iacademy_logo"
			/>
			<h1>
				<img :src="`${dayGreeting}.svg`" id="timeGraphics" :alt="dayGreeting" />
				<span>Good {{ dayGreeting }} </span>
				<span class="gamechanger">GAME CHANGER!</span>
			</h1>
			<h2>Please log your attendance</h2>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import anime from "animejs";

export default {
	name: "EmotionSelection",
	data() {
		return {
			emotionPicked: 0,
			showEmotionOverlay: false,
			timeOut: null
		};
	},
	computed: {
		...mapGetters({
			employeeLog: "emotions/employeeLog",
			employee: "emotions/employee",
			status: "emotions/status",
			errorMessage: "emotions/errorMessage"
		}),
		dayGreeting() {
			let time = new Date().getHours();

			if (time > 0 && time < 12) {
				return "morning";
			} else if (time >= 12 && time < 18) {
				return "afternoon";
			} else {
				return "evening";
			}
		}
	},
	methods: {
		async submitEmotion(emotion) {
			this.emotionPicked = emotion;
			this.show();

			try {
				this.$store.dispatch("emotions/SUBMIT_SENTIMENT", {
					emotion: emotion,
					employeeLog: this.employeeLog,
					status: this.status
				});

				clearTimeout(this.timeOut);
			} catch (error) {
				console.log(error);
			}
		},
		async show() {
			this.showEmotionOverlay = true;

			await setTimeout(() => {
				this.showEmotionOverlay = false;
				this.$store.commit("emotions/CLEAR");
			}, 1500);

			anime
				.timeline({
					targets: ".chosen_emotion_container",
					zIndex: "2",
					easing: "easeInOutBack",
					delay: "-1000"
				})
				.add(
					{
						targets: ".overlay",
						opacity: 1
					},
					"500"
				)
				.add(
					{
						targets: "#chosen_emotion_image",
						scale: 1.3
					},
					"900"
				)
				.add(
					{
						targets: ".overlay",
						opacity: 0
					},
					"1000"
				);
		}
	},
	sockets: {
		async employeeLog() {
			clearTimeout(this.timeOut);
			this.timeOut = setTimeout(() => {
				this.$store.commit("emotions/CLEAR");
			}, 15000);
		},
		async logError() {
			clearTimeout(this.timeOut);
			this.timeOut = setTimeout(() => {
				this.$store.commit("emotions/CLEAR");
			}, 1500);
		}
	}
};
</script>

<style lang="scss" scoped>
.root-container {
	display: flex;
	flex-direction: column;
	background-color: white;
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;
	background: rgb(123, 194, 255);
	background: url("../assets/images/hexagon-pattern.svg") no-repeat -100px 200px,
		linear-gradient(
			138deg,
			rgba(123, 194, 255, 1) 0%,
			rgba(87, 136, 251, 1) 100%
		);
}

#emotion-selection-form {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Cera Pro", sans-serif;
	// background-color: aquamarine;
}

.content-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.greeting {
		text-align: center;
		color: white;
		font-size: 30px;
		text-shadow: 2px 2px 0px #5535fc;
		line-height: 70px;
		// margin-bottom: 20px;
	}

	.bottom-tip {
		margin-top: 10px;
		color: #ffffff;
		font-size: 20px;
	}
}

.emotion-container {
	// background-color: #f5f5f5;
	display: flex;
	margin-top: 30px;

	button {
		background: #ffffff00;
		padding: 0px;
		margin: 0px 5px;
		border: none;
		display: flex;

		&:hover {
			cursor: pointer;
		}

		.emotion-image {
			height: 165px;
		}
	}
}

.welcome {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-top: 20px;

	#timeGraphics {
		margin-right: 10px;
		height: 50px;
	}

	#iacademy_logo {
		height: 190px;
	}

	h1 {
		font-size: 50px;
		letter-spacing: -1px;
		color: white;
		text-shadow: 2px 2px 0px #5535fc;

		.gamechanger {
			font-weight: bolder;
		}
	}

	h2 {
		font-weight: normal;
		color: white;
		text-shadow: 2px 2px 0px #5535fc;
		font-size: 38px;
		margin-top: -10px;
	}
}

#error {
	font-size: 20px;
	color: white;
}

#countdown {
	position: relative;
	margin-top: 30px;
	height: 40px;
	width: 40px;
	text-align: center;

	#countdown-number {
		color: white;
		display: inline-block;
		line-height: 40px;
	}

	svg {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		height: 40px;
		transform: rotateY(-180deg) rotateZ(-90deg);
	}

	svg circle {
		stroke-dasharray: 113px;
		stroke-dashoffset: 0px;
		stroke-linecap: round;
		stroke-width: 2px;
		stroke: white;
		fill: none;
		animation: countdown 15s linear infinite forwards;
	}
}

.chosen_emotion_container {
	position: absolute;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: -1;
	// background-color: #ff0000;

	.overlay {
		position: absolute;
		height: 100vh;
		width: 100%;
		background-color: #00000079;
		opacity: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#chosen_emotion_image {
		position: absolute;
	}
}

@keyframes countdown {
	from {
		stroke-dashoffset: 0px;
	}
	to {
		stroke-dashoffset: 113px;
	}
}

@media (max-width: 900px) {
	#emotion-selection-form {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "Cera Pro", sans-serif;
		// background-color: aquamarine;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.greeting {
			text-align: center;
			color: white;
			font-size: 20px;
			text-shadow: 2px 2px 0px #5535fc;
			line-height: 48px;
			// margin-bottom: 20px;
		}

		// #employee-name {
		// 	color: #92FFDA;
		// }

		.bottom-tip {
			margin-top: 10px;
			font-size: 15px;
		}
	}

	.emotion-container {
		// background-color: #f5f5f5;
		padding: 0px;
		margin: 0px;
		display: flex;
		margin-top: 10px;

		button {
			background: #ffffff00;
			padding: 0px;
			margin: 0px 5px;
			border: none;
			display: flex;

			&:hover {
				cursor: pointer;
			}

			.emotion-image {
				height: 110px;
			}
		}
	}

	.welcome {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-top: 20px;

		#timeGraphics {
			height: 40px;
		}

		#iacademy_logo {
			height: 150px;
		}

		h1 {
			font-size: 40px;
			letter-spacing: -1px;
			color: white;
			text-shadow: 2px 2px 0px #5535fc;

			.gamechanger {
				font-weight: bolder;
			}
		}

		h2 {
			font-weight: normal;
			color: white;
			text-shadow: 2px 2px 0px #5535fc;
			font-size: 28px;
			margin-top: -10px;
		}
	}

	#error {
		font-size: 15px;
		color: white;
		// background-color: #5535fc;
		line-height: 43px;
		width: 70%;
		text-align: center;
		font-weight: normal;
	}

	#countdown {
		position: relative;
		margin-top: 10px;
		height: 40px;
		width: 40px;
		text-align: center;
	}
}
</style>
