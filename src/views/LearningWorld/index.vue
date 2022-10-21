<template>
  <div class="learning-world">
    <div class="container">
      <div class="content">
        <div class="left">
          <Sidebar
            :dataSource="menuList"
            title="学习天地"
            subTitle="Learning World"
            :activeIndex="activeIndex"
            @sidebarclick="sidebarclick"
          ></Sidebar>
        </div>
        <div class="right">
          <div class="content-header">
            <div class="title">
              {{ menuList && menuList[activeIndex]?.name }}
            </div>
            <div class="breadcrumb">
              <span>您的当前位置：</span>
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/home' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>学习天地</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="content">
            <!-- 详情页 -->
            <div v-if="isShow" class="details">
              <div class="details-title">
                <span class="title">{{ currentItem?.title }}</span>
                <br />
                <span class="info">
                  <span class="info-item"
                    >提问企业：<span>{{ currentItem?.user_name }} </span>
                  </span>
                  <span class="info-item"
                    >提问时间：<span>
                      {{ currentItem?.time }}
                    </span></span
                  >
                </span>
              </div>
              <div class="details-content">
                <div class="sub-title">
                  <span>提问内容</span>
                </div>
                <p v-html="currentItem?.content"></p>
              </div>
              <div class="details-reply">
                <div class="sub-title">
                  <span>回复内容</span>
                </div>
                <p v-html="currentItem?.reply_info"></p>
              </div>
            </div>
            <!-- 提问 -->
            <div v-else-if="isAskQuestionsShow">
              <div class="ask-questionsShow">
                <el-form
                  ref="ruleFormRef"
                  class="form"
                  :model="form"
                  :rules="rules"
                  label-width="100px"
                >
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" />
                  </el-form-item>
                  <el-form-item label="详细内容" prop="content">
                    <div class="editor">
                      <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                      />
                      <Editor
                        style="height: 400px; overflow-y: hidden"
                        v-model="valueHtml"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="handleCreated"
                        @onChange="handleChange"
                      />
                    </div>
                  </el-form-item>
                  <el-form-item label=" ">
                    <el-button type="primary" @click="save(ruleFormRef)"
                      >发表提问</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 列表 -->
            <div v-else>
              <div class="tools">
                <div class="left" v-if="store.state.userInfo.uid">
                  <el-button type="primary" @click="showAskQuestions"
                    >提问</el-button
                  >
                  <el-button type="primary">我的提问</el-button>
                </div>
                <div class="right">
                  <span class="label">关键字：</span>
                  <el-input
                    class="input"
                    v-model="keyword"
                    placeholder="请输入关键字"
                  />
                  <el-button type="primary" @click="init">搜索</el-button>
                </div>
              </div>
              <div class="list">
                <div
                  v-if="list?.length"
                  class="item"
                  v-for="item in list"
                  @click="openDetails(item)"
                >
                  <!-- <img class="triangle" :src="triangleIcon" /> -->
                  <span class="top" v-if="item.is_top == '1'">顶</span>
                  <span class="hot" v-else-if="item.is_hot == '1'">热</span>
                  <span class="empty" v-else></span>
                  <span class="title">{{ item.title }}</span>
                  <span class="time">{{ item.time }}</span>
                </div>
                <el-empty v-else :image-size="150" description="暂无数据" />
              </div>
              <div v-if="total" class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="currentChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeUnmount,
  shallowRef,
  ref,
} from "vue";
import {
  getColumnOneList,
  getStudyList,
  getStudyInfo,
  saveStudy,
} from "@/api/index.js";
import { ElMessage } from "element-plus";
import Sidebar from "@/components/Sidebar/index.vue";
import triangleIcon from "assets/images/triangle_icon.png";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig } from "@wangeditor/editor";
import { getToken, removeToken, getUid, removeUid } from "@/utils/cookies.js";
import type {
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile,
} from "element-plus";

