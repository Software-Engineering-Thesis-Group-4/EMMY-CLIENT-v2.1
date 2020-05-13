<template>
	<v-app>
		<NoConnectionBanner />
		<router-view />
	</v-app>
</template>

<script>
import NoConnectionBanner from "@/components/NoConnectionBanner.vue";
export default {
	components: {
		NoConnectionBanner
	}
};
</script>

<style lang="scss">
@import "./assets/fonts/fonts.css";

* {
	margin: 0px;
	padding: 0px;
	font-family: "Cera Pro", sans-serif;
}
</style>
