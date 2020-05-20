<template>
	<div class="notification_list">

		<div
			class="notification_item notification_item--rounded notification_item--spaced"
			:class="{ 'unread': true }"
			v-for="n in 3"
			:key="n"
		>
			<div class="notification_item__employee">
				<v-img
					src="/placeholder_avatar02.png"
					class="employee__photo"
				>
				</v-img>
			</div>
			<div class="notification_item__content">
				<span class="content__message">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Praesentium, dolores sit. Ipsa, cumque temporibus!
					Qui eum, dolorum facilis itaque aliquam fuga ea, excepturi, quia aliquid explicabo voluptates eos ab quam.
				</span>
				<span class="content__time">
					{{ content_time }}
				</span>
			</div>
		</div>

		<div
			class="notification_item notification_item--rounded notification_item--spaced"
			:class="{ 'unread': false }"
			v-for="n in 0"
			:key="n"
		>
			<div class="notification_item__employee">
				<v-img
					src="/default.jpg"
					class="employee__photo"
				></v-img>
			</div>
			<div class="notification_item__content">
				<span class="content__message">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Praesentium, dolores sit. Ipsa, cumque temporibus!
					Qui eum, dolorum facilis itaque aliquam fuga ea, excepturi, quia aliquid explicabo voluptates eos ab quam.
				</span>
				<span class="content__time">
					{{ content_time }}
				</span>
			</div>
		</div>

	</div>
</template>

<script>
import moment from "moment";

export default {
	data() {
		return {};
	},
	computed: {
		content_time() {
			return moment()
				.subtract(3, "hours")
				.fromNow();
		}
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