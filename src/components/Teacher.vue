<template>
  <div id="homePage">
    <div class="topBar">
      <div class="bigTitle">小学生作业管理端</div>
      <div class="writeOff" @click="writeOff">
        <div>注销</div>
        <img src="../assets/exit.png">
      </div>
      <div class="user">
        教师：{{username}}&nbsp&nbsp&nbsp&nbsp您好！
      </div>
    </div>
    <div class="leftSide">
      <div class="menu">
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/teacher/exams">
            <i class="el-icon-document"></i>
            <span slot="title">题目管理</span>
          </el-menu-item>
          <el-menu-item index="/teacher/hisManage">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">成绩查看</span>
          </el-menu-item>
          <el-menu-item index="/teacher/userManage" v-if="teacher_headClass">
            <i class="el-icon-setting"></i>
            <span slot="title">学生管理</span>
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
  import $ from 'jquery'
import GLOBAL from '../common/xxx'
  export default{
    data(){
      return{
        defaultActive:'',
        username:'',
        teacher_headClass:'',
      }
    },
    methods:{
      writeOff(){
        this.$router.push({
          path: '/',
          replace: false
        })
      },
      checkSubject(){
        var that = this;
        var id = sessionStorage.getItem("id");
        console.log("id:",id)
        var postId = new FormData()
        postId.append('user_id',id)
        $.ajax({
          url:GLOBAL.baseURL+'/user/selectAll',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(res){
            console.log("selectAll返回",res.returnMap)
            if(res.returnMap.teacher_ishead == 0){
              sessionStorage.setItem("teacher_headClass",res.returnMap.teacher_headClass);
              that.teacher_headClass = res.returnMap.teacher_headClass;
              console.log("teacher_headClass",sessionStorage.teacher_headClass);
            }
            sessionStorage.setItem("teacher_subject",res.returnMap.teacher_subject)
            console.log("查看返回",res.returnMap.teacher_subject)
            console.log("查看存储",sessionStorage.getItem("teacher_subject"))
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
    },
    computed:{
      onRoutes(){
        var url = '/' + this.$route.path.replace('/','')
        if(url=='/teacher/exams'||url=='/teacher/addExams'||url=='/teacher/updateExams'){
          return '/exammanager'
        }
        else{
          return url
        }
      }
    },
    mounted(){
      var that = this;
      sessionStorage.flag = 1;
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
            console.log("getLogin",res);
            if(res.success){
              that.username = res.user_nickname;
              sessionStorage.setItem("id",res.user_id)
              sessionStorage.setItem("username",res.user_nickname)
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
      this.username = sessionStorage.getItem("username");
      this.checkSubject();
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
    background-color: #303439;
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
  /*#homePage .menu{
      width: 15%;
      float: left;
      background-color:#545c64;
      height: 100%;
  }*/
  #homePage .el-menu{
    min-height: 1000px;
    background-color:#545c64;
  }
  #homePage .el-menu-item{
    height: 70px;
    line-height: 70px;
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
