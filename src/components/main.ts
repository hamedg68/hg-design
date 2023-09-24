import type { App } from "vue";
import { DatePicker, TextInput } from "@/components";
import '../style.css'
export default {
  install: (app: App) => {
    app.component("DatePicker", DatePicker);
    app.component("TextInput", TextInput);
  },
};

export { DatePicker, TextInput };
