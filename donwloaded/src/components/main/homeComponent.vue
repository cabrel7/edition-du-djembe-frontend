<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="relative bg-primary overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" :style="patternStyle"></div>

      </div>
      <div class="container-custom relative">
        <div class="py-20 md:py-32 lg:py-40">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
             Faire résonner l’invisible
              
            </h1>
            <p class="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl">
              Nous accompagnons auteurs et chercheurs dans la publication et la diffusion
              de leurs œuvres avec excellence et professionnalisme.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/catalogue">
                <button class="group bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Découvrir le catalogue
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </router-link>
              <router-link to="/soumettre-mon-travail">
                <button class="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-6 py-3 rounded-lg font-medium transition-all">
                  Soumettre une œuvre
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-secondary py-12">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center">
            <p class="text-3xl md:text-4xl font-bold text-primary">{{ stat.value }}</p>
            <p class="text-sm text-muted-foreground mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Publications -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-4xl font-bold text-foreground">Dernières Publications</h2>
            <p class="text-muted-foreground mt-2">Découvrez nos ouvrages récents</p>
          </div>
          <router-link to="/catalogue" class="hidden md:flex items-center gap-2 text-primary hover:underline font-medium">
            Voir tout le catalogue
            <ChevronRight class="w-4 h-4" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="book in latestBooks"
            :key="book.id"
            :to="`/livres/${book.slug}`"
            class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift"
          >
           <div class=" h-[35vh] overflow-hidden">
            <div class="aspect-auto  overflow-hidden">
              <img
                :src="book.cover"
                :alt="book.title"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            </div>
            <div class="p-5">
              <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {{ book.category }}
              </span>
              <h3 class="text-lg font-semibold text-foreground mt-3 group-hover:text-primary transition-colors">
                {{ book.title }}
              </h3>
              <p class="text-sm text-muted-foreground mt-1">{{ book.author }}</p>
              <p class="text-primary font-semibold mt-3">{{ book.price}} €</p>
            </div>
          </router-link>
        </div>

        <div class="mt-8 text-center md:hidden">
          <router-link to="/catalogue">
            <button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center gap-2">
              Voir tout le catalogue
              <ChevronRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Research Memoirs -->
    <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-4xl font-bold text-foreground">Mémoires de Recherche</h2>
            <p class="text-muted-foreground mt-2">Travaux académiques et scientifiques</p>
          </div>
          <router-link to="/memoires" class="hidden md:flex items-center gap-2 text-primary hover:underline font-medium">
            Voir tous les mémoires
            <ChevronRight class="w-4 h-4" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="memoir in latestMemoirs"
            :key="memoir.id"
            :to="`/memoires/${memoir.slug}`"
            class="group bg-card rounded-lg p-6 card-shadow hover-lift"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-18 h-32 rounded-lg bg-primary/10 flex items-center justify-center">
              <img
                :src="memoir.cover"
                :alt="memoir.title"
                class="w-full h-full rounded object-cover"
              />
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs font-medium text-primary">{{ memoir.domain }}</span>
                <h3 class="text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                  {{ memoir.title }}
                </h3>
                <p class="text-sm text-muted-foreground mt-2">
                  {{ memoir.author }} • {{ memoir.university }}
                </p>
                <p class="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {{ memoir.abstract }}
                </p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="mt-8 text-center md:hidden">
          <router-link to="/memoires">
            <button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center gap-2">
              Voir tous les mémoires
              <ChevronRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-4xl font-bold text-foreground">Actualités</h2>
            <p class="text-muted-foreground mt-2">Les dernières nouvelles de notre maison</p>
          </div>
          <router-link to="/actualites" class="hidden md:flex items-center gap-2 text-primary hover:underline font-medium">
            Toutes les actualités
            <ChevronRight class="w-4 h-4" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="article in articles"
            :key="article.id"
            :to="`/actualites/${article.slug}`"
            class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift"
          >
           <div class=" h-[30vh] overflow-hidden">
            <div class="aspect-auto   overflow-hidden">
              <img

                :src="$store.state.articlecover+'/'+article.image"
                :alt="article.title"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            </div>
            <div class="p-5">
              <span class="text-xs font-medium text-primary">{{ article.category }}</span>
              <h3 class="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="text-sm text-muted-foreground mt-2 line-clamp-2">
                {{ article.excerpt }}
              </p>
              <p class="text-xs text-muted-foreground mt-4">
                {{ formatDate(article.created_at) }}
              </p>
            </div>
          </router-link>
        </div>

        <div class="mt-8 text-center md:hidden">
          <router-link to="/actualites">
            <button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center gap-2">
              Toutes les actualités
              <ChevronRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-6">
              Une maison d'édition engagée
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Les Éditions du Djembé d’Ébène sont nées en 2025 de la conviction de leur fondateur, Dr Nono Gaël Tanguy, qu’un nombre considérable de travaux d’envergure mémoires, thèses et essais universitaires sur l’éveil, le changement et la contribution sociétale demeurent trop souvent confinés aux étagères des bibliothèques et aux tiroirs de leurs auteur·rice·s. Frustré de voir ces recherches de haute qualité inaccessibles au public, il a décidé de créer une maison d’édition indépendante dont la vocation première est de faire éclore ces idées pertinentes. Rapidement, cette initiative s’est élargie pour accueillir non seulement des publications académiques, mais également des romans engagés, de la poésie militante et d’autres genres porteurs de sens
            </p>
            <p class="text-muted-foreground leading-relaxed mb-6">
              Nous croyons en la puissance des idées et en l'importance de les rendre
              accessibles au plus grand nombre. Chaque ouvrage que nous publions est le
              fruit d'un travail collaboratif rigoureux.
            </p>
            <router-link to="/a-propos">
              <button class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
                En savoir plus
                <ArrowRight class="w-4 h-4" />
              </button>
            </router-link>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="../../assets/images/img1.jpg"
              alt="Bibliothèque"
              class="rounded-lg shadow-lg"
            />
            <img
              src="../../assets/images/img2.jpg"
              alt="Livres"
              class="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-primary-foreground section-padding">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Vous avez un projet d'écriture ?
        </h2>
        <p class="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
          Nous sommes à votre écoute pour étudier votre manuscrit et vous accompagner
          dans sa publication.
        </p>
        <router-link to="/soumettre-mon-travail">
          <button class="group bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
            Soumettre votre œuvre
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { ArrowRight, BookOpen, GraduationCap, Newspaper, ChevronRight } from 'lucide-vue-next'

