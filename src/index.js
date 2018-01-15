import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store.js'
import Monitor from './monitor.vue';
import Product from './product.vue';
import {strftime, ref, modeName, instanceName} from './filters.js'

Vue.use(VueRouter);

Vue.filter("strftime", strftime);
Vue.filter("reference", ref);
Vue.filter("mode", modeName);
Vue.filter("instance", instanceName);

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'hdk.mon',
    component: Monitor,
    children: [{
      path: ':name',
      name: 'hdk.detail',
      component: Product,
    }],
  }],
});

new Vue({
  store,
  router,
}).$mount('#hadock')
