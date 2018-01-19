<template>
  <div>
    <form class="well form-inline">
      <fieldset class="text-center">
        <div class="form-group form-group-sm">
          <label>instance</label>
          <select class="form-control" @change="update()" v-model="instance">
            <option v-for="c in [{label: 'OPS', value: '255'}, {label: 'SIM1', value: '001'}, {label: 'SIM2', value: '002'}, {label: 'TEST', value: '000'}]" :value="c.value">{{c.label}}</option>
          </select>
        </div>
        <div class="form-group form-group-sm">
          <label>channel</label>
          <select class="form-control" @change="update()" v-model.number="channel">
            <option v-for="c in 2" :value="c">vic #{{c}}</option>
          </select>
        </div>
        <div class="form-group form-group-sm">
          <label>mode</label>
          <select class="form-control" @change="update()" v-model="mode">
            <option v-for="c in [{label: 'realtime', value: true}, {label: 'playback', value: false}]" :value="c.value">{{c.label}}</option>
          </select>
        </div>
        <div class="form-group form-group-sm">
          <label>origin</label>
          <select class="form-control" @change="update()" v-model.number="origin">
            <option v-for="c in origins" :value="c">{{c}}</option>
          </select>
        </div>
      </fieldset>
    </form>
    <figure v-if="product">
      <img :src="blob" class="thumbnail center-block"/>
      <figcaption>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>acquisition</th>
              <td class="text-right">{{product.timestamp | strftime("YYYY-MM-DD HH:mm:ss")}}</td>
            </tr>
            <tr>
              <th>reference</th>
              <td class="text-right">{{product.reference}}</td>
            </tr>
          </tbody>
        </table>
      </figcaption>
    </figure>
    <div v-else-if="error">
      <p class="text-center text-danger"><strong>{{error}}</strong></p>
    </div>
    <div v-else>
      <p class=" text-center text-muted">no preview available</p>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'hdk-mon-preview',
  data() {
    return {
      channel: 1,
      mode: true,
      instance: 255,
      origin: 0,
      product: undefined,
      interval: undefined,
      blob: undefined,
      error: "",
    };
  },
  computed: {
    origins() {
      return this.$store.getters.origins('image', this.channel, this.mode, this.instance)
    },
  },
  methods: {
    update() {
      let k = `${this.origin}-${this.mode?'realtime':'playback'}-${this.instance}`
      this.product = this.$store.getters.images(k, this.channel);
      if (!this.product) {
        return
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.fetch()
      this.interval = setInterval(_.bind(_.throttle(this.fetch, 100), this), 1000);
      //this.interval = setInterval(_.bind(this.update, this), 1000);
    },
    fetch() {
      let d = moment(this.product.timestamp).format("ddd, DD MMM YYYY HH:mm:ss")
      this.$store.dispatch("product.image", {url: this.product.path, mod: d})
      .then(b => {
        this.blob = b;
        this.error = "";
      }).catch(r => {
        this.blob = undefined;
        this.error = r;
      });
    },
  },
};
</script>
<style scoped>
figure{
  background: #333333;
}
figcaption {
  background: #ffffff;
}
figcaption .table {
  margin-bottom: 0px;
}
img.thumbnail {
  height: 360px;
  background: #333333;
  margin-bottom: 0px;
}
.well {
  padding: 5px;
  margin-bottom: 0px;
}
.form-control {
  margin: auto 5px;
}
p.text-muted {
  font-size: 24px;
  padding: 60px;
}
</style>
