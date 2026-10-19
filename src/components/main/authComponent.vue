<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col items-center justify-center p-4">
    <!-- Logo / Header -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Lock class="w-8 h-8 text-primary" />
      </div>
      <h1 class="text-3xl font-bold text-foreground">Administration</h1>
      <p class="text-muted-foreground mt-2">Connectez-vous pour accéder au panneau d'administration</p>
    </div>

    <!-- Login Form -->
    <div class="w-full max-w-md">
      <div class="bg-card rounded-xl p-8 shadow-lg border border-border">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="text-sm font-medium leading-none block mb-2">
              Adresse email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :class="[
                  'pl-10 w-full py-3 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all',
                  errors.email ? 'border-destructive focus:ring-destructive' : 'border-input'
                ]"
                placeholder="admin@example.com"
                :disabled="isLoading"
              />
            </div>
            <p v-if="errors.email" class="text-sm text-destructive mt-2">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label for="password" class="text-sm font-medium leading-none">
                Mot de passe
              </label>
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="text-xs text-primary hover:underline"
              >
                {{ showPassword ? 'Masquer' : 'Afficher' }}
              </button>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :class="[
                  'pl-10 w-full py-3 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all',
                  errors.password ? 'border-destructive focus:ring-destructive' : 'border-input'
                ]"
                placeholder="••••••••"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye v-if="showPassword" class="w-5 h-5 text-muted-foreground" />
                <EyeOff v-else class="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-destructive mt-2">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              :disabled="isLoading"
            />
            <label for="remember" class="ml-2 text-sm text-foreground">
              Se souvenir de moi
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              'w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
              isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:opacity-90'
            ]"
          >
            <template v-if="isLoading">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </template>
            <template v-else>
              <LogIn class="w-5 h-5" />
              Se connecter
            </template>
          </button>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p class="text-sm text-destructive flex items-center gap-2">
              <AlertCircle class="w-4 h-4 flex-shrink-0" />
              {{ errorMessage }}
            </p>
          </div>
        </form>

        <!-- Demo Credentials (à retirer en production) -->
        <div class="mt-8 pt-8 border-t border-border">
          <p class="text-xs text-muted-foreground text-center">
            Démo : admin@example.com / password
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <p class="text-sm text-muted-foreground">
          <a href="https://leseditionsdudjembe.com/" class="text-primary hover:underline">
            ← Retour à l'accueil
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Lock, Mail, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-vue-next'
import axios from 'axios'

