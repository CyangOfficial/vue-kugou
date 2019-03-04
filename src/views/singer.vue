<template>
    <div id="main">
        <ul class="list" >
            <li
                v-for="item in list" 
                :key="item.classid"
                @click="goSinger(item)"
            >
                <a href="javascript:;">{{item.classname}}</a>
            </li>
        </ul>
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
        let {data} = await this.$ajax('/api/singer/class?json=true');
        this.list = data.list;
    },
    methods:{
        goSinger(item){
            console.log(item)
            this.$router.push({
                name:'singerList',
                params:{
                    id:item.classid
                }
            });
            this.$store.commit('changeTitle',item.classname);
        }
    }
}
</script>


<style scoped>
#main{
    position: relative;
    top: 2.2rem;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
    width: 90%;
    margin: 0 auto;
}
#main .list{
    margin-top: .4rem;
    margin-bottom: .4rem;
}
#main .list li{
    background: #fbfbfb;
    border: 1px solid #e4e4e4;
    height: .8333333rem;
    display: flex;
    align-items: center;
    border-radius: .1rem;
    text-align: left;
    text-indent: .3rem;
}
li:nth-child(1),li:nth-child(4),li:nth-child(7){
    margin-bottom: .5rem;
}
#main .list li a{
    color: #333;
    font-size: .3rem;
}
</style>
