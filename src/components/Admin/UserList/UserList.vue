<template>
	<v-data-table
		:loading="loadingTable"
		:search="user_search"
		:headers="dataTableOptions.headers"
		:items="dataTableOptions.data"
		class="users-table"
	>
		<template v-slot:item.user="{ item }">
			<div class="user">
				<div class="user__photo">
					<v-img :src="item.photo || `/placeholder_avatar01.png`"></v-img>
				</div>
				<span class="user__name text-truncate">{{ `${item.lastname}, ${item.firstname}` }}</span>
			</div>
		</template>

		<template #item.accountType="{ item }">
			<div class="account-type">
				<div
					class="account-type__crown"
					v-if="item.isAdmin"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16.731 13.385"
						class="crown__svg"
					>
						<path
							id="crown"
							d="M13.8,11.712H2.928a.42.42,0,0,0-.418.418v.837a.42.42,0,0,0,.418.418H13.8a.42.42,0,0,0,.418-.418V12.13A.42.42,0,0,0,13.8,11.712Zm1.673-8.366A1.255,1.255,0,0,0,14.222,4.6a1.229,1.229,0,0,0,.115.518L12.444,6.253a.835.835,0,0,1-1.156-.3L9.158,2.222a1.255,1.255,0,1,0-1.584,0L5.443,5.95a.836.836,0,0,1-1.156.3L2.4,5.119a1.254,1.254,0,1,0-1.142.737,1.281,1.281,0,0,0,.2-.021l1.89,5.04H13.385l1.89-5.04a1.281,1.281,0,0,0,.2.021,1.255,1.255,0,0,0,0-2.51Z"
							fill="#ffcc54"
						/>
					</svg>

				</div>

				<span
					class="account-type__value"
					:class="{ 'admin': item.isAdmin }"
				>
					{{ (item.isAdmin ? 'Administrator' : 'Standard User') }}
				</span>
			</div>
		</template>

		<template v-slot:item.isActive="{ item, value }">
			<span
				class="account_status"
				:class="{ 'account_status--disabled': !value }"
			>
				{{ value ? 'Active' : 'Disabled' }}
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
</template>

<script>
import { loadTableData, options } from "./options.js";
export default {
	props: ["search"],
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,
			loadingTable: false,
			dataTableOptions: options
		};
	},
	methods: {
		fetchUsers() {
			this.loadingTable = true;

			this.$http
				.get("/api/users/")
				.then(response => {
					loadTableData(response.data);
					this.loadingTable = false;
				})
				.catch(err => {
					console.log(err.response.data);
					this.loadingTable = false;
				});
		}
	},
	computed: {
		user_search() {
			return this.search;
		}
	},
	created() {
		this.fetchUsers();
	}
};
</script>

<style lang="scss" scoped>

.users-table {
	border: 1px solid #e2e2e2;
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

.account-type {
	// background-color: #ea02ff2f;
	// border: 1px dashed #0000003f;
	display: flex;
	color: #a3a3a3;

	.admin {
		color: #0064e7;
	}
}

.account-type__crown {
	width: max-content;
	margin-right: 5px;

	.crown__svg {
		height: 15px;
	}
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