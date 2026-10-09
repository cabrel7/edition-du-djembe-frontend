<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Vidéothèque</h1>
        <p class="text-xl text-primary-foreground/90 max-w-2xl">
          Découvrez nos vidéos : interviews d'auteurs, coulisses de l'édition 
          et événements de notre maison.
        </p>
      </div>
    </section>

    <!-- Videos Grid -->
    <section class="section-padding">
      <div class="container-custom">
        <!-- Filters -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button 
            @click="activeFilter = 'all'"
            :class="activeFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Toutes ({{ publishedVideos.length }})
          </button>
          <button 
            v-for="platform in availablePlatforms"
            :key="platform"
            @click="activeFilter = platform"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeFilter === platform 
                ? getPlatformButtonClass(platform, true)
                : getPlatformButtonClass(platform, false)
            ]"
          >
            {{ getPlatformLabel(platform) }} ({{ getPlatformCount(platform) }})
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(video, index) in filteredVideos"
            :key="video.id"
            class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift cursor-pointer"
            @click="selectVideo(video)"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="video.thumbnail ? ($store.state.videocover + '/' + video.thumbnail) : getDefaultThumbnail(video.video_url)"
                :alt="video.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play class="w-6 h-6 text-primary ml-1" />
                </div>
              </div>
              <!-- Platform Badge -->
              <div class="absolute top-3 left-3">
                <span :class="getPlatformBadgeClass(getVideoPlatform(video.video_url))" class="px-2 py-1 rounded text-xs font-medium">
                  {{ getPlatformLabel(getVideoPlatform(video.video_url)) }}
                </span>
              </div>
              <!-- Duration (si disponible) -->
              <div v-if="video.duration" class="absolute bottom-3 right-3 bg-foreground/80 text-primary-foreground px-2 py-1 rounded text-xs">
                {{ formatDuration(video.duration) }}
              </div>
            </div>
            <div class="p-5">
              <h2 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {{ video.title }}
              </h2>
              <p class="text-sm text-muted-foreground line-clamp-2 mb-3">
                {{ video.description }}
              </p>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Calendar class="w-3 h-3" />
                  {{ formatDate(video.created_at) }}
                </span>
                <span v-if="video.views !== undefined && video.views !== null" class="flex items-center gap-1">
                  <Eye class="w-3 h-3" />
                  {{ formatViews(video.views) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- No Videos Message -->
        <div v-if="filteredVideos.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 text-muted-foreground/50">
            <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <p class="text-lg text-muted-foreground">Aucune vidéo disponible pour ce filtre</p>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <div 
      v-if="selectedVideo"
      class="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="relative bg-card rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/50 text-primary-foreground flex items-center justify-center hover:bg-foreground/70 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
        
        <!-- Video Embed -->
        <div class="aspect-video bg-foreground">
          <div v-if="selectedVideo.status !== 1 && selectedVideo.status !== undefined" class="w-full h-full flex items-center justify-center">
            <div class="text-center text-primary-foreground p-8">
              <Lock class="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 class="text-xl font-semibold mb-2">Vidéo non disponible</h3>
              <p class="opacity-70">
                {{ selectedVideo.status === 0 ? "Cette vidéo est en cours de préparation." : "Cette vidéo est privée." }}
              </p>
            </div>
          </div>
          <div v-else class="w-full h-full">
            <!-- Video Player based on platform -->
            <div v-if="showIframeForPlatform(getVideoPlatform(selectedVideo.video_url))" class="w-full h-full">
              <iframe
                :src="getEmbedUrl(selectedVideo.video_url)"
                class="w-full h-full"
                frameborder="0"
                :allow="getIframePermissions(getVideoPlatform(selectedVideo.video_url))"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <div v-else class="w-full h-full flex flex-col items-center justify-center p-8">
              <ExternalLink class="w-16 h-16 mx-auto mb-4 opacity-50 text-primary-foreground" />
              <p class="text-lg mb-2 text-primary-foreground text-center">
                Cette plateforme ne permet pas l'embedding ou n'est pas supportée
              </p>
              <p class="text-sm text-primary-foreground/70 mb-6 text-center">
                Cliquez sur le bouton ci-dessous pour visionner la vidéo sur le site d'origine
              </p>
              <a 
                :href="selectedVideo.video_url" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
              >
                <ExternalLink class="w-4 h-4" />
                Ouvrir sur {{ getPlatformLabel(getVideoPlatform(selectedVideo.video_url)) }}
              </a>
            </div>
          </div>
        </div>
        
        <!-- Video Info -->
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-foreground mb-2">
                {{ selectedVideo.title }}
              </h2>
              <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Calendar class="w-4 h-4" />
                  {{ formatDate(selectedVideo.created_at, 'full') }}
                </span>
                <span :class="getPlatformBadgeClass(getVideoPlatform(selectedVideo.video_url))" class="px-2 py-1 rounded text-xs font-medium">
                  {{ getPlatformLabel(getVideoPlatform(selectedVideo.video_url)) }}
                </span>
                <span v-if="selectedVideo.duration" class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  {{ formatDuration(selectedVideo.duration) }}
                </span>
                <span v-if="selectedVideo.views !== undefined && selectedVideo.views !== null" class="flex items-center gap-1">
                  <Eye class="w-4 h-4" />
                  {{ formatViews(selectedVideo.views) }} vues
                </span>
              </div>
            </div>
            <a 
              :href="selectedVideo.video_url" 
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-primary hover:underline text-sm whitespace-nowrap"
            >
              <ExternalLink class="w-4 h-4" />
              Ouvrir sur {{ getPlatformLabel(getVideoPlatform(selectedVideo.video_url)) }}
            </a>
          </div>
          
          <p class="text-muted-foreground leading-relaxed mb-4">
            {{ selectedVideo.description }}
          </p>
          
          <!-- Additional Info -->
          <div v-if="selectedVideo.tags || selectedVideo.category" class="flex flex-wrap gap-2 mb-4">
            <span v-if="selectedVideo.category" class="px-2 py-1 bg-secondary text-muted-foreground rounded text-xs">
              {{ selectedVideo.category }}
            </span>
            <span 
              v-for="tag in getTagsArray(selectedVideo.tags)" 
              :key="tag"
              class="px-2 py-1 bg-secondary/50 text-muted-foreground rounded text-xs"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- Share Buttons -->
          <div class="flex flex-wrap gap-2 pt-4 border-t border-border">
            <button 
              @click="shareVideo('facebook')"
              class="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:opacity-90"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Partager
            </button>
            <button 
              @click="shareVideo('twitter')"
              class="flex items-center gap-2 px-3 py-2 bg-blue-400 text-white rounded-md text-sm hover:opacity-90"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            <button 
              @click="copyVideoLink"
              class="flex items-center gap-2 px-3 py-2 bg-secondary text-foreground rounded-md text-sm hover:opacity-90"
            >
              <Link class="w-4 h-4" />
              Copier le lien
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Play, Calendar, X, ExternalLink, Lock, Eye, Clock, Link } from 'lucide-vue-next'

export default {
  name: 'VideosPage',
  
  components: {
    Play,
    Calendar,
    X,
    ExternalLink,
    Lock,
    Eye,
    Clock,
    Link
  },
  
  data() {
    return {
      selectedVideo: null,
      activeFilter: 'all',
      videoPlatforms: {
        'youtube': {
          label: 'YouTube',
          color: 'red',
          domains: ['youtube.com', 'youtu.be'],
          embedSupport: true
        },
        'vimeo': {
          label: 'Vimeo',
          color: 'blue',
          domains: ['vimeo.com'],
          embedSupport: true
        },
        'dailymotion': {
          label: 'Dailymotion',
          color: 'blue',
          domains: ['dailymotion.com'],
          embedSupport: true
        },
        'facebook': {
          label: 'Facebook',
          color: 'blue',
          domains: ['facebook.com', 'fb.watch'],
          embedSupport: false
        },
        'tiktok': {
          label: 'TikTok',
          color: 'black',
          domains: ['tiktok.com'],
          embedSupport: false
        },
        'instagram': {
          label: 'Instagram',
          color: 'pink',
          domains: ['instagram.com'],
          embedSupport: false
        },
        'peertube': {
          label: 'PeerTube',
          color: 'purple',
          domains: ['peertube.tv', 'peertube.social'],
          embedSupport: true
        },
        'twitch': {
          label: 'Twitch',
          color: 'purple',
          domains: ['twitch.tv'],
          embedSupport: true
        },
        'ted': {
          label: 'TED',
          color: 'red',
          domains: ['ted.com'],
          embedSupport: true
        }
      }
    }
  },
  
  computed: {
    videos() {
      return this.$store.state.publicData.allVideos || [];
    },
    
    publishedVideos() {
      return this.videos.filter(video => video.status === 1 || video.status === undefined)
    },
    
    availablePlatforms() {
      const platforms = new Set()
      this.publishedVideos.forEach(video => {
        const platform = this.getVideoPlatform(video.video_url)
        if (platform !== 'other') {
          platforms.add(platform)
        }
      })
      return Array.from(platforms).sort()
    },
    
    filteredVideos() {
      let filtered = this.publishedVideos
      
      if (this.activeFilter !== 'all') {
        filtered = filtered.filter(video => 
          this.getVideoPlatform(video.video_url) === this.activeFilter
        )
      }
      
      return filtered
    }
  },
  
  methods: {
    formatDate(dateString, format = 'short') {
      if (!dateString) return 'Date inconnue'
      const date = new Date(dateString)
      const options = format === 'full' 
        ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
        : { day: 'numeric', month: 'long', year: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    },
    
    formatDuration(seconds) {
      if (!seconds) return '--:--'
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    
    formatViews(views) {
      if (!views) return '0'
      if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`
      } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`
      }
      return views.toString()
    },
    
    getTagsArray(tags) {
      if (!tags) return []
      if (Array.isArray(tags)) return tags
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    },
    
    getVideoPlatform(url) {
      if (!url) return 'other'
      
      const cleanUrl = url.toLowerCase()
      
      for (const [platform, config] of Object.entries(this.videoPlatforms)) {
        for (const domain of config.domains) {
          if (cleanUrl.includes(domain)) {
            return platform
          }
        }
      }
      
      return 'other'
    },
    
    getPlatformLabel(platform) {
      return this.videoPlatforms[platform]?.label || platform.charAt(0).toUpperCase() + platform.slice(1)
    },
    
    getPlatformCount(platform) {
      return this.publishedVideos.filter(video => 
        this.getVideoPlatform(video.video_url) === platform
      ).length
    },
    
    getPlatformBadgeClass(platform) {
      const platformConfig = this.videoPlatforms[platform]
      if (platformConfig) {
        return `bg-${platformConfig.color}-500/10 text-${platformConfig.color}-600`
      }
      return 'bg-gray-500/10 text-gray-600'
    },
    
    getPlatformButtonClass(platform, isActive) {
      const platformConfig = this.videoPlatforms[platform]
      if (isActive && platformConfig) {
        return `bg-${platformConfig.color}-600 text-white`
      } else if (platformConfig) {
        return `bg-${platformConfig.color}-100 text-${platformConfig.color}-800 hover:bg-${platformConfig.color}-200`
      }
      return isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
    },
    
    showIframeForPlatform(platform) {
      return this.videoPlatforms[platform]?.embedSupport || false
    },
    
    getEmbedUrl(url) {
      if (!url) return ''
      
      const platform = this.getVideoPlatform(url)
      
      switch (platform) {
        case 'youtube':
          return this.getYouTubeEmbedUrl(url)
        case 'vimeo':
          return this.getVimeoEmbedUrl(url)
        case 'dailymotion':
          return this.getDailymotionEmbedUrl(url)
        case 'peertube':
          return this.getPeerTubeEmbedUrl(url)
        case 'twitch':
          return this.getTwitchEmbedUrl(url)
        case 'ted':
          return this.getTedEmbedUrl(url)
        default:
          return url
      }
    },
    
    isValidYouTubeUrl(url) {
      if (!url) return false
      const patterns = [
        /^(https?:\/\/)?(www\.|m\.)?youtube\.com\/watch\?v=[\w-]{11}/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
        /^(https?:\/\/)?youtu\.be\/[\w-]{11}/,
        /^(https?:\/\/)?(www\.|m\.)?youtube\.com\/shorts\/[\w-]{11}/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/live\/[\w-]{11}/
      ]
      
      return patterns.some(pattern => pattern.test(url))
    },
    
    getYouTubeEmbedUrl(url) {
      if (!url) return ''
      
      // Remplacer la version mobile par la version desktop
      let cleanUrl = url.replace('m.youtube.com', 'www.youtube.com')
      
      // Valider l'URL
      if (!this.isValidYouTubeUrl(cleanUrl)) {
        console.warn('URL YouTube invalide:', url)
        return url
      }
      
      // Extraire l'ID avec une regex plus robuste
      let videoId = null
      
      // Pattern pour les URLs courtes
      const shortPattern = /youtu\.be\/([\w-]{11})/
      // Pattern pour les URLs longues
      const longPattern = /youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)([\w-]{11})/
      // Pattern pour le paramètre v
      const paramPattern = /[?&]v=([\w-]{11})/
      
      const shortMatch = cleanUrl.match(shortPattern)
      const longMatch = cleanUrl.match(longPattern)
      const paramMatch = cleanUrl.match(paramPattern)
      
      videoId = shortMatch?.[1] || longMatch?.[1] || paramMatch?.[1]
      
      if (!videoId) {
        console.warn('Impossible d\'extraire l\'ID de la vidéo YouTube:', url)
        return url
      }
      
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    },
    
    getVimeoEmbedUrl(url) {
      if (!url) return url
      const videoId = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/)
      return videoId ? `https://player.vimeo.com/video/${videoId[1]}?autoplay=1&title=0&byline=0&portrait=0` : url
    },
    
    getDailymotionEmbedUrl(url) {
      if (!url) return url
      const videoId = url.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([^_]+)/)
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId[1]}?autoplay=1` : url
    },
    
    getPeerTubeEmbedUrl(url) {
      if (!url) return url
      // Format attendu: https://peertube.instance/videos/watch/video-id
      const videoId = url.match(/\/videos\/watch\/([^\/?]+)/)
      if (videoId) {
        const instance = url.match(/https?:\/\/([^\/]+)/)
        if (instance) {
          return `https://${instance[1]}/videos/embed/${videoId[1]}`
        }
      }
      return url
    },
    
    getTwitchEmbedUrl(url) {
      if (!url) return url
      // Support pour les vidéos et les streams
      const videoMatch = url.match(/twitch\.tv\/videos\/(\d+)/)
      if (videoMatch) {
        return `https://player.twitch.tv/?video=${videoMatch[1]}&parent=${window.location.hostname}&autoplay=true`
      }
      
      const channelMatch = url.match(/twitch\.tv\/([^\/?]+)/)
      if (channelMatch) {
        return `https://player.twitch.tv/?channel=${channelMatch[1]}&parent=${window.location.hostname}&autoplay=true`
      }
      
      return url
    },
    
    getTedEmbedUrl(url) {
      if (!url) return url
      const videoId = url.match(/ted\.com\/talks\/([^\/?]+)/)
      return videoId ? `https://embed.ted.com/talks/${videoId[1]}` : url
    },
    
    getIframePermissions(platform) {
      const basePermissions = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      
      switch (platform) {
        case 'vimeo':
          return basePermissions + "; fullscreen"
        case 'twitch':
          return basePermissions + "; fullscreen"
        default:
          return basePermissions
      }
    },
    
    getDefaultThumbnail(url) {
      const platform = this.getVideoPlatform(url)
      
      switch (platform) {
        case 'youtube':
          return 'https://img.youtube.com/vi/default/maxresdefault.jpg'
        case 'vimeo':
          return 'https://vimeo.com/favicon.ico'
        case 'dailymotion':
          return 'https://static1.dmcdn.net/images/dailymotion-logo-ogtag.png.v628cf935825b3b76'
        case 'facebook':
          return 'https://facebook.com/favicon.ico'
        case 'tiktok':
          return 'https://tiktok.com/favicon.ico'
        case 'instagram':
          return 'https://instagram.com/favicon.ico'
        case 'peertube':
          return 'https://joinpeertube.org/favicon.ico'
        case 'twitch':
          return 'https://twitch.tv/favicon.ico'
        case 'ted':
          return 'https://ted.com/favicon.ico'
        default:
          return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMTAgNkw2IDMuMzMzMzNWMTIuNjY2N0wxMCAxMFYxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
      }
    },
    
    selectVideo(video) {
      this.selectedVideo = video
      document.body.style.overflow = 'hidden'
    },
    
    closeModal() {
      this.selectedVideo = null
      document.body.style.overflow = 'auto'
    },
    
    shareVideo(platform) {
      if (!this.selectedVideo) return
      
      const url = encodeURIComponent(window.location.origin + window.location.pathname + '?video=' + this.selectedVideo.id)
      const text = encodeURIComponent(`Regardez "${this.selectedVideo.title}"`)
      
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
          break
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
          break
      }
    },
    
    async copyVideoLink() {
      if (!this.selectedVideo) return
      
      const url = window.location.origin + window.location.pathname + '?video=' + this.selectedVideo.id
      
      try {
        await navigator.clipboard.writeText(url)
        alert('Lien copié dans le presse-papier !')
      } catch (err) {
        console.error('Erreur lors de la copie:', err)
        // Fallback pour les anciens navigateurs
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Lien copié dans le presse-papier !')
      }
    }
  },
  
  mounted() {
    console.log('Videos page mounted')
    // Vérifier si un paramètre video est présent dans l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const videoId = urlParams.get('video')
    
    if (videoId) {
      const video = this.videos.find(v => v.id == videoId)
      if (video) {
        setTimeout(() => this.selectVideo(video), 500)
      }
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>