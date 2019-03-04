<template>
    <div id="main">
         <mt-cell  
            class="singer-item" 
            v-for="item in list" 
            :key="item.singerid"
            @click.native="goInfo(item)"
         >
             <img  :src="item.imgurl | changeSize" />
             <span>{{item.singername}}</span>
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
    async created(){
        let {data} = await this.$ajax(`/api/singer/list/${this.$route.params.id}?json=true`);
        this.list = data.singers.list.info;
    },
    methods:{
        goInfo(item){
            this.$router.push({
                name:'singerInfo',
                params:{
                    id:item.singerid
                }
            });
            console.log(item);
            this.$store.commit('changeTitle',item.singername);
        }
    }
}
</script>

<style scoped>
    #main{
        margin-top: 2rem;
    }
    .singer-item{
        height: 2rem;
        display:flex;
        position: relative;
    }
    .singer-item img{
        position: absolute;
        left: .5rem;
        height: 1.5rem;
        width:1.5rem;
    }
    .singer-item span{
        position: absolute;
        left: 2.5rem;
        color: #333;
    }
</style>


