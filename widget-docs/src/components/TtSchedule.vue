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
    variant: String,
    breakpoint: String,
  },
  mounted() {
    this.clubId &&
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious: this.limitPrevious,
        limitNext: this.limitNext,
        variant: this.variant,
        breakpoint: this.breakpoint,
      });
  },
  watch: {
    clubId(clubId) {
      clubId &&
        TTmobile.schedule(clubId, this.$el, {
          limitPrevious: this.limitPrevious,
          limitNext: this.limitNext,
          variant: this.variant,
          breakpoint: this.breakpoint,
        });
    },
    limitPrevious(limitPrevious) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious,
        limitNext: this.limitNext,
        variant: this.variant,
        breakpoint: this.breakpoint,
      });
    },
    limitNext(limitNext) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext,
        limitPrevious: this.limitPrevious,
        variant: this.variant,
        breakpoint: this.breakpoint,
      });
    },
    variant(variant) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext: this.limitNext,
        limitPrevious: this.limitPrevious,
        variant,
        breakpoint: this.breakpoint,
      });
    },
    breakpoint(breakpoint) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext: this.limitNext,
        limitPrevious: this.limitPrevious,
        variant: this.variant,
        breakpoint,
      });
    },
  },
};
</script>

<style scoped></style>
