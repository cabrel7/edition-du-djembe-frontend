import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { trackPageView } from '@/plugins/analytics'
// Import des composants Admin
import Admin from "@/components/admin/admin.vue";
import Articles from "@/components/admin/articles.vue";
import Book from "@/components/admin/book.vue";
import Categorie from "@/components/admin/categorie.vue";
import Domaine from "@/components/admin/domaine.vue";
import Layout from "@/components/admin/layout.vue";
import Memoires from "@/components/admin/memoires.vue";
import Servicesadmin from "@/components/admin/contacted.vue";
import Videos from "@/components/admin/video.vue";
import Submitdata from "@/components/admin/submitdata.vue";
import Addorther from "@/components/admin/addother.vue";
// Import des composants publics
import layout from "@/components/layout.vue";
import About from "@/components/main/about.vue";
import Articledetail from "@/components/main/articledetail.vue";
import AuthComponent from "@/components/main/authComponent.vue";
import Bookdetail from "@/components/main/bookdetail.vue";
import Catalog from "@/components/main/catalog.vue";
import Contact from "@/components/main/contact.vue";
import HomeComponent from "@/components/main/homeComponent.vue";
import Memoiredetail from "@/components/main/memoiredetail.vue";
import Memoirs from "@/components/main/memoirs.vue";
import News from "@/components/main/news.vue";
import Services from "@/components/main/services.vue";
import Submitwork from "@/components/main/submitwork.vue";
import Video from "@/components/main/video.vue";

// Import de la page de login admin
import AdminLoginPage from "@/components/main/authComponent.vue";

