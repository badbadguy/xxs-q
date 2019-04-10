<template>
	<div id="tag2">
		<div class="tag2">
			<div class="tagName" @mouseenter="addMask">{{tagName}}</div>
			<div class="tagMask" v-show="isShow" @mouseleave="removeMask">
				<img src="../../assets/1.png" @click="deleteThis">
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
#tag2{
	float: left;
	width:100px;
	height:30px;
	margin: 10px 5px 0 0;
}
#tag2 .tag2{
	width:90px;
	height:28px;
	border: 1px solid #DDD;
	padding-left: 8px;
	position: relative;
}
#tag2 .tagName{
	line-height: 30px;
}
#tag2 .tagMask{
	width:100px;
	height:28px;
	position: absolute;
	top: 0;
	left: 0;
}
#tag2 .tagMask img{
	height: 12px;
	float: right;
	cursor: pointer;
	margin: 9px 5px 0 0;
}	
</style>
