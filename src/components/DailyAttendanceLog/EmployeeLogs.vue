<template>
	<div>
		<v-data-table
			:headers="options.headers"
			:items="options.data"
			:search="search"
			:loading="isLoading"
			loading-text="Loading... Please wait"
			class="employee-log-table"
		>

			<template #item.timeIn="{ item, value }">
				<div class="time-in" v-if="value">
					<v-img
						:src="parseEmotionImagePath(item.emotionIn)"
						class="log_sentiment"
					></v-img>
					{{ moment_parseTime(value) }}
				</div>
			</template>

			<template #item.timeOut="{ item, value }">
				<div class="time-out">
					<v-img
						v-if="value"
						:src="parseEmotionImagePath(item.emotionOut)"
						class="log_sentiment"
					></v-img>
					{{ moment_parseTime(value) }}
				</div>
			</template>

			<template #item.dateCreated="{ value }">
				{{ moment_parseDateCreated(value) }}
			</template>

			<template #item.name="{ item, value }">
				<router-link :to="`/employee/${item.employeeRef.employeeId}`">
					{{ value }}
				</router-link>
			</template>

			<template #item.actions="{ item }">
				<div
					class="actions"
					v-if="isAdmin"
				>
					<!-- Edit -->
					<button
						class="actions__button"
						@click="editLog(item)"
						:disabled="!isAdmin"
					>
						<v-icon>mdi-pencil</v-icon>
					</button>

					<!-- Delete -->
					<button
						@click="deleteLog(item)"
						class="actions__button"
						:disabled="!isAdmin"
					>
						<v-icon>mdi-delete</v-icon>
					</button>
				</div>
			</template>

		</v-data-table>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		searchInput: String,
		filters: Object
	},
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin,
			isLoading: false,
			options: {
				headers: [
					{
						text: "TIME-IN",
						value: "timeIn",
						align: "start",
						sortable: false
					},
					{
						text: "TIME-OUT",
						value: "timeOut",
						align: "start",
						sortable: false
					},
					{
						text: "DATE",
						value: "dateCreated",
						align: "start",
						sortable: true
					},
					{
						text: "EMPLOYEE",
						value: "name",
						align: "start",
						sortable: true
					},
					{
						text: "DEPARTMENT",
						value: "department",
						align: "start",
						sortable: true
					},
					{
						text: "EDIT / DELETE",
						value: "actions",
						align: "start",
						sortable: false
					}
				],
				data: []
			}
		};
	},
	computed: {
		search() {
			return this.searchInput;
		},
		employeeLogs() {
			return this.$store.getters["employees/attendanceLogs"];
		}
	},
	methods: {
		// Data Manipulation ----------------------------------------------------------------------------------------
		fetchAttendanceLogData() {
			this.isLoading = true;
			this.$store.dispatch("employees/FETCH_ATTENDANCELOGS").then(() => {
				this.parseTableItems(this.employeeLogs);
				this.isLoading = false;
			});
		},
		getBooleanGender(gender) {
			return gender.toUpperCase() === "MALE" ? true : false;
		},
		getStringSentiment(numericSentiment) {
			switch (numericSentiment) {
				case 0:
					return "Unsubmitted";
				case 1:
					return "Angry";
				case 2:
					return "Sad";
				case 3:
					return "Okay";
				case 4:
					return "Happy";
				case 5:
					return "Amazing";
				default:
					return null;
			}
		},
		filterLogs() {
			let filtered = this.$store.getters["employees/attendanceLogs"];

			if (this.filters.department) {
				filtered = filtered.filter(
					item => item.employeeRef.department === this.filters.department
				);
			}
			if (this.filters.gender) {
				filtered = filtered.filter(
					item =>
						item.employeeRef.isMale ===
						this.getBooleanGender(this.filters.gender)
				);
			}
			if (this.filters.emotionIn.length > 0) {
				filtered = filtered.filter(item =>
					this.filters.emotionIn.includes(
						this.getStringSentiment(item.emotionIn)
					)
				);
			}
			if (this.filters.emotionOut.length > 0) {
				filtered = filtered.filter(item =>
					this.filters.emotionOut.includes(
						this.getStringSentiment(item.emotionOut)
					)
				);
			}

			this.parseTableItems(filtered);
		},

		// Parsing & Formatting -------------------------------------------------------------------------------------
		parseTableItems(items) {
			let data = items.map(log => {
				return {
					_id: log._id,
					name: `${log.employeeRef.lastName}, ${log.employeeRef.firstName}`,
					employeeRef: log.employeeRef,
					department: log.employeeRef.department,
					dateCreated: log.dateCreated,
					timeIn: log.in,
					timeOut: log.out,
					emotionIn: log.emotionIn,
					emotionOut: log.emotionOut
				};
			});

			this.options.data = data;
		},
		parseEmotionImagePath(emotionValue) {
			return emotionValue
				? `/emotions/${emotionValue}.png`
				: "/emotions/0.png";
		},
		moment_parseTime(time) {
			if (!time) {
				return "--";
			}
			return moment(time).format("LT");
		},
		moment_parseDateCreated(dateCreated) {
			return moment(dateCreated).format("LL (dddd)");
		},

		// Operation Methods---------------------------------------------------------------------------------------
		deleteLog(log) {
			if (
				confirm(
					`This is a destructive operation! Please confirm log deletion.`
				)
			) {
				this.$store
					.dispatch("employees/DELETE_EMPLOYEELOG", log._id)
					.then(success => {
						if (success) {
							confirm("deleted a log!");
						} else {
							confirm("error!");
						}
					});

				this.fetchAttendanceLogData();
				alert("Deleted a log");
			}
		},
		editLog(log) {
			alert(`edit ${log._id}`);
		}
	},
	mounted() {
		this.fetchAttendanceLogData();
	}
};
</script>

<style lang="scss" scoped>
.employee-log-table {
	border: 1px solid #00000021;
}

.time-in,
.time-out {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

.log_sentiment {
	max-width: 1.8rem;
	margin-right: 5px;
}

.actions {
	// background-color: #ff00ff28;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.actions__button {
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

	&:last-child {
		margin-left: 5px;
	}
}
</style>