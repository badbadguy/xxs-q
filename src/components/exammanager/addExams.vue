<template>
	<div id="addGoods">
		<div class="content8">
			<div class="biaoti">
				<div class="clearfix backBox" @click="back">
					<i class="el-icon-arrow-left" style="float:left;line-height:20px;"></i>
					<div style="float:left">返回</div>
				</div>
				<p>新增题目</p>
			</div>
			<div style="margin-left:90px">
				<div class="itemBar">
					<p>题目</p>
					<el-input v-model="eques" placeholder="请输入题目" style="width:400px;"></el-input>
				</div>
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
	export default{
		data(){
			return{
        estate:'1',
        eans1:'',
        eans2:'',
        eans3:'',
        eans4:'',
        eques:'',
				eexp:'',
			}
		},
		methods:{
			back(){
				this.$router.push({
					path: '/teacher/exams',
					replace: false
				})
			},
			confirm(){
				var postExams = new FormData()
				postExams.append('eexp',this.eexp)
        postExams.append('eques',this.eques)
        postExams.append('eans1',this.eans1)
        postExams.append('eans2',this.eans2)
        postExams.append('eans3',this.eans3)
        postExams.append('eans4',this.eans4)
        postExams.append('estate',this.estate)

				var self = this
            	$.ajax({
		            url:'http://47.106.213.157:8180/binyuantest-manager-web/exam/add',
                    type:'post',
                    xhrFields:{
                        withCredentials:true
                    },
                    data:postExams,
                    contentType:false,
                    processData:false,
		            success:function(){
						      console.log("新增成功");
				      		self.back()
		            },
		            error:function(res){
		                console.log("发生异常");
		                self.$message({
				          showClose: true,
				          message: '新增失败！',
				          type: 'error'
				        });
		            }
		        })
			},
		},
		components:{
		},
		mounted(){
		}
	}
</script>

<style>
.clearfix:after {
   content:"";
   display: block;
   clear:both;
}
#addGoods .content8{
	margin: 0 20px 0 20px;
	min-height: 800px;
	background-color: #ffffff;
	border-radius: 10px;
	padding: 20px 0 30px 20px;
}
#addGoods .biaoti{
	height: 40px;
}
#addGoods .biaoti p{
	font-size: 18px;
	font-weight: bold;
	float: left;
}
#addGoods .backBox{
	float: right;
	cursor: pointer;
	margin: 20px 30px 0 0;
}
#addGoods .itemBar{
	margin-bottom: 10px;
}
#addGoods .itemBar p{
	margin-bottom: 5px;
}
#addGoods .btn-b{
	width: 280px;
	margin: 30px auto 0 auto;
}
</style>
