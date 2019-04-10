<template>
  <div id="zhuce">
    <div class="zhuceBox">
      <div class="inputBox">
        <el-row>
          <span class="littleTitle">用户名</span>
          <el-input
            size="small"
            placeholder="用户名(8-16位字母、数字和符号)"
            v-model="username"
            @change="getUsername($event)"
            clearable>
          </el-input>
        </el-row>
      </div>
      <div class="inputBox">
        <span class="littleTitle">密码</span>
        <el-input
          size="small"
          type="password"
          placeholder="密码(6-16位字母、数字和符号)"
          v-model="password1"
          clearable>
        </el-input>
      </div>
      <div class="inputBox">
        <span class="littleTitle">确认密码</span>
        <el-input
          size="small"
          type="password"
          placeholder="确认密码"
          v-model="password2"
          clearable>
        </el-input>
      </div>
      <el-row id="btnBox2">
        <el-button type="danger" @click="confirm">注册</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    data(){
      return{
        username:'',
        password1:'',
        password2:'',
      }
    },
    methods:{
      getUsername(e){
        var ev = e.currentTarget
        console.log(ev)
      },
      confirm(){
        /*用户名验证*/
        if(this.username == ''){
          this.$message({
            showClose: true,
            message: '用户名不能为空！',
            type: 'error'
          });
          return
        }
        if(this.username.length < 8){
          this.$message({
            showClose: true,
            message: '用户名太短了哦！',
            type: 'warning'
          });
          return
        }
        else if(this.username.length > 16){
          this.$message({
            showClose: true,
            message: '用户名太长了哦！',
            type: 'warning'
          });
          return
        }
        if(/.*[\u4e00-\u9fa5]+.*$/.test(this.username))
        {
          this.$message({
            showClose: true,
            message: '用户名不能为中文！',
            type: 'warning'
          });
          return
        }
        /*密码验证*/
        if(this.password1 == ''){
          this.$message({
            showClose: true,
            message: '密码不能为空！',
            type: 'error'
          });
          return
        }
        if(this.password1.length < 6){
          this.$message({
            showClose: true,
            message: '密码太短了哦！',
            type: 'warning'
          });
          return
        }
        else if(this.password1.length > 16){
          this.$message({
            showClose: true,
            message: '密码太长了哦！',
            type: 'warning'
          });
          return
        }
        if(/.*[\u4e00-\u9fa5]+.*$/.test(this.password1))
        {
          this.$message({
            showClose: true,
            message: '密码不能为中文！',
            type: 'warning'
          });
          return
        }
        if(this.password1 != this.password2){
          this.$message({
            showClose: true,
            message: '确认密码与密码不符！',
            type: 'error'
          });
          return
        }
        this.zhuce()
      },
      cancel(){
        this.$router.push({
          path: '/',
          replace: false
        })
      },
      zhuce(){
        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/user/add',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:{
            uname:this.username,
            pwd:this.password1,
          },
          success:function(data){
            alert('注册成功');
            self.$router.push({
              path: '/',
              replace: false
            })
          },
          error:function(res){
            alert("发生异常!");
            console.log(res)
            self.$message({
              showClose: true,
              message: '注册失败！',
              type: 'error'
            });
          }
        })
      },
    },
    mounted(){

    }
  }
</script>

<style>
  #zhuce{
    height: 100%;
    width: 100%;
    background-color: #303439;
  }
  #zhuce .zhuceBox{
    width: 600px;
    height: 470px;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -250px 0 0 -300px;
    border-radius: 10px;
    padding-top: 30px;
  }
  #zhuce .inputBox{
    margin: 0 0 15px 70px;
  }
  #zhuce .inputBox .littleTitle{
    font-size: 14px;
    width: 100px;
    text-align: left;
    display:inline-block;
  }
  #zhuce .el-input{
    width: 350px;
  }
  #btnBox2{
    margin: 50px 0 0 180px;
  }
  #zhuce button{
    margin-right: 80px;
  }
</style>
