import axios from "axios";
import { ElMessage } from "element-plus";

const Interface = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_REQUEST_URL : process.env.VUE_APP_BASE_API, // baseURL这里单词要特别注意一下
  timeout: 30000,
});
// 调用接口的拦截器进行一些处理
Interface.interceptors.request.use((config) => {
  //如果token存在
  // if (localStorage.getItem("token")) {
  //   config.headers["Authorization"] = localStorage.getItem("token")
  // }
  return config;
});
//获取后端给我们的数据做一个响应后拦截操作
Interface.interceptors.response.use((res) => {
  if (res.status == 200) {
    if (res.data.code == 0) {
      return res.data;
    } else {
      ElMessage.error(res.data.msg);
      return res.data;
    }
  } else {
    return Promise.reject("出错了....");
  }
});
export { Interface };
