import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/components/layout'
import generatedRouter from './routerPackage'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '',
        meta: {
          affix: true,
          title: '首页'
        },
        component: () => import('@/components/pages/index')
      },
      ...generatedRouter
    ]
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/components/pages/e404')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/components/pages/login')
  }, {
    path: '*', redirect: '/404', hidden: true
  },
];

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
