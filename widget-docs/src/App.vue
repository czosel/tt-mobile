<template>
  <section class="section" id="app">
    <div class="container">
      <h1 class="title">TT-mobile einbetten</h1>
      <h2 class="subtitle">Installation</h2>
      <pre
        v-highlightjs
        class="content"
      ><code class="html">&lt;script src="https://cdn.jsdelivr.net/npm/tt-mobile-widgets@1.4.3/tt-mobile.min.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>

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
          <div class="field">
            <label class="label">Max. Anzahl Spieltage Rückschau</label>
            <div class="control">
              <input class="input" type="number" v-model="limitPrevious" />
            </div>
          </div>
          <div class="field">
            <label class="label">Max. Anzahl Spieltage Vorschau</label>
            <div class="control">
              <input class="input" type="number" v-model="limitNext" />
            </div>
          </div>
          <div class="field">
            <label class="label">Darstellung</label>
            <div class="control select">
              <select v-model="variant">
                <option value="responsive">Responsive</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
              </select>
            </div>
          </div>
          <div v-if="variant == 'responsive'" class="field">
            <label class="label">Breakpoint</label>
            <div class="control">
              <input class="input" v-model="breakpoint" />
            </div>
          </div>
          <label class="label">Fallback (falls keine Spiele gefunden)</label>
          <div class="control">
            <input class="input" v-model="fallback" />
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
          <TtSchedule
            class="box"
            :clubId="clubId"
            :limitPrevious="limitPrevious ? parseInt(limitPrevious) : undefined"
            :limitNext="limitNext ? parseInt(limitNext) : undefined"
            :variant="variant"
            :breakpoint="breakpoint"
            :fallback="fallback"
          />
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
    this.limitPrevious = params.get("limitPrevious") || "";
    this.limitNext = params.get("limitNext") || "";
    this.variant = params.get("variant") || "responsive";
    this.breakpoint = params.get("breakpoint") || "500px";
    this.fallback = params.get("fallback") || "";
  },
  data: () => ({
    tableUrl: "",
    tableHighlight: "",
    tableLogoSize: "",
    teamUrl: "",
    clubId: "",
    limitPrevious: undefined,
    limitNext: undefined,
    variant: "",
    breakpoint: "",
    fallback: "",
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
      const limitPreviousOption =
        this.limitPrevious && `limitPrevious: "${this.limitPrevious}"`;
      const limitNextOption =
        this.limitNext && `limitNext: "${this.limitNext}"`;
      const variantOption =
        this.variant &&
        this.variant !== "responsive" &&
        `variant: "${this.variant}"`;
      const breakpointOption =
        this.breakpoint &&
        this.breakpoint !== "500px" &&
        `breakpoint: "${this.breakpoint}"`;
      const fallbackOption =
        this.fallback &&
        this.fallback !== "keine Spiele gefunden" &&
        `fallback: "${this.fallback}"`;
      const options =
        (limitPreviousOption ||
          limitNextOption ||
          variantOption ||
          breakpointOption) &&
        `, { ${[
          limitPreviousOption,
          limitNextOption,
          variantOption,
          breakpointOption,
          fallbackOption,
        ]
          .filter(Boolean)
          .join(", ")}}`;
      return `<div class="schedule"></div>
<script>TTmobile.schedule("${
        this.clubId
      }", document.querySelector(".schedule")${options || ""});<\/script>`;
    },
  },
  watch: {
    tableHighlight: syncQueryParam("table-highlight"),
    tableUrl: syncQueryParam("table-url"),
    teamUrl: syncQueryParam("team-url"),
    clubId: syncQueryParam("club-id"),
    limitPrevious: syncQueryParam("limitPrevious"),
    limitNext: syncQueryParam("limitNext"),
    variant: syncQueryParam("variant"),
    breakpoint: syncQueryParam("breakpoint"),
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
