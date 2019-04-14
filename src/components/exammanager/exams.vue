<template>
	<div id="goods">
    <Title :banner="banner"></Title>
		<div class="content3">
			<div class="headBar clearfix">
			 	<!-- <el-input placeholder="请输入内容" v-model="searchValue" style="float:left;width:500px"  class="input-with-select" clearable>
			 		<el-select v-model="select" slot="prepend" placeholder="请选择">
				      <el-option label="题目id" value="1"></el-option>
				    </el-select>
				    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input> -->
				<el-radio-group v-model="radio3">
					<el-radio-button label="0">单选题</el-radio-button>
					<el-radio-button label="1">语音题</el-radio-button>
					<el-radio-button label="2">填空题</el-radio-button>
					<el-radio-button label="3">应用题</el-radio-button>
				</el-radio-group>
				<el-button type="primary" style="margin-left:80px" @click="add">新增题目</el-button>
			</div>
			<div style="height:530px;">
				<el-table
			      :data="Qtitle"
			      stripe
			      style="width: 100%">
			      <el-table-column
			        fixed
			        prop="type"
			        label="题目类型"
			        width="80">
			      </el-table-column>
			      <el-table-column
			        prop="question_title"
			        label="题目"
			        width="220">
			      </el-table-column>
						<el-table-column label="图片" width="150" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.question_image||defaultImg" style="width: 50px;height:50px;" @click="openImg(scope.row.question_image)">
							</template>
						</el-table-column>
			      <el-table-column
			        prop="question_answer1"
			        label="答案A"
			        width="120">
			      </el-table-column>
			      <el-table-column
			        prop="question_answer2"
			        label="答案B"
			        width="120">
			      </el-table-column>
			      <el-table-column
			        prop="question_answer3"
			        label="答案C"
			        width="120">
			      </el-table-column>
			      <el-table-column
			        prop="question_answer4"
			        label="答案D"
			        width="120">
			      </el-table-column>
			      <el-table-column
              prop="question_answerr"
              label="正确选项"
			        width="120">
            </el-table-column>
						<el-table-column
              prop="question_answers"
              label="正确答案"
			        width="120">
            </el-table-column>
            <el-table-column
              prop="question_remark"
              label="讲解"
              width="180">
            </el-table-column>

			      <el-table-column
			       label="操作"
			       width="100"
			       fixed="right">
				    <template slot-scope="scope">
				      <el-button
				        style="color:#409eff;"
				        size="small"
				        type="text"
				        @click="handleUpdate(scope.row)">修改</el-button>
				      <el-button
				        style="color:#dd6161;"
				        size="small"
				        type="text"
				        @click="handleDelete(scope.row)">删除</el-button>
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
			<el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
				<el-card :body-style="{ padding: '0px' }">
					<img :src="dialogImgUrl" width="100%" height="100%">
				</el-card>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import Title from '../common/title.vue'
	import GLOBAL from '../../common/xxx'	
	import $ from 'jquery'
	export default{
		data(){
			return{
			  banner:'题目管理',
				pageNum:1,
				pageSize:6,
				pageCount:0,
				searchValue:'',
				tableData:[],
				isShow:false,
				url:'',
				select:'',
				typeList:[],
	
				Qtitle:[],
				defaultImg:'http://47.106.213.157:80/group1/M00/00/01/rBIH9lyx_TCAHTGxAAAGePDeGP0541.jpg',
				imgVisible: false,
				dialogImgUrl:'',
				radio3:''
			}
		},
		methods:{
			// search(){
			// 	if(this.searchValue != ''){
			// 		if(this.select == 1){
			// 			this.pageNum = 1
			// 			this.searchById()
			// 		}
			// 	}
			// 	else{
			// 		this.select = ''
			// 		this.pageNum = 1
			// 		this.getExamsList()
			// 	}
			// },
			// searchById(){
			//   var postId = new FormData()
			// 	postId.append('eId',this.searchValue)
      //   var self = this
      //   $.ajax({
      //     url:'http://47.106.213.157:8180/binyuantest-manager-web/exam/id',
      //     type:'post',
      //     xhrFields:{
      //       withCredentials:true
      //     },
      //     data:postId,
      //     contentType:false,
      //     processData:false,
      //     success:function(data){
      //       console.log('查询成功1')
      //       self.tableData = []
      //       self.setList2(data,self.typeList)
      //       self.$message({
      //         showClose: true,
      //         message: '查询成功！',
      //         type: 'success'
      //       });
      //     },
      //     error:function(){
      //       console.log("发生异常");
      //       self.$message({
      //         showClose: true,
      //         message: '查询失败！',
      //         type: 'error'
      //       });
      //     }
      //   })
			// },
				// 展示图片
			openImg(url) {
				if (url) {
					this.imgVisible = true
					this.dialogImgUrl = url
				}
			},
			add(){
				switch (this.radio3) {
					case '0':
						this.$router.push({
							path: '/teacher/addExams',
							replace: false
						})
						break;
					case '1':
						this.$router.push({
							path: '/teacher/addExams1',
							replace: false
						})
						break;
					case '2':
						this.$router.push({
							path: '/teacher/addExams2',
							replace: false
						})
						break;
					case '3':
						this.$router.push({
							path: '/teacher/addExams3',
							replace: false
						})
						break;
					default:
						this.$message({
              showClose: true,
              message: '未选择题目类型',
              type: 'error'
            });
						break;
				}
			},
			handleUpdate(id){
				console.log(id)
        var temp = id.question_id
				sessionStorage.setItem("question_id",temp)
				switch (id.type) {
					case "单选题":
						this.$router.push({
							path: '/teacher/updateExams',
							replace: false
						})
						break;
					case "语音题":
						this.$router.push({
							path: '/teacher/updateExams1',
							replace: false
						})
						break;
					case "填空题":
						this.$router.push({
							path: '/teacher/updateExams2',
							replace: false
						})
						break;
					case "应用题":
						this.$router.push({
							path: '/teacher/updateExams3',
							replace: false
						})
						break;
					default:
						break;
				}
			},
			handleDelete(id){
				console.log("删除id：",id.question_id)
				var postId = new FormData()
				postId.append('question_id',id.question_id)
				var self = this
        $.ajax({
		      url:GLOBAL.baseURL+'/question/delete',
          type:'post',
          xhrFields:{
              withCredentials:false
          },
          data:postId,
          contentType:false,
          processData:false,
		      success:function(data){
						console.log('删除成功')
						self.getExamsList()
						self.$message({                                         
						  showClose: true,
				      message: '删除成功！',
				      type: 'success'
				    });
		      },
		      error:function(){
		        console.log("发生异常");
		        self.$message({
							showClose: true,
							message: '删除失败！',
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
				  var temprans = null
				  if(data.rows[i].estate==1){
				    temprans = "A";
          } else if(data.rows[i].estate==2) {
            temprans = "B";
          } else if(data.rows[i].estate==3) {
            temprans = "C";
          } else {
            temprans = "D";
          }
            this.tableData.push({
              id:data.rows[i].eid,
              title:data.rows[i].eques,
              ans1:data.rows[i].eans1,
              ans2:data.rows[i].eans2,
              ans3:data.rows[i].eans3,
              ans4:data.rows[i].eans4,
              rans:temprans,
              expl:data.rows[i].eexp,
            })
				}
			},
      setList2(data,typeList){
        console.log(data)
        console.log("上一行setList")
        this.tableData.push({
          id:data.eid,
          title:data.eques,
          ans1:data.eans1,
          ans2:data.eans2,
          ans3:data.eans3,
          ans4:data.eans4,
          rans:data.estate,
          expl:data.eexp,
        })
      },
			getExamsList(){
				var that = this;
				var postPage = new FormData()
				postPage.append('subject_id',sessionStorage.getItem("teacher_subject"))
        $.ajax({
		      url:GLOBAL.baseURL+'/question/select',
          type:'post',
          xhrFields:{
              withCredentials:false
          },
          data:postPage,
          contentType:false,
          processData:false,
		      success:function(data){
						console.log('查询成功2',data)
						that.Qtitle = data.resultList;
						console.log('that.Qtitle',that.Qtitle);
		      },
		      error:function(){
		        console.log("发生异常");
		        that.$message({
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
.img-dialog {
  padding: 0!important;
}
</style>
