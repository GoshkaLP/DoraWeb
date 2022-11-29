import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'
import "./axios"
import GmapVue from 'gmap-vue'

import router from './router'
import store from './store'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyBZMByRWn_UKXD1edpvcrZwmaLhboN-XpA'
  },
  autoBindAllEvents: false,
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
