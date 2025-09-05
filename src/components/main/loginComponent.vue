<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  
    <!-- Main Content -->
    <div class="flex items-center justify-center pt-20 pb-12 px-4">
      <div class="w-full max-w-md shadow-lg border-0 rounded-xl bg-white">
        <div class="text-center p-6">
          <h2 class="text-2xl font-bold mb-2">Connexion</h2>
          <p class="text-gray-600">
            Connectez-vous à votre compte VTC Paris Premium
          </p>
        </div>
        
        <div class="p-6">
          <!-- Tabs Navigation -->
          <div class="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button 
              @click="loginType = 'client'"
              class="py-2 px-4 rounded-md text-sm font-medium transition-colors"
              :class="loginType === 'client' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              Client
            </button>
            
            <button 
              @click="loginType = 'driver'"
              class="py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              :class="loginType === 'driver' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                <circle cx="6.5" cy="16.5" r="2.5"></circle>
                <circle cx="16.5" cy="16.5" r="2.5"></circle>
              </svg>
              Chauffeur
            </button>
            
            <button 
              @click="loginType = 'admin'"
              class="py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              :class="loginType === 'admin' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Admin
            </button>
          </div>
          
          <!-- Client Login -->
          <div v-if="loginType === 'client'" class="space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  v-model="email"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button type="submit" class="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                Se connecter
              </button>
            </form>
            
            <div class="text-center text-sm">
              <router-link to="/register" class="text-blue-600 hover:underline">
                Créer un compte client
              </router-link>
            </div>
          </div>
          
          <!-- Driver Login -->
          <div v-if="loginType === 'driver'" class="space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <label for="driver-email" class="block text-sm font-medium text-gray-700">Email professionnel</label>
                <input
                  id="driver-email"
                  type="email"
                  placeholder="chauffeur@vtcparis.com"
                  v-model="email"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div class="space-y-2">
                <label for="driver-password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  id="driver-password"
                  type="password"
                  v-model="password"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button type="submit" class="w-full h-10 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Accéder à l'interface chauffeur
              </button>
            </form>
            
            <div class="text-center text-sm">
              <router-link to="/create-profile" class="text-blue-600 hover:underline">
                Postuler comme chauffeur
              </router-link>
            </div>
          </div>
          
          <!-- Admin Login -->
          <div v-if="loginType === 'admin'" class="space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <label for="admin-email" class="block text-sm font-medium text-gray-700">Email administrateur</label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@vtcparis.com"
                  v-model="email"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div class="space-y-2">
                <label for="admin-password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  id="admin-password"
                  type="password"
                  v-model="password"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button type="submit" class="w-full h-10 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Accéder au dashboard admin
              </button>
            </form>
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
      loginType: 'client',
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      console.log('Login attempt:', { 
        loginType: this.loginType, 
        email: this.email, 
        password: this.password 
      });
      // Redirect logic will be implemented when Supabase is connected
    }
  }
}
</script>

<style>
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
}
</style>