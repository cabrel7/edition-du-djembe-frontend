<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
        <p class="text-xl text-primary-foreground/90 max-w-2xl">
          Une question, un projet ? Notre équipe est à votre écoute pour
          vous accompagner.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Info -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold text-foreground mb-6">
              Nos coordonnées
            </h2>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">Adresse</p>
                  <p class="text-muted-foreground text-sm mt-1">
  {{ contactInfo.address.street }}<br />
  {{ contactInfo.address.city }}
</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">Téléphone</p>
                 <a :href="'tel:'+contactInfo.phone" class="text-muted-foreground text-sm mt-1">
  {{ contactInfo.phone }}
                 </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">Email</p>
                  <a :href="'mailto:'+contactInfo.email" class="text-muted-foreground text-sm mt-1">
  {{ contactInfo.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">Horaires</p>
                  <p class="text-muted-foreground text-sm mt-1">
  {{ contactInfo.schedule.weekdays }}<br />
  {{ contactInfo.schedule.saturday }}
</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-8 pt-8 border-t border-border">
              <p class="font-medium text-foreground mb-4">Suivez-nous</p>
              <div class="flex gap-3">
                <a href="#"
                  class="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  @click.prevent="shareOnFacebook">
                  <Facebook class="w-5 h-5" />
                </a>
                <a href="#"
                  class="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  @click.prevent="shareOnTwitter">
                  <Twitter class="w-5 h-5" />
                </a>
                <a href="#"
                  class="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  @click.prevent="shareOnLinkedin">
                  <Linkedin class="w-5 h-5" />
                </a>
                <a href="#"
                  class="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  @click.prevent="shareOnInstagram">
                  <Instagram class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-card rounded-xl p-8 card-shadow-lg">
              <h2 class="text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un message
              </h2>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="name"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Nom complet *
                    </label>
                    <input id="name" type="text" v-model="formData.name"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Jean Dupont" />
                    <p v-if="errors.name" class="text-sm text-destructive mt-1">
                      {{ errors.name }}
                    </p>
                  </div>
                  <div>
                    <label for="email"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Email *
                    </label>
                    <input id="email" type="email" v-model="formData.email"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="jean@exemple.fr" />
                    <p v-if="errors.email" class="text-sm text-destructive mt-1">
                      {{ errors.email }}
                    </p>
                  </div>
                </div>

                <div>
                  <label for="subject"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                    Sujet *
                  </label>
                  <input id="subject" type="text" v-model="formData.subject"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Demande d'information" />
                  <p v-if="errors.subject" class="text-sm text-destructive mt-1">
                    {{ errors.subject }}
                  </p>
                </div>

                <div>
                  <label for="message"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                    Message *
                  </label>
                  <textarea id="message" v-model="formData.message" rows="6"
                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Votre message..."></textarea>
                  <p v-if="errors.message" class="text-sm text-destructive mt-1">
                    {{ errors.message }}
                  </p>
                </div>

                <button type="submit" :disabled="isSubmitting || isSubmitted" :class="[
                  'bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center gap-2',
                  (isSubmitting || isSubmitted) ? 'opacity-50 cursor-not-allowed' : ''
                ]">
                  <template v-if="isSubmitting">
                    Envoi en cours...
                  </template>
                  <template v-else-if="isSubmitted">
                    Message envoyé !
                  </template>
                  <template v-else>
                    <Send class="w-4 h-4" />
                    Envoyer le message
                  </template>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'ContactPage',

  components: {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },

      errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },

      isSubmitting: false,
      isSubmitted: false,

      // Informations de contact
      contactInfo: {
        address: {
          street: "12263 boulevard Saint Claude",
          city: "Québec, Canada"
        },
        phone: "+1 (581) 928 85 85",
        email: "éditionsdudjembédébène@gmail.com",
        schedule: {
          weekdays: "Lun - Ven : 9h00 - 18h00",
          saturday: "Sam : 10h00 - 14h00"
        }
      }
    }
  },

  methods: {
    // Validation du formulaire
    validateForm() {
      // Réinitialiser les erreurs
      this.errors = { name: '', email: '', subject: '', message: '' }

      let isValid = true

      // Validation du nom
      if (!this.formData.name.trim()) {
        this.errors.name = "Le nom est requis"
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

      // Validation du sujet
      if (!this.formData.subject.trim()) {
        this.errors.subject = "Le sujet est requis"
        isValid = false
      }

      // Validation du message
      if (!this.formData.message.trim()) {
        this.errors.message = "Le message est requis"
        isValid = false
      }

      return isValid
    },

    // Soumission du formulaire
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.isSubmitting = true

      try {
        // Envoyer les données à l'API
        await axios.post(
          `${this.$store.state.localhost}contacts`,
          {
            name: this.formData.name,
            email: this.formData.email,
            subject: this.formData.subject,
            message: this.formData.message
          }
        )

        this.isSubmitted = true
        alert('Message envoyé ! Nous vous répondrons dans les meilleurs délais.')
        this.resetForm()

        // Réinitialiser le statut après 3 secondes
        setTimeout(() => {
          this.isSubmitted = false
        }, 3000)

      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error)
        
        // Afficher l'erreur à l'utilisateur
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors
          Object.keys(apiErrors).forEach(key => {
            if (this.errors.hasOwnProperty(key)) {
              this.errors[key] = apiErrors[key][0]
            }
          })
          alert('Veuillez corriger les erreurs dans le formulaire.')
        } else {
          alert('Une erreur est survenue. Veuillez réessayer.')
        }
      } finally {
        this.isSubmitting = false
      }
    },

    // Réinitialiser le formulaire
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    },

    // Partager sur les réseaux sociaux
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    },

    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent('Contact - Éditions Maison d\'Édition')
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    },

    shareOnLinkedin() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    },

    shareOnInstagram() {
      window.open('https://www.instagram.com/', '_blank')
    }
  },

  mounted() {
    console.log('Contact page mounted')
  }
}
</script>

<style scoped>
/* Styles pour les inputs */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Styles pour les erreurs */
.text-destructive {
  color: hsl(var(--destructive));
}

/* Styles pour les cartes */
.card-shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Styles pour les transitions */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Styles pour le placeholder */
::placeholder {
  color: hsl(var(--muted-foreground));
}

/* Styles pour les états désactivés */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 768px) {

  .lg\:col-span-1,
  .lg\:col-span-2 {
    grid-column: span 1;
  }
}

p {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>