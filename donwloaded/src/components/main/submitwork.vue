<template>
  <div class="animate-fade-in">
    <!-- Success Message -->
    <div v-if="isSubmitted">
      <section class="section-padding">
        <div class="container-custom">
          <div class="max-w-2xl mx-auto text-center">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle class="w-10 h-10 text-primary" />
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-4">
              Manuscrit envoyé avec succès !
            </h1>
            <p class="text-muted-foreground mb-8">
              Nous avons bien reçu votre soumission. Notre comité de lecture 
              examinera votre manuscrit et vous contactera dans les meilleurs délais.
            </p>
            <button 
              @click="resetForm"
              class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
            >
              Soumettre une autre œuvre
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Form Section -->
    <div v-else>
      <!-- Hero Section -->
      <section class="bg-primary text-primary-foreground py-16">
        <div class="container-custom">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Soumettre une Œuvre</h1>
          <p class="text-xl text-primary-foreground/90 max-w-2xl">
            Vous avez un manuscrit à nous proposer ? Remplissez le formulaire ci-dessous 
            et notre équipe éditoriale l'examinera avec attention.
          </p>
        </div>
      </section>

      <!-- Form Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="max-w-2xl mx-auto">
            <form @submit.prevent="handleSubmit" class="space-y-8">
              <!-- Personal Info -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Informations personnelles
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      v-model="formData.firstName"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.firstName" class="text-sm text-destructive mt-1">
                      {{ errors.firstName }}
                    </p>
                  </div>
                  <div>
                    <label for="lastName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      v-model="formData.lastName"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.lastName" class="text-sm text-destructive mt-1">
                      {{ errors.lastName }}
                    </p>
                  </div>
                  <div>
                    <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      v-model="formData.email"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.email" class="text-sm text-destructive mt-1">
                      {{ errors.email }}
                    </p>
                  </div>
                  <div>
                    <label for="phone" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      v-model="formData.phone"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <!-- Work Info -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Informations sur l'œuvre
                </h2>
                <div class="space-y-4">
                  <div>
                    <label for="title" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Titre de l'œuvre *
                    </label>
                    <input
                      id="title"
                      type="text"
                      v-model="formData.title"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.title" class="text-sm text-destructive mt-1">
                      {{ errors.title }}
                    </p>
                  </div>
                 
                  <div>
                    <label for="summary" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Résumé *
                    </label>
                    <textarea
                      id="summary"
                      v-model="formData.summary"
                      rows="6"
                      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Décrivez votre œuvre en quelques paragraphes..."
                    ></textarea>
                    <p v-if="errors.summary" class="text-sm text-destructive mt-1">
                      {{ errors.summary }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- File Upload -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Manuscrit
                </h2>
                <div class="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    @change="handleFileChange"
                    class="hidden"
                    id="manuscript"
                  />
                  <label
                    for="manuscript"
                    class="cursor-pointer flex flex-col items-center"
                  >
                    <div v-if="fileName">
                      <FileText class="w-12 h-12 text-primary mb-4" />
                      <p class="text-foreground font-medium">{{ fileName }}</p>
                      <p class="text-sm text-muted-foreground mt-1">
                        Cliquez pour changer le fichier
                      </p>
                    </div>
                    <div v-else>
                      <Upload class="w-12 h-12 text-muted-foreground mb-4" />
                      <p class="text-foreground font-medium">
                        Cliquez pour télécharger votre manuscrit
                      </p>
                      <p class="text-sm text-muted-foreground mt-1">
                        Format PDF uniquement • Max 20 Mo
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- RGPD Consent -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <div class="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rgpdConsent"
                    v-model="formData.rgpdConsent"
                    class="h-4 w-4 rounded border-input bg-background mt-0.5"
                  />
                  <div>
                    <label for="rgpdConsent" class="text-sm leading-relaxed">
                      J'accepte que mes données personnelles soient traitées par les Éditions 
                      conformément à leur politique de confidentialité. Je comprends que mes 
                      données seront utilisées uniquement dans le cadre de l'évaluation de mon manuscrit. *
                    </label>
                    <p v-if="errors.rgpdConsent" class="text-sm text-destructive mt-1">
                      {{ errors.rgpdConsent }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="isSubmitting"
                :class="[
                  'w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center justify-center gap-2',
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <template v-if="isSubmitting">
                  Envoi en cours...
                </template>
                <template v-else>
                  <Send class="w-4 h-4" />
                  Envoyer ma soumission
                </template>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
import { Upload, CheckCircle, FileText, Send } from 'lucide-vue-next'

export default {
  name: 'SubmitWorkPage',
  
  components: {
    Upload,
    CheckCircle,
    FileText,
    Send
  },
  
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        
        summary: '',
        rgpdConsent: false
      },
      
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
      
        summary: '',
        rgpdConsent: ''
      },
      
      fileName: null,
      isSubmitting: false,
      isSubmitted: false,
      
      // Catégories
      
    }
  },
  
  methods: {
    // Validation du formulaire
    validateForm() {
      // Réinitialiser les erreurs
      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
       
        summary: '',
        rgpdConsent: ''
      }
      
      let isValid = true
      
      // Validation du prénom
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = "Le prénom est requis"
        isValid = false
      } else if (this.formData.firstName.length < 2) {
        this.errors.firstName = "Le prénom doit contenir au moins 2 caractères"
        isValid = false
      } else if (this.formData.firstName.length > 50) {
        this.errors.firstName = "Le prénom ne peut pas dépasser 50 caractères"
        isValid = false
      }
      
      // Validation du nom
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = "Le nom est requis"
        isValid = false
      } else if (this.formData.lastName.length < 2) {
        this.errors.lastName = "Le nom doit contenir au moins 2 caractères"
        isValid = false
      } else if (this.formData.lastName.length > 50) {
        this.errors.lastName = "Le nom ne peut pas dépasser 50 caractères"
        isValid = false
      }
      
      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.formData.email.trim()) {
        this.errors.email = "L'email est requis"
        isValid = false
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = "Adresse email invalide"
        isValid = false
      }
      
      // Validation du titre
      if (!this.formData.title.trim()) {
        this.errors.title = "Le titre est requis"
        isValid = false
      } else if (this.formData.title.length < 3) {
        this.errors.title = "Le titre doit contenir au moins 3 caractères"
        isValid = false
      } else if (this.formData.title.length > 200) {
        this.errors.title = "Le titre ne peut pas dépasser 200 caractères"
        isValid = false
      }
      
     
      
      // Validation du résumé
      if (!this.formData.summary.trim()) {
        this.errors.summary = "Le résumé est requis"
        isValid = false
      } else if (this.formData.summary.length < 100) {
        this.errors.summary = "Le résumé doit contenir au moins 100 caractères"
        isValid = false
      } else if (this.formData.summary.length > 2000) {
        this.errors.summary = "Le résumé ne peut pas dépasser 2000 caractères"
        isValid = false
      }
      
      // Validation RGPD
      if (!this.formData.rgpdConsent) {
        this.errors.rgpdConsent = "Vous devez accepter les conditions"
        isValid = false
      }
      
      return isValid
    },
    
    // Gestion du fichier
    handleFileChange(event) {
      const file = event.target.files?.[0]
      if (file) {
        if (file.type !== "application/pdf") {
          alert("Format invalide : seuls les fichiers PDF sont acceptés.")
          return
        }
        if (file.size > 20 * 1024 * 1024) {
          alert("Fichier trop volumineux : le fichier ne doit pas dépasser 20 Mo.")
          return
        }
        this.fileName = file.name
      }
    },
    
    // Soumission du formulaire
    // Dans votre formulaire de soumission
