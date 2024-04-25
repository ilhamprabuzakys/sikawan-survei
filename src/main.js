import "./assets/base.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";


import axios from "axios";
import { surveyPlugin } from 'survey-vue3-ui'
import vSelect from 'vue-select'

import App from "./App.vue";
import router from "./router";

import 'vue-select/dist/vue-select.css';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

app.use(createPinia());
app.use(surveyPlugin);
app.use(router);
app.component('v-select', vSelect)

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
