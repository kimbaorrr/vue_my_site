import { createRouter, createWebHistory } from "vue-router";
import TrangChu from "../views/TrangChu.vue";
import DuAn from "../views/DuAn.vue";
import TienIch from "../views/TienIch.vue";
import LienHe from "../views/LienHe.vue";
import LyLich from "../views/LyLich.vue";

// Định nghĩa danh sách các tuyến đường
const routes = [
  {
    path: "/",
    component: TrangChu,
  },
  {
    path: "/du-an",
    component: DuAn,
  },
  {
    path: "/tien-ich",
    component: TienIch,
  },
  {
    path: "/ly-lich",
    component: LyLich,
  },
  {
    path: "/lien-he",
    component: LienHe,
  },
];

// Tạo và xuất một router Vue
export default createRouter({
  history: createWebHistory(),
  routes,
});