export default {
  name: 'HomePage',

  components: {
    ArrowRight,
    BookOpen,
    GraduationCap,
    Newspaper,
    ChevronRight
  },

  data() {
    return {
      // Données pour les statistiques

  }},

  computed:{

                stat(){
                return   [
          { value:this.$store.state.publicData.allBooks, label: "Ouvrages publiés" },
          { value: "200+", label: "Auteurs accompagnés" },
          { value:this.$store.state.publicData.allMemoirs, label: "Mémoires de recherche" },
          { value: "1", label: "Année d'expérience" },
        ];
                },
                stats(){
                return   [
        { value:"500",label: "Ouvrages publiés" },
        { value: "200+", label: "Auteurs accompagnés" },
        { value:"200", label: "Mémoires de recherche" },
        { value: "1", label: "Année d'expérience" },
      ];
                },
    // Utiliser les 3 premiers livres pour la section "Dernières Publications"
    latestBooks() {
      return this.$store.state.publicData.lastBooks
    },
    articles() {
      return this.$store.state.publicData.lastArticles
    },
    patternStyle() {
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }
    },

    // Utiliser les 2 premiers mémoires
    latestMemoirs() {
      return this.$store.state.publicData.lastMemoirs
    }
  },

  methods: {
    // Méthode pour formater les dates
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  },

  mounted() {
    console.log('Home page mounted')
  }
}
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Assurer que les images gardent leur aspect ratio */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* .aspect-[3/4] {
  aspect-ratio: 3 / 4;
} */
 p {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>

