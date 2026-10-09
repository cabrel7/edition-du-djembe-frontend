<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <div v-if="isdispo"
           class="bg-primary z-50 absolute top-4 flex right-4 animate-fade-in text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all flex-col items-center justify-center mb-2">
        <br><h1 class="font-bold">{{ message.title }}</h1> 
        <br><p>{{ message.description }}</p>
      </div>
      <router-view @showtoast="showtoast" name="two" @updateSeo="updateDynamicSeo"/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'
import { setSeoTags, setJsonLd } from '@/plugins/seo'
import { getSeoForRoute } from '@/config/seo'

export default {
  name: 'PublicLayout',

  components: {
    Header,
    Footer
  },

  data() {
    return {
      message: {
        title: '',
        description: ''
      },
      isdispo: false,
    }
  },

  watch: {
    // Surveiller les changements de route
    '$route': {
      handler(to, from) {
        // Petite attente pour laisser le composant enfant se monter
        this.$nextTick(() => {
          this.updateSeo(to)
        })
      },
      immediate: true // Exécuter immédiatement au montage
    }
  },

  methods: {
    showtoast(message) {
      this.isdispo = true
      this.message = message
      setTimeout(() => {
        this.isdispo = false
      }, 5000)
    },

    // Méthode principale pour mettre à jour le SEO
    updateSeo(route = this.$route) {
      const routeName = route.name
      
      if (!routeName) return
      
      // Obtenir la configuration SEO pour cette route
      const seoData = getSeoForRoute(routeName)
      
      // Appliquer les meta tags
      setSeoTags(seoData)
      
      // Appliquer le schema si disponible
      if (seoData.schema) {
        setJsonLd(seoData.schema)
      }
      
      console.log('✅ SEO mis à jour pour:', routeName, seoData)
    },

    // Méthode pour mettre à jour le SEO avec des données dynamiques
    // Appelée par les composants enfants via $emit('updateSeo', data)
    updateDynamicSeo(dynamicData) {
      const routeName = this.$route.name
      const seoData = getSeoForRoute(routeName, dynamicData)
      
      setSeoTags(seoData)
      
      if (seoData.schema) {
        setJsonLd(seoData.schema)
      }
      
      console.log('✅ SEO dynamique mis à jour pour:', routeName, dynamicData)
    }
  },

  async mounted() {
    // Charger les données initiales
    await this.$store.dispatch('fetchHomeData')
    await this.$store.dispatch('fetchAllPublicData')
    
    // Le watcher avec immediate: true gère déjà l'initialisation du SEO
  }
}
</script>

<style scoped>
/* Styles spécifiques au layout si nécessaire */
</style>