async handleSubmit() {
  if (!this.validateForm()) {
    return
  }

  this.isSubmitting = true

  try {
    const formData = new FormData()
    formData.append('type', this.formData.type || 'book')
    formData.append('first_name', this.formData.firstName)
    formData.append('last_name', this.formData.lastName)
    formData.append('email', this.formData.email)
    formData.append('phone', this.formData.phone || '')
    formData.append('title', this.formData.title)
    formData.append('category', this.formData.category || '')
    formData.append('summary', this.formData.summary)
    formData.append('rgpd_consent', this.formData.rgpdConsent)
    
    // Ajouter le fichier
    const fileInput = document.getElementById('manuscript')
    if (fileInput.files[0]) {
      formData.append('file', fileInput.files[0])
    }

    // Envoyer à l'API
    const response = await axios.post(
      `${this.$store.state.localhost}submissions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    )

    this.isSubmitted = true
    alert('Votre soumission a été envoyée avec succès !')

  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    
    if (error.response?.status === 422) {
      const errors = error.response.data.errors
      Object.keys(errors).forEach(field => {
        if (this.errors.hasOwnProperty(field)) {
          this.errors[field] = errors[field][0]
        }
      })
      alert('Veuillez corriger les erreurs dans le formulaire.')
    } else {
      alert('Une erreur est survenue lors de l\'envoi de votre soumission.')
    }
  } finally {
    this.isSubmitting = false
  }
},
    
    // Simulation d'envoi
    submitFormData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Formulaire soumis:', {
            ...this.formData,
            fileName: this.fileName
          })
          resolve()
        }, 1500)
      })
    },
    
    // Réinitialiser le formulaire
    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        category: '',
        summary: '',
        rgpdConsent: false
      }
      this.fileName = null
      this.isSubmitted = false
      this.errors = {}
    }
  },
  
  mounted() {
    
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.text-destructive {
  color: hsl(var(--destructive));
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour le téléchargement de fichier */
.border-dashed {
  border-style: dashed;
}

/* Style pour les inputs */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Style pour les états désactivés */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation pour le succès */
.w-20.h-20 {
  animation: scale-up 0.3s ease-out;
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>