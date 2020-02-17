<template>
	<div class="root">
		<router-view />
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.root {
	background: rgb(123, 194, 255);
	background: url("../assets/images/hexagon-pattern.svg") no-repeat -100px 200px,
		linear-gradient(
			138deg,
			rgba(123, 194, 255, 1) 0%,
			rgba(87, 136, 251, 1) 100%
		);
	background-attachment: fixed;
	background-size: contain;
	padding: 0px;
	margin: 0px;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>