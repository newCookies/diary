import Vue from 'vue'
import Vuex from 'vuex'
import newH5 from './modules/basics'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        newH5
    },
    getters
})
