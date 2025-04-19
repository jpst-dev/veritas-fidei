import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Import icons
import {
  AcademicCapIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  GiftIcon,
  HeartIcon,
  MoonIcon,
  ScaleIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";

const app = createApp(App);

// Register icons globally
app.component("AcademicCapIcon", AcademicCapIcon);
app.component("BookOpenIcon", BookOpenIcon);
app.component("ChurchIcon", BuildingOffice2Icon);
app.component("GiftIcon", GiftIcon);
app.component("HeartIcon", HeartIcon);
app.component("MoonIcon", MoonIcon);
app.component("ScaleIcon", ScaleIcon);
app.component("SunIcon", SunIcon);
app.component("UserGroupIcon", UserGroupIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
