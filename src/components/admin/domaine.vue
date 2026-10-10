<template>
    <div class="animate-fade-in space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-foreground">Gestion des Domaines</h1>
                <p class="text-muted-foreground mt-1">
                    {{ filteredDomaines.length }} domaine{{ filteredDomaines.length !== 1 ? 's' : '' }}
                    • {{ activeCount }} actif{{ activeCount !== 1 ? 's' : '' }}
                </p>
            </div>
            <button @click="openAddDialog"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Nouveau domaine
            </button>
        </div>

        <!-- Search and Filters -->
        <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="relative max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Rechercher un domaine..." :value="searchQuery"
                    @input="updateSearchQuery"
                    class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <!-- Status Filter -->
            <div class="flex gap-2">
                <button @click="filterStatus = 'all'"
                    :class="filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Tous
                </button>
                <button @click="filterStatus = true"
                    :class="filterStatus === true ? 'bg-green-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Actifs
                </button>
                <button @click="filterStatus = false"
                    :class="filterStatus === false ? 'bg-gray-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Inactifs
                </button>
            </div>
        </div>

        <!-- Domains Table -->
        <div class="bg-card rounded-lg shadow overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-border">
                        <th class="w-16 text-left py-3 px-4 font-semibold text-sm">Statut</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Nom/Slug</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Description</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Création</th>
                        <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="domaine in filteredDomaines" :key="domaine.id"
                        class="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td class="py-3 px-4">
                            <span v-if="domaine.is_active"
                                class="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded"
                                title="Actif">
                                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                Actif
                            </span>
                            <span v-else
                                class="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-500/10 text-gray-600 rounded"
                                title="Inactif">
                                <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                                Inactif
                            </span>
                        </td>
                        <td class="py-3 px-4">
                            <div>
                                <div class="font-medium">{{ domaine.name }}</div>
                                <div class="text-xs text-muted-foreground mt-1">{{ domaine.slug }}</div>
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <p class="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                                {{ domaine.description || 'Aucune description' }}
                            </p>
                        </td>
                        <td class="py-3 px-4">
                            <div class="text-sm">
                                {{ formatDate(domaine.created_at, 'short') }}
                            </div>
                        </td>
                        <td class="py-3 px-4 text-right">
                            <div class="flex items-center justify-end gap-1">
                                <button @click="openEditDialog(domaine)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Éditer">
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button @click="toggleStatus(domaine)"
                                    :class="domaine.is_active ? 'text-yellow-600' : 'text-green-600'"
                                    class="p-2 hover:bg-secondary rounded-md"
                                    :title="domaine.is_active ? 'Désactiver' : 'Activer'">
                                    <Power class="w-4 h-4" />
                                </button>
                                <button @click="deleteDomaine(domaine.id)"
                                    class="p-2 text-destructive hover:bg-secondary rounded-md" title="Supprimer">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="filteredDomaines.length === 0" class="py-12 text-center">
                <div class="w-16 h-16 mx-auto mb-4 text-muted-foreground/50">
                    <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <p class="text-lg text-muted-foreground mb-2">Aucun domaine trouvé</p>
                <p class="text-sm text-muted-foreground">Commencez par ajouter votre premier domaine</p>
            </div>
        </div>


    </div>
    <!-- Domaine Dialog -->
    <div v-if="isDialogOpen"
        class="fixed inset-0 animate-fade-in z-50 bg-foreground/80 w-full h-screen flex items-center justify-center p-4"
        @click="closeDialog">
        <div class="relative bg-card rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
            @click.stop>
            <button @click="closeDialog"
                class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <X class="w-4 h-4" />
            </button>
            <div class="p-6">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                    {{ editingDomaine ? "Modifier le domaine" : "Nouveau domaine" }}
                </h2>
                <div class="space-y-4">
                    <!-- Nom -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Nom du domaine *
                        </label>
                        <input type="text" v-model="dialogData.name"
                            placeholder="Ex: Informatique, Économie, Philosophie..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            @input="generateSlug" />
                    </div>

                    <!-- Slug -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Slug (URL)
                        </label>
                        <input type="text" v-model="dialogData.slug"
                            placeholder="Ex: informatique, economie, philosophie"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        <p class="text-xs text-muted-foreground mt-1">
                            Utilisé dans les URLs. Généré automatiquement à partir du nom.
                        </p>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Description
                        </label>
                        <textarea v-model="dialogData.description" rows="4"
                            placeholder="Description détaillée du domaine..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
                    </div>

                    <!-- Statut -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Statut
                        </label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" v-model="dialogData.is_active" :value="true"
                                    class="rounded-full border-input text-primary focus:ring-ring" />
                                <span class="text-sm font-medium">Actif</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" v-model="dialogData.is_active" :value="false"
                                    class="rounded-full border-input text-primary focus:ring-ring" />
                                <span class="text-sm font-medium">Inactif</span>
                            </label>
                        </div>
                    </div>

                    <!-- Validation Errors -->
                    <div v-if="errors.length > 0" class="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <ul class="text-sm text-destructive space-y-1">
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-2 pt-4 border-t border-border">
                        <button @click="closeDialog"
                            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium">
                            Annuler
                        </button>
                        <button @click="saveDomaine"
                            class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all">
                            {{ editingDomaine ? "Enregistrer" : "Créer" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Plus, Search, Edit, Trash2, X, Power } from 'lucide-vue-next'

export default {
    name: 'AdminDomainesPage',

    components: {
        Plus,
        Search,
        Edit,
        Trash2,
        X,
        Power
    },

    data() {
        return {
            searchQuery: '',
            filterStatus: 'all',
            isDialogOpen: false,
            editingDomaine: null,
            errors: [],

            // Données du formulaire du dialog
            dialogData: {
                name: '',
                slug: '',
                description: '',
                is_active: true
            },

            // Données mockées des domaines
            
        }
    },

    computed: {
    
    domaines(){
            return this.$store.state.adminData.domaine||[]
        },
  
        // Domaines filtrés
        filteredDomaines() {
            let filtered = this.domaines

            // Filtre par recherche
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase()
                filtered = filtered.filter(domaine =>
                    domaine.name.toLowerCase().includes(query) ||
                    domaine.slug.toLowerCase().includes(query) ||
                    (domaine.description && domaine.description.toLowerCase().includes(query))
                )
            }

            // Filtre par statut
            if (this.filterStatus !== 'all') {
                filtered = filtered.filter(domaine => domaine.is_active === this.filterStatus)
            }

            // Tri par date de création (plus récent d'abord)
            return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        },

        // Compte des domaines actifs
        activeCount() {
            return this.domaines.filter(d => d.is_active).length
        }
    },

    methods: {
        // Mise à jour de la recherche
        updateSearchQuery(event) {
            this.searchQuery = event.target.value
        },

        // Formatage des dates
        formatDate(dateString, format = 'short') {
            if (!dateString) return 'Date inconnue'
            const date = new Date(dateString)
            const options = format === 'short'
                ? { day: 'numeric', month: 'short', year: 'numeric' }
                : { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
            return date.toLocaleDateString('fr-FR', options)
        },

        // Générer le slug à partir du nom
        generateSlug() {
            if (this.dialogData.name && !this.editingDomaine) {
                this.dialogData.slug = this.dialogData.name
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Supprime les accents
                    .replace(/[^\w\s]/gi, '') // Supprime les caractères spéciaux
                    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
            }
        },

        // Ouvrir le dialog d'ajout
        openAddDialog() {
            this.editingDomaine = null
            this.dialogData = {
                name: '',
                slug: '',
                description: '',
                is_active: true
            }
            this.errors = []
            this.isDialogOpen = true
        },

        // Ouvrir le dialog d'édition
        openEditDialog(domaine) {
            this.editingDomaine = domaine
            this.dialogData = {
                id:domaine.id,
                name: domaine.name,
                slug: domaine.slug,
                description: domaine.description || '',
                is_active: domaine.is_active
            }
            this.errors = []
            this.isDialogOpen = true
        },

        // Fermer le dialog
        closeDialog() {
            this.isDialogOpen = false
            this.editingDomaine = null
            this.errors = []
        },

        // Valider les données du formulaire
        validateForm() {
            this.errors = []

            if (!this.dialogData.name.trim()) {
                this.errors.push("Le nom du domaine est requis")
            }

           

            // Vérifier l'unicité du slug (sauf pour l'édition)
            const existingSlug = this.domaines.find(d =>
                d.slug === this.dialogData.slug &&
                (!this.editingDomaine || d.id !== this.editingDomaine.id)
            )
            if (existingSlug) {
                this.errors.push("Ce slug est déjà utilisé par un autre domaine")
            }

            return this.errors.length === 0
        },

        // Sauvegarder le domaine
      async  saveDomaine() {
            if (!this.validateForm()) {
                return
            }

           
            // Ajouter un nouveau domaine
            const newDomaine = {
              
                ...this.dialogData,
           
            }
             let token = localStorage.getItem('token')
            try {
                const res = await this.axios.post(
                    this.$store.state.localhost + 'saveDomaine',
                    newDomaine,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,

                        }
                    }
                )

                if (res.status !== 500 || res.status !== 404 || res.status !== 401) {
                     if (this.editingDomaine) {
                // Mettre à jour le domaine existant
                Object.assign(this.editingDomaine, {
                    ...this.dialogData,
                    updated_at: new Date().toISOString()
                })

                this.showToast("Domaine mis à jour", "Les modifications ont été enregistrées.")
            }else{
                 this.domaines.unshift(newDomaine)
            this.showToast("Domaine créé", "Le domaine a été créé avec succès.")
            }
                  
                    this.closeDialog()
                  
                }
                console.log(res)

            } catch (e) {
                // tu gères → plus d'erreur console
                // console.log("yo",e.message)
                this.showToast(e.message, '')
            }
          


           
           
        },

        // Changer le statut (actif/inactif)
        async toggleStatus(domaine) {
            const newStatus = !domaine.is_active
            const statusText = newStatus ? "activé" : "désactivé"

            if (confirm(`Êtes-vous sûr de vouloir ${statusText} le domaine "${domaine.name}" ?`)) {
                const previous = domaine.is_active
                domaine.is_active = newStatus

                try {
                    await this.axios.post(
                        this.$store.state.localhost + 'saveDomaine',
                        { id: domaine.id, name: domaine.name, is_active: newStatus },
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                    )
                    this.showToast(
                        "Statut modifié",
                        `Le domaine a été ${statusText}.`
                    )
                } catch (e) {
                    domaine.is_active = previous
                    this.showToast("Erreur", e.response?.data?.message || "Impossible de changer le statut")
                }
            }
        },

        // Supprimer un domaine
       async deleteDomaine(id) {
            const domaine = this.domaines.find(d => d.id === id)
            if (!domaine) return
           
            if (confirm(`Êtes-vous sûr de vouloir supprimer le domaine "${domaine.name}" ? Cette action est irréversible.`)) {
             
                   let token =localStorage.getItem('token')
                await this.axios.delete(this.$store.state.localhost+`deleteDomaine/${id}`, {headers:{
                    Authorization: `Bearer ${token}`
                }}).then(()=>{
                    this.$store.commit('deleteDomain', id)
                this.showToast("Domaine supprimé", "Le domaine a été supprimé avec succès.")
            })
                
            }
        },

        // Afficher une notification
        showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
        }
    },

    mounted() {
        console.log('Admin domaines page mounted')
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

/* Style pour le dialog */
.fixed {
    position: fixed;
}

.z-50 {
    z-index: 50;
}

.bg-foreground\/80 {
    background-color: rgba(0, 0, 0, 0.8);
}

.max-h-\[90vh\] {
    max-height: 90vh;
}

.overflow-y-auto {
    overflow-y: auto;
}

/* Style pour le tableau */
table {
    border-collapse: collapse;
}

th {
    font-weight: 600;
}

td,
th {
    padding: 0.75rem 1rem;
}

tr:hover {
    background-color: hsl(var(--secondary) / 0.5);
}

/* Style pour les textes truncate */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.max-w-xs {
    max-width: 20rem;
}

/* Style pour les inputs */
input:focus,
textarea:focus {
    box-shadow: 0 0 0 2px hsl(var(--ring));
    outline: none;
}

/* Style pour les boutons radio */
input[type="radio"]:checked {
    background-color: hsl(var(--primary));
    border-color: hsl(var(--primary));
}

/* Animation pour les transitions */
.transition-colors {
    transition: background-color 0.2s ease, color 0.2s ease;
}

/* Style pour les statuts */
.w-2.h-2 {
    width: 0.5rem;
    height: 0.5rem;
}
</style>