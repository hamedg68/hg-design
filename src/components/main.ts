import type { App } from "vue";
import {
  TextInput,
  SelectionInput,
  CheckInput,
  FormItem,
  Marquee,
  DatePickerr,
} from "@/components";
import "../style.css";
export default {
  install: (app: App) => {
    app.component("DatePickerr", DatePickerr);
    app.component("TextInput", TextInput);
    app.component("SelectionInput", SelectionInput);
    app.component("CheckInput", CheckInput);
    app.component("FormItem", FormItem);
    app.component("Marquee", Marquee);
  },
};

export {
  DatePickerr,
  TextInput,
  Marquee,
  SelectionInput,
  FormItem,
  CheckInput,
};
