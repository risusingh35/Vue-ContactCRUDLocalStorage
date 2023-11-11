import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index'
// import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash,faPenSquare,faSquarePen } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash,faPenSquare,faSquarePen);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')
