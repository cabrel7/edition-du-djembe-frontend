<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Catalogue</h1>
        <p class="text-xl text-primary-foreground/90 max-w-2xl">
          Explorez notre collection de plus de 500 ouvrages couvrant une grande 
          diversité de genres et de disciplines.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bg-secondary py-6 border-b border-border sticky top-16 z-20">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un titre, un auteur..."
              :value="searchQuery"
              @input="updateSearchQuery"
              class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- Category Filter -->
          <!-- <div class="relative w-full md:w-48">
            <select 
              :value="selectedCategory"
              @change="updateCategory"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="all">Toutes les catégories</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div> -->

          <!-- Year Filter -->
          <!-- <div class="relative w-full md:w-40">
            <select 
              :value="selectedYear"
              @change="updateYear"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="all">Toutes les années</option>
              <option 
                v-for="year in years" 
                :key="year" 
                :value="year"
              >
                {{ year }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div> -->

          <!-- Clear Filters -->
          <button 
            v-if="hasFilters"
            @click="clearFilters"
            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
          >
            <X class="w-4 h-4" />
            Réinitialiser
          </button>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <p class="text-muted-foreground">
            {{ filteredBooks.length }} ouvrage{{ filteredBooks.length !== 1 ? 's' : '' }} trouvé{{ filteredBooks.length !== 1 ? 's' : '' }}
          </p>
        </div>

        <div v-if="filteredBooks.length === 0" class="text-center py-16">
          <p class="text-xl text-muted-foreground mb-4">Aucun ouvrage trouvé</p>
          <p class="text-muted-foreground mb-6">
            Essayez de modifier vos critères de recherche
          </p>
          <button 
            @click="clearFilters"
            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <router-link
            v-for="book in filteredBooks"
            :key="book.id"
            :to="`/livres/${book.slug.trim()}`"
            class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift"
          ><div class=" h-[35vh] overflow-hidden">
            <div class="aspect-auto  overflow-hidden">
              <img
                :src="book.cover"
                :alt="book.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            </div>
            <div class="p-4">
              <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {{getCategoryName( book.category) }}
              </span>
              <h3 class="text-base font-semibold text-foreground mt-3 group-hover:text-primary transition-colors line-clamp-2">
                {{ book.title }}
              </h3>
              <p class="text-sm text-muted-foreground mt-1">{{ book.author }}</p>
              <div class="flex items-center justify-between mt-3">
                <p class="text-primary font-semibold">{{ book.price }} €</p>
                <p class="text-xs text-muted-foreground">
                  {{ new Date(book.published_date).getFullYear() }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Search, Filter, X } from 'lucide-vue-next'

export default {
  name: 'CatalogPage',
  
  components: {
    Search,
    Filter,
    X
  },
  
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      selectedYear: 'all',
      
      // Mock data - Catégories
     
      
     
    }
  },
  
  computed: {
     categories(){
            return this.$store.state.publicData.allCategories|| []
        },
     books(){
      return this.$store.state.publicData.allBooks;
    },
    // Calcul des années uniques (équivalent à useMemo)
    years() {
      const uniqueYears = [...new Set(this.books.map(book => 
        new Date(book.published_date).getFullYear()
      ))].sort((a, b) => b - a)
      return uniqueYears
    },
    
    // Filtrage des livres (équivalent à useMemo)
    filteredBooks() {
      return this.books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = this.selectedCategory === 'all' || book.category === this.selectedCategory
        const matchesYear = this.selectedYear === 'all' || 
                           new Date(book.published_date).getFullYear().toString() === this.selectedYear
        return matchesSearch && matchesCategory && matchesYear
      })
    },
    
    // Vérification si des filtres sont actifs
    hasFilters() {
      return this.searchQuery || this.selectedCategory !== 'all' || this.selectedYear !== 'all'
    }
  },
  
  methods: {
    // Méthodes de mise à jour des filtres
    updateSearchQuery(event) {
      this.searchQuery = event.target.value
    },
    
    updateCategory(event) {
      this.selectedCategory = event.target.value
    },
    
    updateYear(event) {
      this.selectedYear = event.target.value
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId)
      console.log(this.categories)
      return category ? category.name : `Catégorie #${categoryId}`
    },
    // Réinitialisation des filtres
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'all'
      this.selectedYear = 'all'
    }
  },
  
  mounted() {
    console.log('Catalog page mounted')
  }
}
</script>

<style scoped>
/* Styles pour les champs de formulaire personnalisés */
select {
  cursor: pointer;
}

/* Style pour les inputs focus */
input:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
p {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
/* Style pour le placeholder */
input::placeholder {
  color: hsl(var(--muted-foreground));
}

/* Style pour les options du select */
select option {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Assurer que les images gardent leur aspect ratio */
/* .aspect-[3/4] {
  aspect-ratio: 3 / 4;
} */

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>