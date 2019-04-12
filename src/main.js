import Vue from 'vue'
import App from './App.vue'
import Message from 'vue-m-message'
import DragAndDrop from 'vue-drag-and-drop'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.config.productionTip = false
Vue.use(Message) // will mount `Vue.prototype.$message`
Vue.use(DragAndDrop)
Vue.use(VueTour)

new Vue({
  render: h => h(App)
}).$mount('#app')
