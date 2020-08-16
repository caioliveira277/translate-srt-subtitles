import Vue from "vue";
import Onboard from "./pages/onboard.vue";
import Start from "./pages/start.vue";
import Translating from "./pages/translating.vue";

const routes = {
  "/": Onboard,
  start: Start,
  translating: Translating,
};

new Vue({
  el: "#app",
  data: {
    currentSearch: new URLSearchParams(window.location.search).get("view"),
  },
  computed: {
    ViewComponent() {
      return routes[this.currentSearch] || routes["/"];
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
