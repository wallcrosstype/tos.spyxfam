import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import 'vuetify/dist/vuetify.css'
import App from './App.vue'

import './assets/main.css'
import vuetify from "./vuetify";
Vue.use(PiniaVuePlugin)

new Vue({
  pinia: createPinia(),
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
