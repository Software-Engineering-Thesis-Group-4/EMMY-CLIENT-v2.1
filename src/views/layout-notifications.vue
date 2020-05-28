<template>
	<div class="layout-container">
		<div
			class="content-container"
			v-if="isAdmin"
		>
			<v-tabs
				v-model="tab"
				background-color="transparent"
				color="#567dd8"
				class="tabs"
				@change="fetchData"
			>
				<v-tab v-if="isAdmin">Employees</v-tab>
				<v-tab>Account</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">

				<!-- Employee Sentiment Notifications (Intense Sentiment notifications) -->
				<v-tab-item>
					<EmployeeNotifications v-if="!loading" />
					<div
						v-if="loading"
						class="loader-container"
					>
						<v-skeleton-loader
							type="list-item-avatar-two-line"
							v-for="n in 10"
							:key="n"
						></v-skeleton-loader>
					</div>
				</v-tab-item>

				<!-- Account Notifications (user related notification) -->
				<v-tab-item>
					<UserNotifications v-if="!loading" />
					<div
						v-if="loading"
						class="loader-container"
					>
						<v-skeleton-loader
							type="list-item-avatar-two-line"
							v-for="n in 10"
							:key="n"
						></v-skeleton-loader>
					</div>
				</v-tab-item>
			</v-tabs-items>

		</div>
	</div>
</template>

<script>
import EmployeeNotifications from "@/components/Notifications/EmployeeNotifications.vue";
import UserNotifications from "@/components/Notifications/UserNotifications.vue";

export default {
	components: {
		EmployeeNotifications,
		UserNotifications
	},
	data() {
		return {
			loading: true,
			tab: null,
			isAdmin: this.$store.state.user.isAdmin
		};
	},
	methods: {
		fetchData(tabIndex) {
			switch (tabIndex) {
				case 0:
					this.loading = true;
					this.$store
						.dispatch("notifications/FETCH_NOTIFICATIONS_EMOTION")
						.then(success => {
							this.loading = false;
						});

					break;

				case 1:
					// fetch notification from server
					this.loading = true;
					this.$store
						.dispatch("notifications/FETCH_NOTIFICATIONS_CRUD")
						.then(success => {
							this.loading = false;
						});

					break;
			}
		}
	},
	sockets: {
		newEmotionNotification() {
			this.$store.dispatch("notifications/FETCH_NOTIFICATIONS_EMOTION");
		},
		newCRUDNotification() {
			this.$store.dispatch("notifications/FETCH_NOTIFICATIONS_CRUD");
		}
	},
	created() {
		if (this.isAdmin) {
			this.$store.dispatch("notifications/FETCH_NOTIFICATIONS_EMOTION");
			this.$store.dispatch("notifications/FETCH_NOTIFICATIONS_CRUD");
		}
	},
	beforeDestroy() {
		let unread = this.$store.getters["notifications/getUnreadNotifications"](
			this.$store.state.user.email
		);

		if (unread.length > 0) {
			unread = unread.map(item => item._id);
			this.$store.dispatch("notifications/MARK_AS_READ", {
				unread,
				email: this.$store.state.user.email
			});
		}
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
	min-width: 800px;
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

.loader-container {
	// background-color: #ff00ff1c;
	// border: 1px dashed #0000002c;
	min-height: 80vh;
	max-height: 80vh;
	display: flex;
	flex-direction: column;
	padding-right: 10px;
	margin-top: 10px;
	padding-top: 5px;

	::v-deep .v-skeleton-loader {
		margin-top: 10px;
	}
}
</style>