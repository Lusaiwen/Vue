import Axios from 'axios'

export default {
    namespaced: true,
    state: {
        navList: [],
        navHide: true,
        navActiveIndex: 0        
    },
    mutations: {
        handleNavActive(state, payload) {
            state.navActiveIndex = payload;
        },
        handleHide(state, payload) {
            state.navHide = !state.navHide;
        },
        changeNavList(state, payload){
            state.navList = payload;
        }
    },
    actions: {
        getData(context){
            Axios.get('/nav').then(res => {
                context.commit('changeNavList', res);
            })
        }
    }
}