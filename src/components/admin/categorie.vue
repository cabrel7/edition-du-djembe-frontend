<template>
  <div class="animate-fade-in space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Gestion des Catégories</h1>
        <p class="text-muted-foreground mt-1">
          {{ categories.length }} catégorie{{ categories.length !== 1 ? 's' : '' }}
        </p>
      </div>
      <button 
        @click="openAddDialog"
        class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
      >
        <Plus class="w-4 h-4" />
        Nouvelle catégorie
      </button>
    </div>

    <!-- Table -->
    <div class="bg-card rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-3 px-4 font-semibold text-sm">Catégorie</th>
            <!-- <th class="text-left py-3 px-4 font-semibold text-sm">Nombre /de livres</th> -->
            <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="category in categories" 
            :key="category.id"
            class="border-b border-border hover:bg-secondary/50"
          >
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookMarked class="w-5 h-5 text-primary" />
                </div>
                <span class="font-medium">{{ category.name }}</span>
              </div>
            </td>
            <!-- <td class="py-3 px-4">
              <span class="px-2 py-1 bg-secondary text-muted-foreground text-sm rounded">
                {{ category.bookCount }} livres
              </span>
            </td> -->
            <td class="py-3 px-4 text-right">
              <div class="flex items-center justify-end gap-1">
                <button 
                  @click="openEditDialog(category)"
                  class="p-2 text-foreground hover:bg-secondary rounded-md"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button 
                  @click="deleteCategory(category.id)"
                  :disabled="deletingIds.includes(category.id)"
                  :aria-busy="deletingIds.includes(category.id)"
                  :title="deletingIds.includes(category.id) ? 'Suppression...' : 'Supprimer'"
                  class="p-2 text-destructive hover:bg-secondary rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Category Dialog -->
   
  </div>
   <div 
      v-if="isDialogOpen"
      class="fixed inset-0 w-full h-screen animate-fade-in z-50 bg-foreground/80 flex items-center justify-center p-4"
      @click="closeDialog"
    >
      <div 
        class="relative bg-card rounded-lg overflow-hidden w-full max-w-md"
        @click.stop
      >
        <button
          @click="closeDialog"
          class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
        <div class="p-6">
          <h2 class="text-xl font-semibold text-foreground mb-6">
            {{ editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie" }}
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                v-model="dialogData.name"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Description
              </label>
              <textarea
                type="text"
                v-model="dialogData.description"
                rows="5"
                placeholder="Description optionnelle..."
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div class="flex justify-end gap-2 pt-4 border-t border-border">
              <button 
                @click="closeDialog"
                class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
              >
                Annuler
              </button>
              <button 
                @click="saveCategory"
                :disabled="isSaving"
                :aria-busy="isSaving"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ isSaving ? "Enregistrement..." : (editingCategory ? "Enregistrer" : "Créer") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Plus, Edit, Trash2, BookMarked, X } from 'lucide-vue-next'
import { newIdempotencyKey, idempotencyHeaders, describeIdempotencyFailure } from '@/utils/idempotency'
import { isAlreadyDeleted, ALREADY_DELETED_TOAST } from '@/utils/deletion'

export default {
  name: 'CategoriesAdminPage',
  
  components: {
    Plus,
    Edit,
    Trash2,
    BookMarked,
    X
  },
  
  data() {
    return {
      deletingIds: [],
      isDialogOpen: false,
      editingCategory: null,
      isSaving: false,
      // Clé d'idempotence du formulaire de création en cours (null en modification).
      idempotencyKey: null,
      
      // Données du formulaire du dialog
      dialogData: {
        name: '',
        description: '',
        id:null
      },
   
    }
  },
  computed:{
    categories(){
            return this.$store.state.adminData.categories||[]
        },
  },
  methods: {
    // Ouvrir le dialog d'ajout
    openAddDialog() {
      this.editingCategory = null
      this.idempotencyKey = newIdempotencyKey()
      this.dialogData = {
        name: '',
        description: ''
      }
      this.isDialogOpen = true
    },
    
    // Ouvrir le dialog d'édition
    openEditDialog(category) {
      this.editingCategory = category
      this.dialogData = {
        id:category.id,
        name: category.name,
        description: category.description || ''
      }
      this.isDialogOpen = true
    },
    
    // Fermer le dialog
    closeDialog() {
      this.isDialogOpen = false
      this.editingCategory = null
    },
    
    // Sauvegarder la catégorie
    async saveCategory() {
      // Garde anti double-clic / retry : une requête à la fois.
      if (this.isSaving) return
      if (!this.dialogData.name.trim()) {
        alert("Le nom de la catégorie est requis")
        return
      }

      this.isSaving = true
      try {
        const res = await this.axios.post(
          this.$store.state.localhost + 'saveCategorie',
          { ...this.dialogData },
          { headers: idempotencyHeaders(this.editingCategory ? null : this.idempotencyKey) }
        )

        // Objet renvoyé par le serveur (avec id) : évite le doublon à la
        // modification d'une catégorie tout juste créée.
        const saved = res.data.categorie
        if (this.editingCategory) {
          Object.assign(this.editingCategory, saved)
          this.showToast("Catégorie mise à jour", "Les modifications ont été enregistrées avec succès.")
        } else {
          this.categories.unshift(saved)
          this.idempotencyKey = newIdempotencyKey()
          this.showToast("Catégorie créée", "La catégorie a été créée avec succès.")
        }
        this.closeDialog()
      } catch (e) {
        const idem = this.editingCategory ? null : describeIdempotencyFailure(e)
        if (idem && idem.renewKey) this.idempotencyKey = newIdempotencyKey()
        this.showToast("Erreur", idem?.message || e.response?.data?.message || e.message || "Impossible d'enregistrer la catégorie")
      } finally {
        this.isSaving = false
      }
    },
    
    // Supprimer une catégorie
    async deleteCategory(id) {
      if (this.deletingIds.includes(id)) return
      if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return
      this.deletingIds.push(id)
      try {
        await this.axios.delete(this.$store.state.localhost + `deleteCategorie/${id}`)
        this.$store.commit('deleteCategorie', id)
        this.showToast("Catégorie supprimée", "La catégorie a été supprimée avec succès.")
      } catch (e) {
        if (isAlreadyDeleted(e)) {
          this.$store.commit('deleteCategorie', id)
          this.showToast(ALREADY_DELETED_TOAST.title, ALREADY_DELETED_TOAST.description)
        } else {
          this.showToast("Erreur", e.response?.data?.message || "Impossible de supprimer la catégorie")
        }
      } finally {
        this.deletingIds = this.deletingIds.filter(i => i !== id)
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

.max-w-md {
  max-width: 28rem;
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
  background-color: hsl(var(--secondary) / 0.5);
}

/* Style pour les inputs */
input:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Style pour les boutons */
button:hover {
  opacity: 0.9;
}
</style>