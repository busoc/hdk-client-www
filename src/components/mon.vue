<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="text-center">instance</th>
        <th class="text-center">origin</th>
        <th class="text-center">channel</th>
        <th class="text-center">mode</th>
        <th class="text-center">sequence</th>
        <th class="text-center">timestamp</th>
        <th class="text-center">reference</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, i) in products">
        <td class="text-center">{{i+1}}</td>
        <td class="text-center">{{p.instance|instance}}</td>
        <td class="text-center">{{p.origin}}</td>
        <td class="text-center">{{p.channel}}</td>
        <td class="text-center">{{p.realtime|mode}}</td>
        <td class="text-center">{{p.sequence}}</td>
        <td class="text-center">{{p.timestamp | strftime("YYYY-MM-DD HH:mm:ss")}}</td>
        <td class="text-center">
          <img v-if="p.format=='image'" :src="p.path" class="img-thumbnail"/>
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
</template>
<script>
export default {
  name: 'hdk-mon-table',
  props: {
    products: Array
  }
}
</script>
<style scoped>
.img-thumbnail {
  width: 60px;
  max-width: 90px;
  height: auto;
}
</style>
