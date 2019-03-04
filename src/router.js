import Vue from 'vue'
import Router from 'vue-router'
import {navBar} from './nav.js';
import search from '@/views/search';
import searchBar from '@/components/searchbar';
import bannerBar from '@/components/bannerbar';
import rankList from '@/views/rank/ranklist';
import songMenu from '@/views/songlist/songmenu';
import singerList from '@/views/singer/singerlist';
import singerInfo from '@/views/singer/singerinfo/singerinfo';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...navBar,
    {
      path:'/search',
      name:'search',
      title:'搜索',
      components:{
        default:search,
        navbar:searchBar
      }
    },
    {
      path:'/rank/info/:id',
      name:'rankList',
      title:'排行',
      components:{
        default:rankList,
        navbar:bannerBar
      }
    },
    {
      path:'/plist/list/:id',
      name:'songMenu',
      title:'歌单',
      components:{
        default:songMenu,
        navbar:bannerBar
      }
    },
    {
      path:'/singer/list/:id',
      name:'singerList',
      components:{
        default:singerList,
        navbar:searchBar
      }
    }
    ,
    {
      path:'/singer/info/:id',
      name:'singerInfo',
      components:{
        default:singerInfo,
        navbar:bannerBar
      }
    }
  ]
})
