import {
  routerConstant
} from "@/assets/mock/routerMock"

let menuList = []
routerConstant.map(it => {
  if (it.grade == 1) {
    menuList.push({
      title: it.title,
      router: it.router,
      children: [],
      icon: it.icon
    })
  } else if (it.grade == 2) {
    if (menuList.length == 0) {
      menuList.push({
        title: it.groupTitle,
        router: it.group,
        icon: it.icon,
        children: [{
          title: it.title,
          router: it.router
        }]
      })
    } else {
      let res = menuList.some(item => {
        if (item.router == it.group) {
          item.children.push({
            title: it.title,
            router: it.router
          })
          return true
        }
      })
      if (!res) {
        menuList.push({
          title: it.groupTitle,
          router: it.group,
          icon: it.icon,
          children: [{
            title: it.title,
            router: it.router
          }]
        })
      }
    }
  }
})
console.log('menuList',menuList)
export {
  routerConstant,
  menuList
}