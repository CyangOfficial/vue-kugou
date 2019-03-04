<template>
    <div id="main">
        <mt-cell 
            v-for="item in list"
            :key="item.id"
            class="rank-item"
            is-link
            @click.native="goList(item)"
         >
             <img :src="item.imgurl | changeSize" class="img" />
             <span>{{item.rankname}}</span>
         </mt-cell>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.$ajax('/api/rank/list?json=true').then((data)=>{
            this.list = data.data.rank.list;
        });
    },
    methods:{
        goList(item){
            this.$router.push({
                name:'rankList',
                params:{
                    id:item.rankid
            }
            });
            this.$store.commit('changeTitle',item.rankname);
        }
    }
}
</script>

<style scoped>
#main{
    position: relative;
}
#main .rank-item{
    height: 2.33333rem;
    display: flex;
    position: relative;
    top:2.2rem;
}
#main .rank-item img{
    width: 2rem;
    position: absolute;
    left: .5rem;
    height: 2rem;
}
#main .rank-item span{
    color: #333;
    font-size: .4rem;
    position: absolute;
    left: 40%;
}
</style>

