import Vue from 'vue'
import Router from 'vue-router'
import IridiumHome from '@/components/IridiumHome'
// demostration
import DemoList from '@/components/demo/DemoList'
import DailySheet from '@/components/views/DailySheet'

Vue.use(Router)

const PageRouters = [
  {
    path: '/',
    name: 'IridiumHome',
    component: IridiumHome
  },
  {
    path: '/DailySheet',
    name: 'DailySheet',
    component: DailySheet
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
