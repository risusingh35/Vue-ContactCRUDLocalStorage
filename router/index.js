import { createWebHistory, createRouter } from "vue-router";
import AddUpdate from "../src/components/contact/AddUpdate.vue";
import ListContacts from "../src/components/contact/ListContacts.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: ListContacts,

  },
  {
    path: "/addupdate",
    name: "AddUpdate",
    component: AddUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;