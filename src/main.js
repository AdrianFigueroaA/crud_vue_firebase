import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var firebaseConfig = {
  apiKey: "AIzaSyClOPkVOTSoPl6A9p5bgkRWji1s5AXmnjg",
  authDomain: "desafio-1-firebase.firebaseapp.com",
  databaseURL: "https://desafio-1-firebase.firebaseio.com",
  projectId: "desafio-1-firebase",
  storageBucket: "desafio-1-firebase.appspot.com",
  messagingSenderId: "454690164628",
  appId: "1:454690164628:web:6b15de3b6ec5ea04ac4981"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
