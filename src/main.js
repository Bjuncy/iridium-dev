// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Api from './api'
import { Modal } from 'iview'
import 'jquery'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(Api)
// 全局注册iview组件
Vue.component('Modal', Modal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
