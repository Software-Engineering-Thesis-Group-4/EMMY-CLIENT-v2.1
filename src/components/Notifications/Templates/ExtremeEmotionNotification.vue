<template>
	<div
		class="notification_item notification_item--rounded notification_item--spaced"
		:class="{ 'unread': !hasRead }"
	>

		<div class="notification_item__employee">
			<!-- employee photo -->
			<v-img
				:src="`/${employeeRef.photo}` || `/default.jpg`"
				class="employee__photo"
			>
			</v-img>
			<!-- employee emotion -->
			<v-img
				:src="emotionIcon"
				class="employee__emotion"
			></v-img>
		</div>

		<div class="notification_item__content">

			<!-- angry sentiment notification message -->
			<span
				class="content__message"
				v-if="sentiment === 'Angry'"
			>
				<strong>{{ `${ employee.firstName } ${employee.lastName}` }}</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Praesentium, dolores sit. Ipsa, cumque temporibus! <strong class="sentiment">{{ sentiment }}</strong>
				Qui eum, dolorum facilis itaque aliquam fuga ea, excepturi, quia aliquid explicabo voluptates eos ab quam.
			</span>

			<!-- amazing sentiment notification message -->
			<span
				class="content__message"
				v-if="sentiment === 'Amazing'"
			>
				<strong>{{ `${ employee.firstName } ${employee.lastName}` }}</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Praesentium, dolores sit. Ipsa, cumque temporibus! <strong class="sentiment">{{ sentiment }}</strong>
				Qui eum, dolorum facilis itaque aliquam fuga ea, excepturi, quia aliquid explicabo voluptates eos ab quam.
			</span>
			<span class="content__time">
				{{ time }}
			</span>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	props: ["read", "employeeRef", "dateCreated", "seenBy", "emotion"],
	data() {
		return {
			employee: this.employeeRef
		};
	},
	computed: {
		hasRead() {
			return this.seenBy.includes("test@gmail.com");
		},
		time() {
			return moment(this.dateCreated).fromNow();
		},
		sentiment() {
			let sentiment = "";
			switch (this.emotion) {
				case 1:
					sentiment = "Angry";
					break;

				case 5:
					sentiment = "Amazing";
					break;
			}

			return sentiment;
		},
		emotionIcon() {
			return `/emotions/${this.emotion}.svg`;
		}
	}
};
</script>

<style lang="scss" scoped>
.notification_item {
	border: 1px solid #0000001f;
	background-color: white;
	min-height: max-content;
	font-size: 14px;
	padding: 10px;
	margin-top: -1px;
	display: flex;
	flex-direction: row;

	&:hover {
		filter: brightness(0.97);
		// cursor: pointer;
	}
}

.notification_item--rounded {
	border-radius: 3px;
}

.notification_item--spaced {
	margin-top: 10px;
}

.unread {
	background-color: #edf2fa;
	border: 1px solid #00000010;

	&:hover {
		filter: brightness(0.97);
		// cursor: pointer;
	}
}

.notification_item__employee {
	// border: 1px dotted #0000001f;
	width: 50px;
	height: 50px;
	display: flex;
	flex-direction: column;
	position: relative;

	.employee__photo {
		border-radius: 999px;
		width: 50px;
		height: 50px;
	}

	.employee__emotion {
		width: 25px;
		position: absolute;
		bottom: -8px;
		right: 0px;
	}
}

.notification_item__content {
	// border: 1px dotted #0000001f;
	width: 100%;
	min-height: 50px;
	margin-left: 10px;
	display: flex;
	flex-direction: column;

	.content__time {
		color: #00000067;
	}
}

.sentiment {
	text-transform: capitalize;
}
</style>