<template>
	<div id="title">
		<div class="sign"></div>
		<div class="banner">
			{{banner}}
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default{
		data(){
			return{

			}
		},
		props:{
			banner:String,
		},
		methods:{

		},
		mounted(){

		}
	}
</script>

<style>
#title{
	height: 60px;
	background-color: #ffffff;
	margin: 20px 20px 30px 20px;
	padding-left: 20px;
	border-radius: 10px;
}
.sign{
	height: 24px;
	width: 5px;
	background-color: #ffd04b;
	float: left;
	margin: 18px 10px 0 0;
}
#title .banner{
	height: 60px;
	color: #4B4B4B;
	font-weight: bold;
	line-height: 60px;
	font-size: 20px;
	float: left;
}
</style>