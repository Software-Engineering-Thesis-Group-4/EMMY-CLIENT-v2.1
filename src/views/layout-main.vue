<template>
	<div class="main-container">
		<Sidebar />
		<div class="view-container">
			<div class="header">
				<h1 class="page-title">{{ getPageTitle }}</h1>

				<div class="right">
					<router-link
						to="/notifications"
						class="group-item notification-button"
					>
						<!-- badge -->
						<svg
							v-if="notificationsCount"
							xmlns="http://www.w3.org/2000/svg"
							width="11"
							height="11"
							viewBox="0 0 11 11"
							id="badge"
						>
							<circle
								cx="5.5"
								cy="5.5"
								r="5.5"
								fill="#fb6464"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="21.053"
							height="27.564"
							viewBox="0 0 21.053 27.564"
							id="bell"
						>
							<path
								d="M6.854,25.077H14.2a3.955,3.955,0,0,1-7.345,0ZM.8,23.459a.8.8,0,0,1-.781-.631.792.792,0,0,1,.416-.893,4.259,4.259,0,0,0,1.256-1.773A21.161,21.161,0,0,0,3,12.06a7.68,7.68,0,0,1,7.526-7.809,7.678,7.678,0,0,1,7.526,7.778c0,.01,0,.021,0,.031a21.161,21.161,0,0,0,1.31,8.1,4.259,4.259,0,0,0,1.256,1.773.808.808,0,0,1-.365,1.524ZM10.526,2.634a8.75,8.75,0,0,0-3.082.558V3.071A3.02,3.02,0,0,1,10.4,0h.246a3.02,3.02,0,0,1,2.959,3.071v.123A8.735,8.735,0,0,0,10.526,2.634Z"
								transform="translate(0)"
							/></svg>
					</router-link>

					<!-- user icon -->
					<div class="group-item">
						<button id="user">
							<img src="/sample-image.png" />
						</button>
					</div>
				</div>
			</div>
			<v-divider></v-divider>

			<router-view />
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
	components: {
		Sidebar
	},
	data() {
		return {
			notificationsCount: 1
		};
	},
	computed: {
		getPageTitle() {
			return this.$route.meta.title;
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	// background-color: red;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.view-container {
	width: 80%;
	min-height: 50vh;
	min-width: 1024px;
	margin: 0px auto 0px 10%;
	// background-color: red;
}

.header {
	display: flex;
	margin-top: 50px;
	// background-color: lightskyblue;
	align-items: center;
	position: relative;

	.page-title {
		font-weight: 700;
		letter-spacing: -2px;
		font-size: 35px;
		color: #779aec;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		width: 100px;
		height: 40px;
		// border: 1px solid black;
		position: absolute;
		right: 0;
	}
}

#user {
	width: 32px;
	height: 32px;
	overflow: hidden;
	border-radius: 5px;
	border: none;
	display: flex;

	&:focus {
		outline: none;
		// box-shadow: 0 0 0.5px 2px #1371ff60;
	}

	img {
		width: 100%;
		object-fit: contain;
		object-position: center;
	}
}

.notification-button {
	margin-right: 20px;
	// border: 1px solid black;
	padding: 0px 5px;
	position: relative;

	#badge {
		position: absolute;
		right: -3px;
		top: 5px;
	}

	#bell {
		margin-top: 5px;
		fill: #b7b7b7;
		transition: filter 0.1s ease-in-out;
	}

	&:hover {
		#bell {
			filter: brightness(0.9);
		}
	}
}
</style>
