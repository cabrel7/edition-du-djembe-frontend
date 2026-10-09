<template>
  <div class="animate-fade-in">
    <!-- Article not found -->
    <div v-if="!article" class="container-custom section-padding text-center">
      <h1 class="text-2xl font-bold text-foreground mb-4">Article non trouvé</h1>
      <router-link to="/actualites">
        <button
          class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Retour aux actualités
        </button>
      </router-link>
    </div>

    <!-- Article found -->
    <div v-else>
      <!-- Breadcrumb -->
      <div class="bg-secondary py-4">
        <div class="container-custom">
          <div class="flex items-center gap-2 text-sm">
            <router-link to="/actualites" class="text-muted-foreground hover:text-primary">
              Actualités
            </router-link>
            <span class="text-muted-foreground">/</span>
            <span class="text-foreground line-clamp-1">{{ article.title }}</span>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <article class="section-padding">
        <div class="container-custom">
          <div class="max-w-3xl mx-auto">
            <!-- Header avec statut et featured -->
            <header class="mb-8">
              <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                <!-- <div class="flex items-center gap-3">
                  <span class="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {{ article.category }}
                  </span>
                  <span v-if="article.featured" class="inline-block text-xs font-medium bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded">
                    <Star class="w-3 h-3 inline mr-1" />
                    En vedette
                  </span>
                  <span v-if="article.status === 0" class="inline-block text-xs font-medium bg-gray-500/10 text-gray-600 px-2 py-1 rounded">
                    Brouillon
                  </span>
                  <span v-if="article.status === 1" class="inline-block text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">
                    Publié
                  </span>
                  <span v-if="article.status === 2" class="inline-block text-xs font-medium bg-blue-500/10 text-blue-600 px-2 py-1 rounded">
                    Archivé
                  </span>
                </div> -->

                <!-- Temps de lecture et vues -->
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ article.reading_time || 5 }} min
                  </span>
                  <span class="flex items-center gap-1">
                    <Eye class="w-4 h-4" />
                    {{ article.views_count }} vue{{ article.views_count !== 1 ? 's' : '' }}
                  </span>
                </div>
              </div>

              <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {{ article.title }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span class="flex items-center gap-2">
                  <User class="w-4 h-4" />
                  les editions du djembe d'ebene
                </span>
                <span class="flex items-center gap-2">
                  <Calendar class="w-4 h-4" />
                  {{ formatDate(article.published_date || article.publishedDate) }}
                </span>
                <!-- Document attaché -->
                <a v-if="article.document" :href="article.document" target="_blank"
                  class="flex items-center gap-2 text-primary hover:underline">
                  <FileText class="w-4 h-4" />
                  Document attaché
                </a>
              </div>
            </header>

            <!-- Tags -->
            <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in article.tags" :key="tag"
                class="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full">
                {{ tag }}
              </span>
            </div>

           
                <div class="flex justify-center   w-full overflow-hidden ">

                  <div v-if="article.image" class="aspect-auto  h-[55vh] md:h-[60vh] lg:h-[70vh]  rounded-lg  ">

                    <img :src="article.image" :alt="article.title"
                      class="w-full h-full object-cover" />
                  </div>
                </div>
             

            <!-- Content -->
            <div class="prose prose-gray max-w-none">
              <p class="text-lg text-foreground leading-relaxed mb-6">
                {{ article.excerpt }}
              </p>
              <p>{{ article.content }}</p>
              <!-- <div v-html="article.content" class="article-content"></div> -->
            </div>

            <!-- Share -->
            <div class="mt-12 pt-8 border-t border-border">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-foreground">Partager cet article</p>
                <div class="flex gap-2">
                  <button @click="shareOnFacebook"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 rounded-md inline-flex items-center justify-center">
                    <Facebook class="w-4 h-4" />
                  </button>
                  <button @click="shareOnTwitter"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 rounded-md inline-flex items-center justify-center">
                    <Twitter class="w-4 h-4" />
                  </button>
                  <button @click="shareOnLinkedin"
                    class="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-10 h-10 rounded-md inline-flex items-center justify-center">
                    <Linkedin class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Articles -->
      <section class="section-padding bg-secondary">
        <div class="container-custom">
          <h2 class="text-2xl font-bold text-foreground mb-8">Articles similaires</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link v-for="relatedArticle in relatedArticles" :key="relatedArticle.id"
              :to="`/actualites/${relatedArticle.slug.trim()}`"
              class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift">
              <div class=" h-[35vh] overflow-hidden">
            <div class="aspect-auto  overflow-hidden">
                <img :src=" relatedArticle.image" :alt="relatedArticle.title"
                  class="w-full object-center h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              </div>
              <div class="p-4">
                <span class="text-xs font-medium text-primary">{{ relatedArticle.category }}</span>
                <h3
                  class="text-base font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                  {{ relatedArticle.title }}
                </h3>
                <div class="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{{ formatDateShort(relatedArticle.published_date) }}</span>
                  <span>{{ relatedArticle.views_count }} vues</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin,
  Eye, Clock, Star, FileText
} from 'lucide-vue-next'

export default {
  name: 'ArticleDetailPage',

  components: {
    ArrowLeft,
    Calendar,
    User,
    Facebook,
    Twitter,
    Linkedin,
    Eye,
    Clock,
    Star,
    FileText
  },

  data() {
    return {
      // Mock data - Articles avec le nouveau format

    }
  },

  computed: {
    articleId() {
      return this.$route.params.id
    },

    article() {
      // Cherche par ID ou slug
      return this.$store.state.publicData.allArticles.find(a =>
        a.slug.trim() === this.articleId.trim()
      )
    },
    articles() {
      // Cherche par ID ou slug
      return this.$store.state.publicData.allArticles
    },

    relatedArticles() {
      if (!this.article) return []

      return this.articles
        .filter(a => a.id !== this.article.id && a.status === 1)
        .slice(0, 3)
    }
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Non publié'
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    formatDateShort(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    },

    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(`Lisez "${this.article.title}" sur Éditions Savoir`)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
    },

    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(`"${this.article.title}" - Éditions Savoir`)
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    },

    shareOnLinkedin() {
      const url = encodeURIComponent(window.location.href)
      const title = encodeURIComponent(this.article.title)
      const summary = encodeURIComponent(this.article.excerpt)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank')
    }
  },

  mounted() {
    console.log('Article detail page mounted, ID:', this.articleId)
    // Incrémenter le compteur de vues
    if (this.article) {
      // Simuler l'incrémentation
      try {
        this.axios.post(this.$store.state.localhost + 'updatearticleview', { id: this.article.id })
        this.article.views_count++
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
/* ... styles existants ... */
p {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.article-content>>>p {
  margin-bottom: 1rem;
  line-height: 1.7;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.article-content>>>h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content>>>h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
</style>