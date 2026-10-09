<template>
  <div 
    class="fixed inset-0 animate-fade-in z-50 bg-foreground/80 w-full h-screen flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <div 
      class="relative bg-card rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
      <div class="p-6">
        <h2 class="text-xl font-semibold text-foreground mb-6">
          {{ member ? "Modifier le membre" : "Nouveau membre d'équipe" }}
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nom et Prénom -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Nom *
              </label>
              <input
                type="text"
                v-model="form.nom"
                placeholder="Dupont"
                required
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Prénom *
              </label>
              <input
                type="text"
                v-model="form.prenom"
                placeholder="Jean"
                required
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <!-- Email et Rôle -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Email
              </label>
              <input
                type="email"
                v-model="form.email"
                placeholder="jean.dupont@email.com"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Rôle *
              </label>
              <input
                type="text"
                v-model="form.role"
                placeholder="Directeur éditorial"
                required
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <!-- Bio -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Bio
            </label>
            <textarea
              v-model="form.bio"
              rows="3"
              placeholder="Courte description..."
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
          </div>

          <!-- Photo -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Photo
            </label>
            <div class="flex items-center gap-4">
              <div 
                class="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
              >
                <img 
                  v-if="photo" 
                  :src="photo" 
                  :alt="form.prenom"
                  class="w-full h-full object-cover"
                />
                <User class="w-10 h-10 text-muted-foreground" v-else />
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  ref="photoInput"
                  @change="handlePhotoUpload"
                  accept="image/*"
                  class="hidden"
                />
                <input
                  type="text"
                  v-model="form.photo"
                  placeholder="URL de la photo ou téléchargez une image"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div class="flex gap-2 mt-2">
                  <button 
                    type="button"
                    @click="$refs.photoInput.click()"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium inline-flex items-center gap-1"
                  >
                    <Upload class="w-3 h-3" />
                    Télécharger
                  </button>
                  <button 
                    type="button"
                    @click="form.photo = ''"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium"
                    v-if="form.photo"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Ordre d'affichage -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Ordre d'affichage
            </label>
            <input
              type="number"
              v-model.number="form.display_order"
              min="1"
              class="w-32 py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p class="text-xs text-muted-foreground mt-1">
              Définit l'ordre d'affichage (1 = premier)
            </p>
          </div>

          <!-- Statut -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Statut
            </label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="form.is_active" 
                  :value="true"
                  class="rounded-full border-input text-primary focus:ring-ring" 
                />
                <span class="text-sm font-medium">Actif</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="form.is_active" 
                  :value="false"
                  class="rounded-full border-input text-primary focus:ring-ring" 
                />
                <span class="text-sm font-medium">Inactif</span>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-4 border-t border-border">
            <button 
              type="button"
              @click="$emit('close')"
              class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
            >
              Annuler
            </button>
            <button 
              type="submit"
              class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all"
              :disabled="loading"
            >
              {{ loading ? 'Enregistrement...' : (member ? "Enregistrer" : "Ajouter") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X, User, Upload } from 'lucide-vue-next'

export default {
  name: 'TeamMemberDialog',
  
  components: {
    X,
    User,
    Upload
  },
  
  props: {
    member: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      photo: '',
      form: {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        photo: null,
        bio: '',
        display_order: 1,
        is_active: true
      },
      loading: false
    }
  },
  
  watch: {
    member: {
      immediate: true,
      handler(member) {
        if (member) {
          this.photo = member.photo
          this.form = { ...member }
        } else {
          this.resetForm()
        }
      }
    }
  },
  
  methods: {
    resetForm() {
      this.photo = ''
      this.form = {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        photo: '',
        bio: '',
        display_order: 1,
        is_active: true
      }
    },
    
    handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.photo = file
        // Dans une application réelle, vous uploaderiez le fichier vers le serveur
        // Pour l'instant, nous créons une URL locale
        const reader = new FileReader()
        reader.onload = (e) => {
          this.photo = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    
    async handleSubmit() {
      this.loading = true
      try {
        await this.$emit('save', this.form)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
