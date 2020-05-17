<template>
	<div>
		<!-- Backup Settings  -->
		<div class="backup-settings">
			<h2 class="group-label">Backup Settings</h2>

			<!-- Timepicker Field --------------------------------------------------------------------------------------->
			<v-menu
				ref="menu"
				v-model="menu   "
				:close-on-content-click="false"
				:nudge-right="220"
				:nudge-top="67"
				:return-value.sync="time"
				transition="scale-transition"
				offset-y
				max-width="290px"
				min-width="290px"
			>
				<template v-slot:activator="{ on }">
					<v-text-field
						v-model="time"
						label="Select time:"
						readonly
						v-on="on"
						clearable
						outlined
						dense
					></v-text-field>
				</template>
				<v-time-picker
					v-if="menu"
					v-model="time"
					full-width
					@click:minute="$refs.menu.save(time)"
				></v-time-picker>
			</v-menu>

			<div>
				<button class="save-button">
					<span>Save</span>
				</button>
			</div>
		</div>

		<!-- Database Backup  -->

		<h2 class="database-label">Database Backup</h2>
		<div class="backup-settings">
			<div>
				<button
					class="download-button"
					color="#82efca"
				>
					<img src="@/assets/images/download.svg" />
					<span class="download-label">Download Backup</span>
				</button>
			</div>
			<div>
				<button
					class="import-button"
					color="#427AC4"
				>
					<img src="@/assets/images/upload.svg" />
					<span class="import-label">Import Backup</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: null,
			menu: false,
			modal: false
		};
	}
};
</script>

<style lang="scss" scoped>
.page-header {
	color: #707070;
	letter-spacing: 1px;
}
.button-time {
	background-color: red;
	height: 40px;
	padding: 10px 30px 10px 24px;
	margin-left: 20px;
	font-weight: 500;
	color: #494c4f;
	&:hover {
		filter: brightness(0.95);
	}
}
.button-icon-right {
	font-size: 18px;
	margin-left: 8px;
	color: white;
	opacity: 0.6;
}
.timepicker-field {
	display: flex;
}
.time-field {
	display: flex;
	color: #494c4f;
	margin: 10px 0px 0px 0px;
}
.time-label {
	margin: 7px 10px 0px 0px;
	color: #494c4f;
	//background-color: blue;
}
.button-frequency {
	background-color: #202224;
	height: 40px;
	padding: 10px 24px 10px 24px;
	margin-left: 10px;
	font-weight: 500;
	&:hover {
		filter: brightness(0.95);
	}
}
.frequency-field {
	display: flex;
	color: #494c4f;
	margin: 10px 0px 20px 0px;
	width: 100px;
}
.frequency-combobox {
	margin: 0px 20px 0px 0px;
	width: 100px;
}
.frequency-label {
	margin: 8px 20px 10px 0px;
}
.group-label {
	color: #494c4f;
	margin: 20px 0px 10px 0px;
}

.database-label {
	margin: 20px 0px 0px 0px;
}

.backup-settings {
	display: flex;
	flex-direction: column;
	max-width: 200px;
}

.save-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 5px;
	border: 1px solid #70cfb0;
	padding: 10px;
	background: linear-gradient(#82efca, #77dbb9);
	color: white;
	font-size: 14px;
	margin: 10px 0px 30px 0px;
	text-transform: none;

	&:hover {
		cursor: pointer;
		filter: brightness(0.95);
	}
}

.download-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 5px;
	border: none;
	padding: 10px;
	background: linear-gradient(#37e26a, #2cb154);
	color: white;
	font-size: 14px;
	margin: 20px 0px 0px 0px;
	text-transform: none;
	&:hover {
		cursor: pointer;
		filter: brightness(0.95);
	}
}

.download-label {
	margin-left: 5px;
}

.import-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 5px;
	border: none;
	padding: 10px;
	background: linear-gradient(#6487d8, #5a79c2);
	color: white;
	font-size: 14px;
	margin: 20px 0px 0px 0px;
	text-transform: none;
	&:hover {
		cursor: pointer;
		filter: brightness(0.95);
	}
}

.import-label {
	margin-left: 5px;
}
</style>