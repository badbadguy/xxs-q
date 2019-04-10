<template>
	<div id="userManage">
		<Title :banner="banner"></Title>
		<div class="content5">
			<div class="searchBar">
				<el-input placeholder="请输入内容" v-model="searchWhat" class="input-with-select" clearable>
			      <el-select v-model="select" slot="prepend" placeholder="请选择">
			      	<el-option label="全部" value="0"></el-option>
			        <el-option label="用户ID" value="1"></el-option>
			        <el-option label="用户名" value="2"></el-option>
			      </el-select>
			      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			    </el-input>
			</div>
			<div class="middle">
				<el-table
			      :data="tableData"
			      stripe
			      style="width: 100%">
			      <el-table-column
			        prop="uid"
			        label="用户ID"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="uname"
			        label="用户名"
			        width="220">
			      </el-table-column>
			      <el-table-column label="用户权限">
				    <template slot-scope="scope">
				      <el-switch
					    style="display: block"
					    v-model="tableData[scope.$index].status"
					    @change="updateStatus(scope.row)"
					    active-color="#13ce66"
					    inactive-color="#ff4949"
					    active-text="教师"
					    inactive-text="学生">
					  </el-switch>
				    </template>
				  </el-table-column>
			      <el-table-column label="操作">
				    <template slot-scope="scope">
				      <el-button
				        size="mini"
				        type="danger"
				        @click="handleDelete(scope.$index)">删除</el-button>
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
	import $ from 'jquery'
	export default{
		data(){
			return{
				banner:'用户管理',
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
			search(){
				if(this.select == 1){
					this.pageNum = 1
					this.searchById(this.searchWhat)
				}
				else if(this.select == 2){
					this.pageNum = 1
					this.searchByName(this.searchWhat)
				}
				else if(this.select == 0){
					this.pageNum = 1
					this.searchWhat = ''
					this.getAllUser()
				}
			},
			searchById(id){
				var postId = new FormData()
				postId.append('userId',id)
				var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/user/id',
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
            if(data.status == 1){
              self.tableData.push({
                uid:data.uid,
                uname:data.uname,
                status:'学生',
                state:true,
              })
            } else if(data.status == 0){
              self.tableData.push({
                uid:data.uid,
                uname:data.uname,
                status:'教师',
                state:true,
              })
            }
            self.pageCount = 10
						self.$message({
						  showClose: true,
              message: '查询成功2！',
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
			searchByName(userName){
        var postName = new FormData()
        postName.append('userName',userName)
        postName.append('page',1)
        postName.append('rows',20)
        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/user/name',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:postName,
          contentType:false,
          processData:false,
          success:function(data){
            console.log('查询成功3')
            self.tableData = []
            for(let i=0;i<data.rows.length;i++){
              var info = data.rows[i]
              if(info.status == 1){
                self.tableData.push({
                  uid:info.uid,
                  uname:info.uname,
                  status:'学生',
                  state:true,
                })
              } else if(info.status == 0){
                self.tableData.push({
                  uid:info.uid,
                  uname:info.uname,
                  status:'教师',
                  state:true,
                })
              }
            }
            self.pageCount = 10
            self.$message({
              showClose: true,
              message: '查询成功4！',
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
			updateStatus(row){
			  alert(row.uid)
        alert(row.state)
				var update = new FormData()
				update.append('uid',row.uid)
				if(row.state == false){
					update.append('status',1)
				}
				else if(row.state == true){
					update.append('status',0)
				}
				console.log(update.uid)
				var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/user/upd',
          type:'post',
          xhrFields:{
            withCredentials:true
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
        postPage.append('page',this.pageNum)
        postPage.append('rows',this.pageSize)
        var self = this
        $.ajax({
          url:'http://47.106.213.157:8180/binyuantest-manager-web/user/all',
          type:'post',
          xhrFields:{
            withCredentials:true
          },
          data:postPage,
          contentType:false,
          processData:false,
          success:function(data){
            console.log('查询成功5')
            console.log(data.rows)
            self.tableData = []
            for(let i=0;i<data.rows.length;i++){
              var info = data.rows[i]
              if(info.status == 1){
                self.tableData.push({
                  uid:info.uid,
                  uname:info.uname,
                  status:'学生',
                  state:true,
                })
              } else if(info.status == 0){
                self.tableData.push({
                  uid:info.uid,
                  uname:info.uname,
                  status:'教师',
                  state:true,
                })
              }
            }
            self.pageCount = data.pageSize * 10
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
#userManage .searchBar{
	margin: 20px auto 20px auto;
	width: 500px;
}
#userManage .searchBar .el-select .el-input {
	width: 130px;
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
