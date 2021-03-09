/*
 * @Author       : yanqun
 * @Description  : grade为1是1级菜单,2是2级菜单通过group来匹配子菜单,这种设计方式因为想后期直接接口反&&修改增加菜单时候降低关联性
 */
const routerConstant = [
  {
    grade: 1,
    group: '',
    groupTitle: '',
    title: '首页',
    router: '/home',
    icon:'el-icon-s-home'
  },
  // {
  //   grade: 2,
  //   group: 'page',
  //   groupTitle: 'd3.js',
  //   title: 'd3 柱状图',
  //   router: '/d3-bar-chart'
  // }, {
  //   grade: 2,
  //   group: 'page',
  //   groupTitle: 'd3.js',
  //   title: 'd3测试',
  //   router: '/d3text'
  // }, {
  //   grade: 2,
  //   group: 'page',
  //   groupTitle: 'd3.js',
  //   title: 'data-join',
  //   router: '/data-join'
  // }, 
  // {
  //   grade: 1,
  //   group: '',
  //   groupTitle: '',
  //   title: '文章',
  //   router: '/articles'
  // },
  {
    grade: 2,
    group: 'article',
    groupTitle: '文章管理',
    title: '文章列表',
    router: '/articles',
    icon:'el-icon-s-management'
  },
  {
    grade: 2,
    group: 'article',
    groupTitle: '文章管理',
    title: '标签管理',
    router: '/tag',
    icon:'el-icon-s-management'
  },
  {
    grade: 2,
    group: 'member',
    groupTitle: '个人中心',
    title: '修改密码',
    router: '/accountManage',
    icon:'el-icon-s-custom'
  },
  {
    grade: 2,
    group: 'member',
    groupTitle: '个人中心',
    title: '权限管理',
    router: '/authManage',
    icon:'el-icon-s-custom'
  },
]

export {
  routerConstant
}