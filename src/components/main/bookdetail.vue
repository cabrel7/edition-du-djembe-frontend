<template>
  <div class="animate-fade-in">
    <!-- Book not found -->
    <div v-if="!book" class="container-custom section-padding text-center">
      <h1 class="text-2xl font-bold text-foreground mb-4">Ouvrage non trouvé</h1>
      <router-link to="/catalogue">
        <button
          class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium inline-flex items-center">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Retour au catalogue
        </button>
      </router-link>
    </div>

    <!-- Book found -->
    <div v-else>
      <!-- Breadcrumb -->
      <div class="bg-secondary py-4">
        <div class="container-custom">
          <div class="flex items-center gap-2 text-sm">
            <router-link to="/catalogue" class="text-muted-foreground hover:text-primary">
              Catalogue
            </router-link>
            <span class="text-muted-foreground">/</span>
            <span class="text-foreground">{{ book.title }}</span>
          </div>
        </div>
      </div>

      <!-- Book Details -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Book Cover -->
            <div class="w-full flex justify-center">
              <div class="lg:w-[60%] md:w-[65%]  sm:w-full h-[70vh]">
                <div class="flex justify-center w-full ">
                  <div class=" aspect-auto   rounded-lg overflow-hidden shadow-2xl">
                    <img :src="book.cover" :alt="book.title" fetchpriority="high" decoding="async"
                      class="w-full h-full object-cover flex-shrink-0 object-center " />
                  </div>
                </div>
                <!-- Stock Status -->
                <div v-if="book.stock_quantity !== null" class="mt-4">
                  <div :class="getStockStatusClass" class="px-4 py-2 rounded-lg text-center">
                    {{ getStockStatusText }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Book Info -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {{ getCategoryName(book.category) }}
                </span>
                <!-- Rating -->
                <div v-if="book.rating" class="flex items-center gap-1">
                  <Star class="w-4 h-4 text-yellow-500 fill-current" />
                  <span class="text-sm font-medium">{{ book.rating.toFixed(1) }}</span>
                  <span class="text-xs text-muted-foreground">/5</span>
                </div>
              </div>

              <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {{ book.title }}
              </h1>
              <p class="text-xl text-muted-foreground mb-6">par {{ book.author_name || `Auteur #${book.author}` }}</p>

              <!-- Publisher and Edition -->
              <div v-if="book.publisher || book.edition"
                class="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
                <span v-if="book.publisher" class="flex items-center gap-1">
                  <Building class="w-4 h-4" />
                  {{ book.publisher }}
                </span>
                <span v-if="book.edition" class="flex items-center gap-1">
                  <BookOpen class="w-4 h-4" />
                  {{ book.edition }}
                </span>
              </div>

              <!-- Price and Actions -->
              <div class="bg-secondary rounded-lg p-6 mb-8">
                <div class="flex items-baseline justify-between mb-4">
                  <span class="text-4xl font-bold text-primary">{{ book.price }} €</span>
                  <span class="text-sm text-muted-foreground">
                    ISBN: {{ book.isbn }}
                  </span>
                </div>
                <div v-if="isdispo"
                  class="bg-red-500/50 animate-fade-in  text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center mb-2">
                  la fonctionalite sera disponible bientot</div>
                <div class="  animate-fade-in flex flex-col sm:flex-row gap-3">
                  <button @click="handlePurchase"
                    :disabled="!book.status || (book.stock_quantity !== null && book.stock_quantity <= 0)"
                    :class="!book.status || (book.stock_quantity !== null && book.stock_quantity <= 0) ? 'opacity-50 cursor-not-allowed' : ''"
                    class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all flex-1 flex items-center justify-center gap-2">
                    <ShoppingCart class="w-4 h-4" />
                    {{ book.stock_quantity !== null && book.stock_quantity <= 0 ? 'Rupture de stock' : (book.amazon_url ? 'Acheter sur Amazon' : 'Acheter') }}
                      </button>
                      <button @click="downloadbook(book.id)" 
                        :class="!book.extraitdocument ? 'opacity-50 cursor-not-allowed' : ''"
                        class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium flex-1 flex items-center justify-center gap-2">
                        <Download class="w-4 h-4" />
                        {{ book.extraitdocument ? 'Télécharger un extrait' : 'Extrait non disponible' }}
                      </button>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="bg-card rounded-lg p-4 card-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p class="text-xs text-muted-foreground">Publication</p>
                      <p class="text-sm font-medium text-foreground">
                        {{ formatDate(book.published_date) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-card rounded-lg p-4 card-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Book class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p class="text-xs text-muted-foreground">Pages</p>
                      <p class="text-sm font-medium text-foreground">{{ book.pages }} pages</p>
                    </div>
                  </div>
                </div>
                <div class="bg-card rounded-lg p-4 card-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p class="text-xs text-muted-foreground">Langue</p>
                      <p class="text-sm font-medium text-foreground">{{ getLanguageName(book.language) }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-card rounded-lg p-4 card-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p class="text-xs text-muted-foreground">Document</p>
                      <p class="text-sm font-medium text-foreground">
                        {{ book.document ? 'Disponible' : 'Non disponible' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h2 class="text-xl font-semibold text-foreground mb-4">Description</h2>
                <p class="text-muted-foreground leading-relaxed">
                  {{ book.description }}
                </p>
              </div>

              <!-- Author -->
              <div class="mt-8 pt-8 border-t border-border">
                <h2 class="text-xl font-semibold text-foreground mb-4">À propos de l'auteur</h2>
                <div class="flex items-start gap-4">
                  <div
                    class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                    {{ getAuthorInitials(book.author) }}
                  </div>
                  <div>
                    <p class="font-semibold text-foreground">{{ book.author }}</p>
                    <p class="text-sm text-muted-foreground mt-1">
                      Auteur spécialisé dans le domaine de {{ getCategoryName(book.category).toLowerCase() }},
                      {{ book.author_name ? book.author_name.split(' ')[0] : 'cet auteur' }} a publié plusieurs ouvrages
                      de référence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Books -->
      <section v-if="relatedBooks.length > 0" class="section-padding bg-secondary">
        <div class="container-custom">
          <h2 class="text-2xl font-bold text-foreground mb-8">Ouvrages similaires</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <router-link v-for="relatedBook in relatedBooks" :key="relatedBook.id"
              :to="`/livres/${relatedBook.slug.trim()}`"
              class="group bg-card rounded-lg overflow-hidden card-shadow hover-lift">
              <div class="aspect-[3/4] overflow-hidden">
                <img :src="relatedBook.cover" :alt="relatedBook.title" loading="lazy" decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="p-4">
                <h3
                  class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {{ relatedBook.title }}
                </h3>
                <p class="text-xs text-muted-foreground mt-1">{{ relatedBook.author_name || `Auteur
                  #${relatedBook.author}` }}</p>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-primary font-semibold">{{ relatedBook.price }} €</p>
                  <div v-if="relatedBook.rating" class="flex items-center gap-1 text-xs">
                    <Star class="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{{ relatedBook.rating.toFixed(1) }}</span>
                  </div>
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
  ArrowLeft, Download, ShoppingCart, Book, Calendar, FileText,
  Star, Building, BookOpen, Globe
} from 'lucide-vue-next'

export default {
  name: 'BookDetailPage',

  components: {
    ArrowLeft,
    Download,
    ShoppingCart,
    Book,
    Calendar,
    FileText,
    Star,
    Building,
    BookOpen,
    Globe
  },

  data() {
    return {
      // Mock data avec le nouveau format
      isdispo: false

    }
  },

  computed: {
    categories() {
      return this.$store.state.publicData.allCategories || []
    },
    bookId() {
      return this.$route.params.id
    },

    book() {
      return this.$store.state.publicData.allBooks.find(b => b.slug.trim() === this.bookId.trim())
    },
    books() {
      return this.$store.state.publicData.allBooks
    },

    relatedBooks() {
      if (!this.book) return []

      return this.books
        .filter(b => b.id !== this.book.id && b.status === 1)
        .slice(0, 4)
    },

    getStockStatusClass() {
      if (this.book.stock_quantity === null) return 'bg-blue-100 text-blue-800'
      if (this.book.stock_quantity === 0) return 'bg-red-100 text-red-800'
      if (this.book.stock_quantity < 10) return 'bg-yellow-100 text-yellow-800'
      return 'bg-green-100 text-green-800'
    },

    getStockStatusText() {
      if (this.book.stock_quantity === null) return 'Stock illimité'
      if (this.book.stock_quantity === 0) return 'Rupture de stock'
      if (this.book.stock_quantity < 10) return `${this.book.stock_quantity} derniers exemplaires`
      return `${this.book.stock_quantity} exemplaires disponibles`
    }
  },

  methods: {
    async downloadbook(id) {
      console.log('telechargement')

      try {

        const response = await this.axios.get(this.$store.state.localhost + 'downloadbook/' + id, {
          responseType: 'blob'
        })


        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url


        const filename = response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || this.book.title + '.pdf'

        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

      } catch (error) {
        console.error('Erreur lors du téléchargement:', error)
        alert('Impossible de télécharger le fichier')
      }

    },
    formatDate(dateString) {
      if (!dateString) return 'Date non spécifiée'
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

    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId)

      return category ? category.name : `Catégorie #${categoryId}`
    },

    getLanguageName(languageCode) {
      const languages = {
        'fr': 'Français',
        'en': 'Anglais',
        'es': 'Espagnol',
        'de': 'Allemand',
        'it': 'Italien'
      }
      return languages[languageCode] || languageCode.toUpperCase()
    },

    handlePurchase() {
      if (this.book.amazon_url) {
        window.open(this.book.amazon_url, '_blank', 'noopener')
        return
      }
      this.isdispo = true
      setTimeout(() => {
        this.isdispo = false
      }, 5000)
    },

    
  },

  // mounted() {
  //   console.log('Book detail page mounted, ID:', this.bookId)
  // }
}
</script>
<style scoped>
p {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>
