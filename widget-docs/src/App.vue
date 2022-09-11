<template>
  <section class="section" id="app">
    <div class="container">
      <h1 class="title">TT-mobile einbetten</h1>
      <h2 class="subtitle">Installation</h2>
      <pre
        v-highlightjs
        class="content"
      ><code class="html">&lt;script src="https://cdn.jsdelivr.net/npm/tt-mobile-widgets@1.1.1/tt-mobile.min.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>

      <h2 class="subtitle">Tabelle</h2>
      <div class="columns is-desktop">
        <div class="column">
          <pre
            v-highlightjs
            class="content"
          ><code class="javascript">TTmobile.table(url, element, options)</code></pre>
          <div class="field">
            <label class="label">Url</label>
            <div class="control">
              <input class="input" v-model="tableUrl" />
            </div>
          </div>
          <div class="field">
            <label class="label">Highlight</label>
            <div class="control">
              <input
                class="input"
                v-model="tableHighlight"
                placeholder="Einen Verein hervorheben ..."
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Grösse der Logos</label>
            <div class="control">
              <input class="input" v-model="tableLogoSize" placeholder="50px" />
            </div>
          </div>
          <label class="label">Code</label>
          <pre
            v-highlightjs="tableCode"
            class="content"
          ><code class="html"></code></pre>
          <p>
            Interaktives Beispiel auf
            <a href="https://jsfiddle.net/czosel/g5on1yhL/4/">JSfiddle</a>
          </p>
        </div>
        <div class="column">
          <TtTable
            class="box"
            :url="tableUrl"
            :highlight="tableHighlight"
            :logoSize="tableLogoSize"
          />
        </div>
      </div>

      <h2 class="subtitle">Mannschaft</h2>
      <div class="columns is-desktop">
        <div class="column">
          <pre
            v-highlightjs
            class="content"
          ><code class="javascript">TTmobile.team(url, element)</code></pre>
          <div class="field">
            <label class="label">Url</label>
            <div class="control">
              <input class="input" v-model="teamUrl" />
            </div>
          </div>
          <label class="label">Code</label>
          <pre
            v-highlightjs="teamCode"
            class="content"
          ><code class="html"></code></pre>
          <p>
            Interaktives Beispiel auf
            <a href="https://jsfiddle.net/czosel/hwptsr21/3/">JSfiddle</a>
          </p>
        </div>
        <div class="column">
          <TtTeam class="box" :url="teamUrl" />
        </div>
      </div>

      <h2 class="subtitle">Vereinsspielplan</h2>
      <div class="columns is-desktop">
        <div class="column">
          <pre
            v-highlightjs
            class="content"
          ><code class="javascript">TTmobile.schedule(url, element)</code></pre>
          <div class="field">
            <label class="label">Club ID</label>
            <div class="control">
              <input class="input" v-model="clubId" />
            </div>
          </div>
          <label class="label">Code</label>
          <pre
            v-highlightjs="scheduleCode"
            class="content"
          ><code class="html"></code></pre>
          <p>
            Interaktives Beispiel auf
            <a href="https://jsfiddle.net/czosel/dyt21hn5/3/">JSfiddle</a>
          </p>
        </div>
        <div class="column">
          <TtSchedule class="box" :clubId="clubId" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TtTable from "./components/TtTable.vue";
import TtTeam from "./components/TtTeam.vue";
import TtSchedule from "./components/TtSchedule.vue";

function syncQueryParam(paramName) {
  return (newValue) => {
    const params = new URLSearchParams(window.location.search);
    params.set(paramName, newValue);
    const newRelativePathQuery =
      window.location.pathname + "?" + params.toString();
    history.replaceState(null, "", newRelativePathQuery);
  };
}

export default {
  name: "app",
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.tableUrl =
      params.get("table-url") ||
      "/groupPage?championship=STT+19%2F20&group=205604";
    this.tableHighlight = params.get("table-highlight") || "";
    this.teamUrl =
      params.get("team-url") ||
      "/teamPortrait?teamtable=1663137&championship=STT+19%2F20&group=205604";
    this.clubId = params.get("club-id") || "33101";
  },
  data: () => ({
    tableUrl: "",
    tableHighlight: "",
    tableLogoSize: "",
    teamUrl: "",
    clubId: "",
  }),
  components: {
    TtTable,
    TtTeam,
    TtSchedule,
  },
  computed: {
    tableCode() {
      /* eslint-disable no-useless-escape */
      const highlightOption =
        this.tableHighlight && `highlight: "${this.tableHighlight}"`;
      const logoSizeOption =
        this.tableLogoSize && `logoSize: "${this.tableLogoSize}"`;
      const options =
        (highlightOption || logoSizeOption) &&
        `, { ${[highlightOption, logoSizeOption].filter(Boolean).join(", ")}}`;
      return `<table class="mytable"></table>
<script>TTmobile.table("${this.tableUrl}", document.querySelector(".mytable")${options});<\/script>`;
    },
    teamCode() {
      /* eslint-disable no-useless-escape */
      return `<table class="myteam"></table>
<script>TTmobile.team("${this.teamUrl}", document.querySelector(".myteam"));<\/script>`;
    },
    scheduleCode() {
      /* eslint-disable no-useless-escape */
      return `<table class="myclub"></table>
<script>TTmobile.schedule("${this.clubId}", document.querySelector(".myclub"));<\/script>`;
    },
  },
  watch: {
    tableHighlight: syncQueryParam("table-highlight"),
    tableUrl: syncQueryParam("table-url"),
    teamUrl: syncQueryParam("team-url"),
    clubId: syncQueryParam("club-id"),
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

code {
  display: block;
  white-space: pre-wrap;
}

table {
  width: 100%;
}

code.hljs {
  background-color: transparent;
}
</style>
