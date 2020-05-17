<template>
	<div>
		<div class="table-container">
			<template>
				<v-data-table
					:headers="headers"
					:items="employees"
					:items-per-page="10"
					class="logs-table"
				></v-data-table>
			</template>
		</div>
	</div>
</template>

<script>
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
				{ text: "Employee", value: "employee" }
			],
			employees: [
				{
					date: "Jan 1, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 2, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 3, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 4, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 5, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 6, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 7, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 8, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 9, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
				},
				{
					date: "Jan 10, 2020",
					time: "hh:mm:ss",
					description:
						"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
					employee: "Dolores, Ipsum Lorem"
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
</style>