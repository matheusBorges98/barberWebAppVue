import Vue from 'vue'
//import { BootstrapVue, IconsPlugin } from '../node_modules/bootstrap-vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/css/main.css'

import "font-awesome/css/font-awesome.min.css";
import 'vue-navigation-bar/dist/vue-navigation-bar.css';
import Notifications from 'vue-notification'

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//defined as global component
Vue.component('font-awesome-icon', require('vue-fontawesome-icon/VueFontawesome.vue').default);

// import axios from "axios";
import CustomInput from './components/CustomInput'
import Navbar from './components/Navbar'
import Button from './components/Button'
import Card from './components/Card'
import ListaCamposPersonalizados from './components/ListaCamposPersonalizados'
import VueFlip from 'vue-flip'
import VueNavigationBar from 'vue-navigation-bar';
import './app.scss'
import App from './App.vue'

import router from './router'
import store from './store'

import Login from './pages/login/Login'

Vue.component('vue-flip', VueFlip)
Vue.use(Notifications);
Vue.component('CustomInput', CustomInput)
Vue.component('Card', Card)
Vue.component('ListaCamposPersonalizados', ListaCamposPersonalizados)
Vue.component('Navbar', Navbar)
Vue.component('Button', Button)
Vue.use(BootstrapVue)
// Vue.use(axios)
Vue.use(BootstrapVueIcons)
Vue.component('vue-navigation-bar', VueNavigationBar);

Vue.config.productionTip = false;

Vue.prototype.teste = "teste";

new Vue({
    router,
    store,
    Login,
    // AuthMiddleware,
    render: (h) => h(App),
}).$mount('#app')
