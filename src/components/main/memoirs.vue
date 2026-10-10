<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-16">
      <div class="container-custom">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <GraduationCap class="w-7 h-7" />
          </div>
          <div>
            <h1 class="text-4xl md:text-5xl font-bold">Mémoires & Recherche</h1>
          </div>
        </div>
        <p class="text-xl text-primary-foreground/90 max-w-2xl mt-4">
          Accédez à une collection de travaux académiques et scientifiques 
          couvrant diverses disciplines.
        </p>
      </div>
    </section>

    
    <section class="bg-secondary py-6 border-b border-border sticky top-16 z-20">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un titre, un auteur, une université..."
              :value="searchQuery"
              @input="updateSearchQuery"
              class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- <div class="relative w-full md:w-64">
            <select 
              :value="selectedDomain"
              @change="updateDomain"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="0">Tous les domaines</option>
              <option 
                v-for="domain in domains" 
                :key="domain.id" 
                :value="domain.id"
              >
                {{ domain.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div> -->

          <button 
            v-if="hasFilters"
            @click="clearFilters"
            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
          >
            <X class="w-4 h-4" />
            Réinitialiser
          </button>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="section-padding">
      <div class="container-custom">
        <p class="text-muted-foreground mb-8">
          {{ filteredMemoirs.length }} mémoire{{ filteredMemoirs.length !== 1 ? 's' : '' }} trouvé{{ filteredMemoirs.length !== 1 ? 's' : '' }}
        </p>

        <div v-if="filteredMemoirs.length === 0" class="text-center py-16">
          <p class="text-xl text-muted-foreground mb-4">Aucun mémoire trouvé</p>
          <button 
            @click="clearFilters"
            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>

        <div v-else class="flex flex-wrap justify-center gap-2">
          <router-link
            v-for="memoir in filteredMemoirs"
            :key="memoir.id"
            :to="`/memoires/${memoir.slug.trim()}`"
            class="group block bg-card rounded-lg p-6 md:w-[49%] lg:w-[49%] w-full card-shadow hover-lift"
          >
            <div class="flex flex-col md:flex-row md:items-start gap-6">
              <div class="flex-shrink-0">
               <div class="flex-shrink-0 w-24 h-40 rounded-lg bg-primary/10 flex items-center justify-center">
              <img
                :src="memoir.cover"
                :alt="memoir.title"
                class="w-full h-full rounded object-cover"
              />    
              </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex  items-center gap-2 mb-2">
                  <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {{getDomainName(memoir.domain) }}
                  </span>
                  <span class="text-xs text-muted-foreground">
                    {{ memoir.year }}
                  </span>
                </div>
                <h2 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {{ memoir.title }}
                </h2>
                <p class="text-muted-foreground mb-2">
                  <span class="font-medium">{{ memoir.author }}</span>
                  <span class="mx-2">•</span>
                  {{ memoir.university }}
                </p>
                <p class="text-sm text-muted-foreground line-clamp-2">
                  {{ memoir.abstract }}
                </p>
                <div class="flex justify-center md:self-center">
                <button 
                  @click.prevent="downloadMemoir(memoir)"
                  class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1.5 rounded-md text-sm font-medium inline-flex items-center gap-2"
                >
                  <Download class="w-4 h-4" />
                  PDF
                </button>
              </div>
              </div>
              
            </div>
            
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Search, GraduationCap, Download, X } from 'lucide-vue-next'

export default {
  name: 'MemoirsPage',
  
  components: {
    Search,
    GraduationCap,
    Download,
    X
  },
  
  data() {
    return {
      searchQuery: '',
      selectedDomain: 0,
      
      // Domaines disponibles
    
      
      // Mock data - Mémoires
      
    }
  },
  
  computed: {
    domains(){
       return this.$store.state.publicData.allDomaine;
    },
    // Filtrage des mémoires (équivalent à useMemo)
    memoirs(){
      return this.$store.state.publicData.allMemoirs;
    },
    filteredMemoirs() {
      return this.memoirs.filter(memoir => {
        const matchesSearch = 
          memoir.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          memoir.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          memoir.university.toLowerCase().includes(this.searchQuery.toLowerCase())
        
        const matchesDomain = this.selectedDomain === 0 || memoir.domain === this.selectedDomain
        
        // console.log(matchesSearch,matchesDomain)
        return matchesSearch && matchesDomain
        
      })
    },
    
    // Vérification si des filtres sont actifs
    hasFilters() {
      return this.searchQuery || this.selectedDomain !== 0
    }
  },
  
  methods: {
    // Mise à jour des filtres
    updateSearchQuery(event) {
      this.searchQuery = event.target.value
    },
    
    updateDomain(event) {
     
      this.selectedDomain = event.target.value
       console.log(this.selectedDomain,event.target)
    },
    getDomainName(domainId) {
      const domain = this.domains.find(d => d.id === domainId)
      return domain ? domain.name : `Domaine #${domainId}`
    },
    // Réinitialisation des filtres
    clearFilters() {
      this.searchQuery = ''
      this.selectedDomain = 0
    },
    
    // Téléchargement d'un mémoire
    async downloadMemoir(memoir) {
          try {

        const response = await this.axios.get(this.$store.state.localhost + 'downloadmemoir/' + memoir.id, {
          responseType: 'blob'
        })


        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url


        const filename = response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || memoir.title+'.pdf'

        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

      } catch (error) {
        console.error('Erreur lors du téléchargement:', error)
        alert('Impossible de télécharger le fichier')
      }

      
    }
  },
  
  // mounted() {
  //   console.log('Memoirs page mounted')
  // }
}
</script>

<style scoped>
/* Styles spécifiques */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Style pour les champs de formulaire */
select {
  cursor: pointer;
}

input:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Animation pour la liste */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }
  
  .md\:flex-row {
    flex-direction: row;
  }
  
  .md\:self-center {
    align-self: center;
  }
}
</style>
