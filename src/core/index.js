import Vue from 'vue'
import '@/router/routerConfig'
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss'
import request from '@/utils/request'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/components/common'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/display.css'
const { NODE_ENV } = process.env
Vue.prototype.$axios = request
const IS_DEV = NODE_ENV !== 'production'
if (IS_DEV) {
  Vue.use(ElementUI, { locale })
}