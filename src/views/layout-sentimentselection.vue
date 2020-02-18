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
						Hi <span id="employee-name">{{ employee }}!</span><br>
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
					(Please let us know what you honestly feel today)
				</span>
			</div>
		</form>

		<div v-else class="welcome">
			<img src="@/assets/images/love.png" id="love" />
			<img src="@/assets/images/iACADEMY_Seal.png" alt="iacademy" />
			<h1>Good morning <span class="gamechanger">GAME CHANGER!</span></h1>
			<h2>Please log your attendance</h2>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "EmotionSelection",
	data() {
		return {

		};
	},
	computed: {
		...mapGetters({
			employeeLog: "emotions/employeeLog",
			employee: "emotions/employee",
			status: "emotions/status"
		})
	},
	methods: {
		async submitEmotion(emotion) {
			try {
				this.$store.dispatch("emotions/submitSentiment", {
					emotion: emotion,
					employeeLog: this.employeeLog,
					status: this.status
				});

			} catch (error) {
				console.log(error);
			}
		}
	},
	sockets: {}
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
	font-family: "Google Sans", sans-serif;
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
		text-shadow: 2px 3px 0px #0000003a;
		line-height: 70px;
		// margin-bottom: 20px;
	}

	.bottom-tip {
		margin-top: 10px;
		color: white;
		font-size: 18px;
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
			height: 150px;
		}
	}
}

.welcome {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	#love {
		position: absolute;
		right: 170px;
		top: -40px;
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
		font-size: 35px;
		margin-top: -10px;
	}
}
</style>