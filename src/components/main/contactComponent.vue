<template>

    
    <!-- Main Content -->
    <div class="pt-24 pb-16 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe est disponible 24h/7j pour répondre à toutes vos questions 
            et vous accompagner dans vos réservations
          </p>
        </div>

        <!-- Contact Methods -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <!-- Téléphone -->
          <div class="text-center shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 bg-white">
            <div class="p-6">
              <div class="text-4xl mb-4">📞</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p class="text-blue-600 font-medium mb-2">+33 1 23 45 67 89</p>
              <p class="text-sm text-gray-600 mb-4">Disponible 24h/7j pour vos réservations et urgences</p>
              <button class="w-full h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Appeler maintenant
              </button>
            </div>
          </div>
          
          <!-- Email -->
          <div class="text-center shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 bg-white">
            <div class="p-6">
              <div class="text-4xl mb-4">📧</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p class="text-blue-600 font-medium mb-2">contact@vtcparispremium.fr</p>
              <p class="text-sm text-gray-600 mb-4">Réponse garantie sous 2h pendant les heures ouvrables</p>
              <button class="w-full h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Envoyer un email
              </button>
            </div>
          </div>
          
          <!-- Chat -->
          <div class="text-center shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 bg-white">
            <div class="p-6">
              <div class="text-4xl mb-4">💬</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Chat en ligne</h3>
              <p class="text-blue-600 font-medium mb-2">Chat disponible</p>
              <p class="text-sm text-gray-600 mb-4">Support instantané pour toutes vos questions</p>
              <button class="w-full h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Démarrer le chat
              </button>
            </div>
          </div>
          
          <!-- Bureaux -->
          <div class="text-center shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 bg-white">
            <div class="p-6">
              <div class="text-4xl mb-4">📍</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Bureaux</h3>
              <p class="text-blue-600 font-medium mb-2">75008 Paris, France</p>
              <p class="text-sm text-gray-600 mb-4">Rendez-vous sur demande pour les entreprises</p>
              <button class="w-full h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                Prendre RDV
              </button>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="shadow-xl border-0 rounded-xl overflow-hidden bg-white">
            <div class="p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
              <p class="text-gray-600 mb-6">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>
              
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Prénom</label>
                    <input 
                      placeholder="Votre prénom"
                      v-model="formData.firstName"
                      class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Nom</label>
                    <input 
                      placeholder="Votre nom"
                      v-model="formData.lastName"
                      class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                    />
                  </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email"
                      placeholder="votre@email.com"
                      v-model="formData.email"
                      class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Téléphone</label>
                    <input 
                      type="tel"
                      placeholder="06 12 34 56 78"
                      v-model="formData.phone"
                      class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Sujet</label>
                  <select 
                    v-model="formData.subject" 
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                  >
                    <option value="" disabled selected>Choisir un sujet</option>
                    <option value="reservation">Réservation</option>
                    <option value="information">Demande d'information</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    placeholder="Décrivez votre demande en détail..."
                    v-model="formData.message"
                    class="min-h-[120px] w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3"
                  ></textarea>
                </div>
                
                <button type="submit" class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          <!-- FAQ & Info -->
          <div class="space-y-8">
            <div class="shadow-lg border-0 rounded-xl overflow-hidden bg-white">
              <div class="p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Comment réserver ?</h4>
                    <p class="text-sm text-gray-600">Utilisez notre formulaire en ligne, appelez-nous ou envoyez un SMS. Confirmation immédiate.</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Puis-je annuler ma réservation ?</h4>
                    <p class="text-sm text-gray-600">Annulation gratuite jusqu'à 24h avant le départ. Au-delà, des frais peuvent s'appliquer.</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Quels moyens de paiement ?</h4>
                    <p class="text-sm text-gray-600">Carte bancaire, espèces, virement, facture entreprise. Paiement sécurisé garanti.</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Zone de service ?</h4>
                    <p class="text-sm text-gray-600">Île-de-France complète, aéroports, gares, Disney. Devis gratuit pour trajets spéciaux.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="shadow-lg border-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <div class="p-6 text-center">
                <div class="text-4xl mb-4">🚨</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Urgence 24h/7j</h3>
                <p class="text-gray-600 mb-4">
                  Besoin d'un transport en urgence ? Notre service d'urgence est disponible 24h/24.
                </p>
                <button class="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                  Appel d'urgence
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Contact form submitted:', this.formData);
      // Handle form submission
    }
  }
}
</script>

<style>
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>