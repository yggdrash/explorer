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
      path: '/yggdrash', component: () => import('./views/Branch'),
      children: [
        { path: '', component: () => import('./views/ChainOverview') },
        { path: 'blocks', component: () => import('./views/BlockList')},
        { path: 'blocks/:blockId', component: () => import('./views/BlockDetail') },
        { path: 'txs', component: () => import('./views/TxList')},
        { path: 'txs/:txId', component: () => import('./views/TxDetail')},
        { path: 'contract', component: () => import('./views/Contract') },
        { path: 'validator/:account', component: () => import('./views/ValidatorDetail')},
        { path: 'account/:account', component: () => import('./views/AccountDetail')},
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
        { path: 'blocks/:blockId', component: () => import('./views/BlockDetail') },
        { path: 'txs', component: () => import('./views/TxList')},
        { path: 'txs/:txId', component: () => import('./views/TxDetail')},
        { path: 'states', component:() => import('./views/StateList')},
      ]
    },
    {
      path: '*', component: () => import('./views/NotFoundComponent')
    },
  ]
})
