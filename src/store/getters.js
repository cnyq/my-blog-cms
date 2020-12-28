const getters = {
  //app
  isCollapse: state => state.app.isCollapse,
  breadcrumbList: state => state.app.breadcrumbList,
  keepAliveList: state => state.app.keepAliveList,

  //user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
}
export default getters