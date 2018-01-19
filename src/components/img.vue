<template>
  <div>
    <img v-if="blob" :src="blob" class="img-thumbnail"/>
    <i class="fa fa-spinner fa-pulse fa-fw" v-else-if="!error && !blob"></i>
    <i class="fa fa-fw fa-exclamation text-danger" v-if="error"></i>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'hdk-img',
  props: {
    path: String,
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
