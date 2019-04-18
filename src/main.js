import Vue from 'vue'
import App from './App.vue'
import DragAndDrop from 'vue-drag-and-drop'
import VueTour from 'vue-tour'
import Vue2TouchEvents from 'vue2-touch-events'

require('vue-tour/dist/vue-tour.css')

Vue.config.productionTip = false
Vue.use(DragAndDrop)
Vue.use(VueTour)
Vue.use(Vue2TouchEvents)

new Vue({
  render: h => h(App)
}).$mount('#app')
