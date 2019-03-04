<template>
    <div id="main">
         <mt-cell 
            v-for="item in info"
            :key="item.id"
            class="rank-item"
            is-link
            @click.native="goList(item)"
         >
             <img :src="item.imgurl | changeSize" class="img" />
             <span class="title">{{item.specialname}}</span>
             <span class="playcount">
                 <i class="icon-music"></i>
                 {{item.playcount}}
                 </span>
         </mt-cell>
    </div>
</template>

<script>
export default {
    data(){
        return {
            info:[]
        }
    },
    async created(){
        let {data} = await this.$ajax('/api/plist/index?json=true');
        this.info = data.plist.list.info;
        //  console.log(data)
    },
    methods:{
        goList(item){
            this.$router.push({
                name:'songMenu',    
                params:{
                    id:item.specialid
                }
            });
            this.$store.commit('changeTitle',item.specialname);
        }
    }
}
</script>

<style scoped>
#main{
    position: relative;
    top: 2.2rem;
}
#main .rank-item{
    height: 2.33333rem;
    display: flex;
    position: relative;
}
#main .rank-item img{
    width: 2rem;
    position: absolute;
    left: .5rem;
    height: 2rem;
}
#main .rank-item .title{
    color: #333;
    font-size: .3666666rem;
    text-align: left;
    position: absolute;
    width: 3.888888rem;
    line-height: .5888888rem;
    left: 40%;
}
#main .rank-item .playcount{
    position: absolute;
    left: 40%;
    top: 1.8rem;
}
#main .rank-item .playcount i{
    display: inline-block;
    background: url('../assets/images/icon_music.png') no-repeat;
    background-size: cover;
    width: .2888888rem;
    height: .2888888rem;
}
</style>


