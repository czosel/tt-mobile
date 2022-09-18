<template>
  <div></div>
</template>

<script>
export default {
  name: "TtSchedule",
  props: {
    clubId: String,
    limitPrevious: Number,
    limitNext: Number,
  },
  mounted() {
    this.clubId &&
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious: this.limitPrevious,
        limitNext: this.limitNext,
      });
  },
  watch: {
    clubId(clubId) {
      clubId &&
        TTmobile.schedule(clubId, this.$el, {
          limitPrevious: this.limitPrevious,
          limitNext: this.limitNext,
        });
    },
    limitPrevious(limitPrevious) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious,
        limitNext: this.limitNext,
      });
    },
    limitNext(limitNext) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext,
        limitPrevious: this.limitPrevious,
      });
    },
  },
};
</script>

<style scoped></style>
