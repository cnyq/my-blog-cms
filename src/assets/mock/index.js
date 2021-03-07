import {
  routerConstant
} from "@/assets/mock/routerMock"

let menuList = []
routerConstant.map(it => {
  if (it.grade == 1) {
    menuList.push({
      title: it.title,
      router: it.router,
      children: []
    })
  } else if (it.grade == 2) {
    if (menuList.length == 0) {
      menuList.push({
        title: it.groupTitle,
        router: it.group,
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
          children: [{
            title: it.title,
            router: it.router
          }]
        })
      }
    }
  }
})
console.log(routerConstant,menuList)
export {
  routerConstant,
  menuList
}