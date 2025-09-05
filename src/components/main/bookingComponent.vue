<template>
 
    
    <!-- Main Content -->
    <div class="pt-24 pb-16 px-4">
      <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Réserver votre course</h1>
          <div class="flex justify-center items-center space-x-4 mb-8">
            <div v-for="i in 3" :key="i" class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                :class="step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'">
                {{ i }}
              </div>
              <div v-if="i < 3" class="w-16 h-1 mx-2" :class="step > i ? 'bg-blue-600' : 'bg-gray-200'"></div>
            </div>
          </div>
        </div>

        <div class="shadow-xl border-0 rounded-xl overflow-hidden bg-white">
          <div class="text-center pt-8 pb-4">
            <h2 class="text-2xl font-bold">
              <span v-if="step === 1">Détails du trajet</span>
              <span v-if="step === 2">Informations personnelles</span>
              <span v-if="step === 3">Confirmation et paiement</span>
            </h2>
          </div>
          
          <div class="p-8">
            <!-- Step 1: Trip Details -->
            <div v-if="step === 1" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Point de départ</label>
                  <div class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <input 
                      placeholder="Adresse de départ"
                      v-model="formData.pickup"
                      class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Destination</label>
                  <div class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <input 
                      placeholder="Adresse d'arrivée"
                      v-model="formData.destination"
                      class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Date</label>
                  <input 
                    type="date"
                    v-model="formData.date"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                  />
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Heure</label>
                  <input 
                    type="time"
                    v-model="formData.time"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                  />
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Type de véhicule</label>
                  <select 
                    v-model="formData.vehicle" 
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                  >
                    <option value="" disabled selected>Choisir un véhicule</option>
                    <option value="eclass">Berline E-class</option>
                    <option value="vclass">Van V-class</option>
                    <option value="sclass">Berline S new-class</option>
                  </select>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Nombre de passagers</label>
                  <select 
                    v-model="formData.passengers" 
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                  >
                    <option value="" disabled selected>Nombre de passagers</option>
                    <option value="1">1 passager</option>
                    <option value="2">2 passagers</option>
                    <option value="3">3 passagers</option>
                    <option value="4">4 passagers</option>
                    <option value="5">5 passagers</option>
                    <option value="6">6 passagers</option>
                  </select>
                </div>
              </div>
              
              <button @click="nextStep" class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                Continuer
              </button>
            </div>

            <!-- Step 2: Personal Info -->
            <div v-if="step === 2" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
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
              
              <div class="grid md:grid-cols-2 gap-6">
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
                <label class="text-sm font-medium text-gray-700">Notes (optionnel)</label>
                <textarea 
                  placeholder="Informations supplémentaires..."
                  v-model="formData.notes"
                  class="min-h-[100px] w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3"
                ></textarea>
              </div>
              
              <div class="flex space-x-4">
                <button @click="prevStep" class="flex-1 h-12 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Retour
                </button>
                <button @click="nextStep" class="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                  Continuer
                </button>
              </div>
            </div>

            <!-- Step 3: Confirmation & Payment -->
            <div v-if="step === 3" class="space-y-6">
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4">Récapitulatif de votre réservation</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Trajet:</span>
                    <span class="font-medium">{{ formData.pickup }} → {{ formData.destination }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Date et heure:</span>
                    <span class="font-medium">{{ formData.date }} à {{ formData.time }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Véhicule:</span>
                    <span class="font-medium">{{ getVehicleName(formData.vehicle) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Passagers:</span>
                    <span class="font-medium">{{ formData.passengers }}</span>
                  </div>
                  <div class="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total estimé:</span>
                    <span class="text-blue-600">75€</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Informations de paiement</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <input placeholder="Numéro de carte" class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
                  <input placeholder="MM/AA" class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <input placeholder="Code CVV" class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
                  <input placeholder="Nom sur la carte" class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
                </div>
              </div>
              
              <div class="flex space-x-4">
                <button @click="prevStep" class="flex-1 h-12 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Retour
                </button>
                <button class="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Confirmer et payer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      step: 1,
      formData: {
        pickup: '',
        destination: '',
        date: '',
        time: '',
        vehicle: '',
        passengers: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
      }
    }
  },
  methods: {
    nextStep() {
      this.step += 1;
    },
    prevStep() {
      this.step -= 1;
    },
    getVehicleName(vehicleType) {
      const vehicles = {
        eclass: 'Berline E-class',
        vclass: 'Van V-class',
        sclass: 'Berline S new-class'
      };
      return vehicles[vehicleType] || '';
    }
  }
}
</script>

<style>
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>