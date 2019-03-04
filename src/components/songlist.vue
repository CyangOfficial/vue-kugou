<template>
         <div class="new-songlist" :class="{'show-index':isShowIndex}">
            <mt-cell
                v-for="(item,index) in list"
                :key="item.audio_id"
                class="song-item"
                @touchstart.native="toPlay(item.hash,index)"
            >  
            <span class="serial">{{index+1}}</span>
            <span class="song-name">{{item.filename}}</span>
            <a class="down-song">
                <span
                    class="iconfont icon-download down-icon"
                    @touchstart.stop="downMusic"
                >
                </span>
            </a>   
            </mt-cell>
        </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array
        }
    },
    data(){
        return {
            isShowIndex:false
        }
    },
    created(){
        this.isShowIndex = this.$route.name  == 'rankList'?true:false;
    },
    methods:{
        toPlay(hash,index){
            this.$store.commit('changeList',this.list);
            this.$store.commit('updateHash',hash);
        },
        downMusic(){
            alert('暂不支持下载哦~');
        }
    }
}
</script>

<style>
.new-songlist{
    position: relative;
}
.new-songlist .song-item{
    min-height: 1.3rem;
    padding: 0 .2rem;
}
.song-item .mint-cell-wrapper{
    border-bottom: 1px solid #ccc;
    font-size: .3444444rem;
}
.song-item .serial{
    position: absolute;
    left: .5rem;
}
.song-item .song-name{
    width: 5.6222222rem;
    text-align: left;
    line-height: .4rem;
    /* border: 1px solid red; */
    position: absolute;
    left: .5rem;
}
.song-item .song-name .down-song{
    /* position: absolute;
    left: 3rem; */
}
.song-item .serial{
    display: none;
}
.show-index .serial{
    display: inline-block;
}
.song-item .serial{
    width: .4rem;
    line-height: .2666666rem;
    font-size: .2777777rem;
    border-radius: .1777777rem;
    padding: .0555555rem;
    left: .3888888rem;
}
.song-item:nth-child(1) .serial{
    background: rgb(232,0,0);
    color: #fff;
}
.song-item:nth-child(2) .serial{
    background: rgb(255,114,0);
    color: #fff;
}
.song-item:nth-child(3) .serial{
    background: rgb(248,179,0);
    color: #fff;
}
.show-index .song-name{
    left: 1.2rem;
}

.song-item .mint-cell-wrapper .mint-cell-title .mint-cell-text{
    line-height: .5666666rem;
}
.song-item .down-icon{
    font-weight: bold;
    font-size: .3888888rem;
}
.song-item .file-btn {
    display: none;
}
audio{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
}
</style>


