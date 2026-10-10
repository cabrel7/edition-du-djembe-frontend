import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from './store/index'
import "./index.css"
import axios from 'axios'
import { initGoogleAnalytics } from '@/plugins/analytics'
import VueAxios from 'vue-axios'

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     // Empêche l'affichage automatique des erreurs réseau dans la console
//     return Promise.reject(error)
//   }

initGoogleAnalytics('G-2F1E0XH40B')
// )

// Intercepteur global : token expiré/invalidé → nettoyage + retour à l'accueil.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