const routes = [
  // Route de login admin
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLoginPage,
    meta: {
      requiresGuest: true, // Nécessite d'être non connecté
      title: "Connexion Admin"
    }
  },

  // Routes publiques avec layout
  {
    path: "/",
    name: "/",
    component: layout,
    children: [
      {
        path: "/",
        name: "home",
        components: {
          two: HomeComponent
        },
        meta: {
          title: "Accueil"
        }
      },
      {
        path: "contact",
        name: "contact",
        components: {
          two: Contact
        },
        meta: {
          title: "Contact"
        }
      },
      {
        path: "memoires",
        name: "memoires",
        components: {
          two: Memoirs
        },
        meta: {
          title: "Mémoires"
        }
      },
      {
        path: "memoires/:id",
        name: "memoire",
        components: {
          two: Memoiredetail
        },
        meta: {
          title: "Détail Mémoire"
        }
      },
      {
        path: "actualites",
        name: "actualites",
        components: {
          two: News
        },
        meta: {
          title: "Actualités"
        }
      },
      {
        path: "actualites/:id",
        name: "actualite",
        components: {
          two: Articledetail
        },
        meta: {
          title: "Détail Article"
        }
      },
      {
  path: 'cahiers-du-djembe',
  name: 'press-reviews',
  components: {
    two: () => import('@/components/main/PressReviews.vue')
  },
  meta: {
    title: 'Cahiers du Djembé'
  }
},
{
  path: 'cahiers-du-djembe/:slug',
  name: 'press-review-detail',
  components: {
    two: () => import('@/components/main/PressReviewDetail.vue')
  },
  meta: {
    title: 'Cahier du Djembé'
  }
},
      {
        path: "catalogue",
        name: "catalogue",
        components: {
          two: Catalog
        },
        meta: {
          title: "Catalogue"
        }
      },
      {
        path: "livres/:id",
        name: "livres-show",
        components: {
          two: Bookdetail
        },
        meta: {
          title: "Détail Livre"
        }
      },
      {
        path: "livre/:id",
        name: "livre",
        components: {
          two: Bookdetail
        },
        meta: {
          title: "Détail Livre"
        }
      },
      {
        path: "services",
        name: "services",
        components: {
          two: Services
        },
        meta: {
          title: "Services"
        }
      },
      {
        path: "soumettre-mon-travail",
        name: "soumettre-travail",
        components: {
          two: Submitwork
        },
        meta: {
          title: "Soumettre un travail"
        }
      },
      {
        path: "videos",
        name: "videos",
        components: {
          two: Video
        },
        meta: {
          title: "Vidéos"
        }
      },
      {
        path: "a-propos",
        name: "a-propos",
        components: {
          two: About
        },
        meta: {
          title: "À propos"
        }
      }
    ]
  },

  // Routes admin protégées
  {
    path: "/admin",
    name: "/admin",
    component: Layout,
    meta: {
      requiresAuth: true, // Nécessite d'être authentifié
      requiresAdmin: true // Nécessite le rôle admin
    },
    children: [
      {
        path: "submit_data",
        name: "submitdata",
        components: {
          tree: Submitdata
        },
        meta: {
          title: "Soumissions",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
  path: 'press-reviews',
  name: 'admin/press-reviews',
  components: {
    tree: () => import('@/components/admin/PressReviews.vue')
  },
  meta: {
    title: 'Cahiers du Djembé',
    requiresAuth: true,
    requiresAdmin: true
  }
},
{
  path: 'press-reviews/create',
  name: 'admin/press-reviews-create',
  components: {
    tree: () => import('@/components/admin/PressReviewForm.vue')
  },
  meta: {
    title: 'Nouveau cahier',
    requiresAuth: true,
    requiresAdmin: true
  }
},
{
  path: 'press-reviews/:id/edit',
  name: 'admin/press-reviews-edit',
  components: {
    tree: () => import('@/components/admin/PressReviewForm.vue')
  },
  meta: {
    title: 'Modifier cahier',
    requiresAuth: true,
    requiresAdmin: true
  }
},
       {
        path: "addorther",
        name: "addorther",
        components: {
          tree: Addorther
        },
        meta: {
          title: "membre et partenaire",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "videos",
        name: "admin/video",
        components: {
          tree: Videos
        },
        meta: {
          title: "Gestion Vidéos",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "domaines",
        name: "admin/domaines",
        components: {
          tree: Domaine
        },
        meta: {
          title: "Gestion Domaines",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "contact",
        name: "admin/contact",
        components: {
          tree: Servicesadmin
        },
        meta: {
          title: "Contacts",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "categories",
        name: "admin/categories",
        components: {
          tree: Categorie
        },
        meta: {
          title: "Gestion Catégories",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "actualites",
        name: "admin/actualites",
        components: {
          tree: Articles
        },
        meta: {
          title: "Gestion Articles",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "memoires",
        name: "admin/memoires",
        components: {
          tree: Memoires
        },
        meta: {
          title: "Gestion Mémoires",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "livres",
        name: "admin/livres",
        components: {
          tree: Book
        },
        meta: {
          title: "Gestion Livres",
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: "",
        name: "admin",
        components: {
          tree: Admin
        },
        meta: {
          title: "Tableau de bord",
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },

  // Route 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }

});

// Fonction pour vérifier l'authentification
const checkAuth = async () => {
  const token = localStorage.getItem("token");
  const isConnected = localStorage.getItem("isconnect") === "1";
  const userData = localStorage.getItem("userData");

  if (token && isConnected && userData) {
    try {
      const user = JSON.parse(userData);
      store.commit("setUser", user);

      // Optionnel : vérifier la validité du token avec le serveur
      // if (user.role === 1) {
      //   await store.dispatch("fetchAdminBase");
      // }
      return { authenticated: true, isAdmin: user.role === 1 };
    } catch (error) {
      console.error("Erreur lors de la vérification de l'auth:", error);
      store.dispatch("logout");
      return { authenticated: false, isAdmin: false };
    }
  }
  return { authenticated: false, isAdmin: false };
};

// Garde de navigation globale
router.beforeEach(async (to, from, next) => {
  // Vérifier l'authentification
  const { authenticated, isAdmin } = await checkAuth();

  // Pages nécessitant d'être invité (non connecté)
  if (to.meta.requiresGuest) {
    if (authenticated && isAdmin) {
      next("/admin"); // Redirige vers le dashboard si déjà connecté
    } else {
      next();
    }
  }
  // Pages nécessitant une authentification
  else if (to.meta.requiresAuth) {
    if (!authenticated) {
      // Stocker la route demandée pour redirection après login
      localStorage.setItem("redirectAfterLogin", to.fullPath);
      next("/admin/login"); // Redirige vers le login si non connecté
    } else if (to.meta.requiresAdmin && !isAdmin) {
      next("/"); // Redirige vers l'accueil si pas admin
    } else {
      next();
    }
  } else {
    next();
  }

  // Mettre à jour le titre de la page
  if (to.meta.title) {
    document.title = `${to.meta.title} - Éditions du Djembé de Bébène`;
  }
});

// Navigation après login
router.afterEach((to, from) => {
  // Si on vient de la page de login et qu'on est maintenant sur une page admin
  if (from.path === "/admin/login" && to.path.startsWith("/admin")) {
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
    }
  }
  trackPageView(to.path)
  

});

export default router;
