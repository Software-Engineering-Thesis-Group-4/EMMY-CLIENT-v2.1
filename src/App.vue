<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./assets/fonts/fonts.css";

* {
	margin: 0px;
	padding: 0px;
	font-family: "Cera Pro", sans-serif;
}

.v-application--wrap {
	background-color: #f8f8f8;
}
</style>
