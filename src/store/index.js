import { createStore } from 'vuex'
import axios from "axios";
import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'
export default createStore({
  state: {
    localhost : "http://127.0.0.1:8000/api/",
    localhostimg: "http://127.0.0.1:8000/profil/",
    localhostposts: "http://127.0.0.1:8000/posts/",
    localhostmsg:"http://127.0.0.1:8000/messages_fichier/",
    search:'',
    posts:[],
    users:[],
    postsnb:0,
    livetoken:null,
    uid:null,
    member:[],
    channelName:'',
    appId:'27d1e82f5e8747d783f352cdb133bb4c'
  },
  getters: {
    posts(state){
      return state.posts
    },
     appId(state){
      return state.appId
    },
    users(state){
      return state.users
    },
    postnb(state){
      return state.postsnb
    },
    channelName(state){
      return state.channelName
    },
    uid(state){
      return state.uid
    },
    token(state){
      return state.livetoken
    }
  },
 
  mutations: {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setmember(state, member) {
    state.posts = member;
  },
  postnb(state, nb) {
    state.postsnb = nb;
  },
  addPosts(state, posts) {
    state.posts = [...state.posts, ...posts];
  },
  
  getusers(state, users) {
    state.users = users;
  },
   livetoken(state, token) {
    state.livetoken = token;
  },
  uids(state, uid) {
    state.uid = uid;
  },
  
  channelName(state, name) {
    state.channelName = name;
  }
},
actions: {
  async allposts({ commit, state }, page = 1) {
    try {
      let to = localStorage.getItem('id');
      let token = localStorage.getItem('token');

      const res = await axios.get(`${state.localhost}getpost/${to}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const allposts = res.data.posts;
      const users = res.data.users;
      const num=res.data.postnb;
      const posts = allposts.map(post => {
        let mediaArray = [];
        let hashtag = [];
        let tags = [];

        if (post.medias) {
          try {
            mediaArray = JSON.parse(post.medias);
          } catch (e) {
            console.error(e);
          }
        }

        if (typeof post.hashtag === 'string') {
          hashtag = post.hashtag.split(',').map(h => h.trim());
        }

        if (typeof post.tags === 'string') {
          tags = post.tags.split(',').map(t => t.trim());
        }

        return {
          id: post.id,
          name: post.user?.name || 'Utilisateur inconnu',
          avatar: post.user.avatar ? state.localhostimg + post.user.avatar : '../../img/male_user_500px.png',
          date: dayjs(post.created_at).fromNow(),
          content: post.contents || '',
          color: post.color || '',
          colorpostContent: post.colorpostcontent || '',
          visibility: post.visibility || 2,
          tags: tags,
          user_id: post.user.id,
          is_premium: post.user.is_premium,
          comnb: post.comnb,
          hashtag: hashtag,
          likes: post.likes || 0,
          liked: post.liked,
          commentsList: [],
          newComment: '',
          media: Array.isArray(mediaArray)
            ? mediaArray.map(m => ({
              url: state.localhostposts + m.url,
              type: m.type
            }))
            : []
        };
      });

      if (page === 1) {
        commit('setPosts', posts);
        commit('getusers', users);
        commit('postnb',num)
      } else {
        commit('addPosts', posts);
      }

      return res.data.next_page;

    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
      return null;
    }
  }
},

  modules: {
  }
})