export default defineComponent({
  setup() {
    interface props {
      type?: any;
      menuList?: Array<any>;
      list?: Array<any>;
      keyword?: string;
      total?: any;
      page?: any;
      limit?: any;
      isShow?: boolean;
      isAskQuestionsShow?: boolean;
      currentItem: {
        title: string;
        user_name: string;
        time: string;
        content: any;
        reply_info: any;
      };
      form: { title: string; content: any };
    }
    let state: props = reactive({
      type: "0",
      menuList: [],
      list: [],
      keyword: "",
      total: 0,
      page: 1,
      limit: 10,
      isShow: false,
      isAskQuestionsShow: false,
      currentItem: {
        title: "",
        user_name: "",
        time: "",
        content: "",
        reply_info: "",
      },
      form: { title: "", content: "" },
    });

    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      title: [
        {
          required: true,
          message: "请输入标题",
          trigger: "blur",
        },
      ],
      content: [
        {
          required: true,
          message: "请输入详细内容",
          trigger: "blur",
        },
      ],
    });

    // 获取学习天地栏目
    getColumnOneList({ pid: 18 }).then((res: any) => {
      if (res.code == "0") {
        state.menuList = [...res.data];
      } else {
        ElMessage.error(res.msg);
      }
    });

    const activeIndex = computed(() => {
      let index = 0;
      state.menuList?.map((r, i) => {
        if (r.type == state.type) {
          index = i;
        }
      });
      return index;
    });

    const $route = useRoute();
    const $router = useRouter();
    watch(
      () => $route.query,
      (newQuery, oldQuery) => {
        if (newQuery?.type !== oldQuery?.type) {
          if ($route.query.type) {
            state.type = $route.query.type;
          }
        }
      },
      { immediate: true }
    );

    const sidebarclick = (item: any) => {
      state.type = item.type;
      $router.push({ query: ($route.query, { type: item.type }) });
      state.isShow = false;
      state.isAskQuestionsShow = false;
      state.keyword = "";
    };

    const studyListFn = async (type: any) => {
      const params = {
        type: type == "13" ? "1" : "2", // 1 法律解答 2 知识问答
        keyword: state.keyword,
        page: state.page,
        limit: state.limit,
      };
      return await getStudyList(params).then((res: any) => {
        if (res.code == "0") {
          return res;
        }
      });
    };

    const init = () => {
      studyListFn(state.type).then((res) => {
        state.list = res.data || [];
        state.total = Number(res.count);
      });
    };

    const currentChange = (page: any) => {
      state.page = page;
      init();
    };

    init(); // 获取数据

    watch(
      () => state.type,
      (type, prevType) => {
        if (type != prevType) {
          init();
        }
      }
    );

    const StudyInfo = (id: any) => {
      getStudyInfo({ id }).then((res: any) => {
        state.currentItem = res.data;
      });
    };

    const openDetails = (item: any) => {
      state.isShow = true;
      state.isAskQuestionsShow = false;
      StudyInfo(item.id);
    };

    // 显示提问页面
    const showAskQuestions = () => {
      state.isShow = false;
      state.isAskQuestionsShow = true;
    };

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    // 内容 HTML
    const valueHtml = ref("");
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        // 配置默认字号
        // 配置上传图片
        uploadImage: {
          // 请求路径
          server: "/Home/Upload/upload",
          // 后端接收的文件名称
          fieldName: "file",
          maxFileSize: 1 * 1024 * 1024, // 1M
          // 上传的图片类型
          allowedFileTypes: ["image/*"],
          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 1 * 1024, // 10MB
          customInsert(res: any, insertFn: any) {
            if (res.code != 0) {
              ElMessage.error("上传文件失败，" + res.message);
              return;
            }
            insertFn(
              res.data.file.path_url,
              res.data.file.name,
              res.data.file.path_url
            );
          },
          metaWithUrl: true,
          // 单个文件上传成功之后
          onSuccess(file: any, res: any) {
            if (res.code == 0) {
              ElMessage.success(`${file.name} 上传成功`);
              return;
            } else {
              ElMessage.warning(`${file.name} 上传出了点异常`);
              return;
            }
          },
          // 单个文件上传失败
          onFailed(file: any, res: any) {
            console.log(res);
            ElMessage.error(`${file.name} 上传失败`);
          },
          // 上传错误，或者触发 timeout 超时
          onError(file: any, err: any, res: any) {
            console.log(err, res);
            ElMessage.error(`${file.name} 上传出错`);
          },
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    const handleChange = (editor: any) => {
      if (!editor.isEmpty()) {
        valueHtml.value = editor.getHtml();
        state.form.content = editor.getHtml();
      } else {
        valueHtml.value = "";
        state.form.content = "";
      }
    };

    // 发布提问
    const save = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
            ...state.form,
            type: state.type == "13" ? "1" : "2", // 1 法律解答 2 知识问答
          };
          saveStudy(params).then((res: any) => {
            if (res.code == 0) {
              ElMessage({
                message: "发表提问成功！",
                type: "success",
              });
              state.isShow = false;
              state.isAskQuestionsShow = false;
            }
          });
        }
      });
    };

    return {
      ...toRefs(state),
      triangleIcon,
      store,
      rules,
      ruleFormRef,
      activeIndex,
      sidebarclick,
      init,
      currentChange,
      openDetails,
      showAskQuestions,
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      save,
    };
  },
  components: { Sidebar, Editor, Toolbar },
});
</script>
<style lang="less" scoped>
.learning-world {
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

        & > .content {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 30px 0;

          .tools {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 14px 20px;
            .el-button.el-button--primary {
              background-color: #19478b;
            }
            .left {
            }
            .right {
              display: flex;
              flex-direction: row;
              align-items: center;
              .label {
                width: 110px;
                font-size: 16px;
                font-weight: 600;
              }
              .input {
                margin-right: 14px;
              }
            }
          }
          .list {
            width: 100%;
            min-height: 300px;
            .item {
              width: 100%;
              height: 48px;
              display: flex;
              flex-direction: row;
              align-items: center;
              border-bottom: 1px solid #f4f4f4;
              cursor: pointer;
              .triangle {
                width: 14px;
                height: 14px;
                padding: 0 20px;
              }
              .top {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #fefefe;
                padding: 4px 6px;
                background-color: #0084ff;
                box-shadow: 0px 1px 1px 0px rgba(6, 0, 1, 0.5);
                border-radius: 2px;
                margin-left: 14px;
              }
              .hot {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #fefefe;
                padding: 4px 6px;
                background-color: #ff0000;
                box-shadow: 0px 1px 1px 0px rgba(6, 0, 1, 0.5);
                border-radius: 2px;
                margin-left: 14px;
              }
              .empty {
                width: 28px;
                margin-left: 14px;
              }
              .title {
                width: calc(100% - 194px);
                font-size: 14px;
                line-height: 40px;
                color: #000000;
                margin-left: 14px;
              }
              .time {
                width: 180px;
                font-size: 14px;
                line-height: 40px;
                color: #000000;
                text-align: right;
              }
            }
            .el-empty {
              margin-top: 60px;
            }
          }
          .pagination {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          .details {
            width: 100%;
            position: relative;
            padding: 0 20px;
            box-sizing: border-box;
            .details-title {
              text-align: center;
              .title {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 600;
                color: #000000;
                padding: 20px 0;
              }
              & > .info .info-item {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: normal;
                color: #000000;
                padding: 10px;
                font-weight: 500;
                span {
                  font-weight: normal;
                }
              }
            }
            .sub-title {
              width: 100%;
              line-height: 52px;
              display: block;
              position: relative;
              span {
                font-size: 14px;
                font-family: SimSun;
                font-weight: 600;
                color: #000000;
                line-height: 24px;
                background: #e7e7e7;
                display: inline-block;
                padding: 0 10px;
                position: relative;
              }
            }
            .sub-title::before {
              content: "";
              width: 100%;
              height: 1px;
              background: #e6e6e6;
              display: block;
              position: absolute;
              top: 26px;
              z-index: 0;
            }
            .info {
              font-size: 12px;
              line-height: 40px;
              color: #000000;
              font-weight: 400;
              padding: 20px;
            }
            .imgs {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              padding: 20px;
              box-sizing: border-box;
              flex-wrap: wrap;
              img {
                width: 30%;
                margin: 2% 1.5%;
              }
            }
          }

          .ask-questionsShow {
            .form {
              padding: 20px;
              .el-form-item {
                box-sizing: border-box;
                padding-top: 18px;
                display: flex;
                flex-direction: row;
              }
            }
            .editor {
              width: 100%;
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
}
</style>
