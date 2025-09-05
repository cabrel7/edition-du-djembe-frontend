<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    
    
    <!-- Main Content -->
    <div class="flex items-center justify-center pt-20 pb-12 px-4">
      <div class="w-full max-w-2xl shadow-lg border-0 rounded-xl bg-white">
        <div class="text-center p-6">
          <h2 class="text-2xl font-bold mb-2">Créer votre profil</h2>
          <p class="text-gray-600">
            Rejoignez VTC Paris Premium et profitez de nos services de transport haut de gamme
          </p>
        </div>
        
        <div class="p-6">
          <!-- Tabs Navigation -->
          <div class="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button 
              @click="profileType = 'client'"
              class="py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              :class="profileType === 'client' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Client
            </button>
            
            <button 
              @click="profileType = 'driver'"
              class="py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              :class="profileType === 'driver' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                <circle cx="6.5" cy="16.5" r="2.5"></circle>
                <circle cx="16.5" cy="16.5" r="2.5"></circle>
              </svg>
              Chauffeur
            </button>
          </div>
          
          <!-- Client Form -->
          <div v-if="profileType === 'client'" class="space-y-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Personal Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Informations personnelles
                </h3>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      id="firstName"
                      v-model="formData.firstName"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      id="lastName"
                      v-model="formData.lastName"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    v-model="formData.email"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    v-model="formData.phone"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <!-- Address Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Adresse
                </h3>
                
                <div class="space-y-2">
                  <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    id="address"
                    placeholder="123 rue de la Paix"
                    v-model="formData.address"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="city" class="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                      id="city"
                      placeholder="Paris"
                      v-model="formData.city"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="postalCode" class="block text-sm font-medium text-gray-700">Code postal</label>
                    <input
                      id="postalCode"
                      placeholder="75001"
                      v-model="formData.postalCode"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Sécurité
                </h3>
                
                <div class="space-y-2">
                  <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    v-model="formData.password"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    v-model="formData.confirmPassword"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                Créer mon compte client
              </button>
            </form>
            
            <div class="text-center text-sm">
              <span class="text-gray-600">Déjà un compte ? </span>
              <router-link to="/login" class="text-blue-600 hover:underline">
                Se connecter
              </router-link>
            </div>
          </div>
          
          <!-- Driver Form -->
          <div v-if="profileType === 'driver'" class="space-y-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Personal Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Informations personnelles
                </h3>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="driver-firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      id="driver-firstName"
                      v-model="formData.firstName"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="driver-lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      id="driver-lastName"
                      v-model="formData.lastName"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="driver-email" class="block text-sm font-medium text-gray-700">Email professionnel</label>
                  <input
                    id="driver-email"
                    type="email"
                    placeholder="chauffeur@vtcparis.com"
                    v-model="formData.email"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="driver-phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    id="driver-phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    v-model="formData.phone"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="licenseNumber" class="block text-sm font-medium text-gray-700">Numéro de permis</label>
                  <input
                    id="licenseNumber"
                    placeholder="ABC123456"
                    v-model="formData.licenseNumber"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <!-- Vehicle Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                    <circle cx="6.5" cy="16.5" r="2.5"></circle>
                    <circle cx="16.5" cy="16.5" r="2.5"></circle>
                  </svg>
                  Véhicule
                </h3>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="vehicleBrand" class="block text-sm font-medium text-gray-700">Marque</label>
                    <input
                      id="vehicleBrand"
                      placeholder="Mercedes"
                      v-model="formData.vehicleBrand"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="vehicleModel" class="block text-sm font-medium text-gray-700">Modèle</label>
                    <input
                      id="vehicleModel"
                      placeholder="Classe E"
                      v-model="formData.vehicleModel"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="vehicleYear" class="block text-sm font-medium text-gray-700">Année</label>
                    <input
                      id="vehicleYear"
                      placeholder="2022"
                      v-model="formData.vehicleYear"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="plateNumber" class="block text-sm font-medium text-gray-700">Plaque d'immatriculation</label>
                    <input
                      id="plateNumber"
                      placeholder="AB-123-CD"
                      v-model="formData.plateNumber"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Address Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Adresse
                </h3>
                
                <div class="space-y-2">
                  <label for="driver-address" class="block text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    id="driver-address"
                    placeholder="123 rue de la Paix"
                    v-model="formData.address"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="driver-city" class="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                      id="driver-city"
                      placeholder="Paris"
                      v-model="formData.city"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="driver-postalCode" class="block text-sm font-medium text-gray-700">Code postal</label>
                    <input
                      id="driver-postalCode"
                      placeholder="75001"
                      v-model="formData.postalCode"
                      class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Sécurité
                </h3>
                
                <div class="space-y-2">
                  <label for="driver-password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    id="driver-password"
                    type="password"
                    v-model="formData.password"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="driver-confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                  <input
                    id="driver-confirmPassword"
                    type="password"
                    v-model="formData.confirmPassword"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" class="w-full h-12 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Postuler comme chauffeur
              </button>
            </form>
            
            <div class="text-center text-sm">
              <span class="text-gray-600">Déjà un compte ? </span>
              <router-link to="/login" class="text-blue-600 hover:underline">
                Se connecter
              </router-link>
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
      profileType: 'client',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        licenseNumber: '',
        vehicleBrand: '',
        vehicleModel: '',
        vehicleYear: '',
        plateNumber: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Creating profile:', { 
        profileType: this.profileType, 
        ...this.formData 
      });
      // Logic to create profile will be implemented with Supabase
    }
  }
}
</script>

<style>
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>