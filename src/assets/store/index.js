import Vue from 'vue'
import Vuex from 'vuex'

import navBox from './navBox'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        navBox,
    }
})