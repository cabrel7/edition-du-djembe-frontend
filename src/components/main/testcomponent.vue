<template>
  <div class="vtc-paris-app">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 md:px-4 lg:px-4 sm:px-0 px-0">
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
        <div
          class="lg:max-w-6xl md:w-full sm:w-full w-full   shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden">
          
          <div class="px-8 py-4">
             <h1 class=" text-center mb-2 text-lg text-blue-600 ">  effectuer une course rapide maintenant ?</h1>

            <div class="grid md:grid-cols-3 gap-6 mb-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Point de départ</label>
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input placeholder="Adresse de départ" v-model="pickup" @input="searchAddress('pickup')"
                    @focus="showSuggestions('pickup')" @blur="hideSuggestions('pickup')"
                    class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  <!-- Suggestions pour le départ -->
                  <div v-if="showPickupSuggestions && pickupSuggestions.length"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div v-for="(suggestion, index) in pickupSuggestions" :key="index"
                      @mousedown="selectAddress(suggestion, 'pickup')"
                      class="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                      <div class="font-medium text-sm">{{ suggestion.display_name }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Destination</label>
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input placeholder="Adresse d'arrivée" v-model="destination" @input="searchAddress('destination')"
                    @focus="showSuggestions('destination')" @blur="hideSuggestions('destination')"
                    class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  <!-- Suggestions pour la destination -->
                  <div v-if="showDestinationSuggestions && destinationSuggestions.length"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div v-for="(suggestion, index) in destinationSuggestions" :key="index"
                      @mousedown="selectAddress(suggestion, 'destination')"
                      class="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                      <div class="font-medium text-sm">{{ suggestion.display_name }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Date & Heure</label>
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input type="datetime-local" v-model="rideDateTime"
                    class="pl-10 h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <!-- Lieux populaires -->
            <div class="mt-4">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Vous partez de ?...</h3>
              <div class="flex flex-wrap gap-2">
                <button v-for="(category, categoryName) in popularCategories" :key="categoryName"
                  @click="showCategoryPopup(categoryName)"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  {{ categoryName }}
                </button>
              </div>
            </div>

            <!-- Popup pour sélectionner un lieu -->
            <div v-if="showCategory" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
                <h3 class="text-lg font-bold mb-4">{{ selectedCategory }} à Paris</h3>
                <div class="space-y-2">
                  <div v-for="location in popularCategories[selectedCategory]" :key="location.id"
                    @click="selectPopularLocation(location)" class="p-3 hover:bg-blue-50 rounded cursor-pointer">
                    <div class="font-medium">{{ location.name }}</div>
                    <div class="text-sm text-gray-500">{{ getArrondissementName(location.arrondissement) }}</div>
                  </div>
                </div>
                <button @click="showCategory = null" class="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded">
                  Fermer
                </button>
              </div>
            </div>
             </div>

            <div class="container sm:w-full  w-full md:max-w-6xl lg:max-w-6xl">
              <div class="text-center mb-8">

                <p class="text-lg text-gray-600">Visualisez votre trajet sur la carte de Paris</p>
              </div>

              <div class="relative rounded-t-none w-full overflow-hidden z-0 shadow-2xl">
                <div ref="mapContainer" class="h-96 w-full rounded-xl"></div>

                <!-- Contrôles de la carte -->
                <div class="map-controls">
                  <button @click="locateUser" class="control-btn" title="Me localiser">
                    <span class="btn-icon">
                      <LocateIcon class=" bg-white w-8 h-8"></LocateIcon>
                    </span>
                  </button>
                  <button @click="resetToParis" class="control-btn" title="Recenter Paris">
                    <span class="btn-icon">🗼</span>
                  </button>
                </div>
              </div>

              <!-- Informations de course -->
              <div v-if="routeInfo" class="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center">📊 Détails de la course</h3>
                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div class="text-center p-4 bg-blue-50 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Distance</div>
                    <div class="text-xl font-bold text-blue-600">{{ (routeInfo.distance / 1000).toFixed(1) }} km</div>
                  </div>
                  <div class="text-center p-4 bg-green-50 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Durée</div>
                    <div class="text-xl font-bold text-green-600">{{ Math.round(routeInfo.duration / 60) }} min</div>
                  </div>
                  <div class="text-center p-4 bg-purple-50 rounded-lg">
                    <div class="text-sm text-gray-600 mb-1">Prix</div>
                    <div class="text-xl font-bold text-purple-600">{{ calculatePrice(routeInfo.distance) }} €</div>
                  </div>
                </div>
                <button @click="confirmRide"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform">
                  🚗 Confirmer la course
                </button>
              </div>
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
          <!-- Vehicle Cards -->
          <div
            class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl border border-gray-200 bg-white">
            <div class="">
              <div class=" mb-2"> <img class="h-64 object-cover w-full" src="../../img/vue-d-une-voiture-en-3d.jpg"
                  alt=""></div>
              <div class="p-6 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Berline E-class</h3>
                <p class="text-gray-600 mb-4">Confort et élégance pour vos déplacements</p>
                <div class="text-3xl font-bold text-blue-600 mb-6">À partir de 50-60€</div>
                <ul class="space-y-2 mb-6 text-sm text-gray-600">
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>1-3 passagers</li>
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>WiFi gratuit</li>
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Eau offerte</li>
                </ul>
                <button
                  class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-105 transition-all duration-200">
                  Choisir ce véhicule
                </button>
              </div>
            </div>
          </div>

          <!-- Vehicle Card 2 (Popular) -->
          <div
            class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl border-2 border-blue-500 bg-white">
            <div class="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              Populaire</div>
            <div class="">
              <div class=" mb-2"> <img class="h-64 object-cover w-full" src="../../img/van.jpg" alt=""></div>
              <div class="p-6 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Van V-class</h3>
                <p class="text-gray-600 mb-4">Espace et confort pour les groupes</p>
                <div class="text-3xl font-bold text-blue-600 mb-6">À partir de 60€</div>
                <ul class="space-y-2 mb-6 text-sm text-gray-600">
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>1-6 passagers</li>
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Bagages XXL</li>
                  <li class="flex items-center justify-center"><span
                      class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Écran TV</li>
                </ul>
                <button
                  class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:scale-105 transition-all duration-200">
                  Choisir ce véhicule
                </button>
              </div>
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
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><span
                class="text-2xl">✈️</span></div>
            <h3 class="text-xl font-semibold mb-2">Aéroports</h3>
            <p class="text-gray-300">Transferts vers tous les aéroports parisiens</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><span
                class="text-2xl">🏰</span></div>
            <h3 class="text-xl font-semibold mb-2">Disney</h3>
            <p class="text-gray-300">Navettes vers Disneyland Paris</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><span
                class="text-2xl">🌆</span></div>
            <h3 class="text-xl font-semibold mb-2">Ville & Banlieue</h3>
            <p class="text-gray-300">Déplacements dans tout Paris et sa région</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><span
                class="text-2xl">⏰</span></div>
            <h3 class="text-xl font-semibold mb-2">Mise à disposition</h3>
            <p class="text-gray-300">Chauffeur dédié à l'heure</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RoutingService } from '../../services/routing';
