import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //一级标题
    activeTitle:'',
    //当前歌曲的哈希值
    activeHash:'',
    //播放列表
    list:[],
    
  },
  mutations: {
    changeTitle(state,val){
      state.activeTitle = val;
    },
    updateHash(state,val){
      //改变当前播放歌曲的哈希值
      state.activeHash = val;
    },
    changeList(state,arr){
      //改变当前的播放列表
      state.list = arr;
    }
  },
  actions: {

  }
})
