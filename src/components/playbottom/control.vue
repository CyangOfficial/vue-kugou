<template>
    <div class="m-bottom">
            <div class="progress-box">  
                <span ref="currentTime" class="current-time">{{newCurrentTime}}</span>
                <div class="sliding-block">
                    <div 
                        class="progress-line" 
                        ref="allLine"
                        @touchstart="downTime"
                    >
                        <div class="progress-lineed" :style="{'width':endX + 'px'}"></div>
                    </div>
                    <div 
                        class="progress-circle"
                        ref="circle"
                        @touchstart="start"
                        @touchmove="move"
                        @touchend="end"
                        :style="{'left':endX + 'px'}"
                    ></div>
                </div> 
                <span class="total-time" ref="totalTime">{{newTotalTime}}</span>
            </div>
            <div class="play-control">
                <div class="prev" @touchstart="()=>{$emit('prev')}"></div>
                <div 
                    class="pause" 
                    :class="{'play':isPlay}" 
                    @touchstart="()=>{$emit('playPause')}"
                ></div>
                <div class="next" @touchstart="()=>{$emit('next')}"
                ></div>
            </div>
        </div>
</template>

<script>
import {sToM} from '@/utils/utils';
export default {
    data(){
        return {
            //进度条的总长度
            lineWid:0,
            totalWid:0,
            maxX:0,
            downClient:{},
            downPos:0,
            circleL:0,
            isDrag:false,
            dragedTime:0,
            allLineL:0
        }
    },
    mounted(){
        //进度条的总长度
        this.lineWid = this.$refs.allLine.offsetWidth;
        //圆拖拽的最大距离
        this.maxX = this.lineWid - this.$refs.circle.offsetWidth/2;
        console.log(this.$refs.circle.offsetWidth/2)
    },
    props:{
        //是否播放
        isPlay:{
            type: Boolean
        },
        //总时间
        totalTime:{
            type: Number
        },
        //当前歌曲播放的时间
        current:{
            
        }
    },
    computed:{
        //计算属性：当数据发生变化时才会改变要计算的属性，当相关数据没有变化时，它会读取缓存
        //总时间
        newTotalTime(){
            return sToM(this.totalTime);
        },
        //当前播放的时间
        newCurrentTime(){
            return sToM(this.current);
        },
        endX(){
            if(this.totalWid < 0){
                this.totalWid = 0;
            }else if(this.totalWid > this.maxX){
                this.totalWid = this.maxX;
            }
            return this.totalWid;
        }
    },
    watch:{
        current:{
            handler(t){
                if(this.isDrag) return;
                //进度条线的长度 = 当前时间/总时间*线的宽度
                this.totalWid = t / this.totalTime * this.lineWid;
                // console.log(this.totalWid,this.maxX);
            }
        }
    },
    methods:{
        start(e){
            this.isDrag = true;
        },
        move(e){
            //进度条距离可视区左侧的left值
            this.allLineL = this.$refs.allLine.getBoundingClientRect().left;
            //当前进度条的位置
            let maxWid = e.changedTouches[0].pageX - this.allLineL;
            if(maxWid >  this.lineWid){
                maxWid = this.lineWid;
            }
            this.circleL = this.totalWid = maxWid;
            console.log(this.circleL)
        },
        end(){
            this.isDrag = false;
            //鼠标抬起后的时间点
            this.dragedTime = this.totalWid / this.lineWid * this.totalTime;
            this.$emit('dragTime',this.dragedTime);
        },
        downTime(e){
            let downL = e.changedTouches[0].pageX - this.allLineL;
            let downedTime = downL / this.lineWid * this.totalTime;
            this.$emit('dragTime',downedTime);
        }
    }
}
</script>

<style>
    .m-bottom{
        position: relative;
        z-index: 5;
        top: .5rem;
    }
    .m-bottom .progress-box{
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .m-bottom .progress-box span{
        font-size: .3rem;
        color: #fff;
    }
    .m-bottom .progress-box .sliding-block{
        width: 7rem;
        padding: 0 .2rem;
        position: relative;
    }
    .m-bottom .progress-box .sliding-block .progress-line{
        width: 100%;
        height: .05rem;
        background: #9c8d88;
    }
    .m-bottom .progress-box .progress-lineed{
        width: 0;
        height: .05rem;
        background: #3195fd;
    }
    .m-bottom .progress-box .progress-circle{
        width: .3rem;
        height: .3rem;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 0.13rem;
        top: -0.13rem;
    }
    .m-bottom .play-control{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 5rem;
        margin: .5rem auto 0;
    }
    .m-bottom .play-control .prev{
        width: 1rem;
        height: 1rem;
        background: url('../../assets/images/play_prev.png') no-repeat;
        background-size: cover;
    }
    .m-bottom .play-control .pause{
        width: 1rem;
        height: 1rem;
        background: url('../../assets/images/play_pause.png') no-repeat;
        background-size: cover;
    }
    .m-bottom .play-control .pause.play{
        width: 1rem;
        height: 1rem;
        background: url('../../assets/images/play_play.png') no-repeat;
        background-size: cover;
    }
    .m-bottom .play-control .next{
        width: 1rem;
        height: 1rem;
        background: url('../../assets/images/play_next.png') no-repeat;
        background-size: cover;
    }
</style>
