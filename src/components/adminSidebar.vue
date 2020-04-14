<template>
	<div class="sidebar">
		<img src="@/assets/images/green.svg" id="emmy-logo" />

		<div class="navigation">
			<!-- Account Management Icon -->
			<div class="nav-item">
				<router-link to="/account-management">
					<img src="@/assets/images/users-cog.svg">
				</router-link>
			</div>

			<!--  Application Configuration Icon -->
			<div class="nav-item">
				<router-link to="/admin/application-configuration">
					<img src="@/assets/images/cog.svg">
				</router-link>
			</div>

			<!-- Application Logs Icon -->
			<div class="nav-item">
				<router-link to="/admin/application-logs">
					<img src="@/assets/images/icon-logs.svg">
				</router-link>
			</div>
		</div>

		<div class="bottom-group">
			<!-- user icon -->
			<div class="group-item">
				<button id="user">
					<img src="@/assets/images/user-Avatar.svg" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			notificationsCount: 1
		}
	}
};
</script>

<style lang="scss" scoped>
.sidebar {
	background-color: #303336;
	width: 80px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	z-index: 999;
}

#emmy-logo {
	height: 40px;
	margin-top: 10px;
}

.navigation {
	// background-color: red;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.nav-item {
		margin: 12px 0px;
	}
}

.bottom-group {
	// background-color: turquoise;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 10px;

	button {
		background-color: transparent;
		margin: 10px 0px;
		border: none;
	}

	#user {
		width: 32px;
		height: 32px;
		overflow: hidden;
		border-radius: 999px;
		border: none;

		img {
			width: 100%;
			object-fit: contain;
		}
	}
}

#notifications {
	position: relative;

	#badge {
		position: absolute;
		right: -2px;
	} 
}

// apply style to icon if route is active
.router-link-active path {
	fill: #ffffff;
}
</style>