import type { App } from "vue";
import {
  DatePicker,
  TextInput,
  SelectionInput,
  CheckInput,
  FormItem,
  Marquee,
} from "@/components";
import "../style.css";
export default {
  install: (app: App) => {
    app.component("DatePicker", DatePicker);
    app.component("TextInput", TextInput);
    app.component("SelectionInput", SelectionInput);
    app.component("CheckInput", CheckInput);
    app.component("FormItem", FormItem);
    app.component("Marquee", Marquee);
  },
};

export { DatePicker, TextInput, Marquee, SelectionInput, FormItem, CheckInput };
