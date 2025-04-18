import { createRouter, createRouterMatcher, createWebHashHistory, createWebHistory } from "vue-router";
import TrangChu from "../views/TrangChu.vue";
import DuAn from "../views/DuAn.vue";
import TienIch from "../views/TienIch.vue";
import LienHe from "../views/LienHe.vue";
import LyLich from "../views/LyLich.vue";

// Định nghĩa danh sách các tuyến đường
const routes = [
  {
    path: "/",
    name: 'TrangChu',
    component: TrangChu,
  },
  {
    path: "/du-an",
    name: 'DuAn',
    component: DuAn,
  },
  {
    path: "/tien-ich",
    name: 'TienIch',
    component: TienIch,
  },
  {
    path: "/ly-lich",
    name: 'LyLich',
    component: LyLich,
  },
  {
    path: "/lien-he",
    name: 'LienHe',
    component: LienHe,
  },
];

// Tạo và xuất một router Vue
export default createRouter({
  history: createWebHistory(),
  routes,
});
