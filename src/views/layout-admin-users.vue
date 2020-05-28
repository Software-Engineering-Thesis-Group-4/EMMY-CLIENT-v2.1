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

				<AddUserForm @closeForm="showAddUserForm = false" />
			</v-dialog>
		</div>

		<div class="users_container">
			<UserList
				:search="search"
				@deleteActionClicked="showConfirmDeleteDialog"
				@editActionClicked="showEditFormDialog"
			/>
		</div>

		<!-- Confirm Delete Dialog -->
		<v-dialog
			max-width="290"
			v-model="showDeleteDialog"
			@click:outside="confirmDelete(false)"
		>
			<v-card outlined>
				<v-card-title>Confirm Delete</v-card-title>
				<v-card-text>
					Are you sure you want to delete the account of <strong>{{ confirmDeleteUser.firstname }} {{ confirmDeleteUser.lastname }}</strong>?
				</v-card-text>
				<v-card-actions>
					<v-btn
						text
						outlined
						@click="confirmDelete(false)"
					>Cancel</v-btn>
					<v-btn
						depressed
						color="error"
						@click="confirmDelete(true)"
					>Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<EditForm
			:activate="editForm"
			@closeDialog="resetEditForm"
			:user_ref="editUserReference"
		/>
	</div>
</template>

<script>
import UserList from "@/components/Admin/UserAccounts/UserList.vue";
import AddUserForm from "@/components/Admin/UserAccounts/AddUserForm.vue";
import EditForm from "@/components/Admin/UserAccounts/EditForm.vue";

export default {
	components: {
		AddUserForm,
		UserList,
		EditForm
	},
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,
			search: null,

			showAddUserForm: false,
			showDeleteDialog: false,
			editForm: false,

			confirmDeleteUser: {},
			editUserReference: {}
		};
	},
	computed: {},
	methods: {
		showConfirmDeleteDialog(user) {
			this.confirmDeleteUser = user;
			this.showDeleteDialog = true;
		},
		showEditFormDialog(user) {
			this.editForm = true;
			this.editUserReference = user;
		},
		confirmDelete(confirm) {
			if (this.isAdmin) {
				if (confirm) {
					alert(`deleted ${this.confirmDeleteUser}`);
				}

				this.showDeleteDialog = false;
				this.confirmDeleteUser = {};
			} else {
				console.log("Not authorized to perform action [DELETE]");
				this.showDeleteDialog = false;
				this.confirmDeleteUser = {};
			}
		},
		resetEditForm() {
			this.editForm = false;
			this.editUserReference = {};
		}
	}
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