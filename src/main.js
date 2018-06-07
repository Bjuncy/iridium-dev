// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Modal, Button } from 'iview'
import 'jquery'
// import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.component('Modal', Modal)
Vue.component('Button', Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
