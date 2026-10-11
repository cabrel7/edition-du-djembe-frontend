import { createStore } from "vuex";
import axios from "axios";

// --------- HELPER GLOBAL POUR AJOUTER L'URL SUR COVER ---------
function applyCover(items, baseUrl) {
  if (!items) return [];
  return items.map(item => ({
    ...item,
    cover: item?.cover ? `${baseUrl}/${item.cover}` : item?.cover ?? null,
    // Ajouter le support pour les photos de membres et logos de partenaires
    photo: item?.photo ? `${baseUrl}/${item.photo}` : item?.photo ?? null,
    image: item?.image ? `${baseUrl}/${item.image}` : item?.image ?? null
  }));
}

export default createStore({
  state: {
    localhost: "https://api.leseditionsdudjembe.com/api/",
    presse: "https://api.leseditionsdudjembe.com/",

    // BASE URL DES IMAGES
    articlecover: "https://api.leseditionsdudjembe.com/articles",
    bookcover: "https://api.leseditionsdudjembe.com/books/covers",
    memoircover: "https://api.leseditionsdudjembe.com/memoirs/covers",
    videocover: "https://api.leseditionsdudjembe.com/video",
    teamcover: "https://api.leseditionsdudjembe.com/team", // Ajout pour les membres d'équipe
    partnercover: "https://api.leseditionsdudjembe.com/partners", // Ajout pour les partenaires

    user: null,
    authChecked: false,
    
    // DONNEES EXISTANTES (avec token)
    books: [],
    memoirs: [],
    articles: [],
    downloads: 0,
    visitors: 0,
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
      memoirs: [],
      // AJOUT pour les membres d'équipe et partenaires
      team_members: [],
      partners: []
    },

    // DONNEES PUBLIQUES (sans token)
    publicData: {
      lastArticles: [],
      lastMemoirs: [],
      lastBooks: [],
      lastTeamMembers: [], // AJOUT
      lastPartners: [], // AJOUT

      allArticles: [],
      allBooks: [],
      allMemoirs: [],
      allVideos: [],
      allCategories: [],
      allDomaine: [],
      allServices: [],
      allTeamMembers: [], // AJOUT
      allPartners: [] // AJOUT
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
    publicTeamNextCursor: null, // AJOUT
    publicPartnerNextCursor: null, // AJOUT

    publicBookHasMore: false,
    publicArticleHasMore: false,
    publicMemoirHasMore: false,
    publicVideoHasMore: false,
    publicTeamHasMore: false, // AJOUT
    publicPartnerHasMore: false, // AJOUT
    pressReviews: [],
    pressReviewStats: {},
    currentPressReview: null,

  },

  getters: {
    isAuthenticated: (state) => state.user !== null,
    isAdmin: (state) => state.user && state.user.role === 1,
    authChecked: (state) => state.authChecked,
    getUser: (state) => state.user,
    getPressReviews: (state) => state.pressReviews,
    getPressReviewStats: (state) => state.pressReviewStats,
    getCurrentPressReview: (state) => state.currentPressReview,
    getArticles: (state) => state.articles,
    getBooks: (state) => state.books,
    getMemoirs: (state) => state.memoirs,
    getDownloads: (state) => state.downloads,
    getVisitors: (state) => state.visitors,

    hasMoreBooks: (state) => state.bookHasMore,
    hasMoreArticles: (state) => state.articleHasMore,
    hasMoreMemoirs: (state) => state.memoirHasMore,

    getPublicData: (state) => state.publicData,

    getLastArticles: (state) => state.publicData.lastArticles,
    getLastMemoirs: (state) => state.publicData.lastMemoirs,
    getLastBooks: (state) => state.publicData.lastBooks,
    getLastTeamMembers: (state) => state.publicData.lastTeamMembers, // AJOUT
    getLastPartners: (state) => state.publicData.lastPartners, // AJOUT

    getAllArticles: (state) => state.publicData.allArticles,
    getAllBooks: (state) => state.publicData.allBooks,
    getAllMemoirs: (state) => state.publicData.allMemoirs,
    getAllVideos: (state) => state.publicData.allVideos,
    getAllCategories: (state) => state.publicData.allCategories,
    getAllDomaine: (state) => state.publicData.allDomaine,
    getAllServices: (state) => state.publicData.allServices,
    getAllTeamMembers: (state) => state.publicData.allTeamMembers, // AJOUT
    getAllPartners: (state) => state.publicData.allPartners, // AJOUT

    hasMorePublicBooks: (state) => state.publicBookHasMore,
    hasMorePublicArticles: (state) => state.publicArticleHasMore,
    hasMorePublicMemoirs: (state) => state.publicMemoirHasMore,
    hasMorePublicVideos: (state) => state.publicVideoHasMore,
    hasMorePublicTeam: (state) => state.publicTeamHasMore, // AJOUT
    hasMorePublicPartners: (state) => state.publicPartnerHasMore, // AJOUT

    // AJOUT: Getters pour les données admin
    getTeamMembers: (state) => state.adminData.team_members,
    getPartners: (state) => state.adminData.partners
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    
    SET_AUTH_CHECKED(state, value) {
      state.authChecked = value;
    },
    
    setDat(state) {
      let download = 0;
      let visit = 0;
      console.log(state.books, 'wert', state.articles, 'hjk', state.memoirs);
      
      if (state.books && Array.isArray(state.books)) {
        state.books.forEach(element => {
          download += element.downloads_count || 0;
        });
      }
      
      if (state.memoirs && Array.isArray(state.memoirs)) {
        state.memoirs.forEach(element => {
          download += element.downloads_count || 0;
        });
      }
      
      if (state.articles && Array.isArray(state.articles)) {
        state.articles.forEach(element => {
          visit += element.views_count || 0;
        });
      }
      
      state.downloads = download;
      state.visitors = visit;
    },

    SET_PRESS_REVIEWS(state, data) {
      state.pressReviews = data;
    },

    SET_PRESS_REVIEW_STATS(state, data) {
      state.pressReviewStats = data;
    },

    SET_CURRENT_PRESS_REVIEW(state, data) {
      state.currentPressReview = data;
    },

    ADD_PRESS_REVIEW(state, data) {
      state.pressReviews.unshift(data);
    },

    UPDATE_PRESS_REVIEW(state, data) {
      const index = state.pressReviews.findIndex(p => p.id === data.id);
      if (index !== -1) {
        state.pressReviews[index] = { ...state.pressReviews[index], ...data };
      }
    },

    REMOVE_PRESS_REVIEW(state, id) {
      state.pressReviews = state.pressReviews.filter(p => p.id !== id);
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
      if (!state.articles) return
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

    // ====== AJOUT: DELETE TEAM MEMBER ======
    deleteTeamMember(state, memberId) {
      if (!state.adminData.team_members) return
      state.adminData.team_members = state.adminData.team_members.filter(t => t.id !== memberId) 
      // Mettre à jour aussi les données publiques si nécessaire
      if (state.publicData.allTeamMembers) {
        state.publicData.allTeamMembers = state.publicData.allTeamMembers.filter(t => t.id !== memberId)
      }
      if (state.publicData.lastTeamMembers) {
        state.publicData.lastTeamMembers = state.publicData.lastTeamMembers.filter(t => t.id !== memberId)
      }
    },

    // ====== AJOUT: DELETE PARTNER ======
    deletePartner(state, partnerId) {
      if (!state.adminData.partners) return
      state.adminData.partners = state.adminData.partners.filter(p => p.id !== partnerId) 
      // Mettre à jour aussi les données publiques si nécessaire
      if (state.publicData.allPartners) {
        state.publicData.allPartners = state.publicData.allPartners.filter(p => p.id !== partnerId)
      }
      if (state.publicData.lastPartners) {
        state.publicData.lastPartners = state.publicData.lastPartners.filter(p => p.id !== partnerId)
      }
    },

    // -------- ADMIN BASE --------
    SET_ADMIN_DATA(state, data) {
      state.adminData = {
        ...state.adminData,
        ...data,
        videos: applyCover(data.videos, state.videocover),
        books: applyCover(data.books, state.bookcover),
        articles: applyCover(data.articles, state.articlecover),
        memoirs: applyCover(data.memoirs, state.memoircover),
        // AJOUT: Appliquer les URLs pour les membres et partenaires
        team_members: applyCover(data.team_members || [], state.teamcover),
        partners: applyCover(data.partners || [], state.partnercover)
      };
    },

    // -------- AJOUT: SET TEAM MEMBERS (ADMIN) --------
    SET_TEAM_MEMBERS(state, data) {
      state.adminData.team_members = applyCover(data, state.teamcover);
    },

    // -------- AJOUT: UPDATE TEAM MEMBER --------
    UPDATE_TEAM_MEMBER(state, member) {
      if (!state.adminData.team_members) return;
      const index = state.adminData.team_members.findIndex(m => m.id === member.id);
      if (index !== -1) {
        // Appliquer l'URL pour la photo
        const memberWithCover = {
          ...member,
          photo: member.photo ? `${state.teamcover}/${member.photo}` : member.photo
        };
        state.adminData.team_members.splice(index, 1, memberWithCover);
      } else {
        // Ajouter comme nouveau membre
        const memberWithCover = {
          ...member,
          photo: member.photo ? `${state.teamcover}/${member.photo}` : member.photo
        };
        state.adminData.team_members.push(memberWithCover);
      }
    },

    // -------- AJOUT: SET PARTNERS (ADMIN) --------
    SET_PARTNERS(state, data) {
      state.adminData.partners = applyCover(data, state.partnercover);
    },

    // -------- AJOUT: UPDATE PARTNER --------
    UPDATE_PARTNER(state, partner) {
      if (!state.adminData.partners) return;
      const index = state.adminData.partners.findIndex(p => p.id === partner.id);
      if (index !== -1) {
        // Appliquer l'URL pour l'image
        const partnerWithCover = {
          ...partner,
          image: partner.image ? `${state.partnercover}/${partner.image}` : partner.image
        };
        state.adminData.partners.splice(index, 1, partnerWithCover);
      } else {
        // Ajouter comme nouveau partenaire
        const partnerWithCover = {
          ...partner,
          image: partner.image ? `${state.partnercover}/${partner.image}` : partner.image
        };
        state.adminData.partners.push(partnerWithCover);
      }
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
      // AJOUT: Membres et partenaires récents
      state.publicData.lastTeamMembers = applyCover(data.last_team_members || [], state.teamcover);
      state.publicData.lastPartners = applyCover(data.last_partners || [], state.partnercover);
    },

    // ---------- PUBLIC COLLECTIONS ----------
    setPublicCollections(state, data) {
      state.publicData.allCategories = data.categories || [];
      state.publicData.allDomaine = data.domaine || [];
      state.publicData.allServices = data.services || [];
      state.publicData.allVideos = applyCover(data.video, state.videocover);
      state.publicData.allBooks = applyCover(data.books, state.bookcover);
      state.publicData.allArticles = applyCover(data.articles, state.articlecover);
      state.publicData.allMemoirs = applyCover(data.memoirs, state.memoircover);
      // AJOUT: Membres et partenaires complets
      state.publicData.allTeamMembers = applyCover(data.team_members || [], state.teamcover);
      state.publicData.allPartners = applyCover(data.partners || [], state.partnercover);
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
      state.publicData.allVideos = applyCover(data, state.videocover);
    },
    
    pushPublicVideos(state, data) {
      state.publicData.allVideos = [
        ...state.publicData.allVideos,
        ...applyCover(data, state.videocover)
      ];
    },
    
    setPublicVideoPagination(state, { next, hasmore }) {
      state.publicVideoNextCursor = next;
      state.publicVideoHasMore = hasmore;
    },

    // ---------- AJOUT: PUBLIC TEAM MEMBERS ----------
    setPublicTeamMembers(state, data) {
      state.publicData.allTeamMembers = applyCover(data, state.teamcover);
    },
    
    pushPublicTeamMembers(state, data) {
      state.publicData.allTeamMembers = [
        ...state.publicData.allTeamMembers,
        ...applyCover(data, state.teamcover)
      ];
    },
    
    setPublicTeamPagination(state, { next, hasmore }) {
      state.publicTeamNextCursor = next;
      state.publicTeamHasMore = hasmore;
    },

    // ---------- AJOUT: PUBLIC PARTNERS ----------
    setPublicPartners(state, data) {
      state.publicData.allPartners = applyCover(data, state.partnercover);
    },
    
    pushPublicPartners(state, data) {
      state.publicData.allPartners = [
        ...state.publicData.allPartners,
        ...applyCover(data, state.partnercover)
      ];
    },
    
    setPublicPartnerPagination(state, { next, hasmore }) {
      state.publicPartnerNextCursor = next;
      state.publicPartnerHasMore = hasmore;
    }
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

        // Le token voyage en cookie httpOnly (jamais lisible par le JS) :
        // le backend l'applique automatiquement à chaque requête (withCredentials).
        if (response.data.user) {
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
    async logout({ commit, state }) {
      // Révoque le token côté serveur + vide le cookie httpOnly (best effort).
      try {
        await axios.post(`${state.localhost}logout`);
      } catch (e) {
        // Session déjà expirée : on nettoie quand même côté client.
      }

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

    async fetchPressReviews({ commit }, params = {}) {
      try {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${this.state.localhost}press-reviews?${query}`);
        commit('SET_PRESS_REVIEWS', response.data.data.press_reviews);
        return response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des revues de presse:', error);
        throw error;
      }
    },

    async fetchPressReview({ commit }, slug) {
      try {
        const response = await axios.get(`${this.state.localhost}press-reviews/${slug}`);
        commit('SET_CURRENT_PRESS_REVIEW', response.data.data.press_review);
        return response.data;
      } catch (error) {
        console.error('Erreur lors du chargement de la revue de presse:', error);
        throw error;
      }
    },

    // Actions admin
    async adminFetchPressReviews({ commit }, params = {}) {
      try {
        const token = localStorage.getItem('token');
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${this.state.localhost}admin/press-reviews?${query}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('SET_PRESS_REVIEWS', response.data.data.press_reviews);
        commit('SET_PRESS_REVIEW_STATS', response.data.data.stats);
        return response.data;
      } catch (error) {
        console.error('Erreur admin:', error);
        throw error;
      }
    },

    async adminCreatePressReview({ commit }, formData) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${this.state.localhost}admin/press-reviews`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        commit('ADD_PRESS_REVIEW', response.data.data);
        return response.data;
      } catch (error) {
        console.error('Erreur création:', error);
        throw error;
      }
    },

    async adminUpdatePressReview({ commit }, { id, formData }) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${this.state.localhost}admin/press-reviews/${id}?_method=PUT`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        commit('UPDATE_PRESS_REVIEW', response.data.data);
        return response.data;
      } catch (error) {
        console.error('Erreur mise à jour:', error);
        throw error;
      }
    },

    async adminDeletePressReview({ commit }, id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${this.state.localhost}admin/press-reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('REMOVE_PRESS_REVIEW', id);
      } catch (error) {
        console.error('Erreur suppression:', error);
        throw error;
      }
    },
    
    // store/index.js - Ajoutez ces actions supplémentaires

    async adminFetchPressReview({ commit }, id) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${this.state.localhost}admin/press-reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      } catch (error) {
        console.error('Erreur chargement:', error);
        throw error;
      }
    },

    async adminUpdatePressReviewStatus({ commit }, { id, status }) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${this.state.localhost}admin/press-reviews/${id}/status`, 
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      } catch (error) {
        console.error('Erreur mise à jour statut:', error);
        throw error;
      }
    },

    async adminTogglePressReviewFeatured({ commit }, id) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${this.state.localhost}admin/press-reviews/${id}/featured`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      } catch (error) {
        console.error('Erreur toggle featured:', error);
        throw error;
      }
    },

    async adminUploadEditorImage({ commit }, imageFile) {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const response = await axios.post(`${this.state.localhost}admin/press-reviews/upload-image`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Erreur upload image:', error);
        throw error;
      }
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
      // AJOUT: Pagination pour membres et partenaires
      commit('setPublicTeamPagination', {
        next: response.data.teamnexturl,
        hasmore: response.data.hasmoreteam,
      });
      commit('setPublicPartnerPagination', {
        next: response.data.partnernexturl,
        hasmore: response.data.hasmorepartner,
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

    // -------- AJOUT: PUBLIC TEAM MEMBERS PAGINATION --------
    async fetchPublicTeamMembers({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/team`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicTeamMembers", res.data.team_members || []);
      else commit("pushPublicTeamMembers", res.data.team_members || []);
      commit("setPublicTeamPagination", {
        next: res.data.teamnexturl,
        hasmore: res.data.hasmoreteam,
      });
      return res.data;
    },

    // -------- AJOUT: PUBLIC PARTNERS PAGINATION --------
    async fetchPublicPartners({ commit, state }, cursor = null) {
      const res = await axios.post(`${state.localhost}data/partner`, cursor ? { cursor } : {});
      if (!cursor) commit("setPublicPartners", res.data.partners || []);
      else commit("pushPublicPartners", res.data.partners || []);
      commit("setPublicPartnerPagination", {
        next: res.data.partnernexturl,
        hasmore: res.data.hasmorepartner,
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
      commit('setDat');
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
      commit('setDat');
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
      commit('setDat');
    },

    // -------- AJOUT: ADMIN TEAM MEMBERS --------
    async fetchTeamMembers({ commit, state }) {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${state.localhost}team_members`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      commit('SET_TEAM_MEMBERS', response.data.team_members || []);
      return response.data;
    },

    // -------- AJOUT: ADMIN PARTNERS --------
    async fetchPartners({ commit, state }) {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${state.localhost}partners`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      commit('SET_PARTNERS', response.data.partners || []);
      return response.data;
    },

    // -------- AJOUT: SAVE/UPDATE TEAM MEMBER --------
    async saveTeamMember({ commit, state }, memberData) {
      const token = localStorage.getItem("token");
      const isUpdate = memberData.id;
      
      const url = isUpdate 
        ? `${state.localhost}team_members/${memberData.id}`
        : `${state.localhost}team_members`;
      
      const method = isUpdate ? 'put' : 'post';
      
      try {
        const response = await axios[method](url, memberData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          commit('UPDATE_TEAM_MEMBER', response.data.team_member);
          return { success: true, data: response.data };
        } else {
          throw new Error(response.data.message || 'Erreur lors de la sauvegarde');
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du membre:', error);
        throw error;
      }
    },

    // -------- AJOUT: SAVE/UPDATE PARTNER --------
    async savePartner({ commit, state }, partnerData) {
      const token = localStorage.getItem("token");
      const isUpdate = partnerData.id;
      
      const url = isUpdate 
        ? `${state.localhost}partners/${partnerData.id}`
        : `${state.localhost}partners`;
      
      const method = isUpdate ? 'put' : 'post';
      
      try {
        const response = await axios[method](url, partnerData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          commit('UPDATE_PARTNER', response.data.partner);
          return { success: true, data: response.data };
        } else {
          throw new Error(response.data.message || 'Erreur lors de la sauvegarde');
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du partenaire:', error);
        throw error;
      }
    },

    // -------- AJOUT: DELETE TEAM MEMBER --------
    async deleteTeamMember({ commit, state }, memberId) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(`${state.localhost}team_members/${memberId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          commit('deleteTeamMember', memberId);
          return { success: true };
        } else {
          throw new Error(response.data.message || 'Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du membre:', error);
        throw error;
      }
    },

    // -------- AJOUT: DELETE PARTNER --------
    async deletePartner({ commit, state }, partnerId) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(`${state.localhost}partners/${partnerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          commit('deletePartner', partnerId);
          return { success: true };
        } else {
          throw new Error(response.data.message || 'Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du partenaire:', error);
        throw error;
      }
    }
  },
});