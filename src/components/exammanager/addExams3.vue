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
            <el-button @click="add">添加嵌套</el-button>
            <!-- <el-form ref="form" :model="form"> -->
                <li v-for="item,index in data">
                    <div style="margin-left:90px">
                        <div class="itemBar">
                            <p>题目</p>
                            <el-input v-model="item.eques" placeholder="请输入题目" style="width:400px;"></el-input>
                        </div>
                        <div @click="getImageTypeIndex(index)"> 
                            <el-upload
                                list-type="picture-card"
                                action="''"
                                :http-request="upload"
                                :before-upload="beforeAvatarUpload"
                                :data="{'aaa':'a'}"
                                :limit=1>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <div class="itemBar">
                            <p>答案A</p>
                            <el-input v-model="item.eans1" placeholder="请输入答案的A选项" style="width:400px;"></el-input>
                        </div>
                        <div class="itemBar">
                            <p>答案B</p>
                            <el-input v-model="item.eans2" placeholder="请输入答案的B选项" style="width:400px;"></el-input>
                        </div>
                        <div class="itemBar">
                            <p>答案C</p>
                            <el-input v-model="item.eans3" placeholder="请输入答案的C选项" style="width:400px;"></el-input>
                        </div>
                        <div class="itemBar">
                            <p>答案D</p>
                            <el-input v-model="item.eans4" placeholder="请输入答案的D选项" style="width:400px;"></el-input>
                        </div>
                        <div>
                            <div class="itemBar">
                                <p>正确答案</p>
                            </div>
                            <el-radio-group v-model="item.estate">
                                <el-radio-button label="1">答案A</el-radio-button>
                                <el-radio-button label="2">答案B</el-radio-button>
                                <el-radio-button label="3">答案C</el-radio-button>
                                <el-radio-button label="4">答案D</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="itemBar">
                            <p>答案解析</p>
                            <el-input v-model="item.eexp" placeholder="请输入答案的解析" style="width:400px;"></el-input>
                        </div>
                        <el-button @click="add">添加嵌套</el-button>
                    </div>
                </li>
            <!-- </el-form> -->
		</div>
		<div class="btn-b">
  			<el-button type="warning" style="margin-right:120px;" @click="confirm">确定</el-button>
			<el-button type="info" @click="back">取消</el-button>
		</div>
	</div>
    <!-- <div>
        <el-button @click="add">添加嵌套</el-button>
        <el-table :data="data">
            <el-table-column prop="name" label="名称">
                <template  slot-scope="scope">
                    <el-input v-model="data[scope.$index].name"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
                <template  slot-scope="scope">
                    <el-input v-model="data[scope.$index].age"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
                <template  slot-scope="scope">
                    <el-button @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
	</div> -->
</template>

<script>
	import $ from 'jquery'
	import GLOBAL from '../../common/xxx'	
import { parse } from 'semver';
	export default{
		data(){
			return{
                estate:'1',
                eques:'',
                eans1:'',
                eans2:'',
                eans3:'',
                eans4:'',
                eques:'',
				eexp:'',
                eimg:[],
                data:[{}],
                uploadImageIndex:0,
			}
		},
		methods:{
            getImageTypeIndex(index){
                this.uploadImageIndex = index;
            },
            add(){
                console.log("first",this.data)
                this.data.push({});
                console.log("two",this.data)
            },
            deleteRow(index){
                this.data.splice(index,1);
            },
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
                console.log(item)
                console.log(this.uploadImageIndex)
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
                        console.log("data",data)
                        // that.eimg[this.uploadImageIndex] = data;
                        that.eimg.splice(this.uploadImageIndex,0,data)
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
                console.log(that.eimg);
			},
			back(){
				this.$router.push({
					path: '/teacher/exams',
					replace: false
				})
			},
			confirm(){
                console.log(this.data.values)
				var postExams = new FormData()
                postExams.append('hengji',JSON.stringify(this.data))
                postExams.append('img',JSON.stringify(this.eimg))
                postExams.append('subject_id',sessionStorage.teacher_subject)
                var self = this
                $.ajax({
                    url:GLOBAL.baseURL+'/question/wori',
                    type:'post',
                    xhrFields:{
                        withCredentials:false
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
