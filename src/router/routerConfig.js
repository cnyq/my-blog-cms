import router from '@/router'
import NProgress from 'nprogress' // 页面加载进度条插件
import 'nprogress/nprogress.css'
import store from '@/store'
import {
  setCrumbList
} from '@/utils/router-fun'

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  ease: 'ease',
  speed: 500
})
const keepAliveArr = ['articles', 'tag']
router.beforeEach(async (to, from, next) => {
  // NProgress.start()
  if (keepAliveArr.includes(to.name)) {
    store.dispatch('app/addKeepAlive', to.name)
  }
  let isLoading = store.getters.token && JSON.stringify(store.getters.userInfo) != "{}"
  if (to.path == '/login') {
    if (isLoading) {
      NProgress.start()
      setCrumbList(to)
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (isLoading) {
      NProgress.start()
      setCrumbList(to)
      next()
    } else {
      next({ path: '/login' })
    }
  }

})

router.afterEach(() => {
  // NProgress.set(0.9)
  NProgress.done()
})