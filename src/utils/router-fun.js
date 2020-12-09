import defaultSetting from '@/setting'
import store from '@/store'
import {
  routerConstant,
} from "@/assets/mock/routerMock"
const { title } = defaultSetting

export const pageTitle = title || 'cnyanqun'

export const setTitle = function (meta) {
  document.title = meta || pageTitle
  // const ua = navigator.userAgent
}

const titStatus = ((type) => {
  let tit = ''
  switch (type) {
    case 'add':
      tit = '新增'
      break
  }
  return tit
})

export const setCrumbList = (to) => {
  let currentRouter = routerConstant.filter(it => {
    return it.router == to.path
  }),
    updateCrumbList = [],
    tit = currentRouter.length > 0 ? currentRouter[0].title : ''
  setTitle(tit == '首页' ? '' : tit)
  if (currentRouter.length > 0) {
    let currentRouterObj = currentRouter[0]
    if (currentRouterObj.grade == 1) {
      if (currentRouterObj.router == '/home') {
        updateCrumbList = [{
          title: currentRouterObj.title,
          router: currentRouterObj.router
        }]
      } else {
        updateCrumbList = [{
          title: '首页',
          router: '/home'
        }, {
          title: currentRouterObj.title,
          router: currentRouterObj.router
        }]
      }
    } else if (currentRouterObj.grade == 2) {
      updateCrumbList = [{
        title: '首页',
        router: '/home'
      }, {
        title: currentRouterObj.groupTitle,
        router: ''
      }, {
        title: currentRouterObj.title,
        router: currentRouterObj.router
      }]
    }
  } else {
    let path = to.path.replace("Detali", ""),
      arr = routerConstant.filter(it => {
        return it.router == path
      }),
      sonTit = titStatus(to.query.type) || '详情'
    setTitle(sonTit)
    if (arr.length > 0) {
      let obj = arr[0]
      updateCrumbList = [{
        title: '首页',
        router: '/home'
      }, {
        title: obj.title,
        router: obj.router
      }, {
        title: sonTit,
        router: ''
      }]
    }
  }
  store.dispatch("app/updateCrumbList", updateCrumbList)
}