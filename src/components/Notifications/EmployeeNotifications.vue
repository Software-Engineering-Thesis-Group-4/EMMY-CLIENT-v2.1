<template>
	<div class="notification_list">

		<ExtremeEmotionNotification
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
import moment from "moment";
import ExtremeEmotionNotification from "@/components/Notifications/Templates/ExtremeEmotionNotification.vue";

export default {
	data() {
		return {
			notifications: [
				{
					// Notification ObjectId
					_id: "202asfas234fsedf1sef5wefwef",

					// Employee Reference
					employee: {
						employeeId: "2015-64890",
						firstName: "Katherine",
						lastName: "Jean",
						email: "kathjean@gmail.com",
						isMale: true,
						employmentStatus: 1,
						department: "Faculty",
						jobTitle: "Animation Teacher",
						photo: "employee_sample.png",
						fingerprintId: 5,
						terminated: false,
						latestLog: {}
					},

					// Employee Sentiment
					emotion: 1,

					// a list of users who already saw the notification
					seenBy: [
						"marygil@gmail.com",
						"joenil@gmail.com",
						"saludesnathaniel@gmail.com",
						"test@gmail.com"
					],

					// when was the notification created
					dateCreated: "2020-05-16T17:46:59.404Z"
				}
			]
		};
	},
	computed: {
		content_time() {
			return moment()
				.subtract(3, "hours")
				.fromNow();
		}
	},
	components: {
		ExtremeEmotionNotification
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