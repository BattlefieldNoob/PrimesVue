import Vue from 'vue'
import App from './App.vue'

import VueMdl from 'vue-mdl/dist/vue-mdl.min'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueMdl)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
