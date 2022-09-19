<template>
  <div class="home">
    <div class="container">

      <div class="content">

        <div class="left"> </div>

        <div class="right">
          <div class="box">
            <div class="sub-title">会员登录</div>
            <el-form :model="form" label-width="0px">
              <el-form-item label="">
                <el-input v-model="form.username" placeholder="请输入账号"/>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入密码"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

      </div>

      <div class="links">
        <div class="box">
          <div class="sub-title">友情链接</div>
          <img :src="linkImg" />
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getLogin } from "@/api/index.js"
import linkImg from "assets/images/links.png"
export default defineComponent({
  setup() {
    let state = reactive({
      form:{
        username:'',
        password:'',
      }
    })
    const login = () => {
      getLogin(state.form).then((res: any) => {
        // debugger
        // if(res){
        // }
      })
    }
    return { ...toRefs(state), linkImg, login, }
  }
})
</script>
<style lang="less" scoped>
  .home{
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    .container{
      width: 100%;
      max-width: 1440px;
      height: 100%;
      margin: 0 auto;
      padding: 30px 16px;
      box-sizing: border-box;
      .content{
        display: flex;
        flex-direction: row;
        .left{
          width: calc(100% - 332px);
          height: 100px;
        }
        .right{
          width: 332px;
          padding: 0 16px;
          box-sizing: border-box;
          /deep/ .el-form{
            padding: 10px 24px;
            .el-form-item{
              margin: 15px 0;
            }
            .el-input {
              --el-input-height: 48px;
              --el-input-border-radius: 22px;
              --el-input-border-color:#004faa;
            }
            .el-form-item__content{
              line-height: 48px;
              justify-content: center;
            }
          }

          /deep/ .el-button--primary{
            --el-button-bg-color: #19478b;
            --el-button-border-color: #19478b;
          }
          /deep/ .el-button{
            width: 186px;
            height: 50px;
            border-radius: 22px;
          }
          .el-button:focus, .el-button:hover{
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
        }
      }
      .sub-title{
        color: #19478B;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        line-height: 46px;
        border-bottom: 2px solid #c6c6c6;
        margin-bottom: 20px;
      }
      
      .links{
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
