import Vue from 'vue'
import Router from 'vue-router'
import DocsPage from '../App.vue'
import TestPage from '../pages/TestPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/docs'
    },
    {
      path: '/docs',
      name: 'DocsPage',
      component: DocsPage
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    }
  ]
})

export default router

