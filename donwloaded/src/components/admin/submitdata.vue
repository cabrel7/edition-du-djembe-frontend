<template>
  <div class="animate-fade-in space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Soumissions</h1>
        <p class="text-muted-foreground mt-1">
          {{ stats.total }} soumission{{ stats.total !== 1 ? 's' : '' }}
          ({{ stats.pending }} en attente)
        </p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="refreshSubmissions"
          class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
        >
          <RefreshCw class="w-4 h-4" />
          Actualiser
        </button>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div class="bg-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-foreground">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total</div>
      </div>
      <div class="bg-yellow-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-yellow-700">{{ stats.pending }}</div>
        <div class="text-sm text-yellow-600">En attente</div>
      </div>
      <div class="bg-blue-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-blue-700">{{ stats.reviewing }}</div>
        <div class="text-sm text-blue-600">En révision</div>
      </div>
      <div class="bg-green-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-green-700">{{ stats.accepted }}</div>
        <div class="text-sm text-green-600">Acceptés</div>
      </div>
      <div class="bg-red-50 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-red-700">{{ stats.rejected }}</div>
        <div class="text-sm text-red-600">Rejetés</div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-card rounded-lg p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="text-sm font-medium block mb-1">Type</label>
          <select 
            v-model="filters.type"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @change="fetchSubmissions"
          >
            <option value="">Tous les types</option>
            <option value="book">Livres</option>
            <option value="memoir">Mémoires</option>
            <option value="article">Articles</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Statut</label>
          <select 
            v-model="filters.status"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            @change="fetchSubmissions"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="reviewing">En révision</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Rejeté</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Rechercher</label>
          <input
            type="text"
            v-model="filters.search"
            placeholder="Auteur, titre, email..."
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
        <table class="w-full min-w-[800px]">
          <thead>
            <tr class="border-b border-border bg-secondary/50">
              <th class="text-left py-3 px-4 font-semibold text-sm">Auteur</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Type</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Titre</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Date</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Statut</th>
              <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="submission in submissions" 
              :key="submission.id"
              :class="[
                'border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer',
                getStatusBgColor(submission.status)
              ]"
              @click="viewSubmission(submission)"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User class="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span class="font-medium">{{ submission.author }}</span>
                    <p class="text-xs text-muted-foreground">
                      {{ submission.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span :class="getTypeClass(submission.type)">
                  {{ getTypeLabel(submission.type) }}
                </span>
              </td>
              <td class="py-3 px-4 max-w-xs">
                <p class="font-medium truncate" :title="submission.title">
                  {{ submission.title }}
                </p>
                <p class="text-xs text-muted-foreground truncate" :title="submission.summary">
                  {{ submission.summary.substring(0, 50) }}...
                </p>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm">
                  {{ formatDate(submission.created_at) }}
                </div>
              </td>
              <td class="py-3 px-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusClass(submission.status)
                  ]"
                >
                  {{ getStatusLabel(submission.status) }}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex items-center justify-end gap-1" @click.stop>
                  <button 
                    @click="downloadFile(submission.id)"
                    class="p-2 text-primary hover:bg-secondary rounded-md"
                    title="Télécharger"
                  >
                    <Download class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="submissions.length === 0 && !isLoading" class="py-12 text-center">
        <Inbox class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium text-foreground mb-2">
          Aucune soumission trouvée
        </h3>
        <p class="text-muted-foreground">
          {{ filters.search ? 'Aucun résultat pour votre recherche' : 'Aucune soumission pour le moment' }}
        </p>
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
    <div v-if="submissions.length > 0" class="flex justify-between items-center">
      <div class="text-sm text-muted-foreground">
        Page {{ pagination.current_page }} sur {{ pagination.last_page }}
        ({{ pagination.total }} soumissions)
      </div>
      <div class="flex gap-2">
        <button 
          @click="prevPage"
          :disabled="pagination.current_page === 1 || isLoading"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button 
          @click="nextPage"
          :disabled="pagination.current_page >= pagination.last_page || isLoading"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de visualisation -->
  <div 
    v-if="isModalOpen && selectedSubmission"
    class="fixed inset-0 animate-fade-in w-full h-screen z-50 bg-foreground/80 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div 
      class="relative bg-card rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-start justify-between mb-6">
          <div>
            <h2 class="text-xl font-semibold text-foreground">
              Soumission #{{ selectedSubmission.id }}
            </h2>
            <p class="text-sm text-muted-foreground mt-1">
              Soumis le {{ formatDateTime(selectedSubmission.created_at) }}
            </p>
          </div>
          <div class="flex gap-2">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getStatusClass(selectedSubmission.status)
              ]"
            >
              {{ getStatusLabel(selectedSubmission.status) }}
            </span>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getTypeClass(selectedSubmission.type)
              ]"
            >
              {{ getTypeLabel(selectedSubmission.type) }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Informations sur l'auteur -->
          <div>
            <h3 class="text-lg font-medium text-foreground mb-4">Informations sur l'auteur</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold text-foreground">{{ selectedSubmission.author }}</p>
                  <a :href="'mailto:' + selectedSubmission.email" class="text-primary text-sm hover:underline">
                    {{ selectedSubmission.email }}
                  </a>
                </div>
              </div>
              
              <div v-if="selectedSubmission.phone">
                <h4 class="text-sm font-medium text-muted-foreground mb-1">Téléphone</h4>
                <a :href="'tel:' + selectedSubmission.phone" class="text-foreground">
                  {{ selectedSubmission.phone }}
                </a>
              </div>
            </div>

            <!-- Fichier -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-muted-foreground mb-2">Document soumis</h4>
              <div class="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <FileText class="w-8 h-8 text-primary" />
                <div class="flex-1">
                  <p class="font-medium">{{ selectedSubmission.file_name }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ selectedSubmission.formatted_file_size }}
                  </p>
                </div>
                <button 
                  @click="downloadFile(selectedSubmission.id)"
                  class="p-2 text-primary hover:bg-secondary rounded-md"
                >
                  <Download class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Informations sur l'œuvre -->
          <div>
            <h3 class="text-lg font-medium text-foreground mb-4">Informations sur l'œuvre</h3>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-muted-foreground mb-1">Titre</h4>
                <p class="font-medium text-foreground">{{ selectedSubmission.title }}</p>
              </div>
              
              <div v-if="selectedSubmission.category">
                <h4 class="text-sm font-medium text-muted-foreground mb-1">Catégorie</h4>
                <p class="text-foreground">{{ selectedSubmission.category }}</p>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-muted-foreground mb-1">Résumé</h4>
                <div class="bg-secondary/30 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {{ selectedSubmission.summary }}
                </div>
              </div>

              <!-- Notes admin -->
              <div v-if="selectedSubmission.admin_notes">
                <h4 class="text-sm font-medium text-muted-foreground mb-1">Notes de l'administrateur</h4>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {{ selectedSubmission.admin_notes }}
                </div>
              </div>

              <!-- Consentement RGPD -->
              <div class="flex items-center gap-2">
                <CheckCircle v-if="selectedSubmission.rgpd_consent" class="w-4 h-4 text-green-600" />
                <XCircle v-else class="w-4 h-4 text-red-600" />
                <span class="text-sm">Consentement RGPD : {{ selectedSubmission.rgpd_consent ? 'Accepté' : 'Non accepté' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 pt-6 border-t border-border">
          <h3 class="text-lg font-medium text-foreground mb-4">Gestion</h3>
          <div class="flex flex-wrap gap-2">
            <select 
              v-model="newStatus"
              class="py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="pending">En attente</option>
              <option value="reviewing">En révision</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Rejeté</option>
              <option value="archived">Archivé</option>
            </select>
            
            <textarea
              v-model="adminNotes"
              rows="2"
              placeholder="Notes pour l'administration..."
              class="flex-1 min-w-[200px] py-2 px-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
            
            <button 
              @click="updateStatus"
              class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90"
            >
              Mettre à jour
            </button>
            
            <button 
              @click="deleteSubmission"
              class="border border-destructive text-destructive px-4 py-2 rounded-md font-medium hover:bg-destructive/10"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  User, Download, RefreshCw, Inbox, X, 
  FileText, CheckCircle, XCircle, BookOpen, FileCheck, Newspaper 
} from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'AdminSubmissionsPage',
  
  components: {
    User,
    Download,
    RefreshCw,
    Inbox,
    X,
    FileText,
    CheckCircle,
    XCircle,
    BookOpen,
    FileCheck,
    Newspaper
  },
  
  data() {
    return {
      submissions: [],
      stats: {
        total: 0,
        pending: 0,
        reviewing: 0,
        accepted: 0,
        rejected: 0
      },
      pagination: {
        total: 0,
        per_page: 20,
        current_page: 1,
        last_page: 1
      },
      filters: {
        type: '',
        status: '',
        search: ''
      },
      selectedSubmission: null,
      isModalOpen: false,
      isLoading: false,
      newStatus: 'pending',
      adminNotes: '',
      searchTimeout: null
    }
  },
  
  mounted() {
    this.fetchSubmissions()
    // this.fetchStatistics()
  },
  
  methods: {
    // Formattage des dates
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR')
    },
    
    formatDateTime(dateString) {
      return new Date(dateString).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    // Labels et classes
    getTypeLabel(type) {
      const labels = {
        'book': 'Livre',
        'memoir': 'Mémoire',
        'article': 'Article'
      }
      return labels[type] || type
    },
    
    getTypeClass(type) {
      const classes = {
        'book': 'px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
        'memoir': 'px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800',
        'article': 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'
      }
      return classes[type] || 'px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
    },
    
    getStatusLabel(status) {
      const labels = {
        'pending': 'En attente',
        'reviewing': 'En révision',
        'accepted': 'Accepté',
        'rejected': 'Rejeté',
        'archived': 'Archivé'
      }
      return labels[status] || status
    },
    
    getStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'reviewing': 'bg-blue-100 text-blue-800',
        'accepted': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
        'archived': 'bg-gray-100 text-gray-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    
    getStatusBgColor(status) {
      const colors = {
        'pending': 'hover:bg-yellow-50/50',
        'reviewing': 'hover:bg-blue-50/50',
        'accepted': 'hover:bg-green-50/50',
        'rejected': 'hover:bg-red-50/50',
        'archived': 'hover:bg-gray-50/50'
      }
      return colors[status] || ''
    },
    
    // API calls
    async fetchSubmissions() {
      this.isLoading = true
      
      try {
        const token = localStorage.getItem('token')
        const params = new URLSearchParams({
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
          ...this.filters
        }).toString()
        
        const response = await axios.get(
          `${this.$store.state.localhost}admin/submissions?${params}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        
        this.submissions = response.data.data.submissions
        this.pagination = response.data.data.pagination
        this.stats = response.data.data.stats
        console.log(response)
        
      } catch (error) {
        console.error('Erreur lors du chargement des soumissions:', error)
        if (error.response?.status === 401) {
          this.$router.push('/admin/login')
        }
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchStatistics() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `${this.$store.state.localhost}admin/submissions/statistics`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        
        this.stats = response.data.statistics
        
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
      }
    },
    
    async downloadFile(submissionId) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `${this.$store.state.localhost}admin/submissions/${submissionId}/download`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob'
          }
        )
        
        // Créer un lien de téléchargement
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        
        // Récupérer le nom du fichier depuis l'URL
        const filename = response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || 'document.pdf'
        
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error)
        alert('Impossible de télécharger le fichier')
      }
    },
    
    async updateStatus() {
      try {
        const token = localStorage.getItem('token')
        
        const response = await axios.put(
          `${this.$store.state.localhost}admin/submissions/${this.selectedSubmission.id}/status`,
          {
            status: this.newStatus,
            admin_notes: this.adminNotes
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        
        // Mettre à jour localement
        const index = this.submissions.findIndex(s => s.id === this.selectedSubmission.id)
        if (index !== -1) {
          this.submissions[index].status = this.newStatus
          this.submissions[index].admin_notes = this.adminNotes
        }
        
        this.selectedSubmission.status = this.newStatus
        this.selectedSubmission.admin_notes = this.adminNotes
        
        alert('Statut mis à jour avec succès')
        
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error)
        alert('Impossible de mettre à jour le statut')
      }
    },
    
    async deleteSubmission() {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette soumission ? Cette action est irréversible.')) {
        return
      }
      
      try {
        const token = localStorage.getItem('token')
        
        await axios.delete(
          `${this.$store.state.localhost}admin/submissions/${this.selectedSubmission.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        
        // Supprimer localement
        this.submissions = this.submissions.filter(s => s.id !== this.selectedSubmission.id)
        this.closeModal()
        this.fetchStatistics()
        
        alert('Soumission supprimée avec succès')
        
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Impossible de supprimer la soumission')
      }
    },
    
    // Modal
    viewSubmission(submission) {
      this.selectedSubmission = submission
      this.newStatus = submission.status
      this.adminNotes = submission.admin_notes || ''
      this.isModalOpen = true
    },
    
    closeModal() {
      this.isModalOpen = false
      this.selectedSubmission = null
      this.newStatus = 'pending'
      this.adminNotes = ''
    },
    
    // Utilitaires
    refreshSubmissions() {
      this.fetchSubmissions()
    //   this.fetchStatistics()
    },
    
    resetFilters() {
      this.filters = {
        type: '',
        status: '',
        search: ''
      }
      this.pagination.current_page = 1
      this.fetchSubmissions()
    },
    
    debounceSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.pagination.current_page = 1
        this.fetchSubmissions()
      }, 500)
    },
    
    nextPage() {
      if (this.pagination.current_page < this.pagination.last_page) {
        this.pagination.current_page++
        this.fetchSubmissions()
      }
    },
    
    prevPage() {
      if (this.pagination.current_page > 1) {
        this.pagination.current_page--
        this.fetchSubmissions()
      }
    }
  }
}
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

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

/* Responsive */
@media (max-width: 768px) {
  .min-w-\[800px\] {
    min-width: 100%;
  }
  
  .grid-cols-2, .grid-cols-5 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>