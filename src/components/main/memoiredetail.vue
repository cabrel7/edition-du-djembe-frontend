<template>
  <div class="animate-fade-in">
    <!-- Memoir not found -->
    <div v-if="!memoir" class="container-custom section-padding text-center">
      <h1 class="text-2xl font-bold text-foreground mb-4">Mémoire non trouvé</h1>
      <router-link to="/memoires">
        <button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Retour aux mémoires
        </button>
      </router-link>
    </div>

    <!-- Memoir found -->
    <div v-else>
      <!-- Breadcrumb -->
      <div class="bg-secondary py-4">
        <div class="container-custom">
          <div class="flex items-center gap-2 text-sm">
            <router-link to="/memoires" class="text-muted-foreground hover:text-primary">
              Mémoires
            </router-link>
            <span class="text-muted-foreground">/</span>
            <span class="text-foreground line-clamp-1">{{ memoir.title }}</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <!-- Header with Status -->
            <div class="flex items-start gap-6 mb-8">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap class="w-10 h-10 text-primary" />
                </div>
              </div>
              <div class="flex-1">
                <!-- Status Badge -->
                <div class="flex items-center gap-3 mb-3">
                  <span class="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {{ getDomainName(memoir.domain) }}
                  </span>
                  <span v-if="memoir.status === 0" class="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded">
                    En attente
                  </span>
                  <span v-if="memoir.status === 1" class="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded">
                    Approuvé
                  </span>
                  <span v-if="memoir.status === 2" class="text-xs px-2 py-1 bg-red-500/10 text-red-600 rounded">
                    Rejeté
                  </span>
                  <span v-if="memoir.grade" class="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded">
                    {{ memoir.grade }}
                  </span>
                </div>
                
                <h1 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {{ memoir.title }}
                </h1>
                <p class="text-lg text-muted-foreground">
                  par <span class="font-medium text-foreground">{{ memoir.author_name || `Étudiant #${memoir.author}` }}</span>
                </p>
              </div>
            </div>

            <!-- Stats -->
            <!-- <div class="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
              <span class="flex items-center gap-2">
                <Eye class="w-4 h-4" />
                {{ memoir.views_count }} vue{{ memoir.views_count !== 1 ? 's' : '' }}
              </span>
              <span class="flex items-center gap-2">
                <Download class="w-4 h-4" />
                {{ memoir.downloads_count }} téléchargement{{ memoir.downloads_count !== 1 ? 's' : '' }}
              </span>
              <span v-if="memoir.extension" class="flex items-center gap-2">
                <File class="w-4 h-4" />
                {{ memoir.extension.toUpperCase() }}
              </span>
            </div> -->

            <!-- Info Grid -->
          
