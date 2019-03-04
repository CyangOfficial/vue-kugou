import newSong from '@/views/new-song';//新歌
import rank from '@/views/rank';//排行
import singer from '@/views/singer';//歌手
import songList from '@/views/song-list';//歌单
import nav from '@/components/nav';

export const navBar = [
    {
        path: '/',
        name: 'newsong',
        title: '新歌',
        components: {
            default:newSong,
            navbar:nav
        }
    },
    {
        path: '/rank',
        name: 'rank',
        title: '排行',
        components: {
            default:rank,
            navbar:nav
        }
    },
    {
        path: '/songList',
        name: 'songList',
        title: '歌单',
        components: {
            default:songList,
            navbar:nav
        }
    },
    {
        path: '/singer',
        name: 'singer',
        title: '歌手',
        components: {
            default:singer,
            navbar:nav
        }
    },
    
]