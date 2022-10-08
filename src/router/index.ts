import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index.vue";
import Layout from "../components/Layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "首页",
        component: Home,
      },
      {
        path: "/userlist",
        name: "关于协会-会员名单",
        redirect: "/association",
      },
      {
        path: "/associationProfile",
        name: "会员简介",
        redirect: "/association",
      },
      {
        path: "/associationArticles",
        name: "协会章程",
        redirect: "/association",
      },
      {
        path: "/associationLeader",
        name: "协会领导",
        redirect: "/association",
      },
      {
        path: "/associationOrganization",
        name: "组织机构",
        redirect: "/association",
      },
      {
        path: "/associationBusiness",
        name: "业务范围",
        redirect: "/association",
      },
      {
        path: "/associationsystem",
        name: "协会制度",
        redirect: "/association",
      },
      {
        path: "/associationContact",
        name: "联系我们",
        redirect: "/association",
      },
      {
        path: "/membershiplist",
        name: "会员名单",
        redirect: "/association",
      },
      {
        path: "/association",
        name: "关于协会",
        component: import(/* association */ "../views/Association/index.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
