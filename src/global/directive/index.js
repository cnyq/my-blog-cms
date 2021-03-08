import Vue from 'vue'
import store from '@/store'
Vue.directive('rules', {
  bind(el, binding) {
    // 按钮需要的权限
    let auth = binding.value
    // 用户拥有的权限
    let roles = store.getters.userInfo && store.getters.userInfo.auth_status || 3
    if (auth <= roles) {
      el.disabled = 'disabled'
      el.title = '您没有操作该按钮的权限'
      el.className = el.className + ' is-disabled'
    }
  }
});