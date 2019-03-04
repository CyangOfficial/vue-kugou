<template>
    <mt-header :title="title" class="search-bar" fixed>
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
            title: this.$store.state.activeTitle
        }
    }
}
</script>


<style>
#app .search-bar {
    width: 100%;
    height: 1rem;
    font-size: .3rem;
    position: fixed;
    top: 1rem;
    background: #fff;
    color: rgb(56, 56, 56);
    box-shadow: 0 0.07rem 0.07rem 0 #f4f4f4;
}
#app .search-bar button span i{
    font-size: .6rem;
    font-weight: bold;
    color: rgb(192, 192, 192);
}
#app .search-bar h1{
    font-size: .3677777rem;
}
</style>

