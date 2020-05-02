<template>
	<div class="layout-container">
		<div class="notification-container">
			<ul class="notifications-itemlist">
				<li
					v-for="item in notifications"
					:key="item._id"
				>
					<!-- template: password changed ----------------------------------------------------------------->
					<div
						v-if="item.type === 'USER-CHANGED_PASSWORD'"
						class="notification_item unread"
					>
						<div class="user">
							<v-img
								:src="null || 'default.png'"
								alt="employee"
								class="avatar"
							/>
						</div>
						<span class="notification-message">
							Your password has been changed on
							<span class="date-time">({{ item.date }})</span>. If this looks
							suspicious please contact your administrator immediately.
						</span>
					</div>

					<!-- template: extreme emotion : angry ---------------------------------------------------------->
					<div
						v-else-if="item.type === 'EMPLOYEE-EXTREME_EMOTION' && item.emotion === 1"
						class="notification_item unread"
					>
						<div class="employee">
							<img
								src="/sample-image.png"
								alt="employee"
								class="avatar"
							/>
							<img
								src="/emotions/1.png"
								alt=""
								class="sentiment"
							/>
						</div>
						<span class="notification-message">
							Oh no! <span class="employee-name">{{ item.employee }}</span> is feeling
							<span class="emotion">"angry"</span> ({{ item.date }}). Reach out to your employees personally or by send them an
							email to see how they're doing.
						</span>
					</div>

					<!-- template: extreme emotion : amazing -------------------------------------------------------->
					<div
						v-else-if="item.type === 'EMPLOYEE-EXTREME_EMOTION' && item.emotion === 5"
						class="notification_item unread"
					>
						<div class="employee">
							<img
								src="/sample-image.png"
								class="avatar"
							/>
							<img
								src="/emotions/5.png"
								class="sentiment"
							/>
						</div>
						<span class="notification-message">
							Wow! <span class="employee-name">{{ item.employee }}</span> is feeling
							<span class="emotion">"amazing"</span> ({{ item.date }}). Reach out to your employees personally or by send them an
							email to see how they're doing.
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// FIX: for test purposes
import moment from "moment";
export default {
	data() {
		return {
			// FIX: This is just a sample format
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
		// TODO: Implement data fetching. Fetch data from the database when the user visits the page
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// border: 1px dashed black;
	// background-color: #00ffff31;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 10px;
}

.notification-container {
	background-color: #fff;
	border: 0.5px solid #e6e6e6;
	display: flex;
	flex-direction: column;
	width: 800px;
	padding: 20px 0px;
}

.notifications-itemlist {
	// background-color: red;
	// BUG: ---------------------------------------------------------------------------------------------------------------------------------
	display: none;
	list-style-type: none;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;

	li {
		width: 100%;
	}

	.notification_item {
		// background-color: violet;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 9px 40px;

		&.unread {
			// background-color: #ecf5ff;
		}

		.user,
		.employee {
			background-color: turquoise;
			position: relative;
			margin-right: 20px;
			display: flex;

			.avatar {
				border-radius: 999px;
			}

			.sentiment {
				height: 20px;
				position: absolute;
				bottom: 0px;
				right: -6px;
			}
		}

		.notification-message {
			font-size: 14px;
			color: #747474;

			.employee-name,
			.emotion,
			.date-time {
				font-weight: bold;
			}
		}
	}
}
</style>