<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Actualités</h1>
        <p class="text-xl text-primary-foreground/90 max-w-2xl">
          Suivez les dernières nouvelles de notre maison d'édition, nos événements 
          et les distinctions de nos auteurs.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bg-secondary py-6 border-b border-border">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              :value="searchQuery"
              @input="updateSearchQuery"
              class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

         
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="section-padding">
      <div class="container-custom">
        <div v-if="filteredArticles.length === 0" class="text-center py-16">
          <p class="text-xl text-muted-foreground">Aucun article trouvé</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="(article, index) in filteredArticles"
            :key="article.id"
            :to="`/actualites/${article.slug.trim()}`"
            class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
           <div class=" h-[35vh] overflow-hidden">
            <div class="aspect-auto  overflow-hidden">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <!-- <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {{ article.category }}
                </span> -->
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar class="w-3 h-3" />
                  {{ formatDate(article.published_date, 'short') }}
                </span>
              </div>
              <h2 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {{ article.title }}
              </h2>
              <p class="text-muted-foreground text-sm line-clamp-2">
                {{ article.excerpt }}
              </p>
              <p class="text-xs text-muted-foreground mt-4">
                Par edition du djembe d'ebene
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Search, Calendar } from 'lucide-vue-next'

export default {
  name: 'NewsPage',
  
  components: {
    Search,
    Calendar
  },
  
  data() {
    return {
      searchQuery: '',
      selectedCategory: 0,
      
       
      // Mock data - Articles
      
    }
  },
  
  computed: {
     categories(){
      return this.$store.state.publicData.allCategories;
    },
     articles(){
      return this.$store.state.publicData.allArticles;
    },
    // Filtrage des articles
    filteredArticles() {
      return this.articles.filter(article => {
        const matchesSearch = 
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
       
        return matchesSearch 
      })
    }
  },
  
  methods: {
    // Mise à jour des filtres
    updateSearchQuery(event) {
      this.searchQuery = event.target.value
    },
    
   
    
    // Formatage des dates
    formatDate(dateString, format = 'short') {
      const date = new Date(dateString)
      const options = format === 'short' 
        ? { day: 'numeric', month: 'short', year: 'numeric' }
        : { day: 'numeric', month: 'long', year: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    }
  },
  
 
}
</script>

<style scoped>
/* Styles spécifiques */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Animation pour les cartes */
.group:hover img {
  transform: scale(1.05);
}

.transition-transform {
  transition: transform 0.3s ease;
}

/* Style pour les filtres */
input:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}
</style>