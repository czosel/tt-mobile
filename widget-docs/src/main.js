import Vue from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue-highlightjs'

Vue.config.productionTip = false
Vue.use(VueHighlightJS)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
