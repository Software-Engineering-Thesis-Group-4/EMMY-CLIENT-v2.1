<template>
	<div class="main-container">
		<Sidebar />
		<TopHeader />
		<div class="view-container">
			<router-view />
		</div>
		<EmailForm />
	</div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TopHeader from "@/components/TopHeader.vue";
import EmailForm from "@/components/EmailForm/EmailForm.vue";

export default {
	components: {
		Sidebar,
		TopHeader,
		EmailForm
	},
	data() {
		return {};
	},
	methods: {
		logout() {
			this.$store.dispatch("user/LOGOUT").then(success => {
				if (success) {
					this.$router.push("/login");
				}
			});
		}
	},
	mounted() {
		this.$store.dispatch("settings/FETCH_SETTINGS_STATE");
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	// background-color: red;
	background-color: #f8f8f8;
	min-height: 100vh;
	min-width: 1024px;
	position: relative;

	display: flex;
	flex-direction: column;
}

.view-container {
	// FOR DEBUGGING ----------------------------
	// background-color: lightskyblue;
	// border: 1px dashed gray;
	// ------------------------------------------
	width: 80%;
	min-height: 93.5vh;
	min-width: 1024px;
	margin: 60px auto 0px 10%;

	// border: 0.3px solid #dddddd;
	// border-style: none solid none solid;
	padding: 20px;

	display: flex;
	flex-direction: column;
}
</style>
