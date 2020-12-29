import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import router from './router/index.js'
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false
Vue.use(vueDebounce, {
  lock: false,
  defaultTime: '500ms',
  listenTo: 'input',
  fireOnEmpty: false
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
