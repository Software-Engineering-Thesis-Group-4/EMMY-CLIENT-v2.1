import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify';
import axios from 'axios';
import ip from 'ip';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

const port = 3000;
const host = ip.address();
const server_url = `http://${host}:${port}/`;

// AXIOS -------------------------------------------------------------------------------------------------
axios.defaults.baseURL = server_url;

Vue.use(VueAxios, axios);

// SOCKET INTEGRATION ------------------------------------------------------------------------------------
Vue.use(new VueSocketIO({
	debug: true,
	connection: server_url,
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	},
}));

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
