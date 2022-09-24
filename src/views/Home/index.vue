<template>
  <div class="home">
    <div class="container">
      <div class="content">
        <div class="left">
          <div
            class="box"
            style="width: 50%;"
          >
            <el-carousel
              height="400px"
              arrow="never"
            >
              <!-- indicator-position="outside" -->
              <el-carousel-item
                v-for="item in imgs"
                :key="item"
              > <img
                  class="carousel-img"
                  :src="item"
                  alt="image"
                />
                <p class="title">协会荣获示范单位称号</p>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="box">
            <div class="sub-title">会员风采</div>
            <div class="members">
              <div class="member"> <span class="title">常务理事</span> <span class="more">更多&gt;&gt;</span> </div>
              <div class="member"> <span class="title">理事单位</span> <span class="more">更多&gt;&gt;</span> </div>
              <div class="member"> <span class="title">会员单位</span> <span class="more">更多&gt;&gt;</span> </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <div class="sub-title">会员登录</div>
            <div v-if="$store.state.userInfo.uid" class="user-info">
              <span class="level">{{ level[Number($store.state.userInfo.level)-1 || 0] }}</span>
              <img class="logo" :src="$store.state.userInfo.logo" />
              <p class="info">{{$store.state.userInfo.info}}</p>
              <p class="info_link"><span>【个人中心】</span>/<span>【退出】</span></p>
            </div>
            <el-form
              :model="form"
              label-width="0px"
              v-else
            >
              <el-form-item label="">
                <el-input
                  v-model="form.username"
                  placeholder="请输入账号"
                  :prefix-icon="Iphone"
                />
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  :prefix-icon="Lock"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="login"
                >登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="info">
            <div class="info-item membership-application"> <span class="title">入会申请</span> <span>Membership
                Application</span> </div>
            <div class="info-item tenderee-column"> <span class="title">招标师专栏</span> <span>Tenderee column</span> </div>
            <div class="info-item laws-regulations"> <span class="title">招标采购常用法规速查</span> <span>Quick check of common
                laws and <br /> regulations for bidding procurement</span> </div>
            <div class="info-item recruitment-info"> <span class="title">招聘信息</span> <span>Recruitment
                information</span> </div>
            <div class="info-item complaint-supervision"> <span class="title">投诉监督</span> <span>Complaint
                supervision</span> </div>
            <div class="info-item contact-us"> <span class="title">联系我们</span> <span>Contact us</span>
              <div class="contact"> <span>办公室： 0574-87187928</span> <span>会员部： 0574-87187122</span> <span>信息部：
                  0574-87187759</span> <span>邮&nbsp;&nbsp;&nbsp;编： 315040</span> <span>传&nbsp;&nbsp;&nbsp;真：
                  0574-87187123</span> <span>邮&nbsp;&nbsp;&nbsp;箱： nbztbxh@sina.com</span> </div>
            </div>
          </div>
        </div>
      </div>
      <div class="links">
        <div class="box">
          <div class="sub-title">友情链接</div> <img :src="linkImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted} from 'vue'
