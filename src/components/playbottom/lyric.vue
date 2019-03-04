<template>
     <div class="lyric-area" ref="lyricBox">
            <ul :style="{'top':top}">
                <li 
                    ref="liH"
                    v-for="(item,index) in newRic"
                    :key="index"
                    :class="{'current':index==activeIndex}"
                 >{{item[1]}}</li>
            </ul>
        </div>
</template>

<script>
import {parseLyric} from '@/utils/utils';
export default {
    data(){
        return {
            activeIndex: -1,
            clientH:0,
            top:0
        }
    },
    props:{
        lyric:{
            
        },
        current:{
            type:Number
        }
    },
    computed:{
        newRic(){
            if(!this.lyric){
                return [['00:00','暂无歌词']];
            }
            return parseLyric(this.lyric.data);
        }
    },
    mounted(){
        //UL的高度
        this.clientH = this.$refs.lyricBox.clientHeight;
        //Li的高度
        this.liHeight = this.$refs.liH[0].offsetHeight;
        //算出li的中间值是第几个
        this.showLi = Math.ceil(this.clientH/this.liHeight/2);
        
    },
    watch:{
        current(t){
            for(let i = 0;i < this.newRic.length; i++){
                if(t>this.newRic[i][0]){
                    this.activeIndex = i;
                }else{
                    break;
                }
            }
        },
        activeIndex(n){
            let num = n < this.showLi?0:n-this.showLi;
            this.top = -this.liHeight * num + (-50)+ 'px';
        }
    } 
}
</script>

<style>
    .lyric-area{
        width: 100%;
        margin-top: .5rem;
        height: 9rem;
        position: relative;
        z-index: 1;
        overflow: hidden;
    }
    .lyric-area ul{
        margin: 0;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        font-size: .3rem;
        color: #fff;
        transition: .5s;
    }
    .lyric-area ul li{
        line-height: .8rem;
        padding: 0 .4rem;
    }
    .lyric-area ul li.current{
        color: #d1c90e;
        font-size: .4666666rem;
    }
</style>


