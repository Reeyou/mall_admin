import vue from 'vue'
import Vuex from 'vuex'
import { SCREEN_WIDTH,MENU_VISIBLE,IS_MOBILE } from './mutation_type'

vue.use(Vuex)

const state = {
  screenWidth: 0,
  menuVisible: true,
  isMobile: false
}
const getters = {

}
const mutations = {
  [SCREEN_WIDTH](state,data) {
    state.screenWidth = data
  },
  [MENU_VISIBLE](state,data) {
    state.menuVisible = data
  },
  [IS_MOBILE](state,data) {
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