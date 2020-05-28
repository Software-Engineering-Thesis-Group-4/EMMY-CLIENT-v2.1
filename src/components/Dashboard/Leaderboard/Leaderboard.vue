<template>
	<div class="component-container">
		<span>Negative Sentiment Leaderboard</span>

		<div class="table-container">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Employee</th>
							<th class="text-left">Negative Emotions</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="item in leaderboard"
							:key="item.id"
						>
							<td>{{ `${item.firstname} ${item.lastname}` }}</td>
							<td>{{ item.count }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>

		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			leaderboard: []
		};
	},
	computed: {
		employees() {
			return this.$store.getters["employees/employees"];
		}
	},
	methods: {
		initializeLeaderboard() {
			let employees = this.employees;
			let leaderboard = [];

			if (employees.length > 0) {
				employees.forEach(item => {
					if (item.leaderboardEmoCount && item.leaderboardEmoCount > 0) {
					leaderboard.push({
						id: item._id,
						firstname: item.firstName,
						lastname: item.lastName,
						count: item.leaderboardEmoCount
					});
					}
				});

				leaderboard = leaderboard.sort((a, b) => b.count - a.count);
				this.leaderboard = leaderboard;
			}
		}
	},
	async mounted() {
		await this.$store.dispatch("employees/FETCH_EMPLOYEES");
		this.initializeLeaderboard();
	}
};
</script>

<style lang="scss" scoped>
.component-container {
	// background-color: #ff00ff1f;
	width: 100%;
	max-height: max-content;
}

.table-container {
	background-color: white;
	max-height: 15rem;
	overflow-y: scroll;
	// border: 1px dashed #00000025;

	&::-webkit-scrollbar {
		background: transparent;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #00000025;
		border-radius: 999px;

		&:hover {
			background: #0000003f;
		}
	}
}
</style>