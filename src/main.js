//全局引入套件
import Vue from 'vue'
import App from './App'
import router from './router' //全局引入router
import BootstrapVue  from 'bootstrap-vue'  //全局引入bootstrap-vue套件
import axios from 'axios'; //全局引入axios套件
import VueModalTor from "vue-modaltor";
import './assets/css/tailwind.css';
//全局註冊該套件
Vue.use(BootstrapVue) //註冊BootstrapVue
Vue.prototype.$http = axios //註冊axios
Vue.use(VueModalTor);
//全局引入bootstrap.css、bootstrap-vue.css
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

//el: #app意思就是會inject到html裡的<div id="app">
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
