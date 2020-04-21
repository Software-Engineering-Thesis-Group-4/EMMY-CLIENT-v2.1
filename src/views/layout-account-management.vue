<template>
	<div class="main-container">
		<div>
			<div class="controls">
				<v-dialog
					v-model="showAddEmployeeForm"
					persistent
					max-width="600px"
				>
					<template v-slot:activator="{ on }">
						<!-- Add Employee Button -->
						<button
							id="button-add-user"
							v-on="on"
						>
							<v-icon class="button-icon">mdi-plus</v-icon>Add New User
						</button>
					</template>
					<AddEmployeeForm @close="closeAddEmployeeForm()" />
				</v-dialog>
			</div>
		</div>

		<v-data-table
			dark
			color="#57A48A"
			headers=""
			items=""
			:loading="loadingTable"
			loading-text="Loading... Please wait"
			item-key="id"
			show-select
			sort-by="role"
			class="elevation-1"
		>
		</v-data-table>
	</div>
</template>

<script>
import {
	options,
	loadTableData
} from "@/components/admin_accounts/user_table.js";

export default {
	data() {
		return {
			loadingTable: false
		};
	},
	computed: {},
	methods: {},
	created() {}
};
</script>

<style lang="scss" scoped>
.controls {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 60px;
	margin-top: 13px;
	margin-bottom: 5px;

	.button-icon {
		font-size: 16px;
		margin-right: 5px;
		margin-left: -5px;
		color: white;
		opacity: 0.6;
	}

	.button-icon-right {
		font-size: 18px;
		margin-left: 8px;
		color: white;
		opacity: 0.6;
	}
}

.main-container {
	background: #26282b;
	height: 100vh;
}

#button-add-user {
	background-color: #3ec497;

	display: flex;
	align-items: center;

	height: 40px;

	padding: 5px 15px;
	margin-left: 20px;
	border-radius: 5px;

	font-weight: 500;
	color: white;
}
</style>