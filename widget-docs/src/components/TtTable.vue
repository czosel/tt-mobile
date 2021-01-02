<template>
  <table class="table"></table>
</template>

<script>
export default {
  name: "TtTable",
  props: {
    url: String,
    highlight: String,
    logoSize: String,
  },
  mounted() {
    this.url &&
      TTmobile.table(this.url, this.$el, {
        highlight: this.highlight,
        logoSize: this.logoSize,
      });
  },
  watch: {
    url(url) {
      url &&
        TTmobile.table(url, this.$el, {
          highlight: this.highlight,
          logoSize: this.logoSize,
        });
    },
    highlight(highlight) {
      this.url &&
        TTmobile.table(this.url, this.$el, {
          highlight,
          logoSize: this.logoSize,
        });
    },
    logoSize(logoSize) {
      this.url &&
        TTmobile.table(this.url, this.$el, {
          highlight: this.highlight,
          logoSize,
        });
    },
  },
};
</script>

<style scoped></style>
