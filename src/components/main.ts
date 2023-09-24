import type { App } from "vue";
import { DatePicker, TextInput, SelectionInput } from "@/components";
import "../style.css";
export default {
  install: (app: App) => {
    app.component("DatePicker", DatePicker);
    app.component("TextInput", TextInput);
    app.component("SelectionInput", SelectionInput);
  },
};

export { DatePicker, TextInput, SelectionInput };