export default {
  name: 'AdminLoginPage',

  components: {
    Lock,
    Mail,
    Eye,
    EyeOff,
    LogIn,
    AlertCircle
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      errors: {
        email: '',
        password: ''
      },
      errorMessage: '',
      isLoading: false,
      showPassword: false
    }
  },

  mounted() {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token')
    const isConnected = localStorage.getItem('isconnect') === '1'
    
    if (token && isConnected) {
      // Rediriger vers le dashboard
      this.$router.push('/admin')
    }

    // Pré-remplir avec des données de test en développement
    if (process.env.NODE_ENV === 'development') {
      this.form.email = 'admin@example.com'
      this.form.password = 'password'
    }
  },

  methods: {
    // Validation du formulaire
    validateForm() {
      this.errors = { email: '', password: '' }
      this.errorMessage = ''
      
      let isValid = true

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.form.email.trim()) {
        this.errors.email = "L'email est requis"
        isValid = false
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Adresse email invalide"
        isValid = false
      }

      // Validation mot de passe
      if (!this.form.password) {
        this.errors.password = "Le mot de passe est requis"
        isValid = false
      }

      return isValid
    },

    // Toggle password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    // Connexion
    async handleLogin() {
      if (!this.validateForm()) {
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        // Appel à l'API de login
        const response = await axios.post(
          `${this.$store.state.localhost}login`,
          {
            email: this.form.email,
            password: this.form.password
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )

        if (response.status === 200 && response.data.user) {
          // Le token est en cookie httpOnly côté serveur — jamais en localStorage.
          localStorage.setItem('isconnect', '1')
          localStorage.setItem('userData', JSON.stringify(response.data.user))

          // Mettre à jour le store Vuex
          this.$store.commit('setUser', response.data.user)

          // Si l'utilisateur est admin, charger les données admin
          if (response.data.user.role === 1) {
            await this.$store.dispatch('fetchAdminBase')
          }

          // Afficher un message de succès
          this.showSuccessToast()

          // Rediriger vers le dashboard
          setTimeout(() => {
            this.$router.push('/admin')
          }, 1000)

        } else {
          throw new Error('Réponse inattendue du serveur')
        }

      } catch (error) {
        console.error('Erreur de connexion:', error)
        
        // Gérer les différentes erreurs
        if (error.response) {
          // Le serveur a répondu avec un statut d'erreur
          const status = error.response.status
          
          switch (status) {
            case 401:
              this.errorMessage = "Email ou mot de passe incorrect"
              break
            case 422:
              if (error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach(field => {
                  if (this.errors.hasOwnProperty(field)) {
                    this.errors[field] = error.response.data.errors[field][0]
                  }
                })
              }
              break
            case 429:
              this.errorMessage = "Trop de tentatives. Veuillez réessayer plus tard."
              break
            case 500:
              this.errorMessage = "Une erreur serveur est survenue. Veuillez réessayer."
              break
            default:
              this.errorMessage = error.response.data.message || "Une erreur est survenue"
          }
        } else if (error.request) {
          // La requête a été faite mais pas de réponse
          this.errorMessage = "Impossible de joindre le serveur. Vérifiez votre connexion internet."
        } else {
          // Erreur lors de la configuration de la requête
          this.errorMessage = "Une erreur est survenue lors de la connexion."
        }

        this.showErrorToast(this.errorMessage)
      } finally {
        this.isLoading = false
      }
    },

    // Afficher une notification de succès
    showSuccessToast() {
      // Utiliser un système de toast personnalisé ou alert
      if (typeof this.$toast === 'function') {
        this.$toast.success('Connexion réussie ! Redirection en cours...', {
          position: 'top-right',
          duration: 3000
        })
      } else {
        alert('Connexion réussie ! Redirection en cours...')
      }
    },

    // Afficher une notification d'erreur
    showErrorToast(message) {
      if (typeof this.$toast === 'function') {
        this.$toast.error(message || 'Échec de la connexion', {
          position: 'top-right',
          duration: 5000
        })
      } else {
        alert(message || 'Échec de la connexion')
      }
    },

    // Vider le formulaire
    resetForm() {
      this.form = {
        email: '',
        password: '',
        remember: false
      }
      this.errors = {
        email: '',
        password: ''
      }
      this.errorMessage = ''
    }
  },

  // Nettoyage
  beforeUnmount() {
    this.resetForm()
  }
}
</script>

<style scoped>
/* Animation pour le spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Styles pour les transitions */
.transition-all {
  transition: all 0.2s ease;
}

/* Styles pour les états désactivés */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Styles pour les erreurs */
.text-destructive {
  color: hsl(var(--destructive));
}

.border-destructive {
  border-color: hsl(var(--destructive));
}

.bg-destructive\/10 {
  background-color: hsl(var(--destructive) / 0.1);
}

.border-destructive\/20 {
  border-color: hsl(var(--destructive) / 0.2);
}

/* Styles pour les inputs */
input:focus {
  box-shadow: 0 0 0 3px hsla(var(--ring), 0.2);
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Gradient background */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-primary\/5 {
  --tw-gradient-from: hsl(var(--primary) / 0.05);
}

.via-background {
  --tw-gradient-from: hsl(var(--background));
}

.to-secondary\/5 {
  --tw-gradient-to: hsl(var(--secondary) / 0.05);
}

/* Responsive */
@media (max-width: 640px) {
  .max-w-md {
    max-width: 100%;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
}
</style>