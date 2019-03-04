<template>
    <div id="main">
        <mt-swipe :auto="4000" class="slide">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.imgurl" />
            </mt-swipe-item>
        </mt-swipe>
        <song-list :list="list"></song-list>
    </div>
</template>

<script>
import songList from '@/components/songlist';
export default {
    data(){
        return {
            list:[],
            banner:[]
        }
    },
    async created(){  
        let {data} = await this.$ajax('/api?json=true');
        this.list = data.data;
        this.banner = data.banner;
    },
    components:{
        songList
    }
}
</script>

<style scoped>
#main .slide{
    height: 3rem;
    width: 100%;
    margin-top: 2.2rem;
}
.slide img{
    width: 100%;
}
.slide .mint-swipe-indicators{
    bottom: .188888rem;
}
.slide .mint-swipe-indicator.is-active{
    opacity: .8;
}

</style>


