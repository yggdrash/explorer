import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { shortHash } from './filters'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))
Vue.use(VueClipboard)

Vue.filter('shortHash', shortHash)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
