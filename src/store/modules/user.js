import Vue from 'vue'

const UserModule = {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        async LOGIN(context, { email, password }) {
            try {
                console.log(email, password);
                let response = await Vue.axios.post('/auth/login', { email, password });
                console.log(response);
            } catch (error) {
                console.dir(error);
            }
        },
        LOGOUT() {

        }
    },
    getters: {

    }
}

export default UserModule;