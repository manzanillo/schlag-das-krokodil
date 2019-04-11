import Vue from 'vue'
import App from './App.vue'
import Message from 'vue-m-message'
import DragAndDrop from 'vue-drag-and-drop'

Vue.config.productionTip = false
Vue.use(Message) // will mount `Vue.prototype.$message`
Vue.use(DragAndDrop)

new Vue({
  render: h => h(App)
}).$mount('#app')
