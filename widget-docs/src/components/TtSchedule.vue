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
    fallback: String,
  },
  mounted() {
    this.clubId &&
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious: this.limitPrevious,
        limitNext: this.limitNext,
        variant: this.variant,
        breakpoint: this.breakpoint,
        fallback: this.fallback,
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
          fallback: this.fallback,
        });
    },
    limitPrevious(limitPrevious) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitPrevious,
        limitNext: this.limitNext,
        variant: this.variant,
        breakpoint: this.breakpoint,
        fallback: this.fallback,
      });
    },
    limitNext(limitNext) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext,
        limitPrevious: this.limitPrevious,
        variant: this.variant,
        breakpoint: this.breakpoint,
        fallback: this.fallback,
      });
    },
    variant(variant) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext: this.limitNext,
        limitPrevious: this.limitPrevious,
        variant,
        breakpoint: this.breakpoint,
        fallback: this.fallback,
      });
    },
    breakpoint(breakpoint) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext: this.limitNext,
        limitPrevious: this.limitPrevious,
        variant: this.variant,
        breakpoint,
        fallback: this.fallback,
      });
    },
    fallback(fallback) {
      TTmobile.schedule(this.clubId, this.$el, {
        limitNext: this.limitNext,
        limitPrevious: this.limitPrevious,
        variant: this.variant,
        breakpoint: this.breakpoint,
        fallback,
      });
    },
  },
};
</script>

<style scoped></style>
