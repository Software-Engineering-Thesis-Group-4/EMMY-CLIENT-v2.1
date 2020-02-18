import Vue from 'vue';

const EmotionModule = {
    namespaced: true,
    state: {
        employeeLog: null,
        employee: null,
        status: null
    },
    mutations: {
        SOCKET_employeeLog(state, { reference, employee, status }) {
            // console.log(reference, employee, status);
            state.employeeLog = reference;
            state.employee    = employee;
            state.status      = status;
        },
        SOCKET_reset(state) {
            state.employeeLog = null;
            state.employee    = null;
            state.status      = null;
        },
        CLEAR(state) {
            state.employee = null;
            state.employee = null;
            state.status   = null;
        }
    },
    actions: {
        async submitSentiment(context, payload) {
            // console.log(payload)
            try {
                console.log("Vue submitSentiment() --> " + payload)
                await Vue.axios.post('/api/employeelogs/update_emotion', payload);
            } catch (error) {
                console.log(error);
            } finally {
                context.commit('CLEAR');
            }
        }
    },
    getters: {
        employee: state => state.employee,
        employeeLog: state => state.employeeLog,
        status: state => state.status,
    },
}

export default EmotionModule;