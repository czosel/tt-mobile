<template>
  <div class="table"></div>
</template>

<script>
export default {
  name: "TtTeam",
  props: {
    url: String,
    showPlayers: {
      type: Boolean,
      default: true,
    },
    showSchedule: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.url &&
      TTmobile.team(this.url, this.$el, {
        showPlayers: this.showPlayers,
        showSchedule: this.showSchedule,
      });
  },
  watch: {
    url(url) {
      url &&
        TTmobile.team(url, this.$el, {
          showPlayers: this.showPlayers,
          showSchedule: this.showSchedule,
        });
    },
    showPlayers(showPlayers) {
      TTmobile.team(this.url, this.$el, {
        showPlayers,
        showSchedule: this.showSchedule,
      });
    },
    showSchedule(showSchedule) {
      TTmobile.team(this.url, this.$el, {
        showPlayers: this.showPlayers,
        showSchedule,
      });
    },
  },
};
</script>

<style scoped></style>
