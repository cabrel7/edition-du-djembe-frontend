<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Interface Chauffeur</h1>
          <p class="text-gray-600">Bonjour Pierre, bon service aujourd'hui !</p>
        </div>
        
        <div class="flex items-center gap-4">
          <button
            @click="toggleOnlineStatus"
            :class="[isOnline ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700', 'text-white px-4 py-2 rounded-md flex items-center']"
          >
            <CheckCircle v-if="isOnline" class="w-4 h-4 mr-2" />
            <XCircle v-else class="w-4 h-4 mr-2" />
            {{ isOnline ? 'En ligne' : 'Hors ligne' }}
          </button>
          
          <button class="border border-gray-300 px-4 py-2 rounded-md flex items-center">
            <Settings class="w-4 h-4 mr-2" />
            Paramètres
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Courses aujourd'hui</p>
              <p class="text-2xl font-bold">{{ todayStats.rides }}</p>
            </div>
            <Car class="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Gains du jour</p>
              <p class="text-2xl font-bold">{{ todayStats.earnings }}€</p>
            </div>
            <Euro class="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Distance parcourue</p>
              <p class="text-2xl font-bold">{{ todayStats.distance }} km</p>
            </div>
            <Navigation class="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div class="border rounded-lg">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Note moyenne</p>
              <p class="text-2xl font-bold">{{ todayStats.rating }}/5</p>
            </div>
            <User class="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-4">
      <div class="flex border-b">
        <button 
          @click="activeTab = 'rides'"
          :class="[activeTab === 'rides' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Courses en attente
        </button>
        <button 
          @click="activeTab = 'history'"
          :class="[activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Historique
        </button>
        <button 
          @click="activeTab = 'schedule'"
          :class="[activeTab === 'schedule' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'px-4 py-2']"
        >
          Planning
        </button>
      </div>
      
      <div v-if="activeTab === 'rides'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <h2 class="text-lg font-semibold">Courses disponibles</h2>
            <p class="text-sm text-gray-600">
              Nouvelles demandes de course dans votre zone
            </p>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="ride in pendingRides" :key="ride.id" class="border rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User class="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 class="font-semibold">{{ ride.client }}</h4>
                      <p class="text-sm text-gray-600 flex items-center">
                        <Phone class="w-4 h-4 mr-1" />
                        {{ ride.phone }}
                      </p>
                    </div>
                  </div>
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {{ ride.price }}
                  </span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div class="flex items-center text-sm">
                    <MapPin class="w-4 h-4 mr-2 text-blue-600" />
                    <span class="font-medium">De:</span>
                    <span class="ml-1">{{ ride.pickup }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <MapPin class="w-4 h-4 mr-2 text-red-600" />
                    <span class="font-medium">À:</span>
                    <span class="ml-1">{{ ride.destination }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <Clock class="w-4 h-4 mr-2 text-gray-600" />
                    <span>{{ ride.time }} • {{ ride.distance }}</span>
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                    Accepter la course
                  </button>
                  <button class="flex-1 border border-gray-300 px-4 py-2 rounded-md">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'history'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <h2 class="text-lg font-semibold">Historique des courses</h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600">Historique des courses effectuées...</p>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'schedule'">
        <div class="border rounded-lg">
          <div class="border-b p-4">
            <h2 class="text-lg font-semibold">Planning de la semaine</h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600">Votre planning et disponibilités...</p>
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
      isOnline: false,
      activeTab: 'rides',
      pendingRides: [
        {
          id: 1,
          client: "Marie Dupont",
          pickup: "Gare du Nord",
          destination: "Aéroport CDG",
          time: "14:30",
          distance: "35 km",
          price: "65€",
          phone: "+33 6 12 34 56 78"
        },
        {
          id: 2,
          client: "Jean Martin",
          pickup: "Champs-Élysées",
          destination: "Gare de Lyon",
          time: "16:00",
          distance: "12 km",
          price: "25€",
          phone: "+33 6 98 76 54 32"
        }
      ],
      todayStats: {
        rides: 8,
        earnings: 320,
        distance: 185,
        rating: 4.9
      }
    }
  },
  methods: {
    toggleOnlineStatus() {
      this.isOnline = !this.isOnline
    }
  }
}
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques ici si nécessaire */
</style>