// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueModalTor from "vue-modaltor";
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
Vue.config.productionTip = false

Vue.use(VueModalTor);
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default'); //Client table
Vue.use(ServerTable); //Server table
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
