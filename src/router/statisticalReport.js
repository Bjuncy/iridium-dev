import DailySheet from '@/components/views/DailySheet'
import MonthlySheet from '@/components/views/MonthlySheet'
import AttendanceAndCoverage from '@/components/views/AttendanceAndCoverage'

export default [
  { path: '/daily-sheet', name: 'DailySheet', component: DailySheet },
  { path: '/monthly-sheet', name: 'MonthlySheet', component: MonthlySheet },
  { path: '/attendance-and-coverage', name: 'AttendanceAndCoverage', component: AttendanceAndCoverage }
]
