<template>
    <mt-navbar v-model="selected" class="nav" fixed>
      <mt-tab-item
        class="nav-item" 
        :id="item.name"
        v-for="item in navBar"
        :key="item.name"
        @click.native="changeNav(item.name)"
      >{{item.title}}</mt-tab-item>
    </mt-navbar>
</template>

<script>
import {navBar} from '@/nav.js';
export default {
    data(){
        return {
            navBar: navBar,
            selected: ''
        }
    },
    watch:{
        //监听路由的变化
        '$route':{
            handler(){
                this.selected = this.$route.name;
            },
            // immediate:true立即执行
            immediate:true
        }
    },
    methods:{
        changeNav(name){
            //路由跳转
            this.$router.push({name});
        }
    }
}
</script>

<style>
#app .nav{
    top: 1rem; 
    /* border-bottom: .05rem solid #ccc; */
    box-shadow: 0 0.06rem 0.05rem 0 #f4f4f4;
}
#app .nav-item .mint-tab-item-label{
    font-size: .4rem;
}
#app .is-selected{
    margin-bottom: 0;
}
</style>


