<template>
	<div class="notification_list">

		<EmotionNotification
			v-for="item in notifications"
			:key="item._id"
			:employeeRef="item.employee"
			:dateCreated="item.dateCreated"
			:seenBy="item.seenBy"
			:emotion="item.emotion"
		/>

	</div>
</template>

<script>
import EmotionNotification from "@/components/Notifications/Templates/EmotionNotification.vue";

export default {
	data() {
		return {};
	},
	computed: {
		notifications() {
			let notifications = this.$store.state.notifications
				.emotion_notifications;
			notifications.sort(
				(a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
			);
			return notifications;
		}
	},
	components: {
		EmotionNotification
	}
};
</script>

<style lang="scss" scoped>
.notification_list {
	// background-color: #ff00ff1c;
	// border: 1px dashed #0000002c;
	min-height: 80vh;
	max-height: 80vh;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding-right: 10px;
	margin-top: 10px;
	padding-top: 5px;

	&::-webkit-scrollbar {
		background: transparent;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #00000025;
		border-radius: 999px;

		&:hover {
			background: #0000002c;
		}
	}
}

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

	.employee__photo {
		border-radius: 999px;
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
		color: #0000004d;
	}
}
</style>