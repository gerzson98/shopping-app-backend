import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index.js'

Vue.use(AsyncComputed)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
