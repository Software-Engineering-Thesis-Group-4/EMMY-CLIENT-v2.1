<template>
	<div class="layout-container">

		<div class="controls">
			<!-- Search -->
			<div class="controls__search">
				<v-autocomplete
					hide-no-data
					color="#779AEC"
					single-line
					placeholder="Search Users..."
					prepend-icon="mdi-database-search"
					:search-input.sync="search"
				></v-autocomplete>
			</div>

			<!-- Add User -->
			<v-dialog
				max-width="600px"
				v-model="showAddUserForm"
				class="add-user-dialog"
			>
				<template v-slot:activator="{ on }">
					<button
						class="controls__add_user"
						v-on="on"
					>
						<v-icon class="add_user__icon">mdi-plus</v-icon>Add New User
					</button>
				</template>

				<AddUserForm @closeForm="showAddUserForm = false"/>
			</v-dialog>
		</div>

		<div class="users_container">
			<UserList :search="search" />
		</div>

		<!-- <v-snackbar
			v-model="snackbar"
			:timeout="timeout"
		>
			{{ text }}
			<v-btn
				color="blue"
				text
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar> -->
	</div>
</template>

<script>
import UserList from "@/components/Admin/UserList/UserList.vue";
import AddUserForm from "@/components/Admin/AddUserForm.vue";

export default {
	components: {
		AddUserForm,
		UserList
	},
	data() {
		return {
			showAddUserForm: false,
			search: null
		};
	},
	computed: {}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: rgba(64, 224, 208, 0.616);
	// border: 1px dashed lightslategray;
	width: 100%;
}

.controls {
	// FOR DEBUGGING ---------------------------------------------
	// background-color: #00ffff42;
	// border: 1px dashed #0000003a;
	// -----------------------------------------------------------
	display: flex;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
}

.controls__search {
	// background-color: #ff00002d;
	// border: 1px dashed lightslategray;
	display: flex;
	align-items: flex-start;
	height: 58px;
	width: 400px;
}

::v-deep .v-dialog {
	border-radius: 0px;
	box-shadow: none;
	width: 30rem;
}

.controls__add_user {
	background-color: #7198f3;
	background: linear-gradient(0deg, #5a79c2 0%, #7198f3 100%);

	display: flex;
	align-items: center;
	justify-content: center;

	height: 40px;

	padding: 5px 15px;
	margin-left: 20px;

	font-weight: 500;
	color: white;

	border: 1.5px solid #5f7bbe;
	border-radius: 5px;
	transition: filter 0.1s ease;

	&:hover {
		filter: brightness(0.95);
	}

	.add_user__icon {
		font-size: 16px;
		margin-right: 5px;
		margin-left: -5px;
		color: white;
		opacity: 0.6;
	}
}

.users_container {
	// background-color: #ff00ff1c;
	// border: 1px dashed #0000002c;
	// color: #9e009e73;
	min-height: 500px;
}
</style>