<div class="flex flex-wrap justify-center gap-2">
   <!-- Cover Image -->
    <div class="lg:w-[62%] md:w-[68%]  sm:w-full h-[70vh] flex justify-center">
            <div v-if="memoir.cover" class="aspect-auto  rounded-lg overflow-hidden mb-8">
              <img
                :src="memoir.cover"
                :alt="memoir.title"
                class="w-full h-full object-cover"
              />
            </div>
            </div>
    <div class="grid  md:w-[30%] lg:w-[35%]  grid-cols-1  gap-4 mb-8">
              <div class="bg-secondary rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Université</p>
                    <p class="text-sm font-medium text-foreground">{{ memoir.university }}</p>
                  </div>
                </div>
              </div>
              <div class="bg-secondary rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Année</p>
                    <p class="text-sm font-medium text-foreground">{{ memoir.year }}</p>
                    <p v-if="memoir.defense_date" class="text-xs text-muted-foreground mt-1">
                      Soutenance: {{ formatDate(memoir.defense_date) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-secondary rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Directeur</p>
                    <p class="text-sm font-medium text-foreground">{{ memoir.supervisor || 'Non spécifié' }}</p>
                  </div>
                </div>
              </div>
            </div>
</div>
           

            <!-- Download CTA -->
            <div class="bg-primary rounded-lg p-6 mb-8">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-center sm:text-left">
                  <h2 class="text-xl font-semibold text-primary-foreground">
                    Télécharger ce mémoire
                  </h2>
                  <p class="text-primary-foreground/80 text-sm mt-1">
                    Format {{ memoir.extension ? memoir.extension.toUpperCase() : 'PDF' }} • Téléchargement gratuit
                  </p>
                </div>
                <button 
                  @click="downloadMemoir(memoir.id)"
                  :disabled="memoir.status !== 1"
                  :class="memoir.status !== 1 ? 'opacity-50 cursor-not-allowed' : ''"
                  class="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
                >
                  <Download class="w-4 h-4" />
                  {{ memoir.status === 1 ? 'Télécharger' : 'Non disponible' }}
                </button>
              </div>
            </div>

            <!-- Abstract -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-foreground mb-4">Résumé</h2>
              <div class="bg-card rounded-lg p-6 card-shadow">
                <p class="text-muted-foreground leading-relaxed">
                  {{ memoir.abstract }}
                </p>
              </div>
            </div>

            <!-- Keywords -->
            <div v-if="memoir.keywords && memoir.keywords.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-foreground mb-4">Mots-clés</h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="keyword in memoir.keywords"
                  :key="keyword"
                  class="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>

            <!-- Author Info -->
            <div class="border-t border-border pt-8">
              <h2 class="text-xl font-semibold text-foreground mb-4">À propos de l'auteur</h2>
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                  {{ getAuthorInitials(memoir.author_name || `Étudiant ${memoir.author}`) }}
                </div>
                <div>
                  <p class="font-semibold text-foreground">{{ memoir.author_name || `Étudiant #${memoir.author}` }}</p>
                  <p class="text-sm text-muted-foreground">{{ memoir.university }}</p>
                  <p class="text-sm text-muted-foreground mt-2">
                    Mémoire réalisé dans le cadre des études en {{ getDomainName(memoir.domain).toLowerCase() }}, 
                    {{ memoir.supervisor ? `sous la direction de ${memoir.supervisor}` : '' }}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Memoirs -->
      <section v-if="relatedMemoirs.length > 0" class="section-padding bg-secondary">
        <div class="container-custom">
          <h2 class="text-2xl font-bold text-foreground mb-8">Mémoires similaires</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <router-link
              v-for="relatedMemoir in relatedMemoirs"
              :key="relatedMemoir.id"
              :to="`/memoires/${relatedMemoir.slug}`"
              class="group bg-card rounded-lg p-6 card-shadow hover-lift"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap class="w-6 h-6 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-medium text-primary">{{ getDomainName(relatedMemoir.domain) }}</span>
                    <span v-if="relatedMemoir.status === 1" class="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-600 rounded">
                      ✓
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {{ relatedMemoir.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground truncate mt-1">
                    {{ relatedMemoir.author_name || `Étudiant #${relatedMemoir.author}` }} • {{ relatedMemoir.year }}
                  </p>
                  <!-- <div class="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{{ relatedMemoir.views_count }} vues</span>
                    <span>{{ relatedMemoir.downloads_count }} dl</span>
                  </div> -->
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
  
import axios from 'axios';
import { 
  ArrowLeft, Download, GraduationCap, Calendar, Building, 
  BookOpen, Eye, File, User
} from 'lucide-vue-next'

export default {
  name: 'MemoirDetailPage',
  
  components: {
    ArrowLeft,
    Download,
    GraduationCap,
    Calendar,
    Building,
    BookOpen,
    Eye,
    File,
    User
  },
  
  data() {
    return {
      // Mock data avec le nouveau format
      // memoirs: [
      //   {
      //     id: 1,
      //     title: "L'Impact des Politiques Économiques sur le Développement Régional",
      //     author: 1,
      //     author_name: "Thomas Dubois",
      //     university: "Université Paris 1 Panthéon-Sorbonne",
      //     domain: 1,
      //     year: 2023,
      //     abstract: "Cette étude analyse l'impact des politiques économiques sur le développement régional en France, en se basant sur des données récentes et des modèles économétriques avancés.",
      //     cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
      //     extension: "pdf",
      //     keywords: ["économie", "développement régional", "politiques publiques", "analyse économique"],
      //     supervisor: "Prof. Marie Laurent",
      //     defense_date: "2023-06-15",
      //     grade: "Mention Très Bien",
      //     views_count: 1245,
      //     downloads_count: 328,
      //     status: 1,
      //     created_at: "2023-05-10T14:20:00",
      //     updated_at: "2023-06-20T09:15:00"
      //   },
      //   {
      //     id: 2,
      //     title: "Nouvelles Approches en Intelligence Artificielle pour la Santé",
      //     author: 2,
      //     author_name: "Alice Martin",
      //     university: "Polytechnique Montréal",
      //     domain: 2,
      //     year: 2022,
      //     abstract: "Mémoire explorant les applications de l'IA dans le domaine médical avec des cas d'étude concrets et des perspectives d'avenir pour la médecine personnalisée.",
      //     cover: null,
      //     extension: "pdf",
      //     keywords: ["intelligence artificielle", "santé", "médecine", "machine learning"],
      //     supervisor: "Prof. Jean Dupont",
      //     defense_date: "2022-11-30",
      //     grade: "Mention Bien",
      //     views_count: 1987,
      //     downloads_count: 512,
      //     status: 1,
      //     created_at: "2022-10-15T11:30:00",
      //     updated_at: "2022-12-10T16:45:00"
      //   },
      //   {
      //     id: 3,
      //     title: "Changement Climatique et Agriculture Durable",
      //     author: 3,
      //     author_name: "Marc Lefebvre",
      //     university: "AgroParisTech",
      //     domain: 3,
      //     year: 2023,
      //     abstract: "Analyse des pratiques agricoles durables face aux défis du changement climatique, avec des recommandations pour les politiques agricoles européennes.",
      //     cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
      //     extension: "pdf",
      //     keywords: ["changement climatique", "agriculture durable", "environnement", "politiques agricoles"],
      //     supervisor: "Prof. Claire Martin",
      //     defense_date: "2023-07-10",
      //     grade: null,
      //     views_count: 856,
      //     downloads_count: 210,
      //     status: 0,
      //     created_at: "2023-06-20T14:20:00",
      //     updated_at: "2023-07-05T09:15:00"
      //   }
      // ],
      
      // Domaines
      
    }
  },
  
  computed: {
     domains(){
             return this.$store.state.publicData.allDomaine || []
        },
    memoirId() {
      const id = parseInt(this.$route.params.id)
      return isNaN(id) ? this.$route.params.id : id
    },
    
    memoir() {
      return this.$store.state.publicData.allMemoirs.find(m => m.slug.trim() === this.memoirId.trim())
    },
    memoirs() {
      return this.$store.state.publicData.allMemoirs
    },
    
    relatedMemoirs() {
      if (!this.memoir) return []
      
      return this.memoirs
        .filter(m => m.id !== this.memoir.id && m.status === 1)
        .slice(0, 2)
    }
  },
  
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    
    getAuthorInitials(authorName) {
      return authorName.split(' ').map(n => n[0]).join('')
    },
    
    getDomainName(domainId) {
      const domain = this.domains.find(d => d.id === domainId)
      return domain ? domain.name : `Domaine #${domainId}`
    },
    
    async downloadMemoir(id) {


      try {
       
        const response = await axios.get(this.$store.state.localhost + 'downloadmemoir/' + id, {
          responseType: 'blob'
        })
        
      
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        
       
        const filename = response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || this.memoir.title+'.pdf'
        
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
        
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error)
        alert('Impossible de télécharger le fichier')
      }
    
      this.memoir.downloads_count++
      
     }
  },
  
  mounted() {
    console.log('Memoir detail page mounted, ID:', this.memoirId)
    
    // Incrémenter le compteur de vues
    if (this.memoir) {
      this.memoir.views_count++
    }
  }
}
</script>
