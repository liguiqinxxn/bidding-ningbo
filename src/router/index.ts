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
        path: "/association",
        name: "关于协会",
        component: () => import(/* association */ "../views/Association/index.vue"),
      },

      {
        path: "/activityDynamics",
        name: "其他资讯",
        redirect: "/dynamics",
      },
      {
        path: "/workDynamics",
        name: "工作动态",
        redirect: "/dynamics",
      },
      {
        path: "/dynamics",
        name: "协会动态",
        component: () => import(/* dynamics */ "../views/Dynamics/index.vue"),
      },

      {
        path: "/membershiplist",
        name: "会员名单",
        component: () => import(/* membershiplist */ "../views/MemberShipList/index.vue"),
      },
      {
        path: "/memberdynamics",
        name: "会员动态",
        component: () => import(/* memberdynamics */ "../views/MemberDynamics/index.vue"),
      },

      {
        path: "/nationaRegulations",
        name: "国家法规",
        redirect: "/policiesRegulations",
      },
      {
        path: "/provincialRegulations",
        name: "省市法规",
        redirect: "/policiesRegulations",
      },
      {
        path: "/departmentRegulations",
        name: "部门规章制度",
        redirect: "/policiesRegulations",
      },
      {
        path: "/policiesRegulations",
        name: "政策法规",
        component: () => import(/* PoliciesRegulations */ "../views/PoliciesRegulations/index.vue"),
      },
      {
        path: "/legalInterpretation",
        name: "法律解读",
        redirect: "/learningWorld",
      },
      {
        path: "/knowledgeQA",
        name: "知识问答",
        redirect: "/learningWorld",
      },
      {
        path: "/learningWorld",
        name: "学习天地",
        component: () => import(/* learningWorld */ "../views/LearningWorld/index.vue"),
      },
      {
        path: "/disciplineConvention",
        name: "自律公约",
        redirect: "/integritySelfDiscipline",
      },
      {
        path: "/excellenceCommendation",
        name: "优秀表彰",
        redirect: "/integritySelfDiscipline",
      },
      {
        path: "/integritySelfDiscipline",
        name: "诚信自律",
        component: () => import(/* IntegritySelfDiscipline */ "../views/IntegritySelfDiscipline/index.vue"),
      },

      {
        path: "/nbProceedings",
        name: "宁波招标投标",
        redirect: "/proceedings",
      },
      {
        path: "/countryProceedings",
        name: "中国招标投标",
        redirect: "/proceedings",
      },
      {
        path: "/proceedings",
        name: "电子会刊",
        component: () => import(/* PoliciesRegulations */ "../views/Proceedings/index.vue"),
      },

      {
        path: "/memberNotice",
        name: "入会须知",
        redirect: "/member",
      },
      {
        path: "/memberStandard",
        name: "入会标准",
        redirect: "/member",
      },
      {
        path: "/memberFee",
        name: "会费标准",
        redirect: "/member",
      },
      {
        path: "/member",
        name: "会员之家",
        component: () => import(/* Member */ "../views/Member/index.vue"),
      },
      {
        path: "/personalCenter",
        name: "个人中心",
        component: () => import(/* personalCenter */ "../views/PersonalCenter/index.vue"),
      },
      {
        path: "/managementMeasures",
        name: "管理办法",
        redirect: "/consultantExpert",
      },
      {
        path: "/expertsList",
        name: "专家名单",
        redirect: "/consultantExpert",
      },
      {
        path: "/consultantExpert",
        name: "咨询专家",
        component: () => import(/* consultantExpert */ "../views/ConsultantExpert/index.vue"),
      },
      {
        path: "/trainingVideos",
        name: "培训视频",
        component: () => import(/* trainingVideos */ "../views/TrainingVideos/index.vue"),
      },
      {
        path: "/transactionData",
        name: "招投标交易数据",
        component: () => import(/* trainingVideos */ "../views/TransactionData/index.vue"),
      },
      {
        path: "/announcements",
        name: "通知公告",
        component: () => import(/* announcements */ "../views/Announcements/index.vue"),
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
