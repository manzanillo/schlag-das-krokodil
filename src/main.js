import Vue from 'vue'
import App from './App.vue'
import Message from 'vue-m-message'

Vue.config.productionTip = false
Vue.use(Message) // will mount `Vue.prototype.$message`

new Vue({
  render: h => h(App)
}).$mount('#app')
