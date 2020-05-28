<template>
	<div class="notification_item notification_item--rounded notification_item--spaced">
		<div class="notification_item__employee">
			<v-img
				:src="getUserPhoto || '/placeholder_avatar01.png'"
				class="employee__photo"
			>
			</v-img>
		</div>
		<div class="notification_item__content">
			<span class="content__message">
				{{ notification_ref.author.firstname }} {{ notification_ref.author.lastname }} registered a new employee -
				<span>{{ notification_ref.employee.firstName }} {{ notification_ref.employee.lastName }}</span>
				({{ notification_ref.employee.email }})
			</span>
			<span class="content__time">
				{{ notifTime }}
			</span>
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: ["notification_ref"],
	data() {
		return {};
	},
	computed: {
		notifTime() {
			return moment(this.notification_ref).format("LLL");
		},
		getUserPhoto() {
			if (this.notification_ref.author.photo) {
				return `/${this.notification_ref.author.photo}`;
			}

			return null;
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
		color: #00000073;
	}
}
</style>