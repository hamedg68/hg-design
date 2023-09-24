import type { App } from "vue";
import { DatePicker, TextInput } from "@/components";

export default {
  install: (app: App) => {
    app.component("DatePicker", DatePicker);
    app.component("TextInput", TextInput);
  },
};

export { DatePicker, TextInput };
