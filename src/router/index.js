import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CompraVenta from "../views/CompraVenta.vue";
import HistorialDeMovimientos from "../views/HistorialDeMovimientos.vue";
import MiEstado from "../views/MiEstado.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/CompraVenta",
    name: "CompraVenta",
    component: CompraVenta,
  },
  {
    path: "/HistorialDeMovimientos",
    name: "HistorialDeMovimientos",
    component: HistorialDeMovimientos,
  },
  {
    path: "/MiEstado",
    name: "MiEstado",
    component: MiEstado,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
