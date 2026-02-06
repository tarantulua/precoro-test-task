import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/icons.css";
import "./assets/fonts.css";
import "./style.css";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
