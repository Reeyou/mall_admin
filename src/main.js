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

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import '@/permission'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
    Vue.use(directives[key].install)
})

Vue.component('v-chart', ECharts)
Vue.use(REButton)
Vue.use(TreeTable)
Vue.use(ElementUI);
Vue.config.productionTip = false // 关闭生产环境错误提示
Vue.prototype.$axios = axios


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})