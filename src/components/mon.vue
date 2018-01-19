<template>
  <div>
    <nav class="text-center" v-if="pages>1">
      <ul class="pagination">
        <li :class="{disabled:page==0}">
          <a href="#" v-on:click="page=page-1">&laquo;</a>
        </li>
        <li v-for="i in pages" :class="{active:i-1==page}">
          <a href="#" v-on:click="page=i-1">{{i}}</a>
        </li>
        <li :class="{disabled:page==pages-1}">
          <a href="#" v-on:click="page=page+1">&raquo;</a>
        </li>
      </ul>
    </nav>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">sequence</th>
          <th class="text-center">instance</th>
          <th class="text-center">origin</th>
          <th class="text-center">channel</th>
          <th class="text-center">mode</th>
          <th class="text-center">count</th>
          <th class="text-center">timestamp</th>
          <th class="text-center">reference</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in all">
          <td class="text-center">{{p.sequence}}</td>
          <td class="text-center">{{p.instance|instance}}</td>
          <td class="text-center">{{p.origin}}</td>
          <td class="text-center">{{p.channel}}</td>
          <td class="text-center">{{p.realtime|mode}}</td>
          <td class="text-center">{{p.count}}</td>
          <td class="text-center">{{p.timestamp | strftime("YYYY-MM-DD HH:mm:ss")}}</td>
          <td class="text-center">
            <!-- <img v-if="p.format=='image'" :src="p.path" class="img-thumbnail"/> -->
            <hdk-img v-if="p.format=='image'" :path="p.path"></hdk-img>
            <em v-else class="text-muted">{{p.reference}}</em>
          </td>
          <td class="text-center">
            <router-link :to="{name: 'hdk.detail', params:{name: p.reference}}" class="btn btn-default btn-xs">
              <i class="fa fa-cog"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="text-center" v-if="pages>1">
      <ul class="pagination">
        <li :class="{disabled:page==0}">
          <a href="#" v-on:click="page=page-1">&laquo;</a>
        </li>
        <li v-for="i in pages" :class="{active:i-1==page}">
          <a href="#" v-on:click="page=i-1">{{i}}</a>
        </li>
        <li :class="{disabled:page==pages-1}">
          <a href="#" v-on:click="page=page+1">&raquo;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import Img from "./img.vue"
export default {
  name: 'hdk-mon-table',
  props: {
    products: Array
  },
  data() {
    return {
      count: 30,
      page: 0,
    };
  },
  computed: {
    all() {
      let f = this.page*this.count;
      let t = f+this.count;
      return this.products.slice(f, t);
    },
    pages() {
      if(!this.products) {
        return 0
      }
      return Math.ceil(this.products.length/this.count);
    }
  },
  components: {
    'hdk-img': Img,
  }
}
</script>
