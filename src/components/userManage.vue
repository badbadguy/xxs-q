<template>
	<div id="userManage">
		<Title :banner="banner"></Title>
		<div class="content5">
			<div class="middle">
				<el-table
			      :data="tableData"
			      stripe
			      style="width: 100%">
			      <el-table-column
			        prop="user_id"
			        label="用户ID"
			        width="180"
              v-if="false">
			      </el-table-column>
			      <el-table-column
			        prop="user_name"
			        label="学生姓名"
			        width="220">
			      </el-table-column>
			      <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="sureStudent(scope.row)">通过</el-button>
              </template>
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
  import GLOBAL from '../common/xxx'
	import $ from 'jquery'
	export default{
		data(){
			return{
				banner:'申请用户：',
				pageNum:1,
				pageSize:8,
				pageCount:80,
				searchWhat:'',
				select:'',
				state:true,
				tableData:[],
        uid:'',
        uname:'',
        status:'',
			}
		},
		methods:{
			sureStudent(row){
        console.log("row",row)
				var update = new FormData()
				update.append('user_id',row.user_id)
				update.append('student_status',2)
				var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/user/updates',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:update,
          contentType:false,
          processData:false,
          success:function(data){
						console.log('修改成功')
						self.$message({
						  showClose: true,
              message: '修改状态成功！',
              type: 'success'
            });
            self.getAllUser();
          },
          error:function(){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '修改状态失败！',
              type: 'error'
            });
          }
        })
			},
			handleCurrentChange(pageNum){
	      this.pageNum = pageNum
	      this.getAllUser()
      },
      getAllUser(){
        var postPage = new FormData()
        postPage.append('user_id',sessionStorage.id)
        var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/class/checkstudent',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postPage,
          contentType:false,
          processData:false,
          success:function(data){
            console.log("checkstudent",data)
            self.tableData = data;
            console.log("self.tableData",self.tableData);
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
			this.getAllUser()
		},
	}
</script>

<style>
#userManage .content5{
	margin: 0 20px 0 20px;
	height: 700px;
	background-color: #ffffff;
	border-radius: 10px;
	overflow: hidden;
}
#userManage .searchBar .input-with-select .el-input-group__prepend {
	background-color: #fff;
}
#userManage .middle{
	padding: 0 30px;
	height: 495px;
}
#userManage .el-switch{
	height: 22px;
}
</style>
