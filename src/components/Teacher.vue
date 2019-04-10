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
          <el-menu-item index="/teacher/userManage">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
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
  export default{
    data(){
      return{
        defaultActive:'',
        username:'',
      }
    },
    methods:{
      writeOff(){
        this.$router.push({
          path: '/',
          replace: false
        })
      },
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
      sessionStorage.flag = 1
      this.username = sessionStorage.getItem("username")
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
