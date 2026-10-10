<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Cahiers du Djembé</h1>
        <p class="text-xl text-primary-foreground/90 max-w-3xl">
          Revue de presse, interviews, critiques et analyses du monde de l'édition 
          et de la culture littéraire.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section-padding">
      <div class="container-custom">
        <!-- Filters and Search -->
        <div class="flex flex-col lg:flex-row justify-between gap-6 mb-10">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            <button 
              @click="setCategory('all')"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              ]"
            >
              Tous ({{ stats.total }})
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat.value"
              @click="setCategory(cat.value)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === cat.value 
                  ? getCategoryButtonClass(cat.value, true)
                  : getCategoryButtonClass(cat.value, false)
              ]"
            >
              {{ cat.label }} ({{ cat.count }})
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative w-full lg:w-80">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher..."
              class="w-full py-2 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              @input="debounceSearch"
            />
            <Search class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <!-- Featured Article (if exists) -->
        <div v-if="featuredPressReview" class="mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-6">À la une</h2>
          <div 
            class="relative group cursor-pointer overflow-hidden rounded-2xl"
            @click="goToDetail(featuredPressReview.slug)"
          >
            <div class="aspect-[21/9] relative">
              <img 
              loading="lazy"
                :src="$store.state.presse+featuredPressReview.cover_image" 
                :alt="featuredPressReview.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                <span :class="getCategoryBadgeClass(featuredPressReview.category)" class="px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                  {{ featuredPressReview.category_label }}
                </span>
                <h3 class="text-2xl md:text-3xl font-bold mb-2">{{ featuredPressReview.title }}</h3>
                <p class="text-primary-foreground/80 mb-4 line-clamp-2">{{ featuredPressReview.summary }}</p>
                <div class="flex items-center gap-4 text-sm">
                  <span class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {{ formatDate(featuredPressReview.published_at) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <User class="w-4 h-4" />
                    {{ featuredPressReview.author || 'Rédaction' }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ featuredPressReview.reading_time }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(review, index) in pressReviews"
            :key="review.id"
            class="group bg-card rounded-xl overflow-hidden card-shadow hover:shadow-lg transition-all cursor-pointer"
            @click="goToDetail(review.slug)"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
              loading="lazy"
                :src="$store.state.presse+review.cover_image"
                :alt="review.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3 flex gap-2">
                <span :class="getCategoryBadgeClass(review.category)" class="px-2 py-1 rounded text-xs font-medium">
                  {{ review.category_label }}
                </span>
                <span v-if="review.is_featured" class="px-2 py-1 rounded text-xs font-medium bg-yellow-500 text-white">
                  Une
                </span>
              </div>
              <div v-if="review.source" class="absolute top-3 right-3">
                <span class="px-2 py-1 rounded text-xs font-medium bg-foreground/70 text-primary-foreground">
                  {{ review.source }}
                </span>
              </div>
            </div>
            
            <div class="p-5">
              <h2 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {{ review.title }}
              </h2>
              
              <p class="text-sm text-muted-foreground line-clamp-3 mb-4">
                {{ review.summary }}
              </p>
              
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <Calendar class="w-3 h-3" />
                    {{ formatDate(review.published_at) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Eye class="w-3 h-3" />
                    {{ formatViews(review.views) }}
                  </span>
                </div>
                <span class="flex items-center gap-1 text-primary">
                  Lire
                  <ChevronRight class="w-3 h-3" />
                </span>
              </div>

              <!-- Tags -->
              <div v-if="review.tags && review.tags.length" class="mt-3 flex flex-wrap gap-1">
                <span 
                  v-for="tag in review.tags.slice(0, 3)" 
                  :key="tag"
                  class="px-2 py-0.5 bg-secondary/50 text-muted-foreground rounded text-xs"
                >
                  #{{ tag }}
                </span>
                <span v-if="review.tags.length > 3" class="text-xs text-muted-foreground">
                  +{{ review.tags.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="pressReviews.length === 0 && !isLoading" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 text-muted-foreground/30">
            <Newspaper class="w-full h-full" />
          </div>
          <h3 class="text-xl font-semibold text-foreground mb-2">Aucun article trouvé</h3>
          <p class="text-muted-foreground">
            {{ searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucune revue de presse disponible pour le moment' }}
          </p>
          <button 
            v-if="searchQuery"
            @click="resetFilters"
            class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
          >
            Réinitialiser les filtres
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="py-16">
          <div class="flex justify-center">
            <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.last_page > 1" class="flex justify-center mt-12">
          <div class="flex gap-2">
            <button
              @click="changePage(pagination.current_page - 1)"
              :disabled="pagination.current_page === 1"
              class="w-10 h-10 rounded-lg border border-input bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
            >
              <ChevronLeft class="w-4 h-4 mx-auto" />
            </button>
            
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'w-10 h-10 rounded-lg border transition-colors',
                pagination.current_page === page
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-input bg-background text-foreground hover:bg-secondary'
              ]"
            >
              {{ page }}
            </button>
            
            <button
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page === pagination.last_page"
              class="w-10 h-10 rounded-lg border border-input bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
            >
              <ChevronRight class="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Tags Section -->
    <section v-if="popularTags.length" class="bg-secondary/30 py-12">
      <div class="container-custom">
        <h2 class="text-2xl font-bold text-foreground mb-6">Tags populaires</h2>
        <div class="flex flex-wrap gap-3">
          <router-link
            v-for="tag in popularTags"
            :key="tag.name"
            :to="{ name: 'press-reviews', query: { tag: tag.name } }"
            class="px-4 py-2 bg-card rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
          >
            #{{ tag.name }} ({{ tag.count }})
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { 
  Search, Calendar, User, Clock, Eye, ChevronRight, 
  ChevronLeft, Newspaper 
} from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'PressReviewsPage',

  components: {
    Search,
    Calendar,
    User,
    Clock,
    Eye,
    ChevronRight,
    ChevronLeft,
    Newspaper
  },

  data() {
    return {
      pressReviews: [],
      stats: {
        total: 0
      },
      categories: [],
      popularTags: [],
      featuredPressReview: null,
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
      },
      activeCategory: 'all',
      searchQuery: '',
      isLoading: false,
      searchTimeout: null
    }
  },

  mounted() {
    this.loadData()
    this.loadPopularTags()
  },

  watch: {
    '$route.query': {
      handler() {
        this.loadFromRoute()
        this.loadData()
      },
      immediate: true
    }
  },

  methods: {
    loadFromRoute() {
      const query = this.$route.query
      this.activeCategory = query.category || 'all'
      this.searchQuery = query.search || ''
      this.pagination.current_page = parseInt(query.page) || 1
    },

    async loadData() {
      this.isLoading = true

      try {
        const params = {
          page: this.pagination.current_page,
          per_page: 12
        }

        if (this.activeCategory !== 'all') {
          params.category = this.activeCategory
        }

        if (this.searchQuery) {
          params.search = this.searchQuery
        }

        const response = await this.$store.dispatch('fetchPressReviews', params)
        
        this.pressReviews = response.data.press_reviews
        this.stats = response.data.stats
        this.categories = response.data.categories || []
        this.pagination = response.data.pagination
        
        // Trouver l'article à la une
        this.featuredPressReview = this.pressReviews.find(r => r.is_featured)

      } catch (error) {
        console.error('Erreur chargement:', error)
      } finally {
        this.isLoading = false
      }
    },

    async loadPopularTags() {
      try {
        const response = await axios.get(`${this.$store.state.localhost}press-reviews/popular-tags`)
        this.popularTags = response.data.data
      } catch (error) {
        console.error('Erreur chargement tags:', error)
      }
    },

    setCategory(category) {
      this.activeCategory = category
      this.pagination.current_page = 1
      this.updateRoute()
      this.loadData()
    },

    debounceSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.pagination.current_page = 1
        this.updateRoute()
        this.loadData()
      }, 500)
    },

    resetFilters() {
      this.activeCategory = 'all'
      this.searchQuery = ''
      this.pagination.current_page = 1
      this.updateRoute()
      this.loadData()
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.pagination.current_page = page
        this.updateRoute()
        this.loadData()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    updateRoute() {
      const query = {}
      if (this.activeCategory !== 'all') query.category = this.activeCategory
      if (this.searchQuery) query.search = this.searchQuery
      if (this.pagination.current_page > 1) query.page = this.pagination.current_page

      this.$router.replace({ query })
    },

    goToDetail(slug) {
      this.$router.push({ name: 'press-review-detail', params: { slug } })
    },

    formatDate(date) {
      if (!date) return 'Date inconnue'
      return new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    },

    formatViews(views) {
      if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
      if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
      return views
    },

    getCategoryBadgeClass(category) {
      const classes = {
        interview: 'bg-purple-500/10 text-purple-600',
        critique: 'bg-blue-500/10 text-blue-600',
        reportage: 'bg-green-500/10 text-green-600',
        article: 'bg-orange-500/10 text-orange-600',
        autre: 'bg-gray-500/10 text-gray-600'
      }
      return classes[category] || 'bg-gray-500/10 text-gray-600'
    },

    getCategoryButtonClass(category, isActive) {
      const colors = {
        interview: isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200',
        critique: isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        reportage: isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200',
        article: isActive ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200',
        autre: isActive ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }
      return colors[category] || (isActive ? 'bg-primary text-white' : 'bg-secondary text-foreground')
    }
  },

  computed: {
    displayedPages() {
      const current = this.pagination.current_page
      const last = this.pagination.last_page
      const delta = 2
      
      const range = []
      for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i)
      }
      
      if (current - delta > 2) {
        range.unshift('...')
      }
      if (current + delta < last - 1) {
        range.push('...')
      }
      
      range.unshift(1)
      if (last !== 1) {
        range.push(last)
      }
      
      return range
    }
  }
}
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-\[21\/9\] {
  aspect-ratio: 21 / 9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
p,h,h1,h2,h3 {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

</style>
