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

// 保存所有企业个人信息
export const saveUserInfoAll = (data) => {
  return Interface.post("/Home/User/user_info_save_all",
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

// 获取轮播图 type 1 大图 2 小图
export const getBannerList = (data) => {
  return Interface.post("/Home/Index/banner_list",
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

// 学习天地列表
export const getStudyList = (data) => {
  return Interface.post("/Home/Index/study_list",
    data
  );
};

// 学习天地详情
export const getStudyInfo = (data) => {
  return Interface.post("/Home/Index/study_info",
    data
  );
};

// 上传文件
export const upload = (data) => {
  return Interface.post("/Home/Upload/upload",
    data
  );
};

// 学习天地提问保存
export const saveStudy = (data) => {
  return Interface.post("/Home/User/study_save",
    data
  );
};


// 视频列表
export const getVideoList = (data) => {
  return Interface.post("/Home/Index/video_list",
    data
  );
};