import { GeocodingService } from '../../services/geocoding';
import { parisLocations } from '../../assets/paris-data';
import { LocateIcon } from 'lucide-vue-next';
// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default {
  name: 'VtcParisWithMap',
  components: { LocateIcon },
  data() {
    return {
      // Données de la carte
      map: null,
      routeLayer: null,
      pickupMarker: null,
      destinationMarker: null,
      pickupLocation: null,
      destinationLocation: null,
      routeInfo: null,
      mapInitialized: false,

      // Données du formulaire
      pickup: '',
      destination: '',
      rideDateTime: this.getDefaultDateTime(),

      // Autocomplétion
      pickupSuggestions: [],
      destinationSuggestions: [],
      showPickupSuggestions: false,
      showDestinationSuggestions: false,
      searchTimeout: null,

      // Catégories populaires
      popularCategories: {
        'Monuments': parisLocations.monuments.slice(0, 10),
        'Transports': parisLocations.transports.slice(0, 10),
        'Hôtels': parisLocations.hotels.slice(0, 10),
        'Parcs': parisLocations.parcs.slice(0, 10)
      },
      showCategory: null,
      selectedCategory: ''
    }
  },
  mounted() {
    this.initMap();
  },
  beforeUnmount() {
    this.destroyMap();
  },
  methods: {
    getDefaultDateTime() {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      return now.toISOString().slice(0, 16);
    },

    initMap() {
      if (this.mapInitialized) return;

      this.$nextTick(() => {
        if (!this.$refs.mapContainer) return;

        const parisCenter = [48.8566, 2.3522];
        this.map = L.map(this.$refs.mapContainer, {
          center: parisCenter,
          zoom: 13,
          minZoom: 12,
          maxZoom: 16,
          zoomControl: false,
          attributionControl: false,
          zoomAnimation: false,
          fadeAnimation: false,
          markerZoomAnimation: false,
          // maxBounds: this.getParisBounds(),
          maxBoundsViscosity: 0.8
        });

        // Tile layer
     L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(this.map);



        // Contrôle de zoom
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        this.addParisBoundary();
        this.mapInitialized = true;
      });
    },

    destroyMap() {
      if (this.map) {
        this.map.eachLayer(layer => {
          this.map.removeLayer(layer);
        });
        this.map.off();  // ✅ enlève tous les listeners Leaflet
        this.map.remove();
        this.map = null;
      }
      this.mapInitialized = false;
    },
    getParisBounds() {
      return [
        [48.815, 2.225],
        [48.902, 2.470]
      ];
    },

    addParisBoundary() {
      if (!this.map) return;

      const parisBounds = this.getParisBounds();
      L.rectangle(parisBounds, {
        color: '#ff6b35',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.1,
        fillColor: '#ff6b35'
      }).addTo(this.map);
    },

    async searchAddress(type) {
      const query = type === 'pickup' ? this.pickup : this.destination;

      if (query.length < 2) {
        if (type === 'pickup') this.pickupSuggestions = [];
        else this.destinationSuggestions = [];
        return;
      }

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        try {
          const results = await GeocodingService.addressToCoordinates(query + ', Paris, France') || [];
          const suggestions = Array.isArray(results) ? results : [results];

          const formattedSuggestions = suggestions.map(item => ({
            display_name: item.display_name || item.address,
            lat: item.lat,
            lng: item.lon || item.lng,
            name: item.name || item.display_name
          }));

          if (type === 'pickup') {
            this.pickupSuggestions = formattedSuggestions;
          } else {
            this.destinationSuggestions = formattedSuggestions;
          }
        } catch (error) {
          console.error('Erreur recherche adresse:', error);
        }
      }, 300);
    },

    showSuggestions(type) {
      if (type === 'pickup') this.showPickupSuggestions = true;
      else this.showDestinationSuggestions = true;
    },

    hideSuggestions(type) {
      setTimeout(() => {
        if (type === 'pickup') this.showPickupSuggestions = false;
        else this.showDestinationSuggestions = false;
      }, 200);
    },

    async selectAddress(suggestion, type) {
      if (!suggestion.lat || !suggestion.lng) {
        console.error('Coordonnées manquantes dans la suggestion');
        return;
      }

      const address = suggestion.name || suggestion.display_name;
      const coords = [suggestion.lat, suggestion.lng];

      if (type === 'pickup') {
        this.pickup = address;
        this.pickupLocation = coords;
        this.showPickupSuggestions = false;
        this.addMarker(coords, 'pickup');
      } else {
        this.destination = address;
        this.destinationLocation = coords;
        this.showDestinationSuggestions = false;
        this.addMarker(coords, 'destination');
      }

      this.safeSetView(coords, 15);

      if (this.pickupLocation && this.destinationLocation) {
        this.calculateRoute();
      }
    },

    safeSetView(coords, zoom) {
      if (this.map && this.map._loaded) {
        this.map.setView(coords, zoom);
      }
    }
    ,
    addMarker(coords, type) {
      if (!this.map) return;

      if (type === 'pickup' && this.pickupMarker) {
        this.map.removeLayer(this.pickupMarker);
      } else if (type === 'destination' && this.destinationMarker) {
        this.map.removeLayer(this.destinationMarker);
      }

      const marker = L.marker(coords, {
        icon: L.icon({
          iconUrl: type === 'pickup'
            ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
            : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      });

      if (this.map) {
        marker.addTo(this.map)
          .bindPopup(type === 'pickup' ? '📍 Départ' : '🎯 Arrivée')
          .openPopup();
      }

      if (type === 'pickup') {
        this.pickupMarker = marker;
        this.pickupLocation = coords;
      } else {
        this.destinationMarker = marker;
        this.destinationLocation = coords;
      }
    },

    async calculateRoute() {
      if (!this.pickupLocation || !this.destinationLocation || !this.map) return;

      try {
        const route = await RoutingService.calculateRoute(
          [this.pickupLocation[1], this.pickupLocation[0]],
          [this.destinationLocation[1], this.destinationLocation[0]]
        );

        if (!route || !this.map) return;

        this.routeInfo = route;

        if (this.routeLayer) {
          this.map.removeLayer(this.routeLayer);
        }

        this.routeLayer = L.geoJSON(route.geometry, {
          style: {
            color: '#1e40af',
            weight: 5,
            opacity: 0.8,
            lineJoin: 'round'
          }
        }).addTo(this.map);

        if (this.map && this.routeLayer && this.routeLayer.getBounds) {
          try {
            this.map.fitBounds(this.routeLayer.getBounds().pad(0.1));
          } catch (e) {
            console.warn("fitBounds ignoré car la carte n’est plus disponible");
          }
        }

      } catch (error) {
        console.error('Erreur calcul itinéraire:', error);
      }
    },

    searchDriver() {
      if (!this.pickup || !this.destination) {
        alert('Veuillez renseigner le point de départ et la destination');
        return;
      }

      if (this.pickupLocation && this.destinationLocation) {
        this.calculateRoute();
      }
    },

    confirmRide() {
      if (!this.routeInfo) return;

      const price = this.calculatePrice(this.routeInfo.distance);
      const duration = Math.round(this.routeInfo.duration / 60);

      alert(`🎉 Course confirmée !\nPrix: ${price} €\nDurée: ${duration} minutes`);
    },

    calculatePrice(distanceMeters) {
      const distanceKm = distanceMeters / 1000;
      const basePrice = 2.50;
      const pricePerKm = 1.80;
      return (basePrice + (distanceKm * pricePerKm)).toFixed(2);
    },

    locateUser() {
      if (!navigator.geolocation) {
        alert('Géolocalisation non supportée');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.pickupLocation = [latitude, longitude];
          GeocodingService.coordinatesToAddress(latitude, longitude)
            .then(location => {
              console.log('Résultat géocodage inverse:', location);
              if (location) {
                this.pickup = location;
              }
            })
            .catch(err => console.error('Erreur géocodage inverse:', err));
          this.pickup = location.name;

          this.addMarker([latitude, longitude], 'pikcup');

          this.safeSetView([latitude, longitude], 15);
        },
        (error) => {
          console.error('Erreur géolocalisation:', error);
        }
      );
    },

    resetToParis() {
      if (!this.map) return;
      this.map.setView([48.8566, 2.3522], 13);
    },

    showCategoryPopup(category) {
      this.selectedCategory = category;
      this.showCategory = true;
    },

    selectPopularLocation(location) {
      if (!location.lat || !location.lng) return;
      this.destination = location.name;
      this.destinationLocation = [location.lat, location.lng];
      this.showCategory = false;
      this.addMarker([location.lat, location.lng], 'destination');
      this.safeSetView([location.lat, location.lng], 15);
    },

    getArrondissementName(arrondissementId) {
      if (!arrondissementId) return '';
      const arr = parisLocations.arrondissements.find(a => a.id === arrondissementId);
      return arr ? arr.name : '';
    }
  }
}
</script>

<style scoped>
.vtc-paris-app {
  min-height: 100vh;
}

.map-controls {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>