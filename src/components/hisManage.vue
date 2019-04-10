<template>
  <div id="goods">
    <Title :banner="banner"></Title>
    <div class="content3">
      <div class="headBar clearfix">
        <el-input placeholder="请输入内容" v-model="searchValue" style="float:left;width:500px"  class="input-with-select" clearable>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="成绩id" value="1"></el-option>
            <el-option label="用户id" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div style="height:530px;padding: 0 0 0 200px;">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            fixed
            prop="hid"
            label="成绩ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uid"
            label="用户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="hgra"
            label="成绩"
            width="120">
          </el-table-column>
          <el-table-column
            prop="creattime"
            label="考试时间"
            width="140">
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:30px;margin-left:auto;margin-right:auto;width:330px;">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :pager-count="5"
          :total="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from './common/title.vue'
  import $ from 'jquery'
  export default{
    data(){
      return{
        banner:'成绩管理',
        pageNum:1,
        pageSize:6,
        pageCount:0,
        searchValue:'',
        tableData:[],
        url:'',
        select:'',
        typeList:[],
      }
    },
    methods:{
      search(){
        if(this.searchValue != ''){
          if(this.select == 1){
            this.pageNum = 1
            this.searchByhId()
          } else if(this.select == 2){
            this.pageNum = 2
            this.searchByuId()
          }
        }
        else{
          this.select = ''
          this.pageNum = 1
          this.getExamsList()
        }
      },
      searchByuId(){
        var postId = new FormData()
        postId.append('uId',this.searchValue)
        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/his/uid',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            console.log('查询成功1')
            self.tableData = []
            self.setList2(data,self.typeList)
            self.$message({
              showClose: true,
              message: '查询成功！',
              type: 'success'
            });
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '查询失败！',
              type: 'error'
            });
          }
        })
      },
      searchByhId(){
        var postId = new FormData()
        postId.append('hId',this.searchValue)
        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/his/hid',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:postId,
          contentType:false,
          processData:false,
          success:function(data){
            console.log('查询成功1')
            self.tableData = []
            self.setList2(data,self.typeList)
            self.$message({
              showClose: true,
              message: '查询成功！',
              type: 'success'
            });
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '查询失败！',
              type: 'error'
            });
          }
        })
      },
      handleCurrentChange(pageNum){
        this.pageNum = pageNum
        this.getExamsList()
      },
      setList(data,typeList){
        console.log(data)
        console.log("上一行setList")
        for(var i=0;i<data.rows.length;i++){
          this.tableData.push({
            hid:data.rows[i].hid,
            uid:data.rows[i].uid,
            hgra:data.rows[i].hgra,
            creattime:data.rows[i].creattime,
          })
        }
      },
      setList2(data,typeList){
        console.log(data)
        console.log("上一行setList")
        this.tableData.push({
          hid:data.hid,
          uid:data.uid,
          hgra:data.hgra,
          creattime:data.creattime,
        })
      },
      getExamsList(){
        var postPage = new FormData()
        postPage.append('page',this.pageNum)
        postPage.append('rows',this.pageSize)

        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/his/all',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:postPage,
          contentType:false,
          processData:false,
          success:function(data){
            console.log('查询成功2',data)
            self.tableData = []
            self.setList(data,self.typeList)
            self.pageCount = data.pageSize * 10
            console.log(data)
            console.log("上一行getExamsList success")
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '获取列表失败！',
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
      this.getExamsList()
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
    height: 700px;
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
</style>
