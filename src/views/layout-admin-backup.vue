<template>
	<div>
		<v-divider color="#52555A"></v-divider>
		<!-- Backup Settings  -->
		<div class="backup-settings">
			<h2 class="group-label">Backup Settings</h2>

			<div class="time-field">
				<div class="frequency-label">Time</div>
				<button class="button-time">
					<span>12:00 A.M.</span>
				</button>
			</div>
			<div class="frequency-field">
				<div class="frequency-label">Frequency</div>
				<button class="button-time">
					<span>24 Hours</span>
				</button>
			</div>
			<div>
				<v-btn
					class="save-button"
					color="#333737"
				>
					<span>Save</span>
				</v-btn>
			</div>
		</div>

		<!-- Time Picker -->
		<!-- <v-time-picker 
        class="time-picker" 
        v-model="time" 
        @change="$refs.menu.save(time)">
    </v-time-picker>-->

		<v-divider color="#52555A"></v-divider>

		<!-- Database Backup  -->
		<h2 class="group-label">Database Backup</h2>
		<div>
			<v-btn
				class="download-button"
				color="#82efca"
			>
				<img src="@/assets/images/download.svg" />
				<span>Download Backup</span>
			</v-btn>
		</div>
		<div>
			<v-btn
				class="import-button"
				color="#427AC4"
			>
				<img src="@/assets/images/upload.svg" />
				<span>Import Backup</span>
			</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: null
		};
	}
};
</script>

<style lang="scss" scoped>
.page-header {
	color: #707070;
}

.button-time {
	background-color: #202224;

	display: flex;
	align-items: center;
	justify-content: center;

	height: 40px;
	padding: 5px 9px 5px 15px;
	margin-left: 10px;
	font-weight: 500;
	color: #494c4f;

	&:hover {
		filter: brightness(0.95);
	}
}

.time-field {
	display: flex;
	color: #494c4f;
	margin: 20px 0px 0px 0px;
}

.time-label {
	margin: 7px 0px 0px 10px;
}

.frequency-field {
	display: flex;
	color: #494c4f;
	margin: 10px 0px 20px 0px;
}

.frequency-label {
	margin: 8px 0px 0px 0px;
}

.group-label {
	color: #494c4f;
	margin: 20px 0px 0px 0px;
}

.save-button {
	width: 20%;
	border-radius: 5px;
	border: none;
	padding: 15px;
	color: #6f7276;
	font-size: 14px;
	margin: 0px 0px 50px 0px;
	text-transform: none;

	&:hover {
		cursor: pointer;
		background-color: #8bffd8;
	}
}

.download-button {
	width: 20%;
	border-radius: 5px;
	border: none;
	padding: 15px;
	color: white;
	font-size: 14px;
	margin: 20px 0px 0px 0px;
	text-transform: none;

	&:hover {
		cursor: pointer;
		background-color: #8bffd8;
	}
}

.import-button {
	width: 20%;
	border-radius: 5px;
	border: none;
	padding: 15px;
	color: #bcdbff;
	font-size: 14px;
	margin: 20px 0px 0px 0px;
	text-transform: none;

	&:hover {
		cursor: pointer;
		background-color: #8bffd8;
	}
}

.backup-settings {
	display: flexbox;
}

// .time-picker {
//     margin: 20px 0px 20px 0px;
// }
</style>