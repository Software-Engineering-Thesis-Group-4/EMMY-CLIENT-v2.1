<template>
	<div class="layout-container">
		<div class="content-container">
			<v-tabs
				v-model="tab"
				background-color="transparent"
				color="#567dd8"
				class="tabs"
			>
				<v-tab v-if="isAdmin">Employee Sentiment</v-tab>
				<v-tab>Account</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">

				<!-- Employee Sentiment Notifications (Intense Sentiment notifications) -->
				<v-tab-item v-if="isAdmin">
					<div class="notification_list">

						<div
							class="notification_item"
							:class="{ 'unread': true }"
						>
							<div class="notification_item__employee">
								<v-img
									src="/default.jpg"
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
							class="notification_item"
							:class="{ 'unread': false }"
							v-for="n in 10"
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
				</v-tab-item>

				<!-- Account Notifications (user related notification) -->
				<v-tab-item>
					<div class="notification_list">

						<div
							class="notification_item"
							:class="{ 'unread': true }"
							v-for="n in 3"
							:key="n"
						>
							<div class="notification_item__employee">
								<v-img
									src="/default.jpg"
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
							class="notification_item"
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
				</v-tab-item>
			</v-tabs-items>

		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	data() {
		return {
			content_time: moment()
				.subtract(3, "hours")
				.fromNow(),
			tab: null,
			isAdmin: this.$store.state.user.isAdmin,
			notifications: [
				{
					_id: 1, // should be the actual document _id of user
					type: "USER-CHANGED_PASSWORD",
					date: moment().calendar(),
					reciever: {
						firstname: "John",
						lastname: "Doe",
						photo: "default.png"
					}, // should be the actual user document
					author: null,
					employee: null,
					emotion: null
				},
				{
					_id: 2,
					type: "EMPLOYEE-EXTREME_EMOTION",
					date: moment().calendar(),
					reciever: {
						firstname: "John",
						lastname: "Doe",
						photo: "default.png"
					}, // should be the actual user document
					author: null,
					employee: {
						firstname: "John",
						lastname: "Doenut"
					},
					emotion: 1,
					photo: "default.jpg"
				},
				{
					_id: 3,
					type: "EMPLOYEE-EXTREME_EMOTION",
					date: moment().calendar(),
					reciever: "{user.firstname} {user.lastname}",
					author: null,
					employee: "John Doenut",
					emotion: 5,
					photo: "default.jpg"
				}
			]
		};
	},
	computed: {},
	methods: {},
	created() {
		// TODO: Implement data fetching. Fetch notifications from the database component creation.
		// TODO: if user is NOT an admin, ONLY fetch account notifications.
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// border: 1px dashed #0000003a;
	// background-color: #00ffff31;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 10px;
}

.content-container {
	// background-color: #ff00ff1c;
	// border: 1px dashed #0000002c;
	width: 60%;
	min-width: 700px;
	min-height: 500px;

	::v-deep .v-tabs-items {
		background-color: transparent;
	}
}

.tabs {
	::v-deep .v-tab {
		font-size: 15px;
		letter-spacing: 0px;
		font-family: "Cera Pro", sans-serif;
		text-transform: none;
	}
}

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
		cursor: pointer;
	}
}

.unread {
	background-color: #edf2fa;
	border: 1px solid #00000010;

	&:hover {
		filter: brightness(0.97);
		cursor: pointer;
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