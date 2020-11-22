import vue from 'vue'
import Vuex from 'vuex'
import {
    SCREEN_WIDTH,
    IS_COLLAPSE,
    IS_MOBILE,
    SLIDER_WIDTH
} from './mutation_type'

vue.use(Vuex)

const state = {
    screenWidth: 0,
    isCollapse: false,
    isMobile: false,
    sliderWidth: 200,
    theme: {
        backgroundColor: '#fff',
        textColor: '#444',
        activeTextColor: '#ff5333'
    }
}
const getters = {
    getScreenWidth: state => {
        return state.screenWidth;
    }
}
const mutations = {
    [SCREEN_WIDTH](state, data) {
        state.screenWidth = data
    },
    [IS_COLLAPSE](state, data) {
        state.isCollapse = data
    },
    [SLIDER_WIDTH](state, data) {
        state.sliderWidth = data
    },
    [IS_MOBILE](state, data) {
        state.isMobile = data
    }
}
const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})