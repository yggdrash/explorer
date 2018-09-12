import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { shortHash } from './filters'
import {
  SET_CURRENT_BRANCHE
} from './store/mutation-types'
Vue.config.productionTip = false

Vue.use(require('vue-moment'))

Vue.filter('shortHash', shortHash)

router.beforeResolve((to, from, next) => {
  if(to.params.id != null) {
    let binfo = store.state.branches.find(item => {
      return item.id === to.params.id
    })

    if ( binfo == null ) next('404')
    store.commit(SET_CURRENT_BRANCHE, binfo)
  } else if(to.path === '/stem') {
    store.commit(SET_CURRENT_BRANCHE, { name: 'STEM', id: 'STEM' })
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
