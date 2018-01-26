<template>
  <div>
    <img v-if="product.blob" :src="blob" class="img-thumbnail"/>
    <img v-else="blob" :src="blob" class="img-thumbnail"/>
    <i class="fa fa-spinner fa-pulse fa-fw" v-else-if="!error && !blob"></i>
    <span v-if="error">
      <i class="fa fa-fw fa-exclamation text-danger"></i>
      <em class="text-muted">{{product.reference}}</em>
    </span>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'hdk-img',
  props: {
    product: Object,
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
      this.$store.dispatch('product.image', {url: this.product.path, key: this.product.key}).then(b => {
        this.blob = b
        this.$store.commit("product.detail", {key: this.product.key, url: this.product.path, blob: b})
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
