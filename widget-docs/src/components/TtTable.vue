<template>
  <table class="table"></table>
</template>

<script>
export default {
  name: 'TtTable',
  props: {
    url: String,
    highlight: String,
  },
  mounted() {
    this.url &&
      TTmobile.table(this.url, this.$el, {
        highlight: this.highlight,
      })
  },
  watch: {
    url(url) {
      url && TTmobile.table(url, this.$el, { highlight: this.highlight })
    },
    highlight(highlight) {
      this.url && TTmobile.table(this.url, this.$el, { highlight })
    },
  },
}
</script>

<style scoped></style>
