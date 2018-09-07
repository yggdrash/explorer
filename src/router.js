import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', component: Home
    },
    {
      path: '/stem', component: () => import('./views/Branch'),
      children: [
        { path: '', component: () => import('./views/ChainOverview') },
        { path: 'blocks', component: () => import('./views/BlockList')},
        { path: 'blocks/:hash', component: () => import('./views/BlockDetail') },
        { path: 'contract', component: () => import('./views/Contract') }
      ]
    },
    {
      path: '/branches', component: () => import('./views/BranchList'),
    },
    {
      path: '/branches/:id', component: () => import('./views/Branch'),
      children: [
        { path: '', component: () => import('./views/ChainOverview') },
        { path: 'blocks', component: () => import('./views/BlockList')},
        { path: 'blocks/:hash', component: () => import('./views/BlockDetail') }
      ]
    },
    {
      path: '*', component: () => import('./views/NotFoundComponent')
    },
  ]
})
