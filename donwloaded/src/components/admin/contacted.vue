<template>
  <div class="animate-fade-in space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Prise de Contact</h1>
        <p class="text-muted-foreground mt-1">
          {{ contacts.length }} contact{{ contacts.length !== 1 ? 's' : '' }}
        </p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="refreshContacts"
          class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
        >
          <RefreshCw class="w-4 h-4" />
          Actualiser
        </button>
        <button 
          @click="exportToCSV"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Download class="w-4 h-4" />
          Exporter CSV
        </button>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-card rounded-lg p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="text-sm font-medium block mb-1">Rechercher</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Nom, email, sujet..."
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Statut</label>
          <select 
            v-model="statusFilter"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Tous</option>
            <option value="pending">Non lu</option>
            <option value="read">Lu</option>
            <option value="replied">Répondu</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Date de début</label>
          <input
            type="date"
            v-model="dateFrom"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Date de fin</label>
          <input
            type="date"
            v-model="dateTo"
            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-card rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead>
            <tr class="border-b border-border bg-secondary/50">
              <th class="text-left py-3 px-4 font-semibold text-sm">Nom</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Email</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Sujet</th>
              <th class="text-left py-3 px-4 font-semibold text-sm">Date</th>
              <!-- <th class="text-left py-3 px-4 font-semibold text-sm">Statut</th> -->
              <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="contact in filteredContacts" 
              :key="contact.id"
              :class="[
                'border-b border-border hover:bg-secondary/30 transition-colors',
                contact.status === 'pending' ? 'bg-blue-50/20' : '',
                contact.status === 'read' ? 'bg-green-50/20' : ''
              ]"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User class="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span class="font-medium">{{ contact.name }}</span>
                    <p v-if="contact.phone" class="text-xs text-muted-foreground">
                      {{ contact.phone }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <a :href="'mailto:' + contact.email" class="text-primary hover:underline">
                  {{ contact.email }}
                </a>
              </td>
              <td class="py-3 px-4 max-w-xs">
                <p class="text-sm font-medium truncate" :title="contact.subject">
                  {{ contact.subject }}
                </p>
                <p class="text-xs text-muted-foreground truncate" :title="contact.message">
                  {{ contact.message.substring(0, 50) }}...
                </p>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm">
                  {{ formatDate(contact.created_at) }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ formatTime(contact.created_at) }}
                </div>
              </td>
              <!-- <td class="py-3 px-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusClass(contact.status)
                  ]"
                >
                  {{ getStatusLabel(contact.status) }}
                </span>
              </td> -->
              <td class="py-3 px-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button 
                    @click="viewContact(contact)"
                    class="p-2 text-primary hover:bg-secondary rounded-md"
                    title="Voir les détails"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    @click="replyToContact(contact)"
                    class="p-2 text-green-600 hover:bg-secondary rounded-md"
                    title="Répondre"
                  >
                    <Reply class="w-4 h-4" />
                  </button>
                  <!-- <button 
                    @click="toggleStatus(contact)"
                    class="p-2 text-blue-600 hover:bg-secondary rounded-md"
                    title="Changer le statut"
                  >
                    <CheckCircle class="w-4 h-4" />
                  </button> -->
                  <!-- <button 
                    @click="deleteContact(contact.id)"
                    class="p-2 text-destructive hover:bg-secondary rounded-md"
                    title="Supprimer"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredContacts.length === 0" class="py-12 text-center">
        <Inbox class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium text-foreground mb-2">
          Aucun contact trouvé
        </h3>
        <p class="text-muted-foreground">
          {{ searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucun message de contact pour le moment' }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredContacts.length > 0" class="flex justify-between items-center">
      <div class="text-sm text-muted-foreground">
        Affichage de {{ filteredContacts.length }} sur {{ contacts.length }} contacts
      </div>
      <div class="flex gap-2">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <span class="px-3 py-1">
          Page {{ currentPage }}
        </span>
        <button 
          @click="nextPage"
          :disabled="currentPage * itemsPerPage >= filteredContacts.length"
          class="px-3 py-1 rounded border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de visualisation du contact -->
  <div 
    v-if="isModalOpen && selectedContact"
    class="fixed inset-0 animate-fade-in w-full h-screen z-50 bg-foreground/80 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div 
      class="relative bg-card rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
              Message de contact
            </h2>
            <p class="text-sm text-muted-foreground mt-1">
              Reçu le {{ formatDateTime(selectedContact.created_at) }}
            </p>
          </div>
          <div class="flex gap-2">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getStatusClass(selectedContact.status)
              ]"
            >
              {{ getStatusLabel(selectedContact.status) }}
            </span>
            <button 
              @click="toggleStatus(selectedContact)"
              class="px-3 py-1 rounded border border-input bg-background text-sm hover:bg-secondary"
            >
              {{ selectedContact.status === 'pending' ? 'Marquer comme lu' : 'Marquer non lu' }}
            </button>
          </div>
        </div>

        <!-- Informations de contact -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">
                Expéditeur
              </h3>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">{{ selectedContact.name }}</p>
                  <a :href="'mailto:' + selectedContact.email" class="text-primary text-sm hover:underline">
                    {{ selectedContact.email }}
                  </a>
                </div>
              </div>
            </div>
            
            <div v-if="selectedContact.phone">
              <h3 class="text-sm font-medium text-muted-foreground mb-1">
                Téléphone
              </h3>
              <a :href="'tel:' + selectedContact.phone" class="text-foreground">
                {{ selectedContact.phone }}
              </a>
            </div>
            
            <div v-if="selectedContact.company">
              <h3 class="text-sm font-medium text-muted-foreground mb-1">
                Entreprise
              </h3>
              <p class="text-foreground">{{ selectedContact.company }}</p>
            </div>
          </div>

       
        </div>

        <!-- Sujet -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-muted-foreground mb-2">
            Sujet
          </h3>
          <div class="bg-secondary/30 rounded-lg p-4">
            <p class="font-medium text-foreground">{{ selectedContact.subject }}</p>
          </div>
        </div>

        <!-- Message -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-muted-foreground mb-2">
            Message
          </h3>
          <div class="bg-secondary/30 rounded-lg p-4 whitespace-pre-wrap">
            {{ selectedContact.message }}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center pt-6 border-t border-border">
          <div>
            <button 
              @click="deleteContact(selectedContact.id)"
              class="text-destructive hover:underline text-sm"
            >
              Supprimer ce contact
            </button>
          </div>
          <div class="flex gap-2">
            <button 
              @click="closeModal"
              class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium"
            >
              Fermer
            </button>
            <button 
              @click="replyToContact(selectedContact)"
              class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              <Reply class="w-4 h-4" />
              Répondre
            </button>
          </div>
        </div>

        <!-- Historique des réponses -->
        <div v-if="selectedContact.replies && selectedContact.replies.length > 0" class="mt-8 pt-8 border-t border-border">
          <h3 class="text-lg font-medium text-foreground mb-4">
            Historique des réponses
          </h3>
          <div class="space-y-4">
            <div 
              v-for="reply in selectedContact.replies" 
              :key="reply.id"
              class="bg-secondary/20 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-2">
                <span class="font-medium">Réponse envoyée</span>
                <span class="text-sm text-muted-foreground">
                  {{ formatDateTime(reply.created_at) }}
                </span>
              </div>
              <p class="text-sm whitespace-pre-wrap">{{ reply.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Plus, Edit, Trash2, X, Eye, Reply, CheckCircle, 
  User, Download, RefreshCw, Inbox 
} from 'lucide-vue-next'
import axios from 'axios';
export default {
  name: 'ContactsAdminPage',
  
  components: {
    Plus,
    Edit,
    Trash2,
    X,
    Eye,
    Reply,
    CheckCircle,
    User,
    Download,
    RefreshCw,
    Inbox
  },
  
  data() {
    return {
      isModalOpen: false,
      selectedContact: null,
      
      // Filtres
      searchQuery: '',
      statusFilter: '',
      dateFrom: '',
      dateTo: '',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 20,
      
      // Données mockées des contacts
     contacts:[]
    }
  },
  
  computed: {
    filteredContacts() {
      let filtered = this.contacts
      
      // Recherche par texte
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(contact => 
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.subject.toLowerCase().includes(query) ||
          contact.message.toLowerCase().includes(query) ||
          (contact.phone && contact.phone.includes(query)) ||
          (contact.company && contact.company.toLowerCase().includes(query))
        )
      }
      
      // Filtre par statut
      if (this.statusFilter) {
        filtered = filtered.filter(contact => contact.status === this.statusFilter)
      }
      
      // Filtre par date
      if (this.dateFrom) {
        const fromDate = new Date(this.dateFrom)
        filtered = filtered.filter(contact => new Date(contact.created_at) >= fromDate)
      }
      
      if (this.dateTo) {
        const toDate = new Date(this.dateTo)
        toDate.setHours(23, 59, 59, 999)
        filtered = filtered.filter(contact => new Date(contact.created_at) <= toDate)
      }
      
      // Trier par date (plus récent d'abord)
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      
      return filtered
    },
    
    paginatedContacts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredContacts.slice(start, end)
    }
  },
  
  methods: {
    
  async fetchContacts() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${this.$store.state.localhost}contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      this.contacts = response.data.contacts;
      this.pagination = response.data.pagination;
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  },
  
  async updateContactStatus(contactId, status) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${this.$store.state.localhost}contacts/${contactId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Mettre à jour localement
      const contact = this.contacts.find(c => c.id === contactId);
      if (contact) contact.status = status;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  },
  
  async deleteContact(contactId) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${this.$store.state.localhost}contacts/${contactId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Supprimer localement
      this.contacts = this.contacts.filter(c => c.id !== contactId);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }
,
    // Formattage des dates
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR')
    },
    
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
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
    
    // Gestion du statut
    getStatusLabel(status) {
      const labels = {
        pending: 'Non lu',
        read: 'Lu',
        replied: 'Répondu',
        archived: 'Archivé'
      }
      return labels[status] || status
    },
    
    getStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        read: 'bg-green-100 text-green-800',
        replied: 'bg-blue-100 text-blue-800',
        archived: 'bg-gray-100 text-gray-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    
    // Modal
    viewContact(contact) {
      this.selectedContact = { ...contact }
      this.isModalOpen = true
    },
    
    closeModal() {
      this.isModalOpen = false
      this.selectedContact = null
    },
    
    // Actions
    replyToContact(contact) {
      const emailSubject = encodeURIComponent(`Re: ${contact.subject}`)
      const emailBody = encodeURIComponent(`\n\n--- Message original ---\nDe: ${contact.name}\nEmail: ${contact.email}\nDate: ${this.formatDateTime(contact.created_at)}\n\n${contact.message}`)
      window.open(`mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`, '_blank')
    },
    
    toggleStatus(contact) {
      const statusOrder = ['pending', 'read', 'replied', 'archived']
      const currentIndex = statusOrder.indexOf(contact.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      contact.status = statusOrder[nextIndex]
      
      if (this.selectedContact && this.selectedContact.id === contact.id) {
        this.selectedContact.status = contact.status
      }
    },
    
    deleteContact(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ? Cette action est irréversible.")) {
        this.contacts = this.contacts.filter(c => c.id !== id)
        if (this.selectedContact && this.selectedContact.id === id) {
          this.closeModal()
        }
        this.showToast("Contact supprimé", "Le contact a été supprimé avec succès.")
      }
    },
    
    refreshContacts() {
      // Ici, vous feriez un appel API pour rafraîchir les données
      this.showToast("Actualisation", "Les contacts ont été actualisés.")
    },
    
    exportToCSV() {
      const headers = ['Nom', 'Email', 'Téléphone', 'Entreprise', 'Sujet', 'Message', 'Date', 'Statut']
      const csvContent = [
        headers.join(','),
        ...this.contacts.map(contact => [
          `"${contact.name}"`,
          `"${contact.email}"`,
          `"${contact.phone || ''}"`,
          `"${contact.company || ''}"`,
          `"${contact.subject}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          `"${this.formatDateTime(contact.created_at)}"`,
          `"${this.getStatusLabel(contact.status)}"`
        ].join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      this.showToast("Export réussi", "Le fichier CSV a été téléchargé.")
    },
    
    // Pagination
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.filteredContacts.length) {
        this.currentPage++
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    // Utilitaires
    showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
        }
  },
  
  mounted() {
    this.fetchContacts()
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

.text-destructive {
  color: hsl(var(--destructive));
}

/* Style pour le modal */
.fixed {
  position: fixed;
}

.z-50 {
  z-index: 50;
}

.bg-foreground\/80 {
  background-color: rgba(0, 0, 0, 0.8);
}

.max-w-3xl {
  max-width: 48rem;
}

.max-h-\[90vh\] {
  max-height: 90vh;
}

/* Style pour le tableau */
table {
  border-collapse: collapse;
}

th {
  font-weight: 600;
}

td, th {
  padding: 0.75rem 1rem;
}

tr:hover {
  background-color: hsl(var(--secondary) / 0.3);
}

/* Style pour les textes truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Style pour les statuts */
.bg-yellow-100 {
  background-color: #fef3c7;
}

.text-yellow-800 {
  color: #92400e;
}

.bg-green-100 {
  background-color: #d1fae5;
}

.text-green-800 {
  color: #065f46;
}

.bg-blue-100 {
  background-color: #dbeafe;
}

.text-blue-800 {
  color: #1e40af;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-gray-800 {
  color: #1f2937;
}

/* Style pour les messages */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Style pour les inputs */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Responsive */
@media (max-width: 768px) {
  .min-w-\[800px\] {
    min-width: 100%;
  }
}
</style>