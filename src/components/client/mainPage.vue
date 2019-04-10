<template>
  <div id="goods">
    <Title :banner="banner"></Title>
    <div class="content3">
      <!-- <div class="headBar clearfix">
        <el-input placeholder="请输入内容" v-model="searchValue" style="float:left;width:500px"  class="input-with-select" clearable>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="年级" value="1"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-check" @click="search"></el-button>
        </el-input>
      </div> -->
      <div class="fansil" style="height:530px;">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="class"
            label="负责的班级"
            width="400">
          </el-table-column>
          <el-table-column
            prop="teacher_headClass"  
            label="班主任班级"
            width="200">
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="教师id"
            width="0"
            v-if="isShow">
          </el-table-column>
          <el-table-column
            label="操作"
            width="300">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)">设置班主任</el-button>
              <!-- <el-button @click="handleClick(scope.row)" type="text" size="big">设置班主任</el-button> -->
              <el-button @click="delectC(scope.row)" type="text" size="big">删除班级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="设置班主任" :visible.sync="dialogFormVisible">
      <el-form :model="selectwc">
        <el-form-item label="该班级的教师" width="120px">
          <el-select v-model="selectwc.value" placeholder="请选择教师">
            <el-option v-for="item in selectList"
            :label="item.user_name"
            :key="item.user_id"
            :value="item.user_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import GLOBAL from '../../common/xxx'
  import Title from '../common/title.vue'
  import $ from 'jquery'
  export default{
    data(){
      return{
        dialogFormVisible:false,
        banner:'教师管理',
        searchValue:'',
        tableData:[],
        isShow:false,
        url:'',
        selectC:'',
        selectList:[],
        selectwc:{
          value:''
        },
      }
    },
    methods:{
      delectC(e){
        var that = this;
        console.log(e.class_id)
        that.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var postId = new FormData()
          postId.append('class_id',e.class_id)
          $.ajax({
            url:GLOBAL.baseURL+'/class/delect',
            type:'post',
            xhrFields:{
              withCredentials:false
            },
            data:postId,
            contentType:false,
            processData:false,
            success:function(data){
              console.log(data)
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.$router.go(0);
            },
            error:function(){
              console.log("发生异常");
              self.$message({
                showClose: true,
                message: '连接服务器失败！',
                type: 'error'
              });
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      sureChange(){
        var that = this;
        console.log(that.selectwc.value)
        var postId = new FormData()
        postId.append('class_id',that.selectC)
        postId.append('user_id',that.selectwc.value)
        $.ajax({
          url:GLOBAL.baseURL+'/class/setHead',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            console.log(data)
            that.dialogFormVisible = false;
            that.$router.go(0);
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '连接服务器失败！',
              type: 'error'
            });
          }
        })
      },
      handleClick(e){
        var that = this;
        var postId = new FormData()
        that.selectC = e.class_id;
        postId.append('class_id',e.class_id)
        $.ajax({
          url:GLOBAL.baseURL+'/user/checkAllT', 
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            that.selectList = data;
            console.log(that.selectList)
            that.dialogFormVisible = true;
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '连接服务器失败！',
              type: 'error'
            });
          }
        })
      },
      getclass(){
        var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/user/checkAllT',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:'',
          contentType:false,
          processData:false,
          success:function(data){
            console.log(data)
            self.tableData = data
            console.log(self.tableData)
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '连接服务器失败！',
              type: 'error'
            });
          }
        })
      },
      setHead(){
        var postId = new FormData()
        postId.append('num',this.searchValue)
        var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/class/classManager',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            console.log(data)
            self.tableData = data
            console.log(self.tableData)
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '连接服务器失败！',
              type: 'error'
            });
          }
        })
      },
      checkT(class_id){
        var postId = new FormData()
        postId.append('class_id',class_id)
        var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/class/classManager',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            console.log(data)
            self.tableData = data
            console.log(self.tableData)
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '连接服务器失败！',
              type: 'error'
            });
          }
        })
      },
    },
    components:{
      Title,
    },
    mounted(){
      this.getclass();
    }
  }
</script>

<style>
  .clearfix:after {
    content:"";
    display: block;
    clear:both;
  }
  #goods .content3{
    margin: 0 20px 0 20px;
    height: 1300px;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    padding:0 30px;
  }
  #goods .headBar{
    width: 700px;
    margin: 20px auto 20px;
  }
  #goods .headBar .el-select .el-input {
    width: 130px;
  }
  #goods .headBar .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  #goods .el-switch{
    height: 22px;
  }
  .el-table .cell{
    height: 46px;
    overflow: auto;
    text-overflow: ellipsis;
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
  #goodImg{
    width: 430px;
    height: 430px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -215px 0 0 -215px;
  }
  .fansil{
    margin-left: 0;
  }
</style>
