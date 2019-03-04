<template>
    <div id="music">
        <div class="play-bottom" ref='playBoxTop'>
            <div class="play-left" @touchstart="showPlayBox">
                <img :src="songInfo.imgUrl | changeSize" />
                <span class="song-name">{{songInfo.fileName}}</span>
                <span class="singer-name">{{songInfo.choricSinger}}</span>
            </div>
            <div class="play-right">
                <div 
                    class="play-prev"
                    @touchstart="prev"
                ></div>
                <div 
                    class="pause-music"
                    :class="{'play-music':isPlay}"
                    @click="playPause"
                ></div>
                <div 
                    class="play-next"
                    @touchstart="next"
                ></div>
            </div>
        </div>
        <play-box
            :top="BoxTop"
            :songInfo="songInfo"
            :isPlay="isPlay"
            :lyric="lyric"
            :currentTime="currentTime"
            :totalTime="totalTime"
            @backTop="hidePlayBox"
            @next="next"
            @prev="prev"
            @playPause="playPause"
            @dragTime="changePlayTime"
        ></play-box>
        <audio ref='audio' preload :src="songInfo.url" ></audio>
    </div>
</template>
<script>
import playBox from '@/components/playbottom/playbox';
export default {
    data(){
        return {
            hash: this.$store.state.activeHash,
            list: this.$store.state.list,
            isPlay:false,
            songInfo:'',
            hash:this.$store.activeHash,
            songIndex:0,
            BoxTop: '100rem',
            lyric:'',
            currentTime:0,
            totalTime:0
        }
    },
    mounted(){
        this.$refs.audio.addEventListener('timeupdate',()=>{
            //监控播放位置的变化
            this.currentTime = this.audio.currentTime;
        });
    },
    watch:{
        '$store.state.list':{
            handler(data){
                this.list = data;
            }
        },
        '$store.state.songIndex':{
            handler(data){
                this.songIndex = data;
            }
        },
        '$store.state.activeHash':{
            handler(data){
                this.hash = data;
                this.getSong();
            }
        }
    },
    components:{
        playBox
    },
    methods:{
        changePlayTime(t){
            this.$refs.audio.currentTime = t;
        },
        showPlayBox(){
            this.BoxTop = '0';
        },
        getSong(){
            this.$ajax(`/api/app/i/getSongInfo.php?cmd=playInfo&hash=${this.hash}`).then(({data})=>{
                this.songInfo = data;
                this.$refs.playBoxTop.style.bottom = '0';
                this.audio = this.$refs.audio;
                this.$refs.audio.addEventListener('loadeddata',()=>{
                    this.audio = this.$refs.audio;
                    //播放
                    this.audio.play();
                    //获取当前歌曲的哈希值在当前列表this.list中hash值的下标
                    this.songIndex = this.list.findIndex(item=>this.hash == item.hash);
                    //获取音频的时长
                    this.totalTime = this.$refs.audio.duration
                });

                //ended查看当前歌曲是否播放结束
                this.$refs.audio.addEventListener('ended',()=>{
                    //结束后进行下一首歌曲
                    this.next();
                    // console.log('next');
                });
                this.$ajax(`/api/app/i/krc.php?cmd=100&hash=${this.hash}&timelength=1`).then((data)=>{
                    this.lyric = data;
                });
            });
        },
        next(){
            //下标++
            this.songIndex++;
            if(this.songIndex==this.list.length){
                this.songIndex = 0;
            }
            //提交给仓库，更新仓库中下一首歌曲的哈希值
            this.$store.commit('updateHash',this.list[this.songIndex].hash);
            this.isPlay = false;
        },
        prev(){
           this.songIndex--;
            if(this.songIndex<0){
                this.songIndex = this.list.length-1;
            }
           this.$store.commit('updateHash',this.list[this.songIndex].hash);
           this.isPlay = false;
        },
        playPause(){
            this.isPlay = !this.isPlay;
            if(!this.isPlay){
                this.audio.play();
            }else{
                this.audio.pause();
            }
        },
        hidePlayBox(val){
            this.BoxTop = val;
        }
    }
}
</script>

<style>
    .play-bottom {
        width: 100%;
        height:1.5rem;
        position: fixed;
        background: rgba(0,0,0,.9);
        left: 0;
        bottom: -100rem;
    }
    .play-bottom .play-left {
        width: 65%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #fff;
    }
    .play-bottom .play-left img{
        height: 1.4rem;
        position: absolute;
        border-radius: .1rem;
        width: 1.4rem;
        left: .05rem;
        top: .05rem;
    }
    .play-bottom .play-left .song-name{
        position: absolute;
        left: 1.7rem;
        top: .35rem;
        font-size: .3rem;
        width: 3.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .play-bottom .play-left .singer-name {
        position: absolute;
        left: 1.7rem;
        top: .8rem;
        color:#888;
        font-size: .26rem;
    }
    .play-bottom .play-right{
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 35%;
    }
    .play-bottom .play-right div{
        position: absolute;
        top: .3888888rem;
        width: .6rem;
        height: .6rem;
    }
     .play-bottom .play-right .play-prev{
         right: 2rem;
         background: url('../assets/images/next_icon.png') no-repeat center;
         background-size: cover;
         transform: rotate(180deg);
     }
     .play-bottom .play-right .pause-music{
        right: 1.05rem;
        background: url('../assets/images/pause_icon.png') no-repeat center;
        background-size: cover;
        top: .42rem;
     }
     .play-bottom .play-right .pause-music.play-music {
        background: url('../assets/images/play_icon.png') no-repeat center;
        background-size: cover;
     }
     .play-bottom .play-right .play-next{
        right: .1rem;
        background: url('../assets/images/next_icon.png') no-repeat center;
        background-size: cover;
        top: .42rem;
     }
</style>


