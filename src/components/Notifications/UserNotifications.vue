<template>
	<div class="notification_list">

		<div
			class="notification_item notification_item--rounded notification_item--spaced"
			:class="{ 'unread': true }"
			v-for="notif in notifications"
			:key="notif._id"
		>

			<CreateOperation
				v-if="notif.operation === 'create'"
				:notification_ref="notif"
			/>

			<DeleteOperation
				v-else-if="notif.operation === 'terminated'"
				:notification_ref="notif"
			/>

			<UpdateOperation
				v-else-if="notif.operation === 'update'"
				:notification_ref="notif"
			/>

		</div>

	</div>
</template>

<script>
import CreateOperation from "./Templates/CreateEmployeeNotification.vue";
import DeleteOperation from "./Templates/DeleteEmployeeNotification.vue";
import UpdateOperation from "./Templates/UpdateEmployeeNotification.vue";

export default {
	components: {
		CreateOperation,
		DeleteOperation,
		UpdateOperation
	},
	data() {
		return {};
	},
	computed: {
		notifications() {
			let notifs = this.$store.state.notifications.crud_notifications;
			return notifs;
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
</style>