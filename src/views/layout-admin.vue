<template>
	<div class="main-container">
		<Sidebar/>
		<div class="view-container">
			<h1 class="page-header">{{ getPageTitle }}</h1>
			<v-divider></v-divider>
			<router-view />
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/adminSidebar.vue";

export default {
	components: {
		Sidebar
	},
	computed: {
		getPageTitle() {
			return this.$route.meta.title;
		}
	}
};
</script>

<style lang="scss" scoped>
.view-container {
	width: 80%;
	min-height: 50vh;
	margin: 0px auto 0px 12%;	
	// background-color: red;
}

.page-header {
	margin-top: 50px;
	font-weight: 700;
	letter-spacing: -2px;
	font-size: 35px;
	color: #779aec;
	
}

.main-container {
	background: #26282B;
	height: 100vh;
}
</style>
