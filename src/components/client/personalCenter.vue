<template>
	<div id="personalCenter">
        <div class="middle">
            <div class="nav">
                <router-link to="/home/personalCenter/personalSetting">
                    <div class="navItem" :class="{selected:isSelected[0].state}"
                         @click="changePage(0)">账户信息</div>
                </router-link>
            </div>
            <div class="r-size">
                <router-view></router-view>
            </div>
        </div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default{
		data(){
			return{
                isSelected:[
                    {state:true},{state:false},
                ],
			}
		},
		methods:{
/*            changePage(n){
                if(n == 0){
                    this.isSelected[0].state = true
                    this.isSelected[1].state = false
                }
                else if(n == 1){
                    this.isSelected[0].state = false
                    this.isSelected[1].state = true
                }
            },
            setNav(){
                var url = window.location.href
                var u = url.split('#')
                if(u[1] == '/home/personalCenter/personalSetting'){
                    this.isSelected[0].state = true
                    this.isSelected[1].state = false
                }
                else if(u[1] == '/home/personalCenter/userOrder'){
                    this.isSelected[0].state = false
                    this.isSelected[1].state = true
                }
            }*/
		},
		mounted(){
		},
	}
</script>

<style>
.clearfix:after {
   content:""; 
   display: block; 
   clear:both; 
}
#personalCenter{
	height: 1000px;
	background-color: #fff;
	overflow: hidden;
}
#personalCenter .middle{
    width: 900px;
    min-height: 1000px;
    margin: 0 auto;
}
#personalCenter .nav{
    float: left;
    width: 150px;
    padding-top: 50px;
    min-height: 950px;
}
#personalCenter .nav .navItem{
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #333;
}
#personalCenter a{
    text-decoration: none;
}
#personalCenter .selected{
    font-weight: bold;
    font-size: 20px!important;
    color: darkcyan!important;
}
#personalCenter .r-size{
    float: left;
    width: 750px;
    min-height: 1000px;
}
</style>
