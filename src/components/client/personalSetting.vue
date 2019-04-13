<template>
    <div id="personalSetting">
        <div class="p-body">
            <div class="username1">
                <div class="a">用户名：</div>
                <div class="b">{{username}}</div>
            </div>
            <div class="loginPwd">
                <div class="a">登录密码：</div>
                <div class="b">******</div>
                <el-button type="text" style="color:#36c" @click="updateLoginPwd">修改</el-button>
            </div>
        </div>
        <!-- 修改登录密码 -->
        <div class="modelBox" v-show="isShow4">
            <div class="updateLoginPwd">
                <div style="margin-bottom:5px">
                    <span>旧密码</span>
                    <el-input clearable v-model="pwd" type="password" style="width:200px"></el-input>
                </div>
                <div>
                    <span>新密码</span>
                    <el-input clearable v-model="npwd" type="password" style="width:200px"></el-input>
                </div>
                <div style="margin:30px 0 0 63px">
                    <el-button size="mini" type="warning" @click="back(9)">确定</el-button>
                    <el-button size="mini" type="info" @click="back(10)">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
import GLOBAL from '../../common/xxx'
    export default {
        data() {
            return {
              pwd:'',
              npwd:'',
              isShow4:false,
              username:'',
            }
        },
        methods: {
            back(flag){
              this.isShow4 = false
              if(flag == 10){
                this.pwd = ''
                this.npwd = ''
              }
              else if(flag == 9){
                this.checkPwd()
              }
            },
            updateLoginPwd(){
                this.isShow4 = true
            },
            checkPwd(){
              var self = this
            //   var formdata = new FormData();
            //   formdata.append('user_id',sessionStorage.getItem("id"));
            //   formdata.append('oldPassword',self.pwd);
            //   formdata.append('newPassword',self.npwd);
              $.ajax({
                url:GLOBAL.baseURL+'/user/changePw',
                type:'post',
                xhrFields:{
                  withCredentials:false
                },
                data:{
                    user_id:sessionStorage.getItem("id"),
                    oldPassword:self.pwd,
                    newPassword:self.npwd
                },
                success:function(data){
                    console.log(data);
                    self.pwd = ''
                    self.npwd = ''
                    if(data.success){
                        self.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else{
                        self.$message.error(data.message);
                    }
                },
                error:function(res){
                  console.log("发生异常")
                  console.log(res)
                }
              })
            },
            getInfo(){
              var that = this;
              that.username = sessionStorage.getItem("username");
            },
        },
        mounted() {
            this.getInfo()
        },
    }
</script>

<style>
.clearfix:after {
    content:"";
    display: block;
    clear:both;
}
#personalSetting{

}
#personalSetting .p-body{
    width: 748px;
    height: 400px;
    border: 1px solid #D5E5F4;
    margin: 50px auto;
}
#personalSetting .username1{
    height: 40px;
    margin: 5px 20px;
    line-height: 40px;
}
#personalSetting .youxiang{
    height: 40px;
    margin: 5px 20px;
}
#personalSetting .phone1{
    height: 40px;
    margin: 5px 20px;
}
#personalSetting .address1{
    min-height: 40px;
    margin: 5px 20px;
}
#personalSetting .loginPwd{
    height: 40px;
    margin: 5px 20px;
}
#personalSetting .payPwd{
    height: 40px;
    margin: 5px 20px;
}
#personalSetting .yue{
    height: 40px;
    margin: 5px 20px;
}
#personalSetting .a{
    width: 100px;
    line-height: 40px;
    float: left;
}
#personalSetting .b{
    width: 270px;
    line-height: 40px;
    float: left;
}
/*模态框*/
.modelBox{
    position:fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    top:0%;
    left: 0%;
    z-index: 999;
    display:table;
}
#personalSetting .updateEmail{
    width: 280px;
    height: 130px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -150px;
    padding: 20px 0 0 20px;
}
#personalSetting .updatePhone{
    width: 280px;
    height: 130px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -150px;
    padding: 20px 0 0 20px;
}
#personalSetting .updateAddress{
    width: 280px;
    height: 130px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -150px;
    padding: 20px 0 0 20px;
}
#personalSetting .recharge{
    width: 280px;
    height: 130px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -150px;
    padding: 20px 0 0 20px;
}
#personalSetting .updateLoginPwd{
    width: 280px;
    height: 160px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -80px 0 0 -150px;
    padding: 20px 0 0 20px;
}
#personalSetting .updatePayPwd{
    width: 280px;
    height: 190px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -95px 0 0 -150px;
    padding: 20px 0 0 20px;
}
</style>
