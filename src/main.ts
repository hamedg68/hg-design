import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vSelect from "vue-select";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

const app = createApp(App);

app.component("v-select", vSelect);
app.component("persian-date-picker", Vue3PersianDatetimePicker);

app.mount("#app");
