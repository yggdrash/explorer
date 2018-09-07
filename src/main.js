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
  if(to.params.id != null) {
    let binfo = store.state.branches.find(item => {
      return item.id === to.params.id
    })

    if ( binfo == null ) next('404')

    store.dispatch('changeBranch', binfo)
  } else if(to.path === '/stem') {
    store.dispatch('changeBranch', { name: 'STEM', id: 'STEM' })
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
