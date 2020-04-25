<template>
	<div class="main-container">
		<div class="header">
			<h1 class="page-title">{{ getPageTitle }}</h1>

			<div class="right">
				<v-tooltip bottom transition="none">
					<template v-slot:activator="{ on }">
						<div
							v-on="on"
							class="group-item notification-button"
						>
							<router-link to="/notifications">
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
						</div>
					</template>
					<span>Notifications</span>
				</v-tooltip>

				<!-- user icon -->
				<div class="group-item">
					<v-menu
						offset-y
						close-on-click
						transition="slide-y-transition"
						left
						nudge-bottom="5"
					>
						<template v-slot:activator="{ on: menu }">
							<v-tooltip
								bottom
								transition="none"
								nudge-left="10"
							>
								<template v-slot:activator="{ on: tooltip }">
									<button
										id="user"
										v-on="{ ...tooltip, ...menu }"
									>
										<div class="avatar">
											<img src="/sample-image.png" />
										</div>
										<img
											class="caret-down"
											src="@/assets/images/caret-down.svg"
										>
									</button>
								</template>
								<span>{{ getUser }}</span>
							</v-tooltip>
						</template>

						<v-card
							class="mx-auto"
							width="200"
							tile
						>
							<v-list
								dense
								rounded
							>
								<v-list-item-group color="primary">

									<v-list-item to="/settings">
										<v-list-item-icon>
											<v-icon>mdi-account-circle</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Settings</v-list-item-title>
										</v-list-item-content>
									</v-list-item>

									<v-list-item @click="logout">
										<v-list-item-icon>
											<v-icon>mdi-logout-variant</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>
												Log Out
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>

								</v-list-item-group>
							</v-list>
						</v-card>
					</v-menu>

				</div>
			</div>
		</div>

		<Sidebar />

		<div class="view-container">
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
		},
		getUser() {
			return this.$store.getters["user/fullname"] || "{User}";
		},
		getUserPhoto() {
			return null;
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("user/LOGOUT").then(success => {
				if (success) {
					this.$router.push("/login");
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	// background-color: red;
	background-color: #f8f8f8;
	min-height: 100vh;
	min-width: 1024px;

	display: flex;
	flex-direction: column;
}

.header {
	// FOR DEBUGGING ----------------------------
	// background-color: lightskyblue;
	// border: 1px dashed gray;
	// ------------------------------------------
	background-color: #f8f8f8;

	display: flex;
	flex-direction: row;
	align-items: center;

	border-bottom: 0.3px solid #dddddd;

	align-self: center;

	width: 100%;
	min-width: 1024px;
	padding: 0px 11%;

	height: 75px;
	position: fixed;
	z-index: 20;

	.page-title {
		// border: 1px dashed lightslategray;
		flex-grow: 1;
		font-weight: 700;
		letter-spacing: -2px;
		font-size: 35px;
		color: #779aec;
	}

	.right {
		// border: 1px dashed black;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		padding: 10px;

		width: 100px;
		height: 50px;
		right: 200px;
	}
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

#user {
	// border: 1px dashed lightslategray;
	// background-color: rgba(255, 82, 82, 0.445);
	border: none;
	display: flex;
	align-items: center;

	&:focus {
		outline: none;
		// box-shadow: 0 0 0.5px 2px #1371ff60;
	}

	&:hover {
		.avatar,
		.caret-down {
			filter: brightness(0.9);
		}
	}

	.avatar {
		// border: 1px dashed lightslategray;
		display: flex;
		align-items: center;
		overflow: hidden;
		width: 32px;
		height: 32px;
		border-radius: 5px;

		img {
			width: 100%;
			object-fit: fill;
			object-position: center;
		}
	}

	.caret-down {
		// border: 1px dashed lightslategray;
		margin-left: 5px;
	}
}

#logout {
	font-weight: 500;
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
		fill: #cecece;
		transition: filter 0.1s ease-in-out;
	}

	&:hover {
		#bell,
		#badge {
			filter: brightness(0.9);
		}
	}
}
</style>
