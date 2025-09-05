<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p class="text-gray-600">Gestion de la flotte VTC Paris Premium</p>
        </div>
        
        <button 
          @click="showAddDriver = true"
          class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus class="w-4 h-4 mr-2" />
          Ajouter un chauffeur
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total chauffeurs</p>
              <p class="text-2xl font-bold">{{ stats.totalDrivers }}</p>
            </div>
            <Users class="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Chauffeurs actifs</p>
              <p class="text-2xl font-bold">{{ stats.activeDrivers }}</p>
            </div>
            <Car class="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Courses ce mois</p>
              <p class="text-2xl font-bold">{{ stats.totalRides }}</p>
            </div>
            <BarChart3 class="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">CA mensuel</p>
              <p class="text-2xl font-bold">{{ stats.monthlyRevenue.toLocaleString() }}€</p>
            </div>
            <Euro class="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-4">
      <div class="flex border-b">
        <button 
          @click="activeTab = 'drivers'"
          :class="[activeTab === 'drivers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Gestion des chauffeurs
        </button>
        <button 
          @click="activeTab = 'analytics'"
          :class="[activeTab === 'analytics' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Analyses
        </button>
        <button 
          @click="activeTab = 'settings'"
          :class="[activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Paramètres
        </button>
      </div>
      
      <!-- Drivers Tab -->
      <div v-if="activeTab === 'drivers'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold">Liste des chauffeurs</h2>
                <p class="text-sm text-gray-600">
                  Gérez votre équipe de chauffeurs professionnels
                </p>
              </div>
              
              <div class="flex items-center gap-2">
                <div class="relative">
                  <Search class="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input 
                    placeholder="Rechercher un chauffeur..." 
                    class="pl-10 w-64 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="driver in drivers" :key="driver.id" class="border rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="font-semibold text-blue-600">
                        {{ driver.name.split(' ').map(n => n[0]).join('') }}
                      </span>
                    </div>
                    
                    <div>
                      <h4 class="font-semibold text-lg">{{ driver.name }}</h4>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span class="flex items-center">
                          <Mail class="w-4 h-4 mr-1" />
                          {{ driver.email }}
                        </span>
                        <span class="flex items-center">
                          <Phone class="w-4 h-4 mr-1" />
                          {{ driver.phone }}
                        </span>
                        <span class="flex items-center">
                          <Car class="w-4 h-4 mr-1" />
                          {{ driver.car }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <span 
                        :class="[driver.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'text-xs px-2 py-1 rounded-full']"
                      >
                        {{ driver.status === 'active' ? 'Actif' : 'Inactif' }}
                      </span>
                      <p class="text-sm text-gray-600 mt-1">
                        ⭐ {{ driver.rating }} • {{ driver.totalRides }} courses
                      </p>
                    </div>
                    
                    <div class="flex gap-2">
                      <button class="border border-gray-300 p-2 rounded-md">
                        <Edit class="w-4 h-4" />
                      </button>
                      <button class="border border-gray-300 p-2 rounded-md text-red-600 hover:text-red-700">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <h2 class="text-lg font-semibold">Analyses et statistiques</h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600">Graphiques et analyses détaillées...</p>
          </div>
        </div>
      </div>
      
      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <h2 class="text-lg font-semibold">Paramètres système</h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600">Configuration du système...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Driver Modal -->
    <div v-if="showAddDriver" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="w-full max-w-md m-4 border rounded-lg bg-white">
        <div class="border-b p-4">
          <h2 class="text-lg font-semibold">Ajouter un nouveau chauffeur</h2>
        </div>
        <div class="p-4">
          <form @submit.prevent="handleAddDriver" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                id="name"
                v-model="newDriver.name"
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                v-model="newDriver.email"
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                id="phone"
                v-model="newDriver.phone"
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label for="license" class="block text-sm font-medium text-gray-700 mb-1">Numéro de permis</label>
              <input
                id="license"
                v-model="newDriver.license"
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label for="car" class="block text-sm font-medium text-gray-700 mb-1">Véhicule</label>
              <input
                id="car"
                v-model="newDriver.car"
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div class="flex gap-2 pt-4">
              <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md">
                Créer le chauffeur
              </button>
              <button 
                type="button" 
                class="flex-1 border border-gray-300 px-4 py-2 rounded-md"
                @click="showAddDriver = false"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddDriver: false,
      activeTab: 'drivers',
      newDriver: {
        name: '',
        email: '',
        phone: '',
        license: '',
        car: ''
      },
      drivers: [
        {
          id: 1,
          name: "Pierre Dubois",
          email: "pierre.dubois@vtcparis.com",
          phone: "+33 6 12 34 56 78",
          license: "ABC123456",
          car: "Mercedes Classe E",
          status: "active",
          rating: 4.8,
          totalRides: 156
        },
        {
          id: 2,
          name: "Sophie Martin",
          email: "sophie.martin@vtcparis.com",
          phone: "+33 6 98 76 54 32",
          license: "DEF789012",
          car: "BMW Série 5",
          status: "active",
          rating: 4.9,
          totalRides: 203
        },
        {
          id: 3,
          name: "Ahmed Hassan",
          email: "ahmed.hassan@vtcparis.com",
          phone: "+33 6 55 44 33 22",
          license: "GHI345678",
          car: "Audi A6",
          status: "inactive",
          rating: 4.7,
          totalRides: 89
        }
      ],
      stats: {
        totalDrivers: 25,
        activeDrivers: 18,
        totalRides: 1247,
        monthlyRevenue: 52340
      }
    }
  },
  methods: {
    handleAddDriver() {
      console.log('Adding new driver:', this.newDriver);
      this.showAddDriver = false;
      this.newDriver = { 
        name: '', 
        email: '', 
        phone: '', 
        license: '', 
        car: '' 
      };
    }
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>