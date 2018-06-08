import Vue from 'vue'
import Router from 'vue-router'
import IridiumHome from '@/components/IridiumHome'
// demostration
import DemoList from '@/components/demo/DemoList'
import dailySheet from '@/components/views/dailySheet'

Vue.use(Router)

const PageRouters = [
  {
    path: '/',
    name: 'IridiumHome',
    component: IridiumHome
  },
  {
    path: 'dailySheet',
    name: 'dailySheet',
    component: dailySheet
  }
]

const DemoRouters = [
  {
    path: '/demo',
    name: 'DemoList',
    component: DemoList
  }
]

export default new Router({
  routes: PageRouters.concat(DemoRouters)
})
