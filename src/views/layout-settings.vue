<template>
	<div class="layout-container">
		<div class="leftnav">

			<router-link
				to="/account"
				class="link"
			>
				<div class="link-tab">Account</div>
			</router-link>

			<router-link
				to="/security"
				class="link"
			>
				<div class="link-tab">Security</div>
			</router-link>

			<router-link
				to="/activity"
				class="link"
				v-if="false"
			>
				<div class="link-tab">Activity Log</div>
			</router-link>
		</div>
		<div class="view-container">
			<h1 class="page-header">{{ viewHeader }}</h1>
			<v-divider></v-divider>
			<!-- ------------------------------------------------------------ -->
			<router-view />
			<!-- ------------------------------------------------------------ -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isAdmin: this.$store.state.user.isAdmin
		};
	},
	computed: {
		viewHeader() {
			return this.$route.meta.headerTitle;
		}
	}
};
</script>

<style lang="scss" scoped>
.layout-container {
	display: grid;
	grid-template-columns: 160px 1fr;
	width: 100%;
	margin-top: 10px;
}

.leftnav {
	// background-color: #00ffff65;
	// border: 1px dashed lightslategray;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	.link {
		color: black;
		border: 0.5px solid #c7c7c7;
		text-decoration: none;
		font-size: 16px;

		&:not(:first-child) {
			border-style: none solid solid solid;
		}

		.link-tab {
			// background-color: red;
			padding: 5px 0px 5px 10px;
			width: 100%;

			&:hover {
				background-color: #0000000a;
			}
		}
	}

	.router-link-active {
		border-left: 4px solid #ff5858;
		color: #779aec;
		font-weight: 500;
	}
}

.view-container {
	width: 100%;
	// background-color: #ff00ff33;
	margin-left: 20px;

	.page-header {
		font-size: 30px;
		font-weight: 500;
		letter-spacing: -1px;
		margin-bottom: 6px;
	}
}
</style>