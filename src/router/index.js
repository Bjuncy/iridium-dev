import Vue from 'vue'
import Router from 'vue-router'
import IridiumHome from '@/components/IridiumHome'
// demostration
import DemoList from '@/components/demo/DemoList'
import DailySheet from '@/components/views/DailySheet'
import MonthlySheet from '@/components/views/MonthlySheet'
import AttendanceAndCoverage from '@/components/views/attendanceAndCoverage'

Vue.use(Router)

const PageRouters = [
  {
    path: '/',
    name: 'IridiumHome',
    component: IridiumHome
  },
  {
    path: '/daily-sheet',
    name: 'DailySheet',
    component: DailySheet
  },
  {
    path: '/monthly-sheet',
    name: 'MonthlySheet',
    component: MonthlySheet
  },
  {
    path: '/attendance-and-Coverage',
    name: 'AttendanceAndCoverage',
    component: AttendanceAndCoverage
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
