<template>
	<div>
		<h1 class="page-header">Daily Attendance Log</h1>
		<div class="controls">
			<!-- Search Field -->
			<div class="search-field">
				<v-autocomplete
					:search-input.sync="dataTableOptions.search"
					color="#779AEC"
					hide-no-data
					label="Search Employees"
					placeholder="Start typing to Search"
					prepend-icon="mdi-database-search"
				></v-autocomplete>
			</div>

			<!-- Filters Button -->
			<button id="button-filters">
				<v-icon class="button-icon">mdi-filter</v-icon> Filters
				<v-icon class="button-icon-right">mdi-chevron-down</v-icon>
			</button>
		</div>

		<v-data-table
			v-model="dataTableOptions.selected"
			:headers="dataTableOptions.headers"
			:items="dataTableOptions.data"
			:search="dataTableOptions.search"
			:loading="loadingEmployeeDataTable"
			loading-text="Loading... Please wait"
			item-key="name"
			show-select
			class="elevation-1"
		>
			<template v-slot:item.timeIn="{ item }">
				<div class="time-in">
					<img
						:src="getEmotionImagePath(item.emotionIn)"
						v-if="admin"
						class="emotion-log"
					/>{{ item.timeIn }}
				</div>
			</template>
			<template v-slot:item.timeOut="{ item }">
				<div class="time-in">
					<img
						:src="getEmotionImagePath(item.emotionOut, item.timeOut)"
						v-if="admin"
						class="emotion-log"
					/>{{ item.timeOut }}
				</div>
			</template>

			<template v-slot:item.actions>
				<button class="action-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15.865"
						height="14.1"
						viewBox="0 0 15.865 14.1"
					>
						<path
							d="M11.089,2.389l2.484,2.484a.269.269,0,0,1,0,.38L7.558,11.269,5,11.553a.536.536,0,0,1-.592-.592L4.694,8.4l6.016-6.016a.269.269,0,0,1,.38,0Zm4.462-.631L14.207.414a1.077,1.077,0,0,0-1.52,0l-.975.975a.269.269,0,0,0,0,.38L14.2,4.254a.269.269,0,0,0,.38,0l.975-.975A1.077,1.077,0,0,0,15.552,1.758ZM10.577,9.633v2.8H1.763V3.623h6.33a.339.339,0,0,0,.234-.1l1.1-1.1a.331.331,0,0,0-.234-.565H1.322A1.322,1.322,0,0,0,0,3.182v9.7A1.322,1.322,0,0,0,1.322,14.2h9.7a1.322,1.322,0,0,0,1.322-1.322V8.531a.331.331,0,0,0-.565-.234l-1.1,1.1A.339.339,0,0,0,10.577,9.633Z"
							transform="translate(0 -0.1)"
							fill="#c5c5c5"
						/>
					</svg>
				</button>
				<button class="action-button action-delete">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12.25"
						height="14"
						viewBox="0 0 12.25 14"
					>
						<path
							d="M.875,12.687A1.312,1.312,0,0,0,2.187,14h7.875a1.312,1.312,0,0,0,1.312-1.312V3.5H.875Zm7.437-7a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0Zm-2.625,0a.437.437,0,0,1,.875,0v6.125a.437.437,0,0,1-.875,0ZM11.812.875H8.531L8.274.363A.656.656,0,0,0,7.686,0H4.561a.649.649,0,0,0-.585.364L3.719.875H.437A.437.437,0,0,0,0,1.312v.875a.437.437,0,0,0,.437.437H11.812a.437.437,0,0,0,.437-.437V1.312A.437.437,0,0,0,11.812.875Z"
							transform="translate(0 0)"
							fill="#c5c5c5"
						/>
					</svg>
				</button>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { options, loadTableData } from "@/attendance-logs/data_table.js";

export default {
	data() {
		return {
			admin: true,
			dataTableOptions: options,
			loadingEmployeeDataTable: false
		};
	},
	methods: {
		getEmotionImagePath(emotion, timeOut) {
			if(timeOut === null) {
				return null;
			}
			
			return `/emotions/${emotion}.png`;
		},
	},
	created() {
		this.$store.dispatch('employees/FETCH_ATTENDANCELOGS').then(logs => {
			loadTableData(logs);
		})
	}
};
</script>

<style lang="scss" scoped>
.controls {
	// background-color: red;
	display: flex;
	align-items: center;
	height: 60px;
	margin-top: 13px;
	margin-bottom: 5px;

	.search-field {
		height: 58px;
		width: 400px;
		// background-color: red;
	}

	#button-filters {
		background-color: #7198f3;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 40px;

		padding: 5px 9px 5px 15px;
		margin-left: 10px;

		font-weight: 500;
		color: white;
		border-radius: 5px;

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
}

.time-in {
	// background-color: red;
	display: flex;
	justify-content: center;
	align-items: center;
}

.emotion-log {
	height: 20px;
	margin-right: 8px;
	border-radius: 3px;
}

.action-button {
	// background-color: red;
	border: none;
	padding: 0px 5px;

	&:hover {
		cursor: pointer;
		filter: brightness(80%);
	}
}

.action-delete:hover path {
	filter: brightness(100%);
	fill: rgb(255, 140, 140);
}
</style>