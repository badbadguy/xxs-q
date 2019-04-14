<template>
	<div id="updateGoods">
		<div class="content10">
			<div class="biaoti">
				<div class="clearfix backBox" @click="back">
					<i class="el-icon-arrow-left" style="float:left;line-height:20px;"></i>
					<div style="float:left">返回</div>
				</div>
				<p>修改题目</p>
			</div>
			<div style="margin-left:90px">
				<div class="itemBar">
					<p>题目</p>
					<el-input v-model="eques" placeholder="请输入题目" style="width:400px;"></el-input>
				</div>
				<el-upload
					list-type="picture-card"
					action="''"
					:http-request="upload"
					:before-upload="beforeAvatarUpload"
					:limit=1>
					<i class="el-icon-plus"></i>
				</el-upload>
        <div class="itemBar">
          <p>答案A</p>
          <el-input v-model="eans1" placeholder="请输入答案的A选项" style="width:400px;"></el-input>
        </div>
        <div class="itemBar">
          <p>答案B</p>
          <el-input v-model="eans2" placeholder="请输入答案的B选项" style="width:400px;"></el-input>
        </div>
        <div class="itemBar">
          <p>答案C</p>
          <el-input v-model="eans3" placeholder="请输入答案的C选项" style="width:400px;"></el-input>
        </div>
        <div class="itemBar">
          <p>答案D</p>
          <el-input v-model="eans4" placeholder="请输入答案的D选项" style="width:400px;"></el-input>
        </div>
        <div>
          <div class="itemBar">
            <p>正确答案</p>
          </div>
          <el-radio-group v-model="estate">
            <el-radio-button label="1">答案A</el-radio-button>
            <el-radio-button label="2">答案B</el-radio-button>
            <el-radio-button label="3">答案C</el-radio-button>
            <el-radio-button label="4">答案D</el-radio-button>
          </el-radio-group>
        </div>
        <div class="itemBar">
          <p>答案解析</p>
          <el-input v-model="eexp" placeholder="请输入答案的解析" style="width:400px;"></el-input>
        </div>
			</div>
			<div class="btn-b">
  				<el-button type="warning" style="margin-right:120px;" @click="confirm">确定</el-button>
				<el-button type="info" @click="back">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import GLOBAL from '../../common/xxx'
	export default{
		data(){
			return{
				estate:'1',
				eimg:'',
        eans1:'',
        eans2:'',
        eans3:'',
        eans4:'',
        eques:'',
				eexp:'',
				imageUrl:'',
			}
		},
		methods:{
			// 图片上传前验证
			beforeAvatarUpload (file) {
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return isLt2M
			},
			// 上传图片到OSS 同时派发一个事件给父组件监听
			upload (item) {
				var that = this;
				var postPage = new FormData()
				postPage.append('file',item.file)
        $.ajax({
		      url:GLOBAL.baseURL+'/question/picture',
          type:'post',
          xhrFields:{
              withCredentials:false
          },
          data:postPage,
          contentType:false,
          processData:false,
		      success:function(data){
						that.eimg = data;
		      },
		      error:function(){
		        console.log("发生异常");
		        that.$message({
							showClose: true,
							message: '服务器连接失败',
							type: 'error'
						});
		      }
				})
			},
			back(){
				this.$router.push({
					path: '/teacher/exams',
					replace: false
				})
			},
			confirm(){
				var postExams = new FormData()
        postExams.append('question_id',sessionStorage.question_id)
        postExams.append('question_title',this.eques)
        postExams.append('question_answer1',this.eans1)
        postExams.append('question_answer2',this.eans2)
        postExams.append('question_answer3',this.eans3)
        postExams.append('question_answer4',this.eans4)
        postExams.append('question_answerr',this.estate)
				postExams.append('question_remark',this.eexp)
				if(this.eimg != ''){
					postExams.append('question_image',this.eimg)
					console.log('post内容',postExams)
				}

				var self = this
        $.ajax({
          url:GLOBAL.baseURL+'/question/update',
          type:'post',
          xhrFields:{
            withCredentials:false
          },
          data:postExams,
          contentType:false,
          processData:false,
          success:function(data){
						console.log("修改成功");
						console.log(data)
						self.back()
          },
          error:function(res){
            console.log("发生异常");
            self.$message({
              showClose: true,
              message: '修改失败！',
              type: 'error'
            });
          }
        })
			},
			getExamsInfo(){
				var postId = new FormData()
				postId.append('question_id',sessionStorage.getItem("question_id"))
				var self = this
	      $.ajax({
		    		url:GLOBAL.baseURL+'/question/select',
	          type:'post',
	          xhrFields:{
	              withCredentials:false
	          },
	          data:postId,
	          contentType:false,
	          processData:false,
						success:function(data){
							console.log('查询成功')
							console.log(data.resultList[0])
							self.eques = data.resultList[0].question_title
							self.eans1 = data.resultList[0].question_answer1
							self.eans2 = data.resultList[0].question_answer2
							self.eans3 = data.resultList[0].question_answer3
							self.eans4 = data.resultList[0].question_answer4
							self.estate = data.resultList[0].question_answerr
							self.eexp = data.resultList[0].question_remark
						},
						error:function(){
								console.log("发生异常");
								self.$message({
								showClose: true,
								message: '获取失败！',
								type: 'error'
						});
						}
			  	})
			},
		},
		mounted(){
			console.log("qid:",sessionStorage.question_id)
      this.getExamsInfo()
/*		  alert(sessionStorage.getItem("loginid"))*/
		}
	}
</script>

<style>
.clearfix:after {
   content:"";
   display: block;
   clear:both;
}
#updateGoods .content10{
	margin: 0 20px 0 20px;
	min-height: 800px;
	background-color: #ffffff;
	border-radius: 10px;
	padding: 20px 0 30px 20px;
}
#updateGoods .biaoti{
	height: 40px;
}
#updateGoods .biaoti p{
	font-size: 18px;
	font-weight: bold;
	float: left;
}
#updateGoods .backBox{
	float: right;
	cursor: pointer;
	margin: 20px 30px 0 0;
}
#updateGoods .itemBar{
	margin-bottom: 10px;
}
#updateGoods .itemBar p{
	margin-bottom: 5px;
}
#updateGoods .el-textarea__inner{
	resize: none;
}
#updateGoods .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
#updateGoods .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
#updateGoods .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
#updateGoods .avatar {
    width: 148px;
    height: 148px;
    display: block;
 }
#updateGoods .el-tag + .el-tag {
    margin-left: 10px;
  }
#updateGoods .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
#updateGoods .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
#updateGoods .numBox{
	height: 47px;
	width: 95px;
	float: left;
	margin-right: 20px;
	margin-top: 5px;
	border: 1px solid #333;
	border-radius: 5px;
	padding: 3px 0 0 5px;
	cursor: pointer;
}
#updateGoods .btn-b{
	width: 280px;
	margin: 20px auto 0 auto;
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
/*库存*/
#updateGoods .addNumBox{
	width: 300px;
	height: 120px;
	background-color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	margin: -40px 0 0 -100px;
}
#updateGoods .numBody{
	height: 70px;
	overflow: hidden;
}
#updateGoods .numFoot{
	height: 50px;
	padding: 10px 0 0 85px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
