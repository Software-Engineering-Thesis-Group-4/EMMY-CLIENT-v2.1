<template>
	<div>
		<div class="table-container">
			<template>
				<v-data-table
					:headers="options.headers"
					:items="options.data"
					:items-per-page="10"
					:loading="loading"
					class="logs-table"
				>

					<template #item.date="{item, value}">
						{{ moment__parseDate(value) }}
					</template>

					<template #item.time="{item, value}">
						{{ moment__parseTime(value) }}
					</template>

					<!-- <template #item.action="{item, value}">
					</template>

					<template #item.agent="{item, value}">
					</template> -->

				</v-data-table>
			</template>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	data() {
		return {
			loading: true,
			systemLogs: [],
			options: {
				headers: [
					{
						text: "Date",
						align: "start",
						sortable: false,
						value: "date"
					},
					{ text: "Time", value: "time" },
					{ text: "Description", value: "description" },
					{ text: "Action", value: "action" },
					{ text: "Agent", value: "agent" }
				],
				data: [
					{
						date: moment()
							.endOf("year")
							.format("LL"),
						time: moment().format("LTS"),
						description:
							"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
						action: "DELETE",
						agent: "Dolores, Ipsum Lorem"
					}
				]
			}
		};
	},
	methods: {
		loadTableData() {
			let logs = this.systemLogs.map(item => {
				return {
					_id: item._id,
					date: item.date,
					time: item.date,
					description: item.description,
					action: item.action,
					agent: item.isServer ? "System" : "{username}"
				};
			});

			this.options.data = logs;
		},
		moment__parseDate(date) {
			return moment(date).format("LL");
		},
		moment__parseTime(date) {
			return moment(date).format("LTS");
		}
	},
	mounted() {
		this.loading = true;
		this.$http
			.get("/api/auditlogs", {
				params: {
					userId: this.$store.state.user.userId,
					access_token: localStorage.getItem("access_token")
				}
			})
			.then(response => {
				console.log(response);
				if (response.data && typeof response.data === "object") {
					this.systemLogs = response.data;
					this.loadTableData();
				} else {
					this.loadTableData();
				}

				this.loading = false;
			})
			.catch(error => {
				console.error(error);
				this.loading = false;
			});
	}
};
</script>

<style lang="scss" scoped>
.table-container {
	margin-top: 10px;
}

::v-deep .v-data-table-header tr th[role="columnheader"] {
	font-size: 12px;
	text-transform: uppercase;
}

.logs-table {
	border: 1px solid #0000001f;
}
</style>