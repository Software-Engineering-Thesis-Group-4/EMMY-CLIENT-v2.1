<template>
	<div>
		<div class="table-container">
			<template>
				<v-data-table
					:headers="headers"
					:items="employees"
					:items-per-page="10"
					class="logs-table"
				>

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
			employees: [
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
		};
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