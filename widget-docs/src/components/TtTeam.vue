<template>
  <table class="table"></table>
</template>

<script>
export default {
  name: "TtTeam",
  props: {
    url: String,
  },
  mounted() {
    this.url && TTmobile.team(this.url, this.$el);
  },
  watch: {
    url(url) {
      url && TTmobile.team(url, this.$el);
    },
  },
};
</script>

<style scoped></style>
