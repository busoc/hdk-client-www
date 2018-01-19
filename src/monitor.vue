<template>
  <div>
    <router-view></router-view>
    <div v-if="$store.getters.total">
      <header class="page-header">
        <h1 class="text-capitalize">activities</h1>
      </header>
      <nav class="btn-group btn-group-sm pull-right" style="margin-bottom: 10px">
        <button v-if="row>1" type="button" class="btn btn-default" v-on:click="row=row-1">
          <i class="fa fa-fw fa-minus"></i>
        </button>
        <button type="button" class="btn btn-primary" v-on:click="row=row+1">
          <i class="fa fa-fw fa-plus"></i>
        </button>
      </nav>
      <div class="clearfix"/>
      <aside class="row" v-if="$store.getters.total > 0" v-for="i in row">
        <div v-for="c in 3" class="col-sm-6 col-md-4">
          <hdk-mon-preview></hdk-mon-preview>
        </div>
      </aside>
      <hr/>
      <ul :class="['nav', 'nav-tabs', {'nav-justified': $store.getters.total>=3}]">
        <li v-for="(ps, k, i) in $store.getters.products" role="presentation" :class="{active: i==0}">
          <a :href="'#'+k" :arial-controls="k" role="tab" data-toggle="tab" v-on:click="current=k">{{k}}</a>
        </li>
      </ul>
      <div class="tab-content">
        <section v-for="(ps, k, i) in $store.getters.products" role="tabpanel" :class="['tab-pane', {active: i==0}]" :id="k">
          <aside class="well">
            <p class="text-center">packets: <strong>{{total(ps)}}</strong>, duration: <strong>{{elapsed(ps).humanize()}}</strong></p>
          </aside>
          <hdk-mon-table :products="ps" v-if="current==k || i==0"></hdk-mon-table>
        </section>
      </div>
    </div>
    <div v-else>
      <aside class="alert alert-info">
        <p class="text-capitalize">sorry, no activities are performed currently</p>
      </aside>
    </div>
  </div>
</template>
<script>
import 'bootstrap';
import moment from 'moment';

import Mon from './components/mon.vue';
import Preview from './components/preview.vue';

export default {
  name: 'hdk-monitor',
  beforeRouteEnter(to, from, next) {
    next(v => v.update());
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
  },
  data() {
    return {
      interval: undefined,
      current: '',
      row: 1,
    };
  },
  methods: {
    update() {
      this.interval = setInterval(() => this.$store.dispatch("monitor.products"), 1000);
    },
    elapsed: ds => moment.duration(ds[ds.length-1].timestamp - ds[0].timestamp),
    total: ds => ds.reduce((v, d) => v + d.count, 0),
  },
  components: {
    'hdk-mon-table': Mon,
    'hdk-mon-preview': Preview,
  }
};
</script>
<style scoped>
.nav-tabs + .tab-content {
  margin-top: 20px;
}
.img-thumbnail {
  width: 60px;
  max-width: 90px;
  height: auto;
}
aside.alert-info {
  font-size: 18px;
  margin: 120px auto;
}
</style>
