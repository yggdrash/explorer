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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
