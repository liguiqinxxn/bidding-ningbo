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

// 获取所有企业个人信息
export const getUserInfoAll = (data) => {
  return Interface.post("/Home/User/user_info_all",
    data
  );
};

// 栏目列表
export const getColumnList = (data) => {
  return Interface.post("/Home/Index/column_list",
    data
  );
};

// 单个一级栏目下的子栏目
export const getColumnOneList = (data) => {
  return Interface.post("/Home/Index/column_one_list",
    data
  );
};

// 模块详情列表
export const getModelList = (data) => {
  return Interface.post("/Home/Index/model_list",
    data
  );
};

// 文章详情
export const getModelInfo = (data) => {
  return Interface.post("/Home/Index/model_info",
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
