import { Interface } from "@/request/index.js"

// 登录
export const getLogin = (data) => {
  return Interface.post("/Home/Login/login",
    data
  );
};

// 退出登录
export const getLogout = (data) => {
  return Interface.post("/Home/Login/logout",
    data
  );
};


// 获取个人中心详情
export const getUser = (data) => {
  return Interface.post("/Home/User/user",
    data
  );
};

// 获取企业信息
export const getUserInfo = (data) => {
  return Interface.post("/Home/User/user_info",
    data
  );
};

// 栏目列表
export const getColumnList = (data) => {
  return Interface.post("/Home/Index/column_list",
    data
  );
};

// 模块详情列表
export const getModelList = (data) => {
  return Interface.post("/Home/Index/model_list",
    data
  );
};

// 会员名单
export const getMemberList = (data) => {
  return Interface.post("/Home/Index/member_list",
    data
  );
};

// 友情链接
export const getLinksList = (data) => {
  return Interface.post("/Home/Index/links_list",
    data
  );
};
