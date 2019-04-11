<template>
  <div id="goods">
    <Title :banner="banner"></Title>
    <div class="content3">
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
              <el-button type="text" @click="handleClick(scope.row)">设置班级</el-button>
              <el-button @click="setSubject(scope.row)" type="text" size="big">设置学科</el-button>
              <el-button @click="delectC(scope.row)" type="text" size="big">删除班级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="设置班级" :visible.sync="dialogFormVisible">
      <el-form :model="selectwc">
        <el-form-item label="可选班级：" :label-width="label_width">
          <el-checkbox-group v-model="selectClass" :min="1">
            <el-checkbox v-for="item in selectList"
            :label="item.value"
            :key="item.key"
            :value="item.key"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureChange">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置学科" :visible.sync="subjectShow">
      <el-form :model="selectwc">
        <el-form-item label="可选班级：" :label-width="label_width">
          <el-radio-group v-model="selectSubject">
            <el-radio-button label="语文" value="33018ef1b3b74a18b6d9f94bff995d79"></el-radio-button>
            <el-radio-button label="数学" value="cd84a79d6ee04e4d9630731b25b589d0"></el-radio-button>
            <el-radio-button label="英语" value="79bed2b0e57c4f7f8e71b9817f03e3b9"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subjectShow = false">取 消</el-button>
        <el-button type="primary" @click="sureSubject">确 定</el-button>
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
        subjectShow:false,
        dialogFormVisible:false,
        banner:'教师管理',
        searchValue:'',
        tableData:[],
        isShow:false,
        url:'',
        selectT:'',
        selectSubject:'',
        selectList:[],
        selectwc:{value:''},
        selectClass:[],
        returnClass:[],
        label_width:'180px'
      }
    },
    methods:{
      setSubject(e){
        var that = this;
        that.selectT = e.user_id;
      },
      sureSubject(){
        var that = this;
        console.log(that.selectSubject)
      },
      sureChange(){
        var that = this;
        var tempxixixi = that.returnClass;
        tempxixixi = [];
        for(var i = 0;i<that.selectClass.length;i++){
          for(var j = 0;j<that.selectList.length;j++){
            if(that.selectClass[i]==that.selectList[j].value){
              tempxixixi.push(that.selectList[j].key);
            }
          }
        }
        var postId = new FormData()
        postId.append('teacher_class',tempxixixi)
        postId.append('user_id',that.selectT)
        $.ajax({
          url:GLOBAL.baseURL+'/class/chooses',
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
        that.selectT = e.user_id;
        that.selectClass = [];
        $.ajax({
          url:GLOBAL.baseURL+'/class/haodeba', 
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:'',
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