import { useStore } from 'vuex' 
import _store from '@/store'
import { getLogin, getUserInfo} from "@/api/index.js"
import linkImg from "assets/images/links.png"
import honor from "assets/images/honor.png"
import { Iphone, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { setToken, getToken, setUid, getUid } from '@/utils/cookies.js'

export default defineComponent({
  setup() {
    let state = reactive({
      form: {
        username: '',
        password: '',
      },
      imgs: [honor, honor, honor],
      level: ['会员单位' ,'理事单位', '常务理事']
    })

    onMounted(() => {
      if(getToken() && getUid() ){
        const params = {
          uid: parseInt(getUid()),
          tokenid: getToken()
        }
        userInfo(params)
      }
    })
    const login = () => {
      getLogin(state.form).then((res: any) => {
        if (res.code == '0') {
          ElMessage({
            message: '登录成功！',
            type: 'success',
          })
          setToken(res.data.tokenid)
          setUid(res.data.uid)
          userInfo(res.data)
        }
      })
    }

    const userInfo = (data:any) =>{
      getUserInfo(data).then((res:any)=>{
        if(res.code == '0'){
          const store = useStore() || _store;
          store.commit('setUserInfo', res.data)
        }
      })
    }
    return { ...toRefs(state), linkImg, Iphone, Lock, login, }
  }
})
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  background: #fff;
  box-sizing: border-box;

  .container {
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 30px 16px;
    box-sizing: border-box;

    .content {
      display: flex;
      flex-direction: row;

      .left {
        width: calc(100% - 332px);
        padding: 0 16px;
        height: 100px;

        .el-carousel {
          .carousel-img {
            width: 100%;
            height: 90%;
            padding-right: 20px;
          }

          .title {
            width: calc(100% - 38px);
            position: absolute;
            bottom: -10px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            background-color: #19478b;
            line-height: 36px;
            padding-bottom: 30px;
            margin-left: 36px;
          }

          .el-carousel__indicators {
            background: transparent;
          }

          /deep/ .el-carousel__button {
            width: 5px;
            height: 5px;
          }

          /deep/ .is-active .el-carousel__button {
            width: 10px;
            height: 10px;
          }
        }

        .members {
          background-image: url('../../assets/images/member_bg.png');
          background-size: 100% 100%;

          .member {
            border-bottom: 2px solid #c6c6c6;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;

            .title {
              font-size: 19px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #5C5C5C;
              line-height: 98px;
              display: flex;
              flex-direction: row;
              align-items: flex-end;
              margin-left: 40px;
            }

            .more {
              font-size: 16px;
              font-family: SimSun;
              font-weight: 400;
              color: #5C5C5C;
              line-height: 42px;
            }
          }

          .member:nth-child(1) {
            .title::after {
              content: '';
              width: 800px;
              height: 98px;
              display: inline-block;
              background-image: url('../../assets/images/member_icons.png');
              background-position: 60px 10px;
              background-repeat: no-repeat;
            }
          }

          .member:nth-child(2) {
            .title::after {
              content: '';
              width: 800px;
              height: 98px;
              display: inline-block;
              background-image: url('../../assets/images/member_icons.png');
              background-position: 60px -76px;
              background-repeat: no-repeat;
            }
          }

          .member:nth-child(3) {
            .title::after {
              content: '';
              width: 800px;
              height: 98px;
              display: inline-block;
              background-image: url('../../assets/images/member_icons.png');
              background-position: 60px -162px;
              background-repeat: no-repeat;
            }
          }
        }
      }

      .right {
        width: 332px;
        padding: 0 16px;
        box-sizing: border-box;

        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .level{
            width: 100%;
            height: 54px;
            color: #fff;
            line-height: 44px;
            background: url(../../assets/images/level_bg.png) no-repeat;
            background-size: 100% 100%;
            padding: 0 20px;
            box-sizing: border-box;
            margin-bottom: 10px;
          }
          .logo {
            width: 90px;
            height: 90px;
          }
          .info {
            font-family: Microsoft YaHei;
            font-size: 16px;
            line-height: 30px;
            color: #000;
            font-weight: 900;
            padding: 20px;
          }
          .info_link{
            color: #0662b7;
            margin-bottom: 20px;
            cursor: pointer;
          }
        }

        /deep/ .el-form {
          padding: 10px 24px;
          margin-top: 20px;

          .el-form-item {
            margin-bottom: 30px;
          }

          .el-input {
            font-size: 16px;
            --el-input-height: 48px;
            --el-input-border-radius: 22px;
            --el-input-border-color: #004faa;
          }

          .el-form-item__content {
            line-height: 48px;
            justify-content: center;
          }
        }

        /deep/ .el-button--primary {
          --el-button-bg-color: #19478b;
          --el-button-border-color: #19478b;
        }

        /deep/ .el-button {
          width: 186px;
          height: 50px;
          border-radius: 22px;
        }

        .el-button:focus,
        .el-button:hover {
          color: #fff;
          border-color: #19478b;
          background-color: #19478b;
          outline: 0;
        }

        .el-button:active {
          color: #fff;
          border-color: #19478b;
          background-color: #19478b;
          outline: 0;
        }

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;

          .info-item {
            width: 280px;
            height: 92px;
            border-radius: 6px;
            margin-bottom: 24px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-origin: content-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            span {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 19px;
              text-shadow: 0px 1px 1px #031F52;
            }

            .title {
              font-size: 32px;
              line-height: 40px;
              text-shadow: 0px 2px 1px rgba(0, 0, 108, 0.75);
            }
          }

          .membership-application {
            background-image: url('../../assets/images/bg01.png');
          }

          .tenderee-column {
            background-image: url('../../assets/images/bg02.png');
          }

          .laws-regulations {
            background-image: url('../../assets/images/bg03.png');

            .title {
              font-size: 26px;
            }

          }

          .recruitment-info {
            background-image: url('../../assets/images/bg04.png');
            background-size: 100% 100%;
          }

          .complaint-supervision {
            background-image: url('../../assets/images/bg05.png');
          }

          .contact-us {
            height: 208px;
            background-image: url('../../assets/images/bg06.png');

            .contact {
              display: flex;
              flex-direction: column;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .sub-title {
      color: #19478B;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      line-height: 46px;
      border-bottom: 2px solid #c6c6c6;
    }

    .links {
      img {
        width: 100%;
        height: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
