<template>
	<div class="layout-container">
		<h1 class="status_code">404</h1>
		<span class="status_text">Page Not Found</span>

		<router-link
			to="/login"
			class=""
		>Go Back</router-link>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout-container {
	// background-color: #ff00ff2a;
	display: flex;
	flex-direction: column;
	width: 80%;
	align-items: center;
	justify-content: center;
	margin: 0px auto;
}

.status_code {
	font-size: 15rem;
	margin: 0px;
	padding: 0px;
}

.status_text {
	color: #00000050;
	font-size: 2rem;
	margin-top: -70px;
}
</style>