import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//importerar bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

//importerar huvudcss
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
