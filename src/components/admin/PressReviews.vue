<template>
  <div class="animate-fade-in space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Cahiers du Djembé</h1>
        <p class="text-muted-foreground mt-1">
          {{ stats.total }} article{{ stats.total !== 1 ? 's' : '' }}
          ({{ stats.published }} publié{{ stats.published !== 1 ? 's' : '' }})
        </p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="refreshData"
          class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
        >
          <RefreshCw class="w-4 h-4" />
          Actualiser
        </button>
        <router-link
          to="/admin/press-reviews/create"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Plus class="w-4 h-4" />
          Nouvel article
        </router-link>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div class="bg-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-foreground">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total</div>
      </div>
      <div class="bg-blue-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-blue-700">{{ stats.published }}</div>
        <div class="text-sm text-blue-600">Publiés</div>
      </div>
      <div class="bg-yellow-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-yellow-700">{{ stats.draft }}</div>
        <div class="text-sm text-yellow-600">Brouillons</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-gray-700">{{ stats.archived }}</div>
        <div class="text-sm text-gray-600">Archivés</div>
      </div>
      <div class="bg-purple-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-purple-700">{{ stats.featured }}</div>
        <div class="text-sm text-purple-600">À la une</div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-card rounded-lg p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="text-sm font-medium block mb-1">Statut</label>
          <select 
            v-model="filters.status"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @change="applyFilters"
          >
            <option value="">Tous</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Catégorie</label>
          <select 
            v-model="filters.category"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @change="applyFilters"
          >
            <option value="">Toutes</option>
            <option value="interview">Interview</option>
            <option value="critique">Critique</option>
            <option value="reportage">Reportage</option>
            <option value="article">Article</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">À la une</label>
          <select 
            v-model="filters.featured"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @change="applyFilters"
          >
            <option value="">Tous</option>
            <option value="1">À la une</option>
            <option value="0">Non mis en avant</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Rechercher</label>
          <input
            type="text"
            v-model="filters.search"
            placeholder="Titre, auteur, source..."
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @input="debounceSearch"
          />
        </div>
        <div class="flex items-end">
          <button 
            @click="resetFilters"
            class="w-full py-2 px-3 rounded-md border border-input bg-background hover:bg-accent text-foreground"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-card rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1000px]">
          <thead>
            <tr class="border-b border-border bg-secondary/50">
              <th class="text-left py-3 px-4 font-semibold text-sm">Titre</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Catégorie</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Auteur</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Source</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Date</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Statut</th>
              <th class="text-center py-3 px-4 font-semibold text-sm">Vues</th>
              <th class="text-center py-3 px-4 font-semibold text-sm">Une</th>
              <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="review in pressReviews" 
              :key="review.id"
              :class="[
                'border-b border-border hover:bg-secondary/30 transition-colors',
                getStatusBgClass(review.status)
              ]"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded bg-secondary overflow-hidden flex-shrink-0">
                    <img 
                      v-if="review.cover_image"
                      :src="$store.state.presse+review.cover_image" 
                      :alt="review.title"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full bg-secondary flex items-center justify-center">
                      <Newspaper class="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p class="font-medium line-clamp-1">{{ review.title }}</p>
                    <p v-if="review.subtitle" class="text-xs text-muted-foreground line-clamp-1">{{ review.subtitle }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span :class="getCategoryBadgeClass(review.category)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ review.category_label }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm">{{ review.author || '—' }}</td>
              <td class="py-3 px-4 text-sm">{{ review.source || '—' }}</td>
              <td class="py-3 px-4 text-sm whitespace-nowrap">
                <div>{{ formatDate(review.published_at) }}</div>
                <div class="text-xs text-muted-foreground">Créé: {{ formatDate(review.created_at) }}</div>
              </td>
              <td class="py-3 px-4">
                <select 
                  v-model="review.status"
                  @change="updateStatus(review)"
                  class="text-xs rounded border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </td>
              <td class="py-3 px-4 text-center text-sm">{{ review.views }}</td>
              <td class="py-3 px-4 text-center">
                <button 
                  @click="toggleFeatured(review)"
                  :class="[
                    'p-1 rounded transition-colors',
                    review.is_featured 
                      ? 'text-yellow-600 hover:text-yellow-700' 
                      : 'text-muted-foreground hover:text-foreground'
                  ]"
                >
                  <Star :class="review.is_featured ? 'fill-yellow-600' : ''" class="w-5 h-5" />
                </button>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <router-link
                    :to="`/admin/press-reviews/${review.id}/edit`"
                    class="p-2 text-foreground hover:bg-secondary rounded-md"
                    title="Modifier"
                  >
                    <Edit class="w-4 h-4" />
                  </router-link>
                  <button 
                    @click="viewOnSite(review)"
                    class="p-2 text-blue-600 hover:bg-secondary rounded-md"
                    title="Voir sur le site"
                  >
                    <ExternalLink class="w-4 h-4" />
                  </button>
                 <!-- <button
                    @click="duplicateReview(review)"
                    class="p-2 text-green-600 hover:bg-secondary rounded-md"
                    title="Dupliquer"
                  > 
                    <Copy class="w-4 h-4" />
                   </button> -->
                  <button 
                    @click="deleteReview(review.id)"
                    class="p-2 text-destructive hover:bg-secondary rounded-md"
                    title="Supprimer"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="pressReviews.length === 0 && !isLoading" class="py-12 text-center">
        <Newspaper class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium text-foreground mb-2">
          Aucun article trouvé
        </h3>
        <p class="text-muted-foreground mb-4">
          {{ filters.search ? 'Aucun résultat pour votre recherche' : 'Commencez par créer votre premier article' }}
        </p>
        <router-link
          to="/admin/press-reviews/create"
          class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90"
        >
          <Plus class="w-4 h-4" />
          Nouvel article
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-12 text-center">
        <svg class="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex justify-between items-center">
      <div class="text-sm text-muted-foreground">
        Page {{ pagination.current_page }} sur {{ pagination.last_page }}
        ({{ pagination.total }} article{{ pagination.total !== 1 ? 's' : '' }})
      </div>
      <div class="flex gap-2">
        <button 
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1 || isLoading"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
        >
          Précédent
        </button>
        <button 
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page >= pagination.last_page || isLoading"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Plus, RefreshCw, Edit, Trash2, ExternalLink, Copy, Star,
  Newspaper
} from 'lucide-vue-next'

