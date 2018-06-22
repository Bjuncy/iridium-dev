export default {
  install (Vue) {
    let baseUrl = 'rest/'
    Vue.prototype.$api = {
      authority: baseUrl + 'authority',
      userInfo: baseUrl + 'employees/me',
      getDictionaries: baseUrl + 'dictionaries',
      getProjects: baseUrl + 'projects',
      getCleaningTasks: baseUrl + 'project/cleaningTasks',
      getCleaningTaskDetail (params) {
        return baseUrl + `project/cleaningTask/${params.id}`
      },
      modifyCleaningTasks: baseUrl + 'project/cleaningTasks/notSettle',
      getSettledProjects: baseUrl + 'projects/settledProjects',
      getSettledProjectDetail (params) {
        return baseUrl + `projects/${params.projectId}/settleDetails`
      },
      getDailySheet: baseUrl + 'report/reportList',
      getMovingLabel: baseUrl + 'movingLabel',
      getMonthlySheet: baseUrl + 'report/reportAllList',
      getAttendanceAndCoverage: baseUrl + 'report/attendanceAndCoverage',
      getProjectAttendanceMonthlyReport: baseUrl + 'report/projectAttendanceMonthlyReport'
    }
  }
}
