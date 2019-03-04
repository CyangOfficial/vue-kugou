<template>
    <div id="play-box" :style="{'top':top}">
        <div class="bg-overlay" ref="bgOverlay"></div>
        <div class="bg-play"></div>
        <header>
            <div 
                class="go-back"
                @touchstart.prevent="goback"
            ></div>
            <h1 class="song-name">{{singerName}}</h1>
        </header>
        <lyric
            :lyric="lyric"
            :current="currentTime"
        ></lyric>
        <control
            @next="()=>{$emit('next')}"
            @prev="()=>{$emit('prev')}"
            @playPause="()=>{$emit('playPause')}"
            :isPlay="isPlay"
            :totalTime="totalTime"
            :current="currentTime"
            @dragTime="(t)=>{$emit('dragTime',t)}"
        ></control>
    </div>
</template>

<script>
import control from '@/components/playbottom/control';
import lyric from '@/components/playbottom/lyric';
export default {
    data(){
        return {
            hash:this.$store.state.activeHash,
            url:'',
            singerName:''
        }
    },
    props:{
        top:{
            type:String,
            default:'0'
        },
        songInfo:{

        },
        isPlay:{
            type:Boolean
        },
        lyric:{

        },
        currentTime:{
            type:Number
        },
        totalTime:{
            type:Number
        }
    },
    methods:{
        goback(){
            this.$emit('backTop','100rem');
        },
        getUrl(){
            this.url = this.songInfo.imgUrl.replace('{size}',400);
            this.$refs.bgOverlay.style.backgroundImage =  `url(${this.url})`;
            this.singerName = this.songInfo.singerName;
        }
    },
    watch:{
        songInfo(){
            this.getUrl();
        }
    },
    components:{
        control,
        lyric
    }
}
</script>

<style>
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #play-box{
        position: fixed;
        top: 100rem;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.8);
        transition: .5s;
        overflow: hidden;
    }
    header{
        height: 1rem;
        font-size: .5rem;
        line-height: 1rem;
        position: relative;
        display: flex;
        z-index: 21;
    }
    header .go-back {
        background: url('../../assets/images/goback_1.png') no-repeat center;
        background-size: 50%;
        width: .6rem;
        height: 1rem;
    }
    header .song-name {
        color: #fff;
        margin: 0;
        font-size: .5rem;
        font-weight: normal;
        width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 .2rem;
    }
    .bg-overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: url('https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFlWa0CwNbA.jpg?max_age=2592000') no-repeat center;
        background-size: cover;
        filter: blur(10px);
    }
    .bg-play{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
    }
</style>


