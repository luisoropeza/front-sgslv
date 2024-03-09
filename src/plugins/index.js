/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/store";
import router from "@/router";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(setupCalendar, {})
    .component("Calendar", Calendar)
    .component("DatePicker", DatePicker);
}
