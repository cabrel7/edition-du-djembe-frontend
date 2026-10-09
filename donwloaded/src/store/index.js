import { createStore } from "vuex";
import axios from "axios";

// --------- HELPER GLOBAL POUR AJOUTER L’URL SUR COVER ---------
function applyCover(items, baseUrl) {
  if (!items) return [];
  return items.map(item => ({
    ...item,
    cover: item?.cover ? `${baseUrl}/${item.cover}` : item?.cover ?? null
  }));
}

export default createStore({
  state: {
 localhost: "https://api.leseditionsdudjembe.com/api/",

    // BASE URL DES IMAGES
    articlecover: "https://api.leseditionsdudjembe.com/articles",
    bookcover: "https://api.leseditionsdudjembe.com/books/covers",
    memoircover: "https://api.leseditionsdudjembe.com/memoirs/covers",
    videocover: "https://api.leseditionsdudjembe.com/video",

    user: null,
authChecked: false,
    // DONNEES EXISTANTES (avec token)
    // articles: [],
    books: [],
    memoirs: [],
    articles: [],
    adminData: {
      categories: [],
      domaine: [],
      service_requests: [],
      orders: [],
      services: [],
      users: [],
      videos: [],
      books: [],
      articles: [],
      memoirs: []
    },

    // DONNEES PUBLIQUES (sans token)
    publicData: {
      lastArticles: [],
      lastMemoirs: [],
      lastBooks: [],

      allArticles: [],
      allBooks: [],
      allMemoirs: [],
      allVideos: [],
      allCategories: [],
      allDomaine: [],
      allServices: [],
    },

    // pagination données existantes
    bookNextCursor: null,
    articleNextCursor: null,
    memoirNextCursor: null,

    bookHasMore: false,
    articleHasMore: false,
    memoirHasMore: false,

    // pagination données publiques
    publicBookNextCursor: null,
    publicArticleNextCursor: null,
    publicMemoirNextCursor: null,
    publicVideoNextCursor: null,

    publicBookHasMore: false,
    publicArticleHasMore: false,
    publicMemoirHasMore: false,
    publicVideoHasMore: false,
  },

  getters: {
    isAuthenticated: (state) => state.user !== null,
    isAdmin: (state) => state.user && state.user.role === 1,
    authChecked: (state) => state.authChecked,
    getUser: (state) => state.user,

    getArticles: (state) => state.articles,
    getBooks: (state) => state.books,
    getMemoirs: (state) => state.memoirs,

    hasMoreBooks: (state) => state.bookHasMore,
    hasMoreArticles: (state) => state.articleHasMore,
    hasMoreMemoirs: (state) => state.memoirHasMore,

    getPublicData: (state) => state.publicData,

    getLastArticles: (state) => state.publicData.lastArticles,
    getLastMemoirs: (state) => state.publicData.lastMemoirs,
    getLastBooks: (state) => state.publicData.lastBooks,

    getAllArticles: (state) => state.publicData.allArticles,
    getAllBooks: (state) => state.publicData.allBooks,
    getAllMemoirs: (state) => state.publicData.allMemoirs,
    getAllVideos: (state) => state.publicData.allVideos,
    getAllCategories: (state) => state.publicData.allCategories,
    getAllDomaine: (state) => state.publicData.allDomaine,
    getAllServices: (state) => state.publicData.allServices,

    hasMorePublicBooks: (state) => state.publicBookHasMore,
    hasMorePublicArticles: (state) => state.publicArticleHasMore,
    hasMorePublicMemoirs: (state) => state.publicMemoirHasMore,
    hasMorePublicVideos: (state) => state.publicVideoHasMore,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
     SET_AUTH_CHECKED(state, value) {
      state.authChecked = value;
    },
     deleteCategorie(state, id) {
    if (!state.adminData.categories) return
    state.adminData.categories = state.adminData.categories.filter(m => m.id !== id) 
  },
   deleteDomain(state, id) {
    if (!state.adminData.domaine) return
    state.adminData.domaine = state.adminData.domaine.filter(m => m.id !== id) 
  },

 // ====== DELETE ARTICLE ======
  deleteArticle(state, articleId) {
    //  console.log(articleId)
    if (!state.articles) return
    // console.log(articleId)
    state.articles = state.articles.filter(a => a.id !== articleId) 
  },

  // ====== DELETE BOOK ======
  deleteBook(state, bookId) {
    if (!state.books) return
    state.books = state.books.filter(b => b.id !== bookId) 
  },

  // ====== DELETE MEMOIR ======
  deleteMemoir(state, memoirId) {
    if (!state.memoirs) return
    state.memoirs = state.memoirs.filter(m => m.id !== memoirId) 
  },

  // ====== DELETE VIDEO ======
  deleteVideo(state, videoId) {
    if (!state.adminData.videos) return

    state.adminData.videos = state.adminData.videos.filter(v => v.id !== videoId) 
  },
    // -------- ADMIN BASE --------
    SET_ADMIN_DATA(state, data) {
      state.adminData = {
        ...state.adminData,
        ...data,
        videos: applyCover(data.videos, state.videcover),
        books: applyCover(data.books, state.bookcover),
        articles: applyCover(data.articles, state.articlecover),
        memoirs: applyCover(data.memoirs, state.memoircover),
      };
    },

    // ---------- ARTICLES (ADMIN) ----------
    setArticles(state, data) {
      state.articles = applyCover(data, state.articlecover);
    },
    pushArticles(state, data) {
      state.articles = [...state.articles, ...applyCover(data, state.articlecover)];
    },
    setArticlePagination(state, { next, hasmore }) {
      state.articleNextCursor = next;
      state.articleHasMore = hasmore;
    },

    // ---------- BOOKS (ADMIN) ----------
    setBooks(state, data) {
      state.books = applyCover(data, state.bookcover);
    },
    pushBooks(state, data) {
      state.books = [...state.books, ...applyCover(data, state.bookcover)];
    },
    setBookPagination(state, { next, hasmore }) {
      state.bookNextCursor = next;
      state.bookHasMore = hasmore;
    },

    // ---------- MEMOIRS (ADMIN) ----------
    setMemoirs(state, data) {
      state.memoirs = applyCover(data, state.memoircover);
    },
    pushMemoirs(state, data) {
      state.memoirs = [...state.memoirs, ...applyCover(data, state.memoircover)];
    },
    setMemoirPagination(state, { next, hasmore }) {
      state.memoirNextCursor = next;
      state.memoirHasMore = hasmore;
    },

    // ---------- HOME PUBLIC ----------
    setHomeData(state, data) {
      state.publicData.lastArticles = applyCover(data.lastarticles, state.articlecover);
      state.publicData.lastMemoirs = applyCover(data.lastmemoirs, state.memoircover);
      state.publicData.lastBooks = applyCover(data.lastbooks, state.bookcover);
    },

    // ---------- PUBLIC COLLECTIONS ----------
    setPublicCollections(state, data) {
      state.publicData.allCategories = data.categories || [];
      state.publicData.allDomaine = data.domaine || [];
      state.publicData.allServices = data.services || [];
      state.publicData.allVideos = applyCover(data.video, state.videcover);
      state.publicData.allBooks = applyCover(data.books, state.bookcover);
      state.publicData.allArticles = applyCover(data.articles, state.articlecover);
      state.publicData.allMemoirs = applyCover(data.memoirs, state.memoircover);
    },

    // ---------- PUBLIC ARTICLES ----------
    setPublicArticles(state, data) {
      state.publicData.allArticles = applyCover(data, state.articlecover);
    },
    pushPublicArticles(state, data) {
      state.publicData.allArticles = [
        ...state.publicData.allArticles,
        ...applyCover(data, state.articlecover)
      ];
    },
    setPublicArticlePagination(state, { next, hasmore }) {
      state.publicArticleNextCursor = next;
      state.publicArticleHasMore = hasmore;
    },

    // ---------- PUBLIC BOOKS ----------
    setPublicBooks(state, data) {
      state.publicData.allBooks = applyCover(data, state.bookcover);
    },
    pushPublicBooks(state, data) {
      state.publicData.allBooks = [
        ...state.publicData.allBooks,
        ...applyCover(data, state.bookcover)
      ];
    },
    setPublicBookPagination(state, { next, hasmore }) {
      state.publicBookNextCursor = next;
      state.publicBookHasMore = hasmore;
    },

    // ---------- PUBLIC MEMOIRS ----------
    setPublicMemoirs(state, data) {
      state.publicData.allMemoirs = applyCover(data, state.memoircover);
    },
    pushPublicMemoirs(state, data) {
      state.publicData.allMemoirs = [
        ...state.publicData.allMemoirs,
        ...applyCover(data, state.memoircover)
      ];
    },
    setPublicMemoirPagination(state, { next, hasmore }) {
      state.publicMemoirNextCursor = next;
      state.publicMemoirHasMore = hasmore;
    },

    // ---------- PUBLIC VIDEOS ----------
    setPublicVideos(state, data) {
      state.publicData.allVideos = applyCover(data, state.videcover);
    },
    pushPublicVideos(state, data) {
      state.publicData.allVideos = [
        ...state.publicData.allVideos,
        ...applyCover(data, state.videcover)
      ];
    },
    setPublicVideoPagination(state, { next, hasmore }) {
      state.publicVideoNextCursor = next;
      state.publicVideoHasMore = hasmore;
    },
  },

  actions: {
   async checkAuth({ commit, dispatch, state }) {
      const token = localStorage.getItem("token");
      const isConnected = localStorage.getItem("isconnect") === "1";
      const userData = localStorage.getItem("userData");

      if (token && isConnected && userData) {
        try {
          const user = JSON.parse(userData);
          commit("setUser", user);

          // Vérifier la validité du token avec une requête API
          try {
            // Optionnel : faire une requête pour vérifier que le token est toujours valide
            if (user.role === 1) {
              await dispatch("fetchAdminBase");
            }
          } catch (error) {
            console.warn("Token invalide ou expiré, déconnexion...", error);
            throw new Error("Token invalide");
          }

          commit("SET_AUTH_CHECKED", true);
          return { authenticated: true, isAdmin: user.role === 1 };
        } catch (error) {
          console.error("Erreur lors de la vérification de l'auth:", error);
          dispatch("logout");
          commit("SET_AUTH_CHECKED", true);
          return { authenticated: false, isAdmin: false };
        }
      }
      commit("SET_AUTH_CHECKED", true);
      return { authenticated: false, isAdmin: false };
    },

    // Action de login améliorée
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post(
          `${this.state.localhost}login`,
          credentials
        );

        if (response.data.token && response.data.user) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isconnect", "1");
          localStorage.setItem("userData", JSON.stringify(response.data.user));

          commit("setUser", response.data.user);

          // Si admin, charger les données admin
          if (response.data.user.role === 1) {
            await dispatch("fetchAdminBase");
          }

          // Déclencher un événement personnalisé pour notifier la connexion
          window.dispatchEvent(new Event("user-logged-in"));

          return { success: true, data: response.data };
        } else {
          throw new Error("Réponse invalide du serveur");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
    },

    // Action de logout améliorée
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("isconnect");
      localStorage.removeItem("userData");
      localStorage.removeItem("redirectAfterLogin");

      commit("setUser", null);
      commit("SET_AUTH_CHECKED", false);

      // Déclencher un événement personnalisé pour notifier la déconnexion
      window.dispatchEvent(new Event("user-logged-out"));

      // Rediriger vers la page de login si on est sur une page admin
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    },

    // Action pour initialiser l'authentification au démarrage
    async initializeAuth({ dispatch }) {
      await dispatch("checkAuth");
    },
    // -------- HOME PUBLIC --------
    async fetchHomeData({ commit, state }) {
      const response = await axios.get(`${state.localhost}getbasedata`);
      commit('setHomeData', response.data);
      return response.data;
    },

    // -------- PUBLIC BASE --------
    async fetchAllPublicData({ commit, state }) {
      const response = await axios.get(`${state.localhost}data/`+'null');
      commit('setPublicCollections', response.data);

      commit('setPublicArticlePagination', {
        next: response.data.articlenexturl,
        hasmore: response.data.hasmorearticle,
      });
      commit('setPublicBookPagination', {
        next: response.data.booknexturl,
        hasmore: response.data.hasmorebook,
      });
      commit('setPublicMemoirPagination', {
        next: response.data.memoirnexturl,
        hasmore: response.data.hasmorememoir,
      });
      commit('setPublicVideoPagination', {
        next: response.data.videonextUrl,
        hasmore: response.data.hasmorevideo,
      });

      return response.data;
    },

    // -------- PUBLIC PAGINATION --------
    async fetchPublicArticles({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/article`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicArticles", res.data.articles || []);
      else commit("pushPublicArticles", res.data.articles || []);
      commit("setPublicArticlePagination", {
        next: res.data.articlenexturl,
        hasmore: res.data.hasmorearticle,
      });
      return res.data;
    },

    async fetchPublicBooks({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/book`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicBooks", res.data.books || []);
      else commit("pushPublicBooks", res.data.books || []);
      commit("setPublicBookPagination", {
        next: res.data.booknexturl,
        hasmore: res.data.hasmorebook,
      });
      return res.data;
    },

    async fetchPublicMemoirs({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/memoir`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicMemoirs", res.data.memoirs || []);
      else commit("pushPublicMemoirs", res.data.memoirs || []);
      commit("setPublicMemoirPagination", {
        next: res.data.memoirnexturl,
        hasmore: res.data.hasmorememoir,
      });
      return res.data;
    },

    async fetchPublicVideos({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/video`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicVideos", res.data.video || []);
      else commit("pushPublicVideos", res.data.video || []);
      commit("setPublicVideoPagination", {
        next: res.data.videonextUrl,
        hasmore: res.data.hasmorevideo,
      });
      return res.data;
    },

    // -------- ADMIN BASE --------
    async fetchAdminBase({ commit, state }) {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${state.localhost}adminbase`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      commit('SET_ADMIN_DATA', response.data);
      return response.data;
    },

    // -------- ADMIN ARTICLES --------
    async fetchArticles({ commit, state }, cursor = null) {
      const token = localStorage.getItem("token");
      let url = `${state.localhost}getarticle`;
      if (cursor) url += `?cursor=${cursor}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!cursor) commit("setArticles", res.data.articles);
      else commit("pushArticles", res.data.articles);

      commit("setArticlePagination", {
        next: res.data.nexturl,
        hasmore: res.data.hasmore,
      });
    },

    // -------- ADMIN BOOKS --------
    async fetchBooks({ commit, state }, cursor = null) {
      const token = localStorage.getItem("token");
      let url = `${state.localhost}getbook`;
      if (cursor) url += `?cursor=${cursor}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!cursor) commit("setBooks", res.data.books);
      else commit("pushBooks", res.data.books);

      commit("setBookPagination", {
        next: res.data.nexturl,
        hasmore: res.data.hasmore,
      });
    },

    // -------- ADMIN MEMOIRS --------
    async fetchMemoirs({ commit, state }, cursor = null) {
      const token = localStorage.getItem("token");
      let url = `${state.localhost}getmemoir`;
      if (cursor) url += `?cursor=${cursor}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!cursor) commit("setMemoirs", res.data.memoirs);
      else commit("pushMemoirs", res.data.memoirs);

      commit("setMemoirPagination", {
        next: res.data.nexturl,
        hasmore: res.data.hasmore,
      });
    },
  },
});
