<template>
	<div id="pageNav">
		<div class="page notBan" @click="previousPage" v-if="isIfPrevious">
			上一页
		</div>
		<div class="page ban" v-else>
			上一页
		</div>
		<div :class="{pageNum:isNotActive[index].state,active:isActive[index].state}" 
		v-for="(item,index) in num" @click="changePage(item,index)">{{item}}</div>
		<div class="page notBan" @click="nextPage" v-if="isIfNext">
			下一页
		</div>
		<div class="page ban" v-else>
			下一页
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default{
		data(){
			return{
				num:[],
				firstNum:1,
				lastNum:2,
				pageNum:1,
				isNotActive:[
					{state:false},{state:true},{state:true},{state:true},{state:true},
				],
				isActive:[
					{state:true},{state:false},{state:false},{state:false},{state:false},
				],
				isIfPrevious:false,
				isIfNext:true,
				whoUse:'myself',  //标记谁使用setPage
			}
		},
		props: {
          pageCount: {//共有几页
          	default: 10
          },
        },
		methods:{
			previousPage(){
				this.whoUse = 'previousPage'
				if(this.pageNum == this.firstNum){   //当点上一页当前页码是第一项时，更新页码表
					this.firstNum = this.firstNum - 4
					this.pageNum = this.pageNum - 1
					this.num = []
					this.setPage()
				}
				else{
					this.pageNum = this.pageNum - 1
					if(this.pageNum != this.pageCount){
						this.isIfNext = true
					}
					if(this.pageNum == 1){
						this.isIfPrevious = false
					}
					for(let i = 0; i < this.num.length; i++){
						this.isNotActive[i].state = true
						this.isActive[i].state = false
						if(this.pageNum == this.num[i]){
							this.isNotActive[i].state = false
							this.isActive[i].state = true
						}
					}
				}
				console.log(this.pageNum)
				this.$emit('myPage',this.pageNum)
			},
			nextPage(){
				this.whoUse = 'nextPage'
				this.pageNum = this.pageNum + 1
				if(this.pageNum != 1){
					this.isIfPrevious = true
				}
				if(this.pageNum == this.pageCount){
					this.isIfNext = false
				}
				for(let i = 0; i < this.num.length; i++){
					this.isNotActive[i].state = true
					this.isActive[i].state = false
					if(this.pageNum == this.num[i]){
						this.isNotActive[i].state = false
						this.isActive[i].state = true
					}
				}
				if(this.num.length == 5){           //当点下一页当前页码是最后一项时，更新页码表
					if(this.pageNum == this.lastNum){
						this.firstNum = this.lastNum
						this.num = []
						this.setPage()
					}
				}
				console.log(this.pageNum)
				this.$emit('myPage',this.pageNum)
			},
			setPage(){
				this.num = []
				var count = 0
				for(let i = this.firstNum; i <= this.pageCount; i++){
					if(count == 5){
						this.lastNum = i - 1
						break
					}
					if(i == this.pageCount) {
						this.lastNum = i
					}
					this.num.push(i)
					count ++
				}
				if(this.num.length == 1 && this.num[0] == 1){
					this.isIfNext = false
					this.isIfPrevious = false
				}
				else if(this.pageNum < this.lastNum && this.pageNum > 1){
					this.isIfPrevious = true
					this.isIfNext = true
				}
				else{
					this.isIfPrevious = false
					this.isIfNext = true
				}
				if(this.whoUse == 'myself'){
					this.isNotActive = [{state:false},{state:true},{state:true},{state:true},{state:true},]
					this.isActive = [{state:true},{state:false},{state:false},{state:false},{state:false},]	
				}
				else if(this.whoUse == 'changePage' || this.whoUse == 'nextPage'){
					for(let i = 0; i < this.num.length; i++){
						this.isNotActive[i].state = true
						this.isActive[i].state = false
					}
					this.isActive[0].state = true
					this.isNotActive[0].state = false
				}
				else if(this.whoUse == 'previousPage'){
					for(let i = 0; i < this.num.length; i++){
						this.isNotActive[i].state = true
						this.isActive[i].state = false
					}
					let index = this.num.length
					this.isActive[index-2].state = true
					this.isNotActive[index-2].state = false
				}
			},
			changePage(number,index){
				this.whoUse = 'changePage'
				if(number != 1){
					this.isIfPrevious = true
				}
				else if(number == 1){
					this.isIfPrevious = false
				}
				if(number == this.pageCount){
					this.isIfNext = false
				}
				else {
					this.isIfNext = true
				}
				for(let i = 0; i < this.num.length; i++){
					this.isNotActive[i].state = true
					this.isActive[i].state = false
				}
				this.isActive[index].state = true
				this.isNotActive[index].state = false

				this.pageNum = number
				/*当点到当前页码表最后一项时，更新页码表*/
				if(this.num.length == 5){
					if(number == this.lastNum){
						this.firstNum = this.lastNum
						this.num = []
						this.setPage()
					}
				}
				console.log(this.pageNum)
				this.$emit('myPage',this.pageNum)
			},
		},
		watch:{
			pageCount(newValue,oldValue){
				this.pageNum = 1
				this.whoUse = 'myself'
				this.setPage()
			}
		},
		mounted(){
			 
		}
	}
</script>

<style scoped>
#pageNav{
	height: 30px;
	width: 300px;
}
#pageNav .page{
	width:48px;
	height:28px;
	line-height: 28px;
	text-align: center;
	float: left;
	margin-right: 5px;
	border: 1px solid #EAEAEA;
	cursor: pointer;
	-webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
#pageNav .notBan{
	background-color: #FFFFFF;
}
#pageNav .ban{
	background-color: #DDDDDD;
	color: #999999;
}
#pageNav .pageNum{
	float: left;
	width:28px;
	height:28px;
	border: 1px solid #EAEAEA;
	line-height: 28px;
	text-align: center;
	margin-right: 5px;
	cursor: pointer;
	background-color: #ffffff;
	-webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
#pageNav .active{
	float: left;
	width:30px;
	height:30px;
	line-height: 30px;
	margin-right: 5px;
	text-align: center;
	cursor: pointer;
	background-color: #303439;
	color: #ffffff;
}
</style>