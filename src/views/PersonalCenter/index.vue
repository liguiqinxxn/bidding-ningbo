<template>
  <div class="personal-center">
    <div class="container">
      <div class="content">
        <div class="left">
          <div class="personal-info">
            <div class="titles">
              <span class="title">个人中心</span>
              <span class="subTitle">Personal Center</span>
            </div>
            <div class="info">
              <div class="logo">
                <img :src="userInfo?.logo" />
              </div>
              <div class="name">{{ userInfo.name }}</div>
              <div class="level">{{ levelName }}</div>
              <div
                class="invoiceInfo"
                @click="InvoiceInfo"
              >
                【发票信息】
              </div>
              <div
                class="changePassword"
                @click="openPassword(rulePasswordFormRef)"
              >
                【修改密码】
              </div>
              <div
                class="logout"
                @click="logout"
              >
                【退出】
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="content-header">
            <div class="title">申请资料填写</div>
            <div class="breadcrumb">
              <span>您的当前位置：</span>
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="content">
            <el-form
              ref="ruleFormRef"
              class="form"
              :inline="true"
              :model="userInfo"
              :rules="rules"
              label-position="right"
              label-width="180px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="法定代表人"
                    prop="legal_person_name"
                  >
                    <el-input
                      v-model="userInfo.legal_person_name"
                      placeholder="法定代表人"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label=" "
                    label-width="50px"
                  >
                    <el-input
                      v-model="userInfo.legal_person_tel"
                      placeholder="电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="主管负责人"
                    prop="person_charge_name"
                  >
                    <el-input
                      v-model="userInfo.person_charge_name"
                      placeholder="主管负责人"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label=" "
                    label-width="50px"
                  >
                    <el-input
                      v-model="userInfo.person_charge_tel"
                      placeholder="电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="联系人"
                    prop="contacts_name"
                  >
                    <el-input
                      v-model="userInfo.contacts_name"
                      placeholder="联系人"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label=" "
                    label-width="50px"
                  >
                    <el-input
                      v-model="userInfo.contacts_tel"
                      placeholder="电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label=" ">
                    <el-input
                      v-model="userInfo.website"
                      placeholder="网址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label=" "
                    label-width="50px"
                  >
                    <el-input
                      v-model="userInfo.email"
                      placeholder="邮箱"
                    />
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="注册所在区域">
                    <el-select v-model="userInfo.region" placeholder="请选择">
                      <el-option label="Zone one" value="shanghai" />
                      <el-option label="Zone two" value="beijing" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label=" " label-width="50px">
                    <el-select v-model="userInfo.region" placeholder="请选择">
                      <el-option label="Zone one" value="shanghai" />
                      <el-option label="Zone two" value="beijing" />
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="24">
                  <h4 class="billing-info">开票信息：</h4>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="统一社会信用代码"
                    prop="duty_paragraph"
                  >
                    <el-input
                      v-model="userInfo.duty_paragraph"
                      placeholder="统一社会信用代码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="开户银行"
                    prop="bank"
                  >
                    <el-input
                      v-model="userInfo.bank"
                      placeholder="名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="开户银行账号"
                    prop="bank_number"
                  >
                    <el-input
                      v-model="userInfo.bank_number"
                      placeholder="账号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="联系电话"
                    prop="landline"
                  >
                    <el-input
                      v-model="userInfo.landline"
                      placeholder="电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="注册地址"
                    prop="area_info"
                  >
                    <el-input
                      v-model="userInfo.area_info"
                      placeholder="请输入营业执照上营业上的注册地址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="邮寄地址"
                    prop="mailing_area"
                  >
                    <el-input
                      v-model="userInfo.mailing_area"
                      placeholder="请输入省市区详细收件地址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="公司logo"
                    prop="logo"
                  >
                    <el-upload
                      class="avatar-uploader"
                      action="/Home/Upload/upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="userInfo.logo"
                        :src="userInfo.logo"
                        class="avatar"
                      />
                      <el-icon
                        v-else
                        class="avatar-uploader-icon"
                        ><Plus
                      /></el-icon>
                    </el-upload>
                    <p class="tips">请上传图片，每张最大500k</p>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="团队风采"
                    prop="team_style_arr"
                  >
                    <el-upload
                      :file-list="team_style_arr"
                      list-type="picture-card"
                      action="/Home/Upload/upload"
                      :on-preview="handlePictureCardPreview"
                      :on-success="handleTeamSuccess"
                      :on-remove="handleRemove"
                      :before-upload="beforeTeamUpload"
                    >
                      <el-icon><Plus /></el-icon>
                    </el-upload>
                    <p class="tips">请上传图片，每张最大500k</p>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="荣誉资质"
                    prop="honors_qualifications_arr"
                  >
                    <el-upload
                      :file-list="honors_qualifications_arr"
                      list-type="picture-card"
                      action="/Home/Upload/upload"
                      :on-preview="handlePictureCardPreview"
                      :on-success="handleHonorsSuccess"
                      :on-remove="handleRemove"
                      :before-upload="beforeHonorsUpload"
                    >
                      <el-icon><Plus /></el-icon>
                    </el-upload>
                    <p class="tips">请上传图片，每张最大500k</p>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="企业简介"
                    prop="info"
                  >
                    <el-input
                      v-model="userInfo.info"
                      type="textarea"
                      :rows="6"
                      maxlength="1000"
                      show-word-limit
                      placeholder="请输入企业简介"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="业务范围"
                    prop="business"
                  >
                    <el-input
                      v-model="userInfo.business"
                      type="textarea"
                      :rows="6"
                      maxlength="1000"
                      show-word-limit
                      placeholder="请输入业务范围"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label=" ">
                    <el-button
                      type="primary"
                      @click="save(ruleFormRef)"
                      >保存草稿</el-button
                    >
                    <el-button
                      type="primary"
                      @click="submit(ruleFormRef)"
                      >提交审核</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 图片查看弹窗 -->
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
        />
      </el-dialog>

      <!-- 修改密码 -->
      <el-dialog
        v-model="dialogPasswordVisible"
        title="修改密码"
        width="30%"
        top="30vh"
        :close-on-click-modal="false"
        :before-close="handlePasswordClose"
      >
        <el-form
          :model="form"
          label-width="80px"
          ref="rulePasswordFormRef"
          :rules="passwordRules"
        >
          <el-form-item
            label="旧密码"
            prop="password"
          >
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="new_password"
          >
            <el-input
              type="password"
              v-model="form.new_password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirm_password"
          >
            <el-input
              type="password"
              v-model="form.confirm_password"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handlePasswordClose">取消</el-button>
            <el-button
              type="primary"
              @click="savePassword(rulePasswordFormRef)"
            >
              保存
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted, ref } from "vue";
import {
  userInvoiceInfo,
  updateUserPassword,
  getLogout,
  getUserInfoAll,
  saveUserInfoAll,
  userInfoExamine,
} from "@/api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/store";
import { getToken, removeToken, getUid, removeUid } from "@/utils/cookies.js";
import router from "@/router";
import type { FormInstance, FormRules, UploadProps, UploadUserFile, Action } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    interface props {
      userInfo: {
        name: string;
        logo: string;
        level: string;
        legal_person_name: string;
        legal_person_tel: string;
        person_charge_name: string;
        person_charge_tel: string;
        contacts_name: string;
        contacts_tel: string;
        website: string;
        email: string;
        duty_paragraph: string;
        bank: string;
        bank_number: string;
        landline: string;
        area_info: string;
        mailing_area: string;
        team_style: string;
        honors_qualifications: string;
        info: string;
        business: string;
      };
      form: {
        password: string;
        new_password: string;
        confirm_password: string;
      };
    }
    let state: props = reactive({
      userInfo: {
        name: "",
        logo: "",
        level: "",
        legal_person_name: "",
        legal_person_tel: "",
        person_charge_name: "",
        person_charge_tel: "",
        contacts_name: "",
        contacts_tel: "",
        website: "",
        email: "",
        duty_paragraph: "",
        bank: "",
        bank_number: "",
        landline: "",
        area_info: "",
        mailing_area: "",
        team_style: "",
        honors_qualifications: "",
        info: "",
        business: "",
      },
      form: {
        password: "",
        new_password: "",
        confirm_password: "",
      },
    });
    const ruleFormRef = ref<FormInstance>();
    const levels = [
      { name: "常务理事", level: "3" },
      { name: "理事单位", level: "2" },
      { name: "会员单位", level: "1" },
    ];

    const rules = reactive<FormRules>({
      legal_person_name: [
        {
          required: true,
          message: "请输入法定代表人",
          trigger: "blur",
        },
      ],
      person_charge_name: [
        {
          required: true,
          message: "请输入主管负责人",
          trigger: "blur",
        },
      ],
      contacts_name: [
        {
          required: true,
          message: "请输入联系人",
          trigger: "blur",
        },
      ],
      duty_paragraph: [
        {
          required: true,
          message: "请输入统一社会信用代码",
          trigger: "blur",
        },
      ],
      bank: [
        {
          required: true,
          message: "请输入开户银行",
          trigger: "blur",
        },
      ],
      bank_number: [
        {
          required: true,
          message: "请输入开户银行账号",
          trigger: "blur",
        },
      ],
      landline: [
        {
          required: true,
          message: "请输入联系电话",
          trigger: "blur",
        },
      ],
      area_info: [
        {
          required: true,
          message: "请输入注册地址",
          trigger: "blur",
        },
      ],
      mailing_area: [
        {
          required: true,
          message: "请输入邮寄地址",
          trigger: "blur",
        },
      ],
      logo: [
        {
          required: true,
          message: "请上传公司logo",
          trigger: "change",
        },
      ],
      info: [
        {
          required: true,
          message: "请输入企业简介",
          trigger: "blur",
        },
      ],
      business: [
        {
          required: true,
          message: "请输入业务范围",
          trigger: "blur",
        },
      ],
    });

    const levelName = computed(() => {
      let name = "";
      levels.map((r) => {
        if (r.level == state.userInfo.level) {
          name = r.name;
        }
      });
      return name;
    });

    const team_style_arr = ref<UploadUserFile[]>([]);
    const honors_qualifications_arr = ref<UploadUserFile[]>([]);

    onMounted(() => {
      if (getToken() && getUid()) {
        const params = {
          uid: parseInt(getUid()),
          tokenid: getToken(),
        };
        userInfoAll(params);
      } else {
        router.push({ path: "home" });
      }
    });

    // 获取个人信息
    const userInfoAll = (params: any) => {
      getUserInfoAll(params).then((res: any) => {
        if (res.code == "0") {
          const userInfo = {
            ...res.data.user,
            ...res.data.user_info,
            ...res.data.user_mailing_info,
          };
          team_style_arr.value =
            userInfo.team_style?.split(";").map((r: any, index: Number) => {
              return {
                name: "name" + index,
                url: r,
              };
            }) || [];
          honors_qualifications_arr.value =
            userInfo.honors_qualifications?.split(";").map((r: any, index: Number) => {
              return {
                name: "name" + index,
                url: r,
              };
            }) || [];
          store.commit("setUserInfo", userInfo);
          state.userInfo = userInfo;
        } else {
          removeToken();
          removeUid();
        }
      });
    };

    // 发票信息
    const open = (content: string) => {
      ElMessageBox.alert(content, "发票信息", {
        confirmButtonText: "确认",
      });
    };
    const InvoiceInfo = () => {
      const params = {
        uid: getUid(),
        tokenid: getToken(),
      };
      userInvoiceInfo(params).then((res: any) => {
        if (res.code == "0") {
          open(res.data.invoice_info);
        }
      });
    };

    // 修改密码
    const rulePasswordFormRef = ref<FormInstance>();
    const dialogPasswordVisible = ref(false);
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (state.form.confirm_password !== "") {
          if (!rulePasswordFormRef.value) return;
          rulePasswordFormRef.value.validateField("confirm_password", () => null);
        }
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== state.form.new_password) {
        callback(new Error("密码不一致！"));
      } else {
        callback();
      }
    };
    const passwordRules = reactive<FormRules>({
      password: [
        {
          required: true,
          message: "请输入旧密码",
          trigger: "blur",
        },
      ],
      new_password: [
        {
          required: true,
          message: "请输入新密码",
          trigger: "blur",
        },
        { validator: validatePass, trigger: "blur" },
      ],
      confirm_password: [
        {
          required: true,
          message: "请再次输入新密码",
          trigger: "blur",
        },
        { validator: validatePass2, trigger: "blur" },
      ],
    });
    const openPassword = (formEl: FormInstance | undefined) => {
      dialogPasswordVisible.value = true;
      if (!formEl) return;
      formEl?.resetFields();
    };
    const handlePasswordClose = () => {
      dialogPasswordVisible.value = false;
    };
    const savePassword = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
            password: state.form.password,
            new_password: state.form.new_password,
          };
          updateUserPassword(params).then((res: any) => {
            if (res.code == "0") {
              ElMessage({
                message: "修改成功！",
                type: "success",
              });
              handlePasswordClose();
            }
          });
        }
      });
    };

    // 退出
    const logout = () => {
      ElMessageBox.confirm("请确认退出？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
          };
          getLogout(params).then((res: any) => {
            if (res.code == "0") {
              ElMessage({
                message: "退出成功！",
                type: "success",
              });
              removeToken();
              removeUid();
              store.commit("setUserInfo", {});
              store.commit("setUserInfoAll", {});
              router.push({ path: "home" });
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消",
          });
        });
    };

    // 头像logo上传成功
    const handleAvatarSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
      if (res.code == 0) {
        state.userInfo.logo = res.data.file.path_url;
      }
    };

    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
      // if (rawFile.type !== "image/jpeg") {
      //   ElMessage.error("Avatar picture must be JPG format!");
      //   return false;
      // } else
      if (rawFile.size / 1024 > 500) {
        ElMessage.error("每张图片不超过500k!");
        return false;
      }
      return true;
    };

    // 团队风采上传成功
    const handleTeamSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
      if (res.code == 0) {
        team_style_arr.value.push({
          name: res.data.file.name,
          url: res.data.file.path_url,
        });
      }
    };

    const beforeTeamUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (rawFile.size / 1024 > 500) {
        ElMessage.error("每张图片不超过500k!");
        return false;
      }
      return true;
    };

    // 荣誉资质上传成功
    const handleHonorsSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
      if (res.code == 0) {
        honors_qualifications_arr.value.push({
          name: res.data.file.name,
          url: res.data.file.path_url,
        });
      }
    };

    const beforeHonorsUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (rawFile.size / 1024 > 500) {
        ElMessage.error("每张图片不超过500k!");
        return false;
      }
      return true;
    };

    // 删除图片
    const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles);
    };

    // 图片预览
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url!;
      dialogVisible.value = true;
    };

    // 保存
    const save = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
            ...state.userInfo,
            team_style: team_style_arr.value?.map((r) => r.url).join(";") || null,
            honors_qualifications: honors_qualifications_arr.value?.map((r) => r.url).join(";") || null,
          };
          saveUserInfoAll(params).then((res: any) => {
            if (res.code == "0") {
              ElMessage({
                message: "保存成功！",
                type: "success",
              });
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          });
        }
      });
    };

    // 提交
    const submit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
            ...state.userInfo,
            team_style: team_style_arr.value?.map((r) => r.url).join(";") || null,
            honors_qualifications: honors_qualifications_arr.value?.map((r) => r.url).join(";") || null,
          };
          userInfoExamine(params).then((res: any) => {
            if (res.code == "0") {
              ElMessage({
                message: "提交成功！",
                type: "success",
              });
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          });
        }
      });
    };

    return {
      ...toRefs(state),
      Plus,
      levelName,
      rules,
      ruleFormRef,
      dialogImageUrl,
      dialogVisible,
      team_style_arr,
      honors_qualifications_arr,
      InvoiceInfo,
      rulePasswordFormRef,
      dialogPasswordVisible,
      passwordRules,
      openPassword,
      handlePasswordClose,
      savePassword,
      logout,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleTeamSuccess,
      beforeTeamUpload,
      handleHonorsSuccess,
      beforeHonorsUpload,
      handleRemove,
      handlePictureCardPreview,
      save,
      submit,
    };
  },
  components: { Plus },
});
</script>
<style lang="less" scoped>
.personal-center {
  width: 100%;
  height: auto;
  background: #fff;
  box-sizing: border-box;
  .container {
    width: 100%;
    max-width: 1440px;
    height: auto;
    margin: 0 auto;
    padding: 30px 16px;
    box-sizing: border-box;
    & > .content {
      display: flex;
      flex-direction: row;
      height: auto;
      & > .left {
        width: 320px;
        height: auto;
        .personal-info {
          min-height: 800px;
          border: 1px solid #e3e2e2;
          box-shadow: 0px 4px 10px 0px rgba(4, 0, 0, 0.05);
          border-radius: 12px 12px 0 0;
          .titles {
            width: 100%;
            height: 70px;
            border-radius: 12px 12px 0 0;
            background-color: #19478b;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;

            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-shadow: 0px 2px 2px rgba(4, 0, 0, 0.75);
            position: relative;
            .title {
              font-size: 30px;
              line-height: 40px;
              letter-spacing: 8px;
              position: relative;
              z-index: 10;
            }
            .subTitle {
              font-size: 18px;
              line-height: 26px;
              letter-spacing: 2px;
              position: relative;
              z-index: 10;
            }
          }
          .titles::after {
            content: "";
            width: 100%;
            height: 70px;
            background-image: url(../../assets/images/title_bg.png);
            background-size: 100% 100%;
            opacity: 0.5;
            position: absolute;
            z-index: 9;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e7e7e7;
            .logo {
              padding: 30px 0;
              img {
                width: 68px;
                height: 68px;
                border-radius: 50%;
              }
            }
            .name,
            .level,
            .invoiceInfo,
            .changePassword,
            .logout {
              font-size: 16px;
              font-family: SimSun;
              font-weight: 400;
              color: #000000;
              line-height: 52px;
            }

            .invoiceInfo,
            .changePassword,
            .logout {
              cursor: pointer;
            }
          }
        }
      }
      & > .right {
        width: calc(100% - 320px);
        padding: 0 20px;
        box-sizing: border-box;
        position: relative;
        .content-header {
          width: 100%;
          height: 52px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .title {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            line-height: 50px;
            padding: 0 6px;
          }
          .breadcrumb {
            font-size: 16px;
            font-family: SimSun;
            font-weight: 400;
            color: #010101;
            line-height: 50px;
            .el-breadcrumb {
              display: inline-block;
            }
          }
        }
        .content-header::after {
          content: "";
          width: 254px;
          height: 5px;
          background: url(../../assets/images/title_line.png) no-repeat;
          background-size: auto;
          position: absolute;
          left: 6px;
          bottom: -3px;
        }

        .content {
          .form {
            padding: 20px;
            .el-form-item {
              box-sizing: border-box;
              padding-top: 18px;
              display: flex;
              flex-direction: row;
            }
            :deep(.el-form-item__content) {
              min-width: 300px;
              width: 100%;
            }
            .el-select {
              width: 100%;
            }
          }
          .billing-info {
            width: 180px;
            text-align: right;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
          }

          .avatar-uploader .avatar {
            width: 148px;
            height: 148px;
            display: block;
          }
          .tips {
            position: absolute;
            bottom: -32px;
          }
        }
      }
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  text-align: center;
}

.el-dialog__body img {
  width: 100%;
  height: auto;
}
</style>
