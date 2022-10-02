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
        component: import(/* userlist */ "../views/Association/index.vue"),
      },
      {
        path: "/associationProfile",
        name: "会员简介",
        component: import(
          /* associationProfile */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationArticles",
        name: "协会章程",
        component: import(
          /* associationArticles */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationLeader",
        name: "协会领导",
        component: import(
          /* associationLeader */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationOrganization",
        name: "组织机构",
        component: import(
          /* associationOrganization */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationsystem",
        name: "业务范围",
        component: import(
          /* associationsystem */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationsystem",
        name: "协会制度",
        component: import(
          /* associationsystem */ "../views/Association/index.vue"
        ),
      },
      {
        path: "/associationContact",
        name: "联系我们",
        component: import(
          /* associationContact */ "../views/Association/index.vue"
        ),
      },

      {
        path: "/membershiplist",
        name: "会员名单",
        component: import(
          /* membershiplist */ "../views/MemberShipList/index.vue"
        ),
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
