// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'
// import '@/res/styles/element-variables.scss'
import store from './store'
import * as filters from '@/filters'
import * as directives from "@/directives"
// import "@/res/styles/global.scss";
import REButton from '@/components/button'
import TreeTable from '@/components/TreeTable'

import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// 全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 全局指令
Object.keys(directives).forEach(key => {
    Vue.use(directives[key].install)
})

Vue.config.productionTip = false

Vue.component('v-chart', ECharts)
Vue.use(REButton)
Vue.use(TreeTable)
Vue.use(ElementUI);
Vue.config.productionTip = false // 关闭生产环境错误提示
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})