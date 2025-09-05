<template>
     <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header Section -->
    <header class="sticky top-0 left-0 right-0 z-50 bg-white/95 bg-opacity-50 backdrop-blur-md border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <router-link to="/home" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          VTC Paris Premium
        </router-link>

        <!-- Menu desktop -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/home" class="text-gray-700 hover:text-blue-600 transition-colors">Accueil</router-link>
          <router-link to="/booking" class="text-gray-700 hover:text-blue-600 transition-colors">Réserver</router-link>
          <router-link to="/prices" class="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</router-link>
          <router-link to="/fleet" class="text-gray-700 hover:text-blue-600 transition-colors">Flotte</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-blue-600 transition-colors">À propos</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</router-link>
        </nav>

        <!-- Boutons desktop -->
        <div class="hidden md:flex items-center space-x-4">
          <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            <router-link to="/login">Connexion</router-link>
          </button>
          <button class="px-4 py-2 rounded gradient-primary text-white">
            <router-link to="/booking">Réserver</router-link>
          </button>
        </div>

        <!-- Bouton menu mobile -->
        <button class="md:hidden" @click="isMenuOpen = !isMenuOpen">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu mobile -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <nav class="flex flex-col space-y-4">
          <router-link to="/home" class="text-gray-700 hover:text-blue-600 transition-colors">Accueil</router-link>
          <router-link to="/booking" class="text-gray-700 hover:text-blue-600 transition-colors">Réserver</router-link>
          <router-link to="/prices" class="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</router-link>
          <router-link to="/fleet" class="text-gray-700 hover:text-blue-600 transition-colors">Flotte</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-blue-600 transition-colors">À propos</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</router-link>
          <div class="flex flex-col space-y-2 pt-4">
            <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
              <router-link to="/login">Connexion</router-link>
            </button>
            <button class="px-4 py-2 rounded gradient-primary text-white">
              <router-link to="/booking">Réserver</router-link>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
    <router-view name="two"></router-view>
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VTC Paris Premium
            </h3>
            <p class="text-gray-400 mb-4">
              Votre service de transport premium disponible 24h/7j dans tout Paris et sa région.
            </p>
            <div class="flex space-x-4">
              <span class="text-2xl">📞</span>
              <span class="text-2xl">📧</span>
              <span class="text-2xl">📍</span>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-gray-400">
              <li><router-link to="#" class="hover:text-white transition-colors">Réservation</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Notre flotte</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Tarifs</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Transferts aéroports</router-link></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Informations</h4>
            <ul class="space-y-2 text-gray-400">
              <li><router-link to="#" class="hover:text-white transition-colors">À propos</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Contact</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Conditions générales</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Politique de confidentialité</router-link></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Zone de service</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Paris intra-muros</li>
              <li>Île-de-France</li>
              <li>Aéroports CDG & Orly</li>
              <li>Disneyland Paris</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 VTC Paris Premium. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default{
data(){
    return{
         isMenuOpen: false,
    }
}
}

</script>