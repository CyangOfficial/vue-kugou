<template>
  <div id="app">
    <mt-header class="header" fixed>
      <router-link to="/" slot="left" class="down">
        <img class="logo" src="./assets/images/logo.png" />
        <span class="down-btn">下载酷狗</span>
      </router-link>
      <mt-button 
        class="search-btn" 
        icon="search" 
        slot="right"
        @touchstart.native="goSearch"
      ></mt-button>
    </mt-header>
    
    <router-view name="navbar"  />
    <router-view />
    <player></player>
  </div>
</template>

<script>
import player from '@/components/playbottom';
export default {
  methods:{
    goSearch(){
      this.$router.push({
        name:'search'
      });
      this.$store.commit('changeTitle','搜索');
    }
  },
  components:{
    player
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  text-decoration: none;
}
#app .header{
  height: 1rem;
}
.down{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo{
  width: 2.5rem;
}
.down-btn{
  width: 1.5rem;
  height: .4rem;
  line-height: .4rem;
  margin-left: .7143rem;
  border: 1px solid #fff;
  border-radius:.1rem;
  text-align: center;
  color: #fff;
  padding: 0.1rem;
  font-size: 0.3rem;
}
.search-btn i{
  font-size: .5rem;
}
</style>
