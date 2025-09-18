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
            </div>
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

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Date</label>
                <input type="date" v-model="formData.date"
                  class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Heure de depart</label>
                <input type="time" v-model="formData.time"
                  class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
              </div>
            </div>

           

           <div v-if="routeInfo">
                       <p class="">Choisissez un vehicule</p>
              <div  class="flex  justify-center items-center  gap-4">
                <label v-for="car in cars" :key="car.id"
                  :class="car.id == selected.id? 'border-[#3d259d] border-2 text-gray-800 bg-[#3B82F6]/10' : 'bg-white  text-black hover:bg-gray-300'"
                  class="bg-white relative rounded-md overflow-hidden border shadow-md hover:shadow-xl transition  w-2/4 ">
                  <input type="radio" v-model="selected"
                    :value="setvalue(car.id, calculatePrice(routeInfo.distance, car.tarification_kilometrage, car.tarification_heure))"
                    class="hidden " />

                  <img class="w-full  object-cover h-48  " :src="car.image" alt="">


                  <div
                    class="bottom-0 justify-center text-center font-semibold text-lg text-gray-300 absolute flex flex-col bg-gradient-to-t mt-2 from-black/60 to-gray-600/40 w-full  shadow-2xl rounded-t-md  h-1/3  z-50 bg-opacity-65">
                    <p>{{ car.name }}</p>
                    <p>{{ calculatePrice(routeInfo.distance, car.tarification_kilometrage, car.tarification_heure) }} €
                    </p>
                  </div>


                </label>


              </div>
              </div>
 <!-- Numéro de vol/train -->
         
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Numéro de vol ou train (optionnel)</label>
              <input placeholder="Ex: AF123 ou TGV1234" v-model="formData.flightTrainNumber"
                class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
            </div>

            <!-- Arrêt intermédiaire -->
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Arrêt intermédiaire (optionnel)</label>
              <input placeholder="Adresse de l'arrêt intermédiaire" v-model="formData.intermediateStop"
                class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
            </div>
            <!-- Sièges enfants -->
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="seat"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                <span class="text-sm font-medium text-gray-700">Je veux des sieges enfant</span>
              </label>
            </div>
            <div v-if="seat" class="space-y-4 duration-500">
              <h3 class="text-lg font-semibold text-gray-900">Sièges enfants (optionnel)</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Siège bébé (0-2 ans)</label>
                  <input v-model="formData.babySeats" type="number" :max="max2"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />


                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Siège enfant (3-7 ans)</label>
                  <input v-model="formData.childSeats" type="number" :max="max1"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />

                </div>
              </div>
              <span class="text-sm font-medium text-red-600"> NB: 1 siege enfant=15eu</span>
            </div>

            <!-- Bagages -->
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="bagage"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                <span class="text-sm font-medium text-gray-700">J'ai les bagages</span>
              </label>
            </div>
            <div v-if="bagage" class="space-y-4 duration-500">
              <h3 class="text-lg font-semibold text-gray-900">Bagages</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Nombre de bagages</label>
                  <input v-model="formData.luggageCount"
                  type="number"
                  :max="maxLuggage"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3"/>
                  
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Type de bagages</label>
                  <select v-model="formData.luggageType"
                    class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3">
                    <option value="normal">Normaux</option>
                    <option value="volumineux">Volumineux</option>
                    <option value="mixte">Mixte</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Animal de compagnie -->
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="formData.hasPet"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                <span class="text-sm font-medium text-gray-700">Je voyage avec un animal de compagnie</span>
              </label>
            </div>

            <button @click="nextStep"
              class="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
              Continuer
            </button>
          </div>

          <!-- Step 2: Personal Info -->
          <div v-if="step === 2" class="space-y-6">
            

            <div class="grid md:grid-cols-1 gap-6">
              

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" placeholder="06 12 34 56 78" v-model="formData.phone"
                  class="h-12 w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Notes (optionnel)</label>
              <textarea placeholder="Informations supplémentaires..." v-model="formData.notes"
                class="min-h-[100px] w-full border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3"></textarea>
            </div>

            <div class="flex space-x-4">
              <button @click="prevStep"
                class="flex-1 h-12 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Retour
              </button>
              <button @click="nextStep"
                class="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
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
                <div v-if="formData.intermediateStop" class="flex justify-between">
                  <span class="text-gray-600">Arrêt intermédiaire:</span>
                  <span class="font-medium">{{ formData.intermediateStop }}</span>
                </div>
                <div v-if="formData.flightTrainNumber" class="flex justify-between">
                  <span class="text-gray-600">Numéro vol/train:</span>
                  <span class="font-medium">{{ formData.flightTrainNumber }}</span>
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
                <div v-if="formData.babySeats > 0" class="flex justify-between">
                  <span class="text-gray-600">Sièges bébé:</span>
                  <span class="font-medium">{{ formData.babySeats }} (+{{ formData.babySeats * 15 }}€)</span>
                </div>
                <div v-if="formData.childSeats > 0" class="flex justify-between">
                  <span class="text-gray-600">Sièges enfant:</span>
                  <span class="font-medium">{{ formData.childSeats }} (+{{ formData.childSeats * 15 }}€)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Bagages:</span>
                  <span class="font-medium">{{ formData.luggageCount }} ({{ formData.luggageType }})</span>
                </div>
                <div v-if="formData.hasPet" class="flex justify-between">
                  <span class="text-gray-600">Animal de compagnie:</span>
                  <span class="font-medium">Oui</span>
                </div>
                <div class="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total estimé:</span>
                  <span class="text-blue-600">{{ }}€</span>
                </div>
              </div>
            </div>
             <h3 class="text-md text-red-500">nb: vous devez payer 50% des montant de la course et le reste lorsque la couse sera terminer</h3>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Informations de paiement</h3>
             
                    <div id="card-element"></div>

            </div>

            <div class="flex space-x-4">
              <button @click="prevStep"
                class="flex-1 h-12 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Retour
              </button>
              <button
                class="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-2 h-4 w-4">
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
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RoutingService } from '../../services/routing';
import { GeocodingService } from '../../services/geocoding';
import { parisLocations } from '../../assets/paris-data';
import { LocateIcon } from 'lucide-vue-next';
import axios from 'axios';
// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
export default {
    components: { LocateIcon },
  data() {
    return {
      stripe: null,
      cardElement: null,
      amount: 20, // exemple montant
      message: "",
      bagage: false,
      seat: false,
      step: 1,
      maxseat:3,
      selected: {
        id:null,
        price:0
      },
      maxPassengers: 6,
      maxLuggage: 7,
      pickup: '',
        destination: '',
        pickupLocation: null,
      destinationLocation: null,
      routeInfo: null,
      formData: {
        
        date: '',
        time: '',
        phone:'',
        flightTrainNumber: '',
        intermediateStop: '',
        vehicle: '',
        passengers: '',
        babySeats: 0,
        childSeats: 0,
        luggageCount: 0,
        luggageType: 'normal',
        hasPet: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: '',
     


      },
      
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
      selectedCategory: '',
      localhost:this.$store.state.localhost

    }
  },
  
  computed:{
      max1(){
        return this.maxseat-this.formData.babySeats
      },
      max2(){
        return this.maxseat-this.formData.childSeats
      },
       cars() {
      return this.$store.state.cars
    }

  },
  async mounted() {
    this.locateUser();
   this.initStripe()
  },
  methods: {
   async initStripe(){
        try{
        this.stripe = await loadStripe("pk_live_51S7dVELML18ba1cuj41VEX1xpslbifshJxXgIEmLGjcbl6qnzeVTLjDPUaw3s2tFkOOhoT3mjen85bHsJpTtTjMO006Y8gPh4S"); // ta clé publique
    const elements = this.stripe.elements();
    this.cardElement = elements.create("card");
    if(window.onload){
      console.log(this.cardElement)
 this.cardElement.mount("#card-element");
    }
   
  }catch(error){
    console.log(error)
  }

    },
     async handleSubmit() {
      // Appel backend Laravel
      await axios.post(this.localhost+"payement", {
        
       
      }).then(response => {
        console.log("Réservation enregistrée:", response.data);
      }).catch(error => {
        console.error("Erreur lors de l'enregistrement de la réservation:", error);
      });
      const res = await fetch("http://127.0.0.1:8000/api/payement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: this.amount })
      });

      const { clientSecret } = await res.json();

      const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: this.cardElement }
      });

      if (error) {
        this.message = "❌ Erreur: " + error.message;
      } else if (paymentIntent.status === "succeeded") {
        this.message = "✅ Paiement réussi !";
      }
    },
    async confirmRide() {
      if (!this.routeInfo) return;
      if (!this.selected) {
        alert('selectionner un vehicule');
        return
      }
      let price =this.selected.price
    let hasPet =this.formData.hasPet==true?1:0
       
      let token = localStorage.getItem('token')
      const duration = Math.round(this.routeInfo.duration / 60);
      let formData = new FormData();
      formData.append('pickup', this.pickup);
      formData.append('destination', this.destination);
      formData.append('pickupCoords', this.pickupLocation);
      formData.append('destinationCoords', this.destinationLocation);
      formData.append('distanceMeters', (this.routeInfo.distance/1000).toFixed(2));
      formData.append('durationMinutes', duration);
      formData.append('price', price);
      formData.append('type', 'course');
      formData.append('rideDateTime', this.rideDateTime);
      formData.append('vehicle', this.selected.id);
      formData.append('flightTrainNumber', this.formData.flightTrainNumber);
      formData.append('intermediateStop', this.formData.intermediateStop);
      formData.append('babySeats', this.formData.babySeats);
      formData.append('childSeats', this.formData.childSeats);
      formData.append('luggageCount', this.formData.luggageCount);
      formData.append('luggageType', this.formData.luggageType);

      formData.append('hasPet', hasPet);
      formData.append('time', time);
      formData.append('date', date);

      formData.append('phone', this.formData.phone);
      
      try {
        await this.axios.post(`${this.localhost}ride`, formData, {
          headers: {
            Authorization: `Bearer ${token}`

          }
        }
        );
      }
      catch (error) {
        console.error('Erreur lors de la confirmation de la course:', error);
        alert('Erreur lors de la confirmation de la course. Veuillez réessayer.');
        return;
      }


      alert(`🎉 Course confirmée !\nPrix: ${price} €\nDurée: ${duration} minutes`);
    },

    setvalue(id, price) {
      let test
      test={id:id,price:price};
     
      return test
      
    },
    
    getDefaultDateTime() {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      return now.toISOString().slice(0, 16);
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
       
      } else {
        this.destination = address;
        this.destinationLocation = coords;
        this.showDestinationSuggestions = false;
       
      }
       if (this.pickupLocation && this.destinationLocation) {
        this.calculateRoute();
      }


     
    },
    async calculateRoute() {
      if (!this.pickupLocation || !this.destinationLocation ) return;

      try {
        const route = await RoutingService.calculateRoute(
          [this.pickupLocation[1], this.pickupLocation[0]],
          [this.destinationLocation[1], this.destinationLocation[0]]
        );

        if (!route) return;

        this.routeInfo = route;

      

       
        

      } catch (error) {
        console.error('Erreur calcul itinéraire:', error);
      }
    },

   
  

     calculatePrice(distanceMeters, pricePerKm, pricePerhour) {
      let duration = Math.round(this.routeInfo.duration / 120)
      let price = 0
      if (duration > 30) {
        price = (distanceMeters / 1000) * pricePerKm

      } else {
        price = duration * pricePerhour
      }
      if (this.formData.childSeats) {
        price += this.formData.childSeats * 15
      }
      if (this.formData.babySeats) {
        price += this.formData.babySeats * 15
      }

      return price.toFixed(2);
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

          // this.addMarker([latitude, longitude], 'pickup');

          // this.safeSetView([latitude, longitude], 15);
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
     
    },

    getArrondissementName(arrondissementId) {
      if (!arrondissementId) return '';
      const arr = parisLocations.arrondissements.find(a => a.id === arrondissementId);
      return arr ? arr.name : '';
    }
  ,
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
    },
    updatePassengerOptions() {
      if (this.formData.vehicle === 'eclass' || this.formData.vehicle === 'sclass') {
        this.maxPassengers = 4;
      } else if (this.formData.vehicle === 'vclass') {
        this.maxPassengers = 7;
      } else {
        this.maxPassengers = 6;
      }

      if (this.formData.passengers > this.maxPassengers) {
        this.formData.passengers = '';
      }

      // Mise à jour du nombre max de bagages
      if (this.formData.vehicle === 'eclass' || this.formData.vehicle === 'sclass') {
        this.maxLuggage = 3;
      } else if (this.formData.vehicle === 'vclass') {
        this.maxLuggage = 7;
      } else {
        this.maxLuggage = 3;
      }
    },
    calculateTotal() {
      let basePrice = 75; // Prix de base
      let extraSeats = (parseInt(this.formData.babySeats) + parseInt(this.formData.childSeats)) * 15;
      return basePrice + extraSeats;
    },
     async confirmRide() {
      if (!this.routeInfo) return;
      if (!this.selected) {
        alert('selectionner un vehicule');
        return
      }
      let price =this.selected.price
    let hasPet =this.formData.hasPet==true?1:0
       
      let token = localStorage.getItem('token')
      const duration = Math.round(this.routeInfo.duration / 60);
      let formData = new FormData();
      formData.append('pickup', this.pickup);
      formData.append('destination', this.destination);
      formData.append('pickupCoords', this.pickupLocation);
      formData.append('destinationCoords', this.destinationLocation);
      formData.append('distanceMeters', (this.routeInfo.distance/1000).toFixed(2));
      formData.append('durationMinutes', duration);
      formData.append('price', price);
      formData.append('type', 'course');
      formData.append('rideDateTime', this.rideDateTime);
      formData.append('vehicle', this.selected.id);
      formData.append('flightTrainNumber', this.formData.flightTrainNumber);
      formData.append('intermediateStop', this.formData.intermediateStop);
      formData.append('babySeats', this.formData.babySeats);
      formData.append('childSeats', this.formData.childSeats);
      formData.append('luggageCount', this.formData.luggageCount);
      formData.append('luggageType', this.formData.luggageType);
  formData.append('phone', this.formData.phone);
      formData.append('hasPet', hasPet);
      console.log(formData)
      try {
        await this.axios.post(`${this.localhost}ride`, formData, {
          headers: {
            Authorization: `Bearer ${token}`

          }
        }
        );
      }
      catch (error) {
        console.error('Erreur lors de la confirmation de la course:', error);
        alert('Erreur lors de la confirmation de la course. Veuillez réessayer.');
        return;
      }


      alert(`🎉 Course confirmée !\nPrix: ${price} €\nDurée: ${duration} minutes`);
    },

  },
  watch: {
    'formData.vehicle': function () {
      this.updatePassengerOptions();
    }
  }
}
</script>

<style>
.gradient-primary {
  background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
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
</style>