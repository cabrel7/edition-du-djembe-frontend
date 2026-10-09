<template>
  <header class="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
    <nav class="container-custom" aria-label="Navigation principale">
      <div class="flex h-18 items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex p-1 items-center gap-2 group">
          <div class="flex items-center  p-1 justify-center w-16 h-16 rounded-lg bg-primary-foreground">
             <img class="object-cover  h-full w-full" src="/logo.png" alt="">
            </div>
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-foreground leading-tight">
              Les Editions 
            </span>
            <span class="text-xs text-muted-foreground leading-tight">
              du Djembé d'Ébène
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex lg:items-center lg:gap-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              $route.path === item.href
                ? 'text-primary bg-secondary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>


        <!-- Mobile menu button -->
        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">Ouvrir le menu</span>
          <Menu v-if="!mobileMenuOpen"  class="h-6 text-black w-6" />
           <X v-else class="h-6 text-black w-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="lg:hidden py-4 border-t border-border">
        <div class="flex flex-col space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click.native="closeMobileMenu"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              $route.path === item.href
                ? 'text-primary bg-secondary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            ]"
          >
            {{ item.name }}
          </router-link>
          
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { Menu, X, BookOpen } from 'lucide-vue-next'

export default {
  name: 'Header',
  
  components: {
    Menu,
    X,
    BookOpen
  },
  
  data() {
    return {
      mobileMenuOpen: false,
      
      navigation: [
        { name: "Accueil", href: "/" },
        { name: "À propos", href: "/a-propos" },
        { name: "Catalogue", href: "/catalogue" },
        { name: "Récherches", href: "/memoires" },
        { name: "Actualités", href: "/actualites" },
          { name: "Les Cahiers du Djembé", href: "/cahiers-du-djembe" },
        { name: "Services", href: "/services" },
        { name: "Vidéos", href: "/videos" },
        { name: "Soumettre", href: "/soumettre-mon-travail" },
        { name: "Contact", href: "/contact" },
      ]
    }
  },
  
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    
    // Méthode utilitaire pour les classes conditionnelles (similaire à cn())
    cn(...classes) {
      return classes.filter(Boolean).join(' ')
    }
  },
  
  watch: {
    // Fermer le menu mobile quand la route change
    '$route'() {
      this.closeMobileMenu()
    }
  },
  
  mounted() {
    console.log('Header mounted')
  }
}
</script>

<style scoped>
/* Styles pour les liens actifs */
.router-link-active {
  font-weight: 500;
}

/* Animation pour le menu mobile */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
