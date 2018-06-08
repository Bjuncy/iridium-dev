export default {
  install (Vue) {
    let baseUrl = 'rest/'
    Vue.prototype.$api = {
      authority: baseUrl + 'authority',
      userInfo: baseUrl + 'employees/me',
      getDictionaries: baseUrl + 'dictionaries',
      getProjects: baseUrl + 'projects'
    }
  }
}
