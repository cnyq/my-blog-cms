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
const keepAliveArr = ['articles']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (keepAliveArr.includes(to.name)) {
    store.dispatch('app/addKeepAlive', to.name)
  }
  setCrumbList(to)
  next()
})

router.afterEach(() => {
  // NProgress.set(0.9)
  NProgress.done()
})