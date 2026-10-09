<template>
  <div class="animate-fade-in space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Tableau de bord</h1>
      <p class="text-muted-foreground mt-1">
        Bienvenue dans l'espace d'administration
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <router-link 
        v-for="stat in stats" 
        :key="stat.title" 
        :to="stat.href"
        class="block"
      >
        <div class="bg-card rounded-lg p-6 shadow hover:shadow-md transition-shadow cursor-pointer">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <component :is="stat.icon" class="w-6 h-6 text-primary" />
            </div>
            <span class="text-xs text-primary flex items-center gap-1">
              <TrendingUp class="w-3 h-3" />
              {{ stat.change }}
            </span>
          </div>
          <div class="mt-4">
            <p class="text-3xl font-bold text-foreground">{{ stat.value }}</p>
            <p class="text-sm text-muted-foreground">{{ stat.title }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Books -->
      <div class="bg-card rounded-lg shadow">
        <div class="flex flex-row items-center justify-between p-6 border-b border-border">
          <h2 class="text-lg font-semibold text-foreground">Derniers livres ajoutés</h2>
          <router-link to="/admin/livres">
            <button class="border-0 bg-transparent text-foreground hover:text-primary px-3 py-1.5 rounded-md text-sm font-medium inline-flex items-center gap-1">
              Voir tout
              <ArrowUpRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="book in recentBooks" 
              :key="book.id" 
              class="flex items-center gap-4"
            >
              <img
                :src="book.cover"
                :alt="book.title"
                class="w-12 h-16 rounded object-cover"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground truncate">
                  {{ book.title }}
                </p>
                <p class="text-xs text-muted-foreground">{{ book.author }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-primary">
                  {{ book.price }} €
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ formatDate(book.published_date, 'short') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Memoirs -->
      <div class="bg-card rounded-lg shadow">
        <div class="flex flex-row items-center justify-between p-6 border-b border-border">
          <h2 class="text-lg font-semibold text-foreground">Derniers mémoires</h2>
          <router-link to="/admin/memoires">
            <button class="border-0 bg-transparent text-foreground hover:text-primary px-3 py-1.5 rounded-md text-sm font-medium inline-flex items-center gap-1">
              Voir tout
              <ArrowUpRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="memoir in recentMemoirs" 
              :key="memoir.id" 
              class="flex items-start gap-4"
            >
                <img
              :src="memoir.cover"
              :alt="memoir.title"
              class="w-16 h-16 rounded object-cover flex-shrink-0"
            />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground line-clamp-1">
                  {{ memoir.title }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ memoir.author }} • {{ memoir.year }}
                </p>
              </div>
              <span class="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
                {{ memoir.domain }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="bg-card rounded-lg shadow">
      <div class="flex flex-row items-center justify-between p-6 border-b border-border">
        <h2 class="text-lg font-semibold text-foreground">Derniers articles publiés</h2>
        <router-link to="/admin/actualites">
          <button class="border-0 bg-transparent text-foreground hover:text-primary px-3 py-1.5 rounded-md text-sm font-medium inline-flex items-center gap-1">
            Voir tout
            <ArrowUpRight class="w-4 h-4" />
          </button>
        </router-link>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="article in recentArticles" 
            :key="article.id" 
            class="flex items-start gap-3 p-3 rounded-lg bg-secondary"
          >
            <img
              :src="article.image"
              :alt="article.title"
              class="w-16 h-16 rounded object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-foreground line-clamp-2">
                {{ article.title }}
              </p>
              <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Calendar class="w-3 h-3" />
                {{ formatDate(article.published_date, 'short') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-card rounded-lg shadow">
      <div class="p-6 border-b border-border">
        <h2 class="text-lg font-semibold text-foreground">Actions rapides</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link to="/admin/livres">
            <button class="w-full h-auto py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex flex-col items-center gap-2">
              <BookMarked class="w-6 h-6" />
              <span>Ajouter un livre</span>
            </button>
          </router-link>
          <router-link to="/admin/memoires">
            <button class="w-full h-auto py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex flex-col items-center gap-2">
              <GraduationCap class="w-6 h-6" />
              <span>Ajouter un mémoire</span>
            </button>
          </router-link>
          <router-link to="/admin/actualites">
            <button class="w-full h-auto py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex flex-col items-center gap-2">
              <Newspaper class="w-6 h-6" />
              <span>Nouvel article</span>
            </button>
          </router-link>
          <router-link to="/admin/videos">
            <button class="w-full h-auto py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex flex-col items-center gap-2">
              <Video class="w-6 h-6" />
              <span>Nouvelle video</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
import { 
  BookMarked, 
  GraduationCap, 
  Newspaper, 
  Download, 
  TrendingUp, 
  Eye,
  Video,
  ArrowUpRight,
  Calendar
} from 'lucide-vue-next'

export default {
  name: 'AdminDashboardPage',
  
  components: {
    BookMarked,
    GraduationCap,
    Newspaper,
    Download,
    Video,
    TrendingUp,
    Eye,
    ArrowUpRight,
    Calendar
  },
  
  data() {
    return {
      // Statistiques
      
      
     
    }
  },
  

computed: {
  ...mapState({
    storeBooks: state => state.books,
    storeMemoirs: state => state.memoirs,
    storeArticles: state => state.articles,
    downloads: state => state.downloads,
    visitors: state => state.visitors
  }),

  // Stats dynamiques
  stats() {
    return [
      { 
        title: "Livres publiés",
        value: this.storeBooks?.length || 0,
        change: "+12 ce mois",
        icon: "BookMarked",
        href: "/admin/livres"
      },
      { 
        title: "Mémoires",
        value: this.storeMemoirs?.length || 0,
        change: "+3 ce mois",
        icon: "GraduationCap",
        href: "/admin/memoires"
      },
      { 
        title: "Téléchargements",
        value: this.downloads || 0,
        change: "+18%",
        icon: "Download",
        href: "/admin"
      },
      { 
        title: "Visiteurs",
        value: this.visitors || 0,
        change: "+24%",
        icon: "Eye",
        href: "/admin"
      }
    ]
  },

  // Derniers livres (4 max)
  recentBooks() {
    return this.storeBooks.slice(0,4)
  },

  // Derniers mémoires
  recentMemoirs() {
    return this.storeMemoirs.slice(0,4)
  },

  // Derniers articles
  recentArticles() {
    return this.storeArticles.slice(0,3)
  }
}
,
  
  methods: {
    // Formatage des dates
    formatDate(dateString, format = 'short') {
      const date = new Date(dateString)
      const options = format === 'short' 
        ? { day: 'numeric', month: 'numeric', year: 'numeric' }
        : { day: 'numeric', month: 'long', year: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    }
  },
  
  mounted() {
    console.log('Admin dashboard mounted')
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.bg-card {
  background-color: hsl(var(--card));
}

.border-border {
  border-color: hsl(var(--border));
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground));
}

.text-foreground {
  color: hsl(var(--foreground));
}

.text-primary {
  color: hsl(var(--primary));
}

/* Style pour les cartes de statistiques */
.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.transition-shadow {
  transition: box-shadow 0.3s ease;
}

/* Style pour les icônes de statistiques */
.bg-primary\/10 {
  background-color: hsl(var(--primary) / 0.1);
}

/* Style pour les textes truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour les images */
.object-cover {
  object-fit: cover;
}

/* Style pour les boutons */
button:hover {
  opacity: 0.9;
}

/* Style pour les cartes avec bordures */
.p-6 {
  padding: 1.5rem;
}

/* Style pour les badges de domaine */
.bg-secondary {
  background-color: hsl(var(--secondary));
}

/* Style pour les liens */
.router-link-active {
  text-decoration: none;
}

/* Animation pour les transitions */
.transition-all {
  transition: all 0.2s ease;
}
</style>