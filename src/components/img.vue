<template>
  <div>
    <img v-if="blob" :src="blob" class="img-thumbnail"/>
    <i class="fa fa-spinner fa-pulse fa-fw" v-else-if="!error && !blob"></i>
    <span v-if="error">
      <i class="fa fa-fw fa-exclamation text-danger"></i>
      <em class="text-muted">{{reference}}</em>
    </span>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'hdk-img',
  props: {
    path: String,
    reference: String,
  },
  data() {
    return {
      blob: "",
      error: "",
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch('product.image', {url: this.path}).then(b => {
        this.blob = b
      })
      .catch(e => {
        this.error = e;
        this.blob = "";
      });
    },
  },
};
</script>
<style scoped>
.img-thumbnail {
  width: 60px;
  max-width: 90px;
  height: auto;
}
</style>
