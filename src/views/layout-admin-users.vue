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
				v-model="showAdduserForm"
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

				<AddUserForm />
			</v-dialog>
		</div>

		<div class="users_container">
			<v-data-table
				:loading="loadingTable"
				:search="userListOptions.search"
				:headers="userListOptions.headers"
				:items="userListOptions.data"
				class="users-table"
			>
				<template v-slot:item.user="{ item, header, value }">
					<div class="user">
						<div class="user__photo">
							<v-img :src="item.photo || `/placeholder_avatar01.png`"></v-img>
						</div>
						<span class="user__name text-truncate">{{ value }}</span>
					</div>
				</template>

				<template v-slot:item.isActive="{ value: isActive }">
					<span
						class="account_status"
						:class="{ 'account_status--disabled': !isActive }"
					>
						{{ isActive ? 'Active' : 'Disabled' }}
					</span>
				</template>

				<template #item.actions="{ }">
					<div class="actions">
						<button
							class="actions__button"
							:disabled="!isAdmin"
						>
							<v-icon>mdi-pencil</v-icon>
						</button>
						<button
							class="actions__button"
							:disabled="!isAdmin"
						>
							<v-icon>mdi-delete</v-icon>
						</button>
					</div>
				</template>

			</v-data-table>
		</div>

		<v-snackbar
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
		</v-snackbar>
	</div>
</template>

<script>
import AddUserForm from "@/components/Admin/AddUserForm.vue";
import { loadTableData, options } from "@/components/Admin/user_table.js";

export default {
	components: {
		AddUserForm
	},
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,
			search: null,
			loadingTable: false,
			showAdduserForm: false,
			userListOptions: options
		};
	},
	computed: {},
	methods: {
		fetchUsers() {
			this.loadingTable = true;
			
			// TODO: fetch users from data (exclude 'password')
			// this.$http.get('/api/users/', (users) => {});

			setTimeout(() => {

				loadTableData([
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: true
					},
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: true
					},
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: true
					},
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: true
					},
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: false
					},
					{
						user: "Dolores, Lorem Ipsum",
						email: "lorem.dolores@email.com",
						type: "Administrator",
						isActive: true
					}
				]);

				this.loadingTable = false;
			}, 2000);
		}
	},
	created() {
		this.fetchUsers();
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

::v-deep .v-data-table-header tr th[role="columnheader"] {
	font-size: 12px;
	text-transform: uppercase;
}

.user {
	// border: 1px dashed #00000031;
	// background-color: #ff00ff25;
	display: flex;
	flex-direction: row;
	align-items: center;
	max-width: 400px;

	.user__photo {
		width: 30px;
		margin-right: 8px;

		::v-deep .v-image {
			border-radius: 3px;
		}
	}
}

::v-deep .users-table {
	border: 1px solid #e2e2e2;
}

.account_status {
	color: #0064e7;
}

.account_status--disabled {
	color: #ff0000;
}

.actions {
	display: flex;
	flex-direction: row;
	align-items: center;
	// background-color: #ff00ff28;
}

.actions__button {
	&:last-child {
		margin-left: 5px;
	}

	::v-deep .v-icon {
		color: #c0c0c0;
		font-size: 20px;
	}

	&:hover {
		::v-deep .v-icon {
			color: #929292;
		}
	}

	&:disabled {
		cursor: not-allowed;
	}
}
</style>