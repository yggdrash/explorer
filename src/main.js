import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { shortHash } from './filters'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

Vue.filter('shortHash', shortHash)

router.beforeResolve((to, from, next) => {
  let branchId = to.params.id
  if(branchId && !store.state.branchesObject[branchId]) {
    console.log(branchId)
    console.log(store.state.branchesObject[branchId])
    next()
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
