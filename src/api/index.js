import { Interface } from "@/request/index.js"

// 登录
export const getLogin = (data) => {
    return Interface.post("/Home/Login/login",
        data
    );
};
// 栏目列表
export const getColumnList = (data) => {
    return Interface.post("/Home/Index/column_list",
        data
    );
};
