<template>
	<v-banner
		single-line
		dark
		color="error"
		v-if="!connected"
		id="connection-banner"
	>
		<v-icon
			slot="icon"
			size="36"
			v-if="!connected"
		>mdi-wifi-strength-alert-outline
		</v-icon>

		Lost Server Connection.
	</v-banner>
</template>

<script>
export default {
	data() {
		return {
			connected: true
		};
	},
	sockets: {
		connect() {
			this.connected = true;
			console.log("socket.io client connected!.");
		},
		disconnect() {
			this.connected = false;
			console.log("socket.io client disconnected.");
		},
		reconnect_error() {
			if (this.connected) {
				this.connected = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#connection-banner {
	position: fixed;
	width: 100%;
	z-index: 9999 !important;
}
</style>