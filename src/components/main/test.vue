<template>
 
    
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 px-4">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="text-center mb-12">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            VTC Paris
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Premium
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Réservez votre chauffeur privé en quelques clics. Service premium, tarifs transparents, disponible 24h/7j.
          </p>
        </div>

        <!-- Booking Form -->
        <div class="max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden">
          <div class="p-8">
            <div class="grid md:grid-cols-3 gap-6 mb-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Point de départ</label>
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input 
                    placeholder="Adresse de départ"
                    v-model="pickup"
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
                    v-model="destination"
                    class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Date & Heure</label>
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input 
                    type="datetime-local"
                    class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <button class="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Rechercher un chauffeur
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Vehicle Selection -->
    <section class="py-16 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Nos Véhicules</h2>
          <p class="text-lg text-gray-600">Choisissez le véhicule qui correspond à vos besoins</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Vehicle Card 1 -->
          <div class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl border border-gray-200 bg-white">
            <div class="p-6 text-center">
              <div class="text-6xl mb-4">🚗</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Berline E-class</h3>
              <p class="text-gray-600 mb-4">Confort et élégance pour vos déplacements</p>
              
              <div class="text-3xl font-bold text-blue-600 mb-6">
                À partir de 50-60€
              </div>
              
              <ul class="space-y-2 mb-6 text-sm text-gray-600">
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  1-3 passagers
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  WiFi gratuit
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Eau offerte
                </li>
              </ul>
              
              <button class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-105 transition-all duration-200">
                Choisir ce véhicule
              </button>
            </div>
          </div>
          
          <!-- Vehicle Card 2 (Popular) -->
          <div class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl border-2 border-blue-500 bg-white">
            <div class="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              Populaire
            </div>
            <div class="p-6 text-center">
              <div class="text-6xl mb-4">🚐</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Van V-class</h3>
              <p class="text-gray-600 mb-4">Espace et confort pour les groupes</p>
              
              <div class="text-3xl font-bold text-blue-600 mb-6">
                À partir de 60€
              </div>
              
              <ul class="space-y-2 mb-6 text-sm text-gray-600">
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  1-6 passagers
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Bagages XXL
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Écran TV
                </li>
              </ul>
              
              <button class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-105 transition-all duration-200">
                Choisir ce véhicule
              </button>
            </div>
          </div>
          
          <!-- Vehicle Card 3 -->
          <div class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl border border-gray-200 bg-white">
            <div class="p-6 text-center">
              <div class="text-6xl mb-4">🏎️</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Berline S new-class</h3>
              <p class="text-gray-600 mb-4">Le summum du luxe automobile</p>
              
              <div class="text-3xl font-bold text-blue-600 mb-6">
                À partir de 80€
              </div>
              
              <ul class="space-y-2 mb-6 text-sm text-gray-600">
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  1-3 passagers
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Sièges massage
                </li>
                <li class="flex items-center justify-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Champagne
                </li>
              </ul>
              
              <button class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-105 transition-all duration-200">
                Choisir ce véhicule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Price Calculator -->
    <section class="py-16 px-4 bg-white">
      <div class="container mx-auto max-w-4xl">
        <div class="shadow-xl border-0 rounded-xl overflow-hidden bg-white">
          <div class="text-center pb-8 pt-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Calculateur de Prix
            </h2>
            <p class="text-lg text-gray-600">
              Estimez le coût de votre trajet en quelques clics
            </p>
          </div>
          
          <div class="space-y-6 px-8 pb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Destination</label>
                <select 
                  v-model="selectedDestination" 
                  class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                >
                  <option value="" disabled selected>Choisir une destination</option>
                  <option value="ville">Ville</option>
                  <option value="banlieue">Banlieue</option>
                  <option value="aeroports">Aéroports</option>
                  <option value="disney">Disney</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Type de véhicule</label>
                <select 
                  v-model="selectedVehicle" 
                  class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"
                >
                  <option value="" disabled selected>Choisir un véhicule</option>
                  <option value="eclass">Berline E-class</option>
                  <option value="vclass">Van V-class</option>
                  <option value="sclass">Berline S new-class</option>
                </select>
              </div>
            </div>
            
            <button 
              @click="calculatePrice"
              :disabled="!selectedDestination || !selectedVehicle"
              class="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="8" y1="6" x2="16" y2="6"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
                <line x1="8" y1="18" x2="16" y2="18"></line>
              </svg>
              Calculer le prix
            </button>
            
            <div v-if="calculatedPrice" class="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div class="text-4xl font-bold text-blue-600 mb-2">
                {{ calculatedPrice }}€
              </div>
              <p class="text-gray-600">Prix estimé pour votre trajet</p>
              <button class="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md">
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 px-4 bg-gray-900 text-white">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Nos Services</h2>
          <p class="text-lg text-gray-300">Une gamme complète de services premium</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">✈️</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Aéroports</h3>
            <p class="text-gray-300">Transferts vers tous les aéroports parisiens</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🏰</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Disney</h3>
            <p class="text-gray-300">Navettes vers Disneyland Paris</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🌆</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Ville & Banlieue</h3>
            <p class="text-gray-300">Déplacements dans tout Paris et sa région</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">⏰</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Mise à disposition</h3>
            <p class="text-gray-300">Chauffeur dédié à l'heure</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->

</template>

<script>
export default {
  data() {
    return {
      pickup: '',
      destination: '',
      selectedDestination: '',
      selectedVehicle: '',
      calculatedPrice: null,
      
      prices: {
        eclass: {
          ville: { min: 50, max: 60 },
          banlieue: { min: 60, max: 70 },
          aeroports: 80,
          disney: 100
        },
        vclass: {
          ville: 60,
          banlieue: 70,
          aeroports: 90,
          disney: 110
        },
        sclass: {
          ville: 80,
          banlieue: 90,
          aeroports: 130,
          disney: 150
        }
      }
    }
  },
  methods: {
    calculatePrice() {
      if (!this.selectedDestination || !this.selectedVehicle) return;
      
      const price = this.prices[this.selectedVehicle]?.[this.selectedDestination];
      if (typeof price === 'object') {
        this.calculatedPrice = price.min;
      } else if (typeof price === 'number') {
        this.calculatedPrice = price;
      }
    }
  }
}
</script>

<style>
/* Vous pouvez ajouter des styles globaux ici si nécessaire */
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
.hover\:gradient-primary:hover {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>