<template>
  <div class = "note" :style = "note">
    <div class = "loginFrame">
      <el-form class = "demo-ruleForm login-container">
        <div class = "tabsUser">
          <el-tabs v-model = "activeName" class = "users" style = "height: 30px;font-size: 25px">
            <el-tab-pane label = "管理员" name = "0" class = "tab1"></el-tab-pane>
            <el-tab-pane label = "教师" name = "2" class = "tab1"></el-tab-pane>
          </el-tabs>
        </div>
        <div class = "formGroup">
          <el-form-item  label = "账号" prop = "username" >
            <el-input type = "text"  auto-complete = "off" placeholder = "请输入您的账号" class = "form-control" v-model="uname"></el-input></el-form-item>
          <el-form-item label = "密码" prop = "password" class = "form-inline">
            <el-input type = "password" auto-complete = "off" placeholder = "请输入密码" class = "form-control" v-model="pwd"></el-input></el-form-item>
        </div>
        <div class = "remFor">
          <el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox>
          <router-link to="/Register">注册</router-link>
        </div>
        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button type = "primary" @click="loging" style = "width:100%;" >登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import GLOBAL from '../common/xxx'
  import $ from 'jquery'
  export default {
    name: 'login',
    data() {
      return {
        uname: '',
        pwd: '',
        activeName : '0',
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundImage: "url(" + require("../assets/background.jpg") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        },
        account : {
          username:'',
          password:'',
        },
        checked: false
      };
    },
    methods:{
      loging(){
        var formdata = new FormData();
        formdata.append('name',this.uname)
        formdata.append('password',this.pwd)
        formdata.append('type',this.activeName)
        console.log(this.activeName);
        var self = this;
        $.ajax({
          url:GLOBAL.baseURL+'/user/login',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:formdata,
          contentType:false,
          processData:false,
          success:function(res){
            console.log(res)
            if(res.success){
              sessionStorage.setItem("key",res.data)
              alert("欢迎登陆！");
              if(self.activeName == 0) {
                self.$router.push({path: '/home'})
              } else {
                self.$router.push({path: '/Teacher'})
              }
            }else{
              self.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
            // }
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '服务器出现错误！',
              type: 'error'
            });
          }
        })
      }
    },
    mounted(){
      /*this.getList()*/
    },
  }

</script>
<style>

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label{
    width:70px;
    text-align:left;
  }

  .form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
  }
  .remember{
    width:250px;
    text-align:left;
  }
  .forget{
    width:500px;
    text-align:right;
    font-size:14px;
    font-family:PingFang SC;
  }
  .remFor{
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .tabsUser{
    display: inline-block;
    margin-left: 0px;
    margin-right:0px;
    text-align:center;
    font-size:25px;
  }
</style>
