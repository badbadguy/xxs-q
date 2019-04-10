<template>
  <div id="homePage">
    <div class="topBar">
      <div class="bigTitle">小学生作业系统管理员端</div>
      <div class="writeOff" @click="writeOff">
        <div>注销</div>
        <img src="../../assets/exit.png">
      </div>
      <div class="user">
        管理员：{{username}}&nbsp&nbsp&nbsp&nbsp您好！
      </div>
    </div>
    <div class="leftSide">
      <div class="menu">
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          router
          background-color="#0E53A7"
          text-color="#fff"
          active-text-color="#FF9C00">
          <el-menu-item index="/home/doexam">
            <i class="el-icon-document"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
          <el-menu-item index="/home/mainPage">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">教师管理</span>
          </el-menu-item>
          <el-menu-item index="/home/personalCenter">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="rightSide">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GLOBAL from '../../common/xxx'
  import $ from 'jquery'
  export default{
    data(){
      return{
        username:'undefined',
      }
    },
    methods:{
      writeOff(){
        this.$router.push({
          path: '/login',
          replace: false
        })
      },
    },
    computed:{
      onRoutes(){
        var url = '/' + this.$route.path.replace('/','')
        if(url=='/home/doexam'){
          return '/home'
        } else if(url=='/home/personalCenter'||url=='/home/personalSetting'){
          return '/client'
        } else{
          return url
        }
      }
    },
    mounted(){
      var that = this;
      sessionStorage.flag = 1
      var formdata = new FormData();
      formdata.append('key',sessionStorage.getItem("key"))
      $.ajax({
          url:GLOBAL.baseURL+'/user/getLogin',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:formdata,
          contentType:false,
          processData:false,
          success:function(res){
            console.log(res);
            if(res.success){
              that.username = res.user_nickname;
              sessionStorage.setItem("id",res.user_id)
            }else{
              that.$message({
                showClose: true,
                message: '登录超时！',
                type: 'error'
              });
              that.writeOff();
            }
          },
          error:function(){
            console.log("发生异常");
            that.$message({
              showClose: true,
              message: '服务器出现错误！',
              type: 'error'
            });
            that.writeOff();
          }
        })
    }
  }
</script>

<style>
  #homePage{
    height: 100%;
    width: 100%;
  }
  #homePage .topBar{
    height: 80px;
    background-color: #4284D3;
  }
  #homePage .bigTitle{
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
    float: left;
    line-height: 80px;
    margin-left: 30px;
  }
  #homePage .writeOff{
    float: right;
    line-height: 80px;
    margin-right: 30px;
    cursor: pointer;
  }
  #homePage .writeOff div{
    font-size: 16px;
    color: #ffffff;
    line-height: 80px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
  }
  #homePage .writeOff img{
    width: 20px;
    float: left;
    margin-top: 29px;
    cursor: pointer;
  }
  #homePage .user{
    font-size: 16px;
    float: right;
    line-height: 80px;
    color: #ffffff;
    margin-right: 50px;
  }
  #homePage .leftSide{
    width: 15%;
    float: left;
    background-color:#545c64;
  }
  .el-menu-item span{
    font-size: 18px;
  }
  #homePage .rightSide{
    float: left;
    min-height: 1000px;
    width: 85%;
    background-color: #F8F7F5;
  }
</style>
