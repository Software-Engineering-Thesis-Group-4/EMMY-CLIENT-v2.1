<template>
	<div>
		<Sidebar />
		<div class="view-container">
			<router-view />
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/adminSidebar.vue";

export default {
	components: {
		Sidebar
	}
};
</script>

<style lang="scss">
.view-container {
	width: 80%;
	min-height: 50vh;
	margin: 0px auto 0px 12%;
	//background-color: red;
}

.page-header {
	margin-top: 50px;
	font-weight: 700;
	letter-spacing: -2px;
	font-size: 35px;
	color: #779aec;
}
</style>
