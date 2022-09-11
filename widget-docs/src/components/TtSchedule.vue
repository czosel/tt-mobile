<template>
  <div></div>
</template>

<script>
export default {
  name: "TtSchedule",
  props: {
    clubId: String,
  },
  mounted() {
    this.clubId && TTmobile.schedule(this.clubId, this.$el);
  },
  watch: {
    clubId(clubId) {
      clubId && TTmobile.schedule(clubId, this.$el);
    },
  },
};
</script>

<style scoped></style>
