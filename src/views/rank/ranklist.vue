<template>
    <div id="main">
        <div class="banner">
            <div class="img">
                <img :src="imgUrl | changeSize" />
            </div>
            <div class="update-time">上次更新时间：{{time}}</div>
        </div>
        <song-list :list="list"></song-list>
    </div>
</template>

<script>
import songList from '@/components/songlist';
export default {
    data(){
        return {
            list:[],
            imgUrl:'',
            time:''
        }
    },
    async created(){
        let str = `/api/rank/info/${this.$route.params.id}?json=true`;
        let {data} = await this.$ajax(str);
        this.list = data.songs.list;
        this.imgUrl = data.info.imgurl;
        this.time = new Date().getFullYear() + '-' +(new Date().getMonth()+1) + '-' +new Date().getDate();
    },
    components:{
        songList
    }
}
</script>

<style scoped>
.banner{
    width: 100%;
    left: 0;
    position: relative;
}
.banner .img {
    height: 5rem;
}
.banner .img img{
    width: 100%;
}
.banner .update-time{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    color: #fff;
    text-align: left;
    text-indent: .3rem;
    line-height: 1rem;
    font-size: .3rem;
    background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,0));
}
</style>


