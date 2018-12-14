// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import makeStore from './store'
import directives from './directives'
import vuescroll from 'vuescroll'
// import $ from 'jquery'
// import axios from 'axios'
import iView from 'iview'
import echarts from 'echarts'
// 自定义方法及变量
import GLOBAL from './global/global'
import DATAS from './global/datas'
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
Vue.prototype.$echarts = echarts
Vue.prototype.GLOBALS = GLOBAL
Vue.prototype.DATAS = DATAS
// Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(directives)
Vue.use(vuescroll)

let store = makeStore
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
