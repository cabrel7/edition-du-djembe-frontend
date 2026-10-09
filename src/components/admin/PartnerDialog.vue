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
          {{ partner ? "Modifier le partenaire" : "Nouveau partenaire" }}
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nom -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Nom du partenaire *
            </label>
            <input
              type="text"
              v-model="form.nom"
              placeholder="Entreprise ou organisation"
              required
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- Type -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Type de partenaire
            </label>
            <select 
              v-model="form.type"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Sélectionner un type</option>
              <option value="Éditeur">Éditeur</option>
              <option value="Distributeur">Distributeur</option>
              <option value="Technologique">Technologique</option>
              <option value="Institutionnel">Institutionnel</option>
              <option value="Média">Média</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <!-- Logo -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Logo
            </label>
            <div class="flex items-center gap-4">
              <div 
                class="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center overflow-hidden"
              >
                <img 
                  v-if="image" 
                  :src="image" 
                  :alt="form.nom"
                  class="w-full h-full object-contain p-2"
                />
                <Building2 class="w-12 h-12 text-muted-foreground" v-else />
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  ref="logoInput"
                  @change="handleLogoUpload"
                  accept="image/*"
                  class="hidden"
                />
                <input
                  type="text"
                  v-model="form.image"
                  placeholder="URL du logo ou téléchargez une image"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div class="flex gap-2 mt-2">
                  <button 
                    type="button"
                    @click="$refs.logoInput.click()"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium inline-flex items-center gap-1"
                  >
                    <Upload class="w-3 h-3" />
                    Télécharger
                  </button>
                  <button 
                    type="button"
                    @click="form.image = ''"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium"
                    v-if="form.image"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Site web -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Site web
            </label>
            <input
              type="url"
              v-model="form.website"
              placeholder="https://www.exemple.com"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Description du partenariat..."
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
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
              {{ loading ? 'Enregistrement...' : (partner ? "Enregistrer" : "Ajouter") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X, Building2, Upload } from 'lucide-vue-next'

export default {
  name: 'PartnerDialog',
  
  components: {
    X,
    Building2,
    Upload
  },
  
  props: {
    partner: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      image: '',
      form: {
        nom: '',
        image: '',
        website: '',
        description: '',
        type: '',
        display_order: 1,
        is_active: true
      },
      loading: false
    }
  },
  
  watch: {
    partner: {
      immediate: true,
      handler(partner) {
        if (partner) {
          this.image = partner.image
          this.form = { ...partner }
        } else {
          this.resetForm()
        }
      }
    }
  },
  
  methods: {
    resetForm() {
      this.image = ''
      this.form = {
        nom: '',
        image: '',
        website: '',
        description: '',
        type: '',
        display_order: 1,
        is_active: true
      }
    },
    
    handleLogoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
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
