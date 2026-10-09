<template>
  <footer class="bg-primary text-primary-foreground">
    <div class="container-custom section-padding">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="space-y-4">
          <router-link to="/" class="flex items-center gap-2">
            <div class="flex items-center justify-center w-16 h-16 p-1  rounded-lg bg-primary-foreground">
             <img class="object-cover h-full w-full" src="/logo.png" alt="">
            </div>
            <div class="flex  flex-col">
              <span class="text-lg font-semibold leading-tight">
                 Les Editions 
              </span>
              <span class="text-xs opacity-80 leading-tight">
                du Djembé d'Ébène
              </span>
             
            </div>
          </router-link>
          <p class="text-sm opacity-80 leading-relaxed">
            Votre partenaire de confiance pour la publication et la diffusion 
            de vos œuvres littéraires et travaux de recherche.
          </p>
          <div class="flex gap-3">
            <a 
              href="#" 
              class="p-2 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              @click.prevent="shareOnFacebook"
            >
              <Facebook class="w-4 h-4" />
            </a>
            <a 
              href="#" 
              class="p-2 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              @click.prevent="shareOnTwitter"
            >
              <Twitter class="w-4 h-4" />
            </a>
            <a 
              href="#" 
              class="p-2 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              @click.prevent="shareOnLinkedin"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a 
              href="#" 
              class="p-2 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              @click.prevent="shareOnInstagram"
            >
              <Instagram class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Navigation</h3>
          <ul class="space-y-2">
            <li v-for="item in footerNavigation.navigation" :key="item.name">
              <router-link
                :to="item.href"
                class="text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li v-for="item in footerNavigation.services" :key="item.name">
              <router-link
                :to="item.href"
                class="text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold mb-4">Contact</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 mt-0.5 opacity-80" />
              <span class="text-sm opacity-80">
               12263 boulevard Saint Claude<br />
                Québec, Canada
              </span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-4 h-4 opacity-80" />
             <a href="tel:+1(581)928 85 85"> <span class="text-sm opacity-80">+1 (581) 928 85 85</span></a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-4 h-4 opacity-80" />
              <a href="mailto:éditionsdudjembédébène@gmail.com" class="text-sm opacity-80">contacteditiondudjembe@gmail.com</a>
            </li>
          </ul>
        </div>
       
      </div>

      <div class="mt-12 pt-8 border-t border-primary-foreground/20">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm opacity-80">
            © {{ currentYear }} Éditions du Djembé d’Ébène
          </p>
          <div class="flex gap-6">
            <router-link
              v-for="item in footerNavigation.legal"
              :key="item.name"
              :to="item.href"
              class="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-vue-next'

export default {
  name: 'Footer',
  
  components: {
    BookOpen,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
  },
  
  data() {
    return {
      footerNavigation: {
        navigation: [
          { name: "Accueil", href: "/" },
          { name: "À propos", href: "/a-propos" },
          { name: "Catalogue", href: "/catalogue" },
          { name: "Récherche", href: "/memoires" },
           { name: "Les Cahiers du Djembé", href: "/cahiers-du-djembe" },
        ],
        services: [
          { name: "Publication", href: "/services" },
          { name: "Correction", href: "/services" },
          { name: "Impression", href: "/services" },
          { name: "Formations", href: "/services" },
           { name: "Traduction", href: "/services" }
        ],
        legal: [
          { name: "Mentions légales", href: "/mentions-legales" },
          { name: "Politique de confidentialité", href: "/confidentialite" },
          { name: "CGU", href: "/cgu" },
        ],
      }
    }
  },
  
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  
  methods: {
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/share/1NX7SYkGeL/`, '_blank')
    },
    
    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent('Éditions - Maison d\'Édition')
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    },
    
    shareOnLinkedin() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/company/les-%C3%A9ditions-du-djemb%C3%A9-d%E2%80%99%C3%A9b%C3%A8ne`, '_blank')
    },
    
    shareOnInstagram() {
      // Instagram n'a pas d'API de partage direct, on redirige vers leur site
      window.open('https://www.instagram.com/editiondudjembe?igsh=bm82MGs5bjlraHk5', '_blank')
    }
  },
  
  mounted() {
   
  }
}
</script>

<style scoped>
/* Styles spécifiques pour le footer */
.opacity-80 {
  opacity: 0.8;
}

.opacity-100 {
  opacity: 1;
}

.transition-opacity {
  transition: opacity 0.2s ease;
}

.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Hover pour les liens sociaux */
.bg-primary-foreground\/10:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Espacement des colonnes */
.gap-12 {
  gap: 3rem;
}

/* Bordure supérieure */
.border-t {
  border-top-width: 1px;
}

.border-primary-foreground\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
