<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <header class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h1 class="modal-title h4 text-center">detail of {{$route.params.name}}</h1>
        </header>
        <div class="modal-body" v-if="product && product.format == 'science'">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-body" v-if="product && product.format == 'image'">
          <p v-if="error" class="alert alert-danger">{{error}}</p>
          <img :src="product.path" class="thumbnail center-block"/>
          <pre>{{meta}}</pre>
        </div>
        <div class="modal-body" v-else>
          <p class="text-center">
            <em>loading, please wait...</em>
            <i class="fa fa-spinner fa-pulse fa-fw"></i>
          </p>
        </div>
        <footer class="modal-footer">
          <button type="button" class="btn btn-default btn-sm"  data-dismiss="modal">close</button>
        </footer>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script>
import 'bootstrap';
import moment from 'moment';

export default {
  name: 'hdk-detail',
  beforeRouteEnter(to, from, next) {
    next(v => v.toggle());
  },
  mounted() {
    $(this.$el).modal({show: false});
    $(this.$el).on('hidden.bs.modal', () => this.$router.go(-1));
  },
  data() {
    return {
      meta: "",
      error: "",
      product: undefined,
    };
  },
  methods: {
    toggle() {
      $(this.$el).modal('toggle');
      this.update();
    },
    update() {
      let p = this.$store.getters.product(this.$route.params.name)
      if (!p) {
        this.meta = "";
        this.error = "product not found";
        this.product = undefined;
        return
      }
      this.$store.dispatch("product.detail", p.path)
        .then(xml => {
          this.meta = xml;
          this.error = ""
          this.product = p;
        })
        .catch(r => {
          this.meta = "";
          this.error = r;
          this.product = undefined;
        });
    },
  },
};
</script>
<style scoped>
pre {
  max-height: 360px;
  overflow: auto;
}
img {
  max-height: 360px;
}
</style>
