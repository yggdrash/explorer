import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/stem', component: () => import('./views/Home')
    },
    {
      path: '/branches/:id', component: () => import('./views/Branch'),
      children: [
        { path: '', component: () => import('./views/BranchOverview') },
        { path: 'blocks', component: () => import('./views/BlockList')},
        { path: 'blocks/:hash', component: () => import('./views/BlockDetail') }
      ]
    },
  ]
})
