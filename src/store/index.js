import vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import {
  SCREEN_WIDTH,
  IS_COLLAPSE,
  IS_MOBILE,
  SLIDER_WIDTH
} from './mutation_type'

vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

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
const mutations = {
  [SCREEN_WIDTH] (state, data) {
    state.screenWidth = data
  },
  [IS_COLLAPSE] (state, data) {
    state.isCollapse = data
  },
  [SLIDER_WIDTH] (state, data) {
    state.sliderWidth = data
  },
  [IS_MOBILE] (state, data) {
    state.isMobile = data
  }
}
const actions = {

}

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions
})