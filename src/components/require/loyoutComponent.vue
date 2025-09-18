<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
    <!-- Header Section -->
    <header
      class="sticky top-0 left-0 right-0 z-50 bg-white/95 bg-opacity-50 backdrop-blur-md border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="md:hidden lg:hidden sm:block block">
            <router-link v-if="rout === 'home'" to="/reserver" class="px-4  py-2 rounded gradient-primary text-white">
              Réserver une course
            </router-link>

            <router-link v-else to="/home"
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VTC Paris Premium
            </router-link>
          </div>

          <router-link to="/home"
            class="md:block lg:block sm:hidden hidden text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VTC Paris Premium
          </router-link>

          <!-- Menu desktop -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/home" class="text-gray-700 hover:text-blue-600 transition-colors">Accueil</router-link>
            <!-- <router-link to="/reserver" class="text-gray-700 hover:text-blue-600 transition-colors">Réserver</router-link> -->
            <router-link to="/prices" class="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</router-link>
            <router-link to="/flote" class="text-gray-700 hover:text-blue-600 transition-colors">Flotte</router-link>
            <router-link to="/a-propos" class="text-gray-700 hover:text-blue-600 transition-colors">À
              propos</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</router-link>
          </nav>

          <!-- Boutons desktop -->
          <div class="hidden md:flex items-center space-x-4">
            <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
              <button  @click="openLogin">Connexion</button>
            </button>
            <button class=" lg:block md:block sm:hidden hidden px-4 py-2 rounded gradient-primary text-white">
              <router-link to="/reserver">Réserver</router-link>
            </button>
          </div>

          <!-- Bouton menu mobile -->
          <button class="md:hidden" @click="isMenuOpen = !isMenuOpen">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu mobile -->
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <nav class="flex flex-col space-y-4">
            <router-link to="/home" class="text-gray-700 hover:text-blue-600 transition-colors">Accueil</router-link>
            <router-link to="/reserver"
              class="text-gray-700 hover:text-blue-600 transition-colors">Réserver</router-link>
            <router-link to="/prices" class="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</router-link>
            <router-link to="/flote" class="text-gray-700 hover:text-blue-600 transition-colors">Flotte</router-link>
            <router-link to="/a-propos" class="text-gray-700 hover:text-blue-600 transition-colors">À
              propos</router-link>
            <router-link to="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</router-link>
            <div class="flex flex-col space-y-2 pt-4">
              <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
             <button  @click="openLogin">Connexion</button>
              </button>
              <button v-if="rout !== 'home'" class="px-4 py-2 rounded gradient-primary text-white">
                <router-link to="/reserver">Réserver</router-link>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
   

    <!-- register modal  -->
    <div  v-if="regmodal"
      class="flex z-40 inset-0 absolute overflow-y-auto  items-center mt-16 justify-center min-h-screen max-h-[115vh] bg-black bg-opacity-50">

      <div class="w-full max-w-md shadow-lg  border-0 rounded-xl bg-white">
        <div class="text-center p-6">
          <h2 class="text-2xl font-bold mb-2">Créer votre compte</h2>
          <p class="text-gray-600">
            Rejoignez VTC Paris Premium et profitez de nos services de transport haut de gamme
          </p>
        </div>
        <div class="p-6">
            <div  class="space-y-4">
            <form @submit.prevent="handleregister" class="space-y-4">
              <!-- Personal Information -->
              <div class="space-y-4">
                
                
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

             

              <!-- Password -->
              <div class="space-y-4">
               
                
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
                Créer mon compte
              </button>
            </form>
            
            <div class="text-center text-sm">
              <span class="text-gray-600">Déjà un compte ?  </span>
              <button  @click="openLogin" class="text-blue-600 hover:underline">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- login modal -->
    <div v-if="logmodal"
      class="flex z-40 inset-0 absolute  items-center justify-center h-screen bg-black bg-opacity-50">

      <div class="w-full max-w-md shadow-lg  border-0 rounded-xl bg-white">
        <div class="text-center p-6">
          <h2 class="text-2xl font-bold mb-2">Connexion</h2>
          <p class="text-gray-600">
            Connectez-vous à votre compte VTC Paris Premium
          </p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" placeholder="votre@email.com" v-model="email"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required />
              </div>

              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input id="password" type="password" v-model="password"
                  class="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required />
              </div>

              <button
                class="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                Se connecter
              </button>
            </form>

            <div class="text-center text-sm">
              <button @click="openRegister" class="text-blue-600 hover:underline">
                Créer un compte client
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <router-view name="two" @openRegister="openRegister" @openLogin="openLogin" :user="currentuser"></router-view>
    <!-- <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              class="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
              <li><router-link to="#" class="hover:text-white transition-colors">Transferts aéroports</router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Informations</h4>
            <ul class="space-y-2 text-gray-400">
              <li><router-link to="#" class="hover:text-white transition-colors">À propos</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Contact</router-link></li>
              <li><router-link to="#" class="hover:text-white transition-colors">Conditions générales</router-link>
              </li>
              <li><router-link to="#" class="hover:text-white transition-colors">Politique de
                  confidentialité</router-link></li>
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
    </footer> -->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      isMenuOpen: false,
      isloading: false,
      error: '',
      
        email: '',
        password: '',
 
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
       
        phone: '',
        confirmPassword:''
       
      },
      localhost: this.$store.state.localhost,
      isconnect: null,
      logmodal: false,
      regmodal: false

    }
  }
  ,
  computed: {
    currentuser() {
      return this.$store.state.user;
    },
    reservation() {
      return this.$store.state.reservation;
    },
    car() {
      return this.$store.state.car;
    },    
    user() {
      return this.$store.state.user;
    },
    rout() {
      return this.$route.name;
    }
  },
  methods:{
    openLogin() {
     console.log(this.logmodal);
      this.regmodal = false;
       this.logmodal = true;
      document.body.style.overflow = 'hidden'
    },
    openRegister() {
      this.logmodal = false;
      this.regmodal = true;
      document.body.style.overflow = 'auto'
    },
    async handleregister() {
      this.isloading = true;
      await axios.post(`${this.localhost}register`, this.formData)
        .then(response => {
          if (response.data.token) {

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isconnect', 1);
             
             this.isconnect = true;
             this.regmodal=false
          } else {
            this.error = "Erreur lors de l'inscription";
            this.isloading = false;
          } })
        .catch(error => {
          console.error('Registration error:', error);
        });
    },
    async handleLogin() {
      this.isloading = true;let 
      user = {
        email: this.email,
        password: this.password
      }

      await axios.post(`${this.localhost}login`, user)
        .then(response => {
          if (response.data.token) {

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isconnect', 1);
             document.body.style.overflow = 'auto'
             this.isconnect = true;
             this.logmodal=false
          } else {
            this.error = "Email ou mot de passe incorrect";
            this.isloading = false;
          }


        })
        .catch(error => {
          console.error('Login error:', error);
        });

    }
  },
  mounted() {
    this.$store.dispatch('fetchdata');
    let connect = localStorage.getItem('isconnect');
    if (connect == 1) {
      this.isconnect = true;
    } else {
      this.isconnect = false;
    }
  }
}

</script>