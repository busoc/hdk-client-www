const path = require("path")

import moment from 'moment';
import Vuex from 'vuex';
import Vue from 'vue';
import _ from 'lodash';

import {ref} from './filters.js'

Vue.use(Vuex);

let source = API
if (!source) {
  source = window.location.origin;
}

const state = {
  interval: 1000,
  products: {},
};

const getters = {
  products: state => state.products,
  total: state => state.products ? _.size(state.products):0,
  product(state) {
    return (k) =>  {
      return _.chain(state.products).values().flatten().find(p => p.reference == k).value();
    }
  },
  images(state) {
    return (k, c) => {
      if (!state.products) {
        return undefined;
      }
      let ds = state.products[k];
      if (!ds) {
        return undefined;
      }
      return _.find(ds, p => p.channel == c);
    };
  },
  origins(state) {
    return (f, c, r, i) => {
      let key = p =>  p.format == f && p.channel == c && p.realtime == r && p.instance==i;
      let pluck = p => p.origin;
      return _.chain(state.products).values().flatten().filter(key).map(pluck).uniq().value()
    }
  }
};

const mutations = {
  "monitor.interval"(state, payload) {
    clearInterval(state.interval);
  },
  "monitor.products"(state, payload) {
    if (!payload) {
      return
    }
    Object.keys(payload).forEach(k => {
      payload[k] = payload[k].map(p => {
        p.timestamp = moment.unix(p.timestamp).toDate();
        p.path = ref(p, `${source}/products/`);

        switch (path.extname(p.reference)) {
        case ".h264":
          p.format = "video"
        break
        case ".jpg":
        case ".png":
        case ".rgb":
        case ".gray":
        case ".i420":
          p.format = "image";
        break
        case ".dat":
          p.format = "science"
        break
        default:
        }
        return p;
      });
      payload[k] = _.sortBy(payload[k], [p => -p.num]);
    });
    state.products = Object.assign({}, payload);
  },
};

const actions = {
  "monitor.products"({commit}, payload) {
    return fetch(`${source}/monitor/`, {headers: {accept: "application/json"}}).then(r => {
      if (!r.ok) {
        return Promise.reject(r.statusText)
      }
      if (r.status == 204) {
        return Promise.resolve()
      }
      return r.json()
    }).then(rs => {
      commit("monitor.products", rs);
      return Promise.resolve();
    });
  },
  "product.image"({commit}, {url, mod}) {
    return fetch(`${url}`, {headers: {"accept": "image/png", "if-modified-since": mod}}).then(r => {
      return r.ok ? r.blob() : Promise.reject(r.statusText)
    }).then(rs => {
      return Promise.resolve(URL.createObjectURL(rs));
    });
  },
  "product.detail"({commit}, payload) {
    return fetch(`${payload}.xml`, {headers: {accept: "application/xml"}}).then(r => {
      if (!r.ok) {
        return Promise.reject(r.statusText);
      }
      return r.text();
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
