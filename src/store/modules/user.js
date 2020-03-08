import Vue from 'vue'

const UserModule = {
    namespaced: true,
    state: {
        error    : null,
        username : null,
        email    : null,
    },
    mutations: {
        LOGIN_ERROR(state, message) {
            state.error = message;
        },
        AUTH_SUCCESS(state, payload) {
            state.error     = null;
            state.username  = payload.username;
            state.email     = payload.email;
        }
    },
    actions: {
        async LOGIN(context, { email, password }) {
            try {
                let response = await Vue.axios.post('/auth/login', { email, password });
                context.commit('AUTH_SUCCESS', response.data);
                return response;

            } catch (error) {
                console.dir(error.response);
                context.commit('LOGIN_ERROR', error.response);
            }
        },
        LOGOUT() {

        }
    },
    getters: {
        errorMessage: state => state.error,
        username: state => state.username,
        email: state => state.email,
    }
}

export default UserModule;