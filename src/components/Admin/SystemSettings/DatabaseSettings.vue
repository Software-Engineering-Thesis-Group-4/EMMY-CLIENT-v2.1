<template>
	<div class="component-container">
		<h1 class="section-title">Database Settings</h1>

		<v-form
			@submit.prevent="saveDatabaseSettings"
			class="database-scheduling-form"
		>
			<p class="form-title">Backup Scheduling:</p>

			<v-menu
				ref="menu"
				v-model="showMenu"
				:close-on-content-click="false"
				offset-y
				transition="scale-transition"
			>
				<template v-slot:activator="{ on }">
					<v-text-field
						:value="getSchedule"
						filled
						placeholder="select time..."
						v-on="on"
						clearable
						outlined
						dense
					></v-text-field>
				</template>

				<v-time-picker
					v-model="timeString"
					class="time-picker"
					scrollable
					full-width
					:use-seconds="false"
					ampm-in-title
					@change="updateTime"
				></v-time-picker>

			</v-menu>

			<button
				type="submit"
				class="save-button"
			>
				<span>Save</span>
			</button>
		</v-form>

		<v-divider></v-divider>

		<div class="backup-download-import">
			<button
				class="backup-download-import__buttons download-button"
				color="#82efca"
				@click="downloadBackup"
			>
				<v-icon>mdi-download</v-icon>
				<span class="button-label">Download Backup</span>
			</button>

			<button
				class="backup-download-import__buttons import-button"
				color="#427AC4"
			>
				<v-icon>mdi-database</v-icon>
				<span class="button-label">Import Backup</span>
			</button>
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	data() {
		return {
			showMenu: false,
			timeString: "1:00",
			downloadUrl: `http://${window.location.hostname}:3000/api/employees/db-backup`
		};
	},
	computed: {
		getSchedule() {
			let splitTime = this.timeString.split(":");
			return moment()
				.set("hours", splitTime[0])
				.set("minutes", splitTime[1])
				.format("LT");
		}
	},
	methods: {
		saveDatabaseSettings() {
			alert("saveDatabaseSettings() NOT IMPLEMENTED!");
		},
		downloadBackup() {
			this.$http.get("/api/employees/db-backup", {
				params: {
					userId: this.$store.state.user.userId,
					loggedInUsername: this.$store.state.user.username,
					access_token: localStorage.getItem("access_token")
				}
			});
		},
		updateTime(time) {
			// let splitTime = time.split(":");
			// console.log(
			// 	moment()
			// 		.set("hours", splitTime[0])
			// 		.set("minutes", splitTime[1])
			// 		.format()
			// );
			this.timeString = time;
		}
	}
};
</script>

<style lang="scss" scoped>
.component-container {
	display: flex;
	flex-direction: column;
	// border: 1px dashed #00000031;
	margin-top: 10px;
}

.time-picker {
	display: relative;
}

.database-scheduling-form {
	max-width: 20rem;
	margin: 10px 0px 20px;
	// background-color: #ff00ff21;

	.form-title {
		margin-bottom: 10px;
		color: #00000060;
	}

	.save-button {
		background: linear-gradient(#7198f3, #5a79c2);
		border: 1px solid #5f80cc;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-radius: 5px;
		color: white;
		padding: 8px;

		&:hover {
			cursor: pointer;
			filter: brightness(0.95);
		}
	}
}

.section-title {
	font-size: 1.5rem;
	font-family: "Cera Pro", sans-serif;
	color: rgba(0, 0, 0, 0.336);
	letter-spacing: -1px;
}

.backup-download-import {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100%;
	// background-color: #ff00ff27;
	margin-top: 20px;

	.backup-download-import__buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: white;
		border-radius: 5px;
		padding: 10px;
		font-size: 15px;
		outline: none;

		&:hover {
			filter: brightness(0.95);
		}

		&:active {
			filter: brightness(0.9);
		}

		::v-deep i {
			color: white;
		}
	}

	.button-label {
		margin-left: 5px;
	}
}

.download-button {
	background: linear-gradient(#7ee7c4, #68bd9f);
	border: 1px solid #71ceaf;
	margin-bottom: 10px;

	&:hover {
		cursor: pointer;
		filter: brightness(0.95);
	}
}

.import-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 5px;
	padding: 10px;
	background: linear-gradient(#6f94ec, #5a79c2);
	border: 1px solid #6487d8;
	color: white;
	font-size: 14px;
	&:hover {
		cursor: pointer;
		filter: brightness(0.95);
	}
}
</style>