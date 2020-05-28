<template>
	<div class="component-container">
		<h1 class="section-title">Automated Email Settings</h1>
		<v-form
			@submit.prevent="saveAutomatedEmailSettings"
			class="automated-email-settings-form"
		>
			<v-switch
				v-model="automatedEmailEnabled"
				:label="`${automatedEmailEnabled ? 'Enabled' : 'Disabled'}`"
				color="#7be0bd"
			></v-switch>

			<button
				type="submit"
				class="save_button"
			>Save</button>
		</v-form>

		<v-divider></v-divider>
	</div>
</template>

<script>
export default {
	data() {
		return {
			automatedEmailEnabled: null
		};
	},
	computed: {},
	methods: {
		saveAutomatedEmailSettings() {
			this.$store.dispatch(
				"settings/UPDATE_AUTO_EMAIL",
				this.automatedEmailEnabled
			);
		}
	},
	async mounted() {
		await this.$store.dispatch("settings/FETCH_SETTINGS_STATE");
		this.automatedEmailEnabled = this.$store.getters["settings/autoEmail"];
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

.section-title {
	font-size: 1.5rem;
	font-family: "Cera Pro", sans-serif;
	color: rgba(0, 0, 0, 0.336);
	letter-spacing: -1px;
}

.automated-email-settings-form {
	max-width: 20rem;
	margin-bottom: 3rem;

	.save_button {
		background: linear-gradient(#7198f3, #5a79c2);
		border: 1px solid #5f80cc;
		color: white;
		width: 100%;
		padding: 7px 15px;
		border-radius: 5px;
		outline: none;

		&:hover {
			filter: brightness(0.95);
		}

		&:active {
			filter: brightness(0.9);
		}
	}
}
</style>