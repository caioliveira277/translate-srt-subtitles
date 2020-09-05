import Onboard from "./pages/onboard.vue";
import Start from "./pages/start.vue";
import Translating from "./pages/translating.vue";
import Vue from "vue";

const routes = {
  "/": Onboard,
  start: Start,
  translating: Translating,
};

const APP = new Vue({
  el: "#app",
  data: {
    view: "",
    inputDir: "",
    outputDir: "",
    keyAPI: localStorage.getItem("keyAPI") || "",
  },
  computed: {
    ViewComponent() {
      return routes[this.view] || routes["/"];
    },
  },
  methods: {
    goToView(view) {
      this.view = view;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
window.APP = APP;

export default APP;
