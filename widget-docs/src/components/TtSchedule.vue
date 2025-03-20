<template>
  <div></div>
</template>

<script>
function rerender(instance, overrides) {
  instance.clubId &&
    TTmobile.schedule(
      instance.clubId,
      instance.$el,
      Object.assign(
        {
          limitPrevious: instance.limitPrevious,
          limitNext: instance.limitNext,
          variant: instance.variant,
          showLeague: instance.showLeague,
          showTime: instance.showTime,
          breakpoint: instance.breakpoint,
          fallback: instance.fallback,
        },
        overrides,
      ),
    );
}

export default {
  name: "TtSchedule",
  props: {
    clubId: String,
    limitPrevious: Number,
    limitNext: Number,
    variant: String,
    showLeague: Boolean,
    showTime: Boolean,
    breakpoint: String,
    fallback: String,
  },
  mounted() {
    rerender(this);
  },
  watch: {
    clubId(clubId) {
      rerender(this, { clubId });
    },
    limitPrevious(limitPrevious) {
      rerender(this, { limitPrevious });
    },
    limitNext(limitNext) {
      rerender(this, { limitNext });
    },
    variant(variant) {
      rerender(this, { variant });
    },
    breakpoint(breakpoint) {
      rerender(this, { breakpoint });
    },
    fallback(fallback) {
      rerender(this, { fallback });
    },
    showLeague(showLeague) {
      rerender(this, { showLeague });
    },
    showTime(showTime) {
      rerender(this, { showTime });
    },
  },
};
</script>

<style scoped></style>
