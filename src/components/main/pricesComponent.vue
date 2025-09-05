<template>
  
    
    <!-- Main Content -->
    <div class="pt-24 pb-16 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Nos Tarifs</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos tarifs transparents et compétitifs pour tous vos déplacements en région parisienne
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 mb-12">
          <!-- Berline Card -->
          <div class="shadow-xl border-0 overflow-hidden rounded-xl bg-white relative">
            <div class="text-center pb-4 pt-8 bg-gradient-to-br from-gray-50 to-white">
              <div class="text-5xl mb-3">🚗</div>
              <h2 class="text-2xl font-bold text-gray-900">Berline E-class</h2>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Ville</span>
                  <span class="font-semibold text-lg">50 - 60€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Banlieue</span>
                  <span class="font-semibold text-lg">60 - 70€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Aéroports</span>
                  <span class="font-semibold text-lg">80€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Disney</span>
                  <span class="font-semibold text-lg">100€</span>
                </div>
                
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Mise à disposition</span>
                    <span class="font-semibold text-lg text-blue-600">55€/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Van Card (Popular) -->
          <div class="shadow-xl border-2 border-blue-500 overflow-hidden rounded-xl bg-white relative">
            <div class="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              Populaire
            </div>
            <div class="text-center pb-4 pt-8 bg-gradient-to-br from-gray-50 to-white">
              <div class="text-5xl mb-3">🚐</div>
              <h2 class="text-2xl font-bold text-gray-900">Van V-class</h2>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Ville</span>
                  <span class="font-semibold text-lg">60€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Banlieue</span>
                  <span class="font-semibold text-lg">70€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Aéroports</span>
                  <span class="font-semibold text-lg">90€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Disney</span>
                  <span class="font-semibold text-lg">110€</span>
                </div>
                
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Mise à disposition</span>
                    <span class="font-semibold text-lg text-blue-600">60€/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Luxury Card -->
          <div class="shadow-xl border-0 overflow-hidden rounded-xl bg-white relative">
            <div class="text-center pb-4 pt-8 bg-gradient-to-br from-gray-50 to-white">
              <div class="text-5xl mb-3">🏎️</div>
              <h2 class="text-2xl font-bold text-gray-900">Berline S new-class</h2>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Ville</span>
                  <span class="font-semibold text-lg">80€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Banlieue</span>
                  <span class="font-semibold text-lg">90€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Aéroports</span>
                  <span class="font-semibold text-lg">130€</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Disney</span>
                  <span class="font-semibold text-lg">150€</span>
                </div>
                
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Mise à disposition</span>
                    <span class="font-semibold text-lg text-blue-600">80€/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kilometric Rates -->
        <div class="shadow-xl border-0 rounded-xl overflow-hidden bg-white mb-12">
          <div class="text-center pt-8 pb-4">
            <h2 class="text-2xl font-bold text-gray-900">Tarification Kilométrique</h2>
            <p class="text-gray-600">Pour les trajets longue distance</p>
          </div>
          <div class="p-6">
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">E-class</h3>
                <p class="text-2xl font-bold text-blue-600">2.5€/km</p>
              </div>
              
              <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">V-class</h3>
                <p class="text-2xl font-bold text-blue-600">3€/km</p>
              </div>
              
              <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">S new-class</h3>
                <p class="text-2xl font-bold text-blue-600">4€/km</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Info -->
        <div class="shadow-xl border-0 rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div class="p-8">
            <div class="text-center mb-6">
              <h2 class="text-3xl font-bold mb-4">Informations Importantes</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold mb-4 text-blue-200">✨ Inclus dans nos tarifs</h3>
                <ul class="space-y-2 text-gray-200">
                  <li>• Carburant et péages</li>
                  <li>• Chauffeur professionnel</li>
                  <li>• Véhicule premium climatisé</li>
                  <li>• WiFi gratuit</li>
                  <li>• Eau et bonbons</li>
                  <li>• Suivi en temps réel</li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-4 text-blue-200">📋 Conditions</h3>
                <ul class="space-y-2 text-gray-200">
                  <li>• Paiement CB ou espèces</li>
                  <li>• Annulation gratuite 24h avant</li>
                  <li>• Temps d'attente : 15min incluses</li>
                  <li>• Supplément nuit : +20% (22h-6h)</li>
                  <li>• Devis gratuit pour trajets spéciaux</li>
                  <li>• TVA incluse</li>
                </ul>
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
      isMenuOpen: false
    }
  }
}
</script>

<style>
/* Styles supplémentaires si nécessaire */
</style>