<template>
	<div class="layout-container">
		<EmployeeFieldsSettings />
		<AutomatedEmailSettings />
		<DatabaseSettings />
	</div>
</template>

<script>
import AutomatedEmailSettings from "@/components/Admin/SystemSettings/AutomatedEmailSettings.vue";
import DatabaseSettings from "@/components/Admin/SystemSettings/DatabaseSettings.vue";
import EmployeeFieldsSettings from "@/components/Admin/SystemSettings/EmployeeFieldsSettings.vue";

export default {
	components: {
		EmployeeFieldsSettings,
		AutomatedEmailSettings,
		DatabaseSettings
	},
	data() {
		return {
			time: null,
			menu: false,
			modal: false
		};
	},
	mounted() {
		this.$store.dispatch("settings/FETCH_SETTINGS_STATE");
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: #ff00ff31;
	max-width: 40rem;
	margin-bottom: 30rem;
}
</style>