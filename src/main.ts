// Styles
import "./SCSS/site-layout.SCSS";

// Libraries
import { createApp } from "vue";

// VueX Store
import { UseStore } from "./StoreManagement/SimpleDefaultStore";

// Modules
import App from "./Pages/app.vue";

// Mount Module
createApp(App)
    .use(UseStore())
    .mount("#app");