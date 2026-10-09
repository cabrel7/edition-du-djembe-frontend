<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="relative min-h-[60vh] flex items-center">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
        loading="lazy"
          :src="$store.state.presse+pressReview.cover_image" 
          :alt="pressReview.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/30"></div>
      </div>

      <!-- Content -->
      <div class="relative container-custom text-primary-foreground py-20">
        <div class="max-w-3xl">
          <!-- Category Badge -->
          <div class="flex gap-3 mb-4">
            <span :class="getCategoryBadgeClass(pressReview.category)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ pressReview.category_label }}
            </span>
            <span v-if="pressReview.is_featured" class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
              À la une
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {{ pressReview.title }}
          </h1>

          <!-- Subtitle -->
          <p v-if="pressReview.subtitle" class="text-xl text-primary-foreground/90 mb-6">
            {{ pressReview.subtitle }}
          </p>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User class="w-5 h-5" />
              </div>
              <div>
                <p class="font-medium">{{ pressReview.author || 'Rédaction' }}</p>
                <p class="text-primary-foreground/70 text-xs">Auteur</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Calendar class="w-5 h-5" />
              <span>Publié le {{ formatDate(pressReview.published_at) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Clock class="w-5 h-5" />
              <span>{{ pressReview.reading_time }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Eye class="w-5 h-5" />
              <span>{{ formatViews(pressReview.views) }} vues</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Main Content Column -->
          <div class="lg:col-span-3">
            <!-- Source Info -->
            <div v-if="pressReview.source || pressReview.publication_date" class="bg-secondary/30 rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
              <div class="flex items-center gap-2">
                <Newspaper class="w-5 h-5 text-muted-foreground" />
                <span class="text-foreground font-medium">{{ pressReview.source || 'Source inconnue' }}</span>
                <span v-if="pressReview.publication_date" class="text-muted-foreground text-sm">
                  ({{ formatOriginalDate(pressReview.publication_date) }})
                </span>
              </div>
              <a 
                v-if="pressReview.source_url"
                :href="pressReview.source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <ExternalLink class="w-4 h-4" />
                Voir l'article original
              </a>
            </div>

            <!-- Summary -->
            <div v-if="pressReview.summary" class="text-lg text-foreground/80 sum mb-8 italic border-l-4 border-primary pl-4">
              {{ pressReview.summary }}
            </div>

            <!-- Content -->
            <div class="prose prose-lg max-w-none" v-html="pressReview.content"></div>

            <!-- Tags -->
            <div v-if="pressReview.tags && pressReview.tags.length" class="mt-12 pt-8 border-t border-border">
              <h3 class="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="tag in pressReview.tags"
                  :key="tag"
                  :to="{ name: 'press-reviews', query: { tag } }"
                  class="px-3 py-1.5 bg-secondary/50 text-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{{ tag }}
                </router-link>
              </div>
            </div>

            <!-- Media Attachments -->
            <div v-if="hasMedia" class="mt-12 pt-8 border-t border-border">
              <h3 class="text-lg font-semibold text-foreground mb-6">Médias associés</h3>
              
              <!-- Video -->
              <div v-if="pressReview.video_url" class="mb-8">
                <h4 class="font-medium text-foreground mb-3">Vidéo</h4>
                <div class="aspect-video bg-foreground rounded-lg overflow-hidden">
                  <div v-if="isYouTubeVideo(pressReview.video_url)" class="w-full h-full">
                    <iframe
                    loading="lazy"
                      :src="getYouTubeEmbedUrl(pressReview.video_url)"
                      class="w-full h-full"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div v-else-if="isVimeoVideo(pressReview.video_url)" class="w-full h-full">
                    <iframe
                    loading="lazy"
                      :src="getVimeoEmbedUrl(pressReview.video_url)"
                      class="w-full h-full"
                      frameborder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div v-else class="w-full h-full flex items-center justify-center bg-secondary">
                    <a 
                      :href="pressReview.video_url"
                      target="_blank"
                      class="flex items-center gap-2 text-primary"
                    >
                      <ExternalLink class="w-5 h-5" />
                      Voir la vidéo
                    </a>
                  </div>
                </div>
              </div>

              <!-- Audio -->
              <div v-if="pressReview.audio_url" class="mb-8">
                <h4 class="font-medium text-foreground mb-3">Audio</h4>
                <audio controls class="w-full">
                  <source :src="pressReview.audio_url" type="audio/mpeg">
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
              </div>

              <!-- Gallery -->
              <div v-if="pressReview.gallery_images && pressReview.gallery_images.length" class="mb-8">
                <h4 class="font-medium text-foreground mb-3">Galerie d'images</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div 
                    v-for="(image, index) in pressReview.gallery_images" 
                    :key="index"
                    class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    @click="openGallery(index)"
                  >
                    <img loading="lazy" :src="$store.state.presse+image" alt="" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <!-- Documents -->
              <div v-if="pressReview.documents && pressReview.documents.length">
                <h4 class="font-medium text-foreground mb-3">Documents</h4>
                <div class="space-y-2">
                  <div 
                    v-for="(doc, index) in pressReview.documents" 
                    :key="index"
                    class="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div class="flex items-center gap-3">
                      <FileText class="w-5 h-5 text-primary" />
                      <div>
                        <p class="font-medium">{{ doc.name }}</p>
                        <p class="text-xs text-muted-foreground">{{ formatFileSize(doc.size) }}</p>
                      </div>
                    </div>
                    <a 
                      :href="doc.path"
                      download
                      class="text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      <Download class="w-4 h-4" />
                      Télécharger
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="mt-12 pt-8 border-t border-border">
              <h3 class="text-lg font-semibold text-foreground mb-4">Partager</h3>
              <div class="flex flex-wrap gap-3">
                <button 
                  @click="shareOnFacebook"
                  class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Facebook class="w-4 h-4" />
                  Facebook
                </button>
                <button 
                  @click="shareOnTwitter"
                  class="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Twitter class="w-4 h-4" />
                  Twitter
                </button>
                <button 
                  @click="shareOnLinkedin"
                  class="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Linkedin class="w-4 h-4" />
                  LinkedIn
                </button>
                <button 
                  @click="copyLink"
                  class="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Link class="w-4 h-4" />
                  Copier le lien
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Author Info -->
            <div class="bg-card rounded-xl p-6 card-shadow mb-6">
              <h3 class="font-semibold text-foreground mb-4">À propos de l'auteur</h3>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-medium">{{ pressReview.author || 'Rédaction' }}</p>
                  <p class="text-sm text-muted-foreground">Journaliste</p>
                </div>
              </div>
            </div>

            <!-- Source Info Card -->
            <div v-if="pressReview.source" class="bg-card rounded-xl p-6 card-shadow mb-6">
              <h3 class="font-semibold text-foreground mb-4">Source</h3>
              <div class="space-y-2">
                <p class="font-medium">{{ pressReview.source }}</p>
                <p v-if="pressReview.publication_date" class="text-sm text-muted-foreground">
                  Publié le {{ formatOriginalDate(pressReview.publication_date) }}
                </p>
                <a 
                  v-if="pressReview.source_url"
                  :href="pressReview.source_url"
                  target="_blank"
                  class="text-primary hover:underline text-sm inline-flex items-center gap-1"
                >
                  <ExternalLink class="w-3 h-3" />
                  Voir l'original
                </a>
              </div>
            </div>

            <!-- Suggestions -->
            <div v-if="suggestions.length" class="bg-card rounded-xl p-6 card-shadow">
              <h3 class="font-semibold text-foreground mb-4">À lire aussi</h3>
              <div class="space-y-4">
                <div 
                  v-for="suggestion in suggestions" 
                  :key="suggestion.id"
                  class="group cursor-pointer"
                  @click="goToDetail(suggestion.slug)"
                >
                  <div class="aspect-video rounded-lg overflow-hidden mb-2">
                    <img  loading="lazy"
                      :src="$store.state.presse+suggestion.cover_image || '/images/default-press-review.jpg'" 
                      :alt="suggestion.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 class="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {{ suggestion.title }}
                  </h4>
                  <p class="text-xs text-muted-foreground mt-1">
                    {{ formatDate(suggestion.published_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <div 
      v-if="galleryOpen"
      class="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
      @click="closeGallery"
    >
      <div class="relative max-w-5xl w-full" @click.stop>
        <button
          @click="closeGallery"
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-primary-foreground/20 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/40 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="relative">
          <img  loading="lazy"
            :src="$store.state.presse+pressReview.gallery_images[galleryCurrentIndex]" 
            alt=""
            class="w-full h-auto rounded-lg"
          />

          <button
            v-if="galleryCurrentIndex > 0"
            @click="galleryPrev"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/20 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/40 transition-colors"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <button
            v-if="galleryCurrentIndex < pressReview.gallery_images.length - 1"
            @click="galleryNext"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/20 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/40 transition-colors"
          >
            <ChevronRight class="w-5 h-5" />
          </button>

          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <span 
              v-for="(_, index) in pressReview.gallery_images" 
              :key="index"
              :class="[
                'w-2 h-2 rounded-full transition-colors',
                index === galleryCurrentIndex ? 'bg-primary' : 'bg-primary-foreground/50'
              ]"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  User, Calendar, Clock, Eye, ExternalLink, FileText, Download,
  Facebook, Twitter, Linkedin, Link, X, ChevronLeft, ChevronRight,
  Newspaper
} from 'lucide-vue-next'

export default {
  name: 'PressReviewDetailPage',

  components: {
    User,
    Calendar,
    Clock,
    Eye,
    ExternalLink,
    FileText,
    Download,
    Facebook,
    Twitter,
    Linkedin,
    Link,
    X,
    ChevronLeft,
    ChevronRight,
    Newspaper
  },

  data() {
    return {
      pressReview: {},
      suggestions: [],
      galleryOpen: false,
      galleryCurrentIndex: 0
    }
  },

  mounted() {
    this.loadPressReview()
  },

  watch: {
    '$route.params.slug': {
      handler() {
        this.loadPressReview()
      },
      immediate: true
    }
  },

  computed: {
    hasMedia() {
      return this.pressReview.video_url || 
             this.pressReview.audio_url || 
             (this.pressReview.gallery_images && this.pressReview.gallery_images.length) ||
             (this.pressReview.documents && this.pressReview.documents.length)
    }
  },

  methods: {
    async loadPressReview() {
      try {
        const slug = this.$route.params.slug
        const response = await this.$store.dispatch('fetchPressReview', slug)
        this.pressReview = response.data.press_review
        this.suggestions = response.data.suggestions || []

        // Mettre à jour le titre de la page
        document.title = `${this.pressReview.title} - Cahiers du Djembé`

      } catch (error) {
        console.error('Erreur chargement:', error)
        if (error.response?.status === 404) {
          this.$router.push('/cahiers-du-djembe')
        }
      }
    },

    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    },

    formatOriginalDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    },

    formatViews(views) {
      if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
      if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
      return views
    },

    formatFileSize(bytes) {
      if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GB`
      if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`
      if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`
      return bytes + ' bytes'
    },

    getCategoryBadgeClass(category) {
      const classes = {
        interview: 'bg-purple-500/10 text-purple-600',
        critique: 'bg-blue-500/10 text-blue-600',
        reportage: 'bg-green-500/10 text-green-600',
        article: 'bg-orange-500/10 text-orange-600',
        autre: 'bg-gray-500/10 text-gray-600'
      }
      return classes[category] || 'bg-gray-500/10 text-gray-600'
    },

    isYouTubeVideo(url) {
      return url.includes('youtube.com') || url.includes('youtu.be')
    },

    isVimeoVideo(url) {
      return url.includes('vimeo.com')
    },

    getYouTubeEmbedUrl(url) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
      return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
    },

    getVimeoEmbedUrl(url) {
      const videoId = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/)
      return videoId ? `https://player.vimeo.com/video/${videoId[1]}` : url
    },

    goToDetail(slug) {
      this.$router.push({ name: 'press-review-detail', params: { slug } })
    },

    // Gallery
    openGallery(index) {
      this.galleryCurrentIndex = index
      this.galleryOpen = true
      document.body.style.overflow = 'hidden'
    },

    closeGallery() {
      this.galleryOpen = false
      document.body.style.overflow = 'auto'
    },

    galleryPrev() {
      if (this.galleryCurrentIndex > 0) {
        this.galleryCurrentIndex--
      }
    },

    galleryNext() {
      if (this.galleryCurrentIndex < this.pressReview.gallery_images.length - 1) {
        this.galleryCurrentIndex++
      }
    },

    // Partage
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    },

    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(this.pressReview.title)
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    },

    shareOnLinkedin() {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Lien copié dans le presse-papier !')
      } catch (err) {
        console.error('Erreur copie:', err)
      }
    }
  },

  beforeDestroy() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

.prose {
   white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  line-height: 1.8;
  color: hsl(var(--foreground));
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: hsl(var(--foreground));
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: hsl(var(--foreground));
}

.prose ul, .prose ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}

.prose blockquote {
  border-left: 4px solid hsl(var(--primary));
  padding-left: 1.5rem;
  font-style: italic;
  margin: 1.5rem 0;
  color: hsl(var(--muted-foreground));
}

.prose img {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.prose a {
  color: hsl(var(--primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose a:hover {
  opacity: 0.9;
}
p,h,h1,h2,h3 {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.sum{
   white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  line-height: 1.8;}
</style>
