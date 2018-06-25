export default {
  install (Vue) {
    let baseUrl = 'rest/'
    // let api = 'api/'
    Vue.prototype.$api = {
      authority: baseUrl + 'authority',
      userInfo: baseUrl + 'employees/me',
      getDictionaries: baseUrl + 'dictionaries',
      getProjects: baseUrl + 'projects',
      // 统计报表
      getDailySheet: baseUrl + 'report/dailySheetList',
      getMovingLabel: baseUrl + 'movingLabel',
      getMonthlySheet: baseUrl + 'report/monthlySheetList',
      getAttendanceAndCoverage: baseUrl + 'report/attendanceAndCoverage',
      getProjectAttendanceMonthlyReport: baseUrl + 'report/projectAttendanceMonthlyReport'
      // 保洁任务
      getCleaningTasks: baseUrl + 'project/cleaningTasks',
      getCleaningTaskDetail (params) {
        return baseUrl + `project/cleaningTask/${params.id}`
      },
      modifyCleaningTasks: baseUrl + 'project/cleaningTasks/notSettle',
      // 已结算项目
      getSettledProjects: baseUrl + 'projects/settledProjects',
      getSettledProjectDetail (params) {
        return baseUrl + `projects/${params.projectId}/settleDetails`
      },
      // 项目结算
      getProjectSettlementData: baseUrl + 'projects/settlement',
      getSettledClerk (params) {
        return baseUrl + `projects/${params.projectId}/leaders`
      },
      scanProjectSettlementLeader: baseUrl + 'projectbill/projectbillScan',
      settleProject (params) {
        return baseUrl + `projects/${params.projectId}/settle`
      },
      // 项目结算配置
      getProjectSettlementConfig: baseUrl + 'projects/settleConfigs',
      modifyProjectSettlementConfig (params) {
        return baseUrl + `projects/${params.projectCode}/settleConfig`
      }
    }
  }
}
