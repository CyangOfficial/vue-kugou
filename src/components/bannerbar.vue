<template>
    <mt-header :title="title" class="banner-bar">
        <mt-button
            icon="back" 
            slot="left"
            @click="$router.go(-1)"
        ></mt-button>
    </mt-header>
</template>

<script>
export default {
    data(){
        return {
            title:''
        }
    },
    created(){
        this.title = this.$store.state.activeTitle;
        // console.log(this.$store.state.activeTitle);
    }
}
</script>


<style>
#app .banner-bar {
    width: 100%;
    height: 1rem;
    font-size: .3rem;
    position: fixed;
    top: 1rem;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    color: #FFF;
    z-index: 2;
}
#app .banner-bar button span i{
    font-size: .6rem;
    font-weight: bold;
    color: rgb(192, 192, 192);
}
#app .banner-bar h1{
    font-size: .3677777rem;
    overflow:visible;
}
</style>

