import Vue from 'vue'
import Router from 'vue-router'
import IridiumHome from '@/components/IridiumHome'
// demostration
import DemoList from '@/components/demo/DemoList'
import DailySheet from '@/components/views/DailySheet'
import MonthlySheet from '@/components/views/MonthlySheet'

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
  },
  {
    path: '/MonthlySheet',
    name: 'MonthlySheet',
    component: MonthlySheet
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