export default {
  name: 'AdminPressReviews',

  components: {
    Plus,
    RefreshCw,
    Edit,
    Trash2,
    ExternalLink,
    Copy,
    Star,
    Newspaper
  },

  data() {
    return {
      pressReviews: [],
      stats: {
        total: 0,
        draft: 0,
        published: 0,
        archived: 0,
        featured: 0
      },
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
      },
      filters: {
        status: '',
        category: '',
        featured: '',
        search: ''
      },
      isLoading: false,
      searchTimeout: null
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.isLoading = true

      try {
        const params = {
          page: this.pagination.current_page,
          per_page: 20,
          ...this.filters
        }

        const response = await this.$store.dispatch('adminFetchPressReviews', params)
        
        this.pressReviews = response.data.press_reviews
        this.stats = response.data.stats
        this.pagination = response.data.pagination

      } catch (error) {
        console.error('Erreur chargement:', error)
        if (error.response?.status === 401) {
          this.$router.push('/admin/login')
        }
      } finally {
        this.isLoading = false
      }
    },

    applyFilters() {
      this.pagination.current_page = 1
      this.loadData()
    },

    debounceSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.pagination.current_page = 1
        this.loadData()
      }, 500)
    },

    resetFilters() {
      this.filters = {
        status: '',
        category: '',
        featured: '',
        search: ''
      }
      this.pagination.current_page = 1
      this.loadData()
    },

    refreshData() {
      this.loadData()
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.pagination.current_page = page
        this.loadData()
      }
    },

    async updateStatus(review) {
      try {
        await this.$store.dispatch('adminUpdatePressReviewStatus', {
          id: review.id,
          status: review.status
        })
        // Recharger les stats
        this.loadData()
      } catch (error) {
        console.error('Erreur mise à jour statut:', error)
      }
    },

    async toggleFeatured(review) {
      try {
        await this.$store.dispatch('adminTogglePressReviewFeatured', review.id)
        review.is_featured = !review.is_featured
      } catch (error) {
        console.error('Erreur toggle featured:', error)
      }
    },

    async duplicateReview(review) {
      if (confirm(`Dupliquer "${review.title}" ?`)) {
        try {
          const newReview = { ...review, id: null, title: `${review.title} (copie)` }
          await this.$store.dispatch('adminCreatePressReview', newReview)
          this.loadData()
        } catch (error) {
          console.error('Erreur duplication:', error)
        }
      }
    },

    async deleteReview(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) {
        try {
          await this.$store.dispatch('adminDeletePressReview', id)
          this.loadData()
        } catch (error) {
          console.error('Erreur suppression:', error)
        }
      }
    },

    viewOnSite(review) {
      window.open(`/cahiers-du-djembe/${review.slug}`, '_blank')
    },

    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },

    getStatusBgClass(status) {
      const classes = {
        draft: '',
        published: 'bg-green-50/30',
        archived: 'bg-gray-50/30'
      }
      return classes[status] || ''
    },

    getCategoryBadgeClass(category) {
      const classes = {
        interview: 'bg-purple-100 text-purple-800',
        critique: 'bg-blue-100 text-blue-800',
        reportage: 'bg-green-100 text-green-800',
        article: 'bg-orange-100 text-orange-800',
        autre: 'bg-gray-100 text-gray-800'
      }
      return classes[category] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.min-w-\[1000px\] {
  min-width: 1000px;
}
</style>
