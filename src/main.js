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

// AXIOS -------------------------------------------------------------------------------------------------
switch (process.env.NODE_ENV) {
	case 'production ':
		axios.defaults.baseURL = "/";
		break;

	case 'development ':
		axios.defaults.baseURL = `http://${ip.address()}:3000`;
		break;
}

Vue.use(VueAxios, axios);

// SOCKET INTEGRATION ------------------------------------------------------------------------------------
Vue.use(new VueSocketIO({
	connection: (process.env.NODE_ENV === 'production ') ? '/' : `http://${ip.address()}:3000`,
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
