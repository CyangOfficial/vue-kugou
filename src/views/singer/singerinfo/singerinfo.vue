<template>
     <div id="main">
        <div class="banner">
            <div class="img">
                <img :src="imgUrl | changeSize" />
            </div>
        </div>
         <div 
            class="info"
            :class="{'open':isOpen}"
            @touchstart="changeOpen"
            ref="info"
        >{{info}}</div>
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
            info:'',
            isOpen:false
        }
    },
    async created(){
        let {data} = await this.$ajax(`/api/singer/info/${this.$route.params.id}?json=true`);
        this.list = data.songs.list;
        this.imgUrl = data.info.imgurl;
        this.info = data.info.intro;
        console.log(data)
    },
    methods:{
         changeOpen(e){
            this.isOpen = !this.isOpen;
            this.$refs.info.style.height=this.isOpen?'auto':'.4rem';
        }
    },
    components:{
        songList
    }
}
</script>

<style>
.banner{
    width: 100%;
    left: 0;
    position: relative;
}
.banner .img {
    height: 5rem;
    overflow: hidden;
}
.banner .img img{
    width: 100%;
}
.info{
    text-align: left;
    font-size: .3444444rem;
    position: relative;
    line-height: .5444444rem;
    color: #888;
    padding: .2rem .8rem .2rem .2rem;
    z-index: 3;
    box-shadow: 0 0.07rem 0.07rem 0 #f4f4f4;
    height: .4rem;
    overflow: hidden;
}
.info:after{
    position: absolute;
    display: block;
    content: '';
    width: .4rem;
    height: .4rem;
    right: .2rem;
    top: .2rem;
    background: url('../../../assets/images/close_icon.png') no-repeat;
    background-size: cover;
}
.info.open:after{
    position: absolute;
    display: block;
    content: '';
    width: .4rem;
    height: .4rem;
    right: .2rem;
    top: .2rem;
    background: url('../../../assets/images/open_icon.png') no-repeat;
    background-size: cover;
}
</style>


