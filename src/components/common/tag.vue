<template>
	<div id="tag">
		<div class="tag">
			<div class="tagName" @mouseenter="addMask">{{tagName}}</div>
			<div class="tagMask" v-show="isShow" @mouseleave="removeMask">
				<img src="../../../static/X@2x.png" @click="deleteThis">
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default{
		data(){
			return{
				isShow:false,
			}
		},
		props:{
			tagName:String,
			index:Number,
			id:Number,
		},
		methods:{
			addMask(){
				this.isShow = true
			},
			removeMask(){
				this.isShow = false
			},
			deleteThis(){
				if(this.id != ''){
					this.$emit('deleteThis',this.index,this.id)
				}
				else{
					this.$emit('deleteThis',this.index)
				}
			},
		},
		mounted(){

		},
	}
</script>

<style>
#tag{
	float: left;
	width:168px;
	height:50px;
	margin-right: 5px;
	margin-bottom: 10px;
}
#tag .tag{
	width:151px;
	height:48px;
	border: 1px solid #333;
	margin: 10px 15px 0 0;
	padding-left: 15px;
	position: relative;
}
#tag .tagName{
	font-size: 18px;
	font-weight: bold;
	line-height: 50px;
}
#tag .tagMask{
	width:168px;
	height:50px;
	position: absolute;
	top: 0;
	left: 0;
}
#tag .tagMask img{
	height: 18px;
	width: 19px;
	float: right;
	cursor: pointer;
	margin: 16px 10px 0 0;
}	
</style>