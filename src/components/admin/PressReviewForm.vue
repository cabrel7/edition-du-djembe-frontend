<template>
  <div class="animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-foreground">
          {{ isEditing ? 'Modifier l\'article' : 'Nouvel article' }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ isEditing ? 'Modifiez les informations de l\'article' : 'Créez un nouvel article pour les Cahiers du Djembé' }}
        </p>
      </div>
      <div class="flex gap-2">
        <router-link
          to="/admin/press-reviews"
          class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft class="w-4 h-4" />
          Retour
        </router-link>
        <button
          type="button"
          @click="saveDraft"
          :disabled="isBusy"
          class="border border-input bg-background hover:bg-accent px-4 py-2 rounded-md font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Enregistrer comme brouillon
        </button>
        <button
          type="button"
          @click="saveAndPublish"
          :disabled="isBusy"
          :aria-busy="saving"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="saving" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin motion-reduce:animate-none" aria-hidden="true"></span>
          <template v-if="saving">Envoi en cours...</template>
          <template v-else-if="isEditing">Mettre à jour</template>
          <template v-else>Publier</template>
        </button>
      </div>
    </div>

    <!-- Échec d'envoi : la file d'images est conservée, on peut réessayer -->
    <div v-if="saveError" role="alert"
      class="mb-6 bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive">
      {{ saveError }}
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="saveAndPublish" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Colonne principale -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informations principales -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Informations principales</h2>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium block mb-1">
                  Titre *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Titre de l'article"
                  required
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Sous-titre
                </label>
                <input
                  v-model="form.subtitle"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Sous-titre (optionnel)"
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Résumé *
                </label>
                <textarea
                  v-model="form.summary"
                  rows="3"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Résumé de l'article (2-3 phrases)"
                  required
                ></textarea>
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Contenu *
                </label>
                <textarea
                  v-model="form.content"
                  rows="15"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                  placeholder="Contenu de l'article (HTML ou Markdown)"
                  required
                ></textarea>
                <p class="text-xs text-muted-foreground mt-1">
                  Vous pouvez utiliser du HTML ou du Markdown pour formater votre contenu
                </p>
              </div>
            </div>
          </div>

          <!-- Source et publication -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Source et publication</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium block mb-1">
                  Auteur
                </label>
                <input
                  v-model="form.author"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nom de l'auteur"
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Source (journal/média)
                </label>
                <input
                  v-model="form.source"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: Le Monde, Libération..."
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  URL de la source
                </label>
                <input
                  v-model="form.source_url"
                  type="url"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Date de publication originale
                </label>
                <input
                  v-model="form.publication_date"
                  type="date"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <!-- Médias associés -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Médias associés</h2>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium block mb-1">
                  URL Vidéo (YouTube, Vimeo...)
                </label>
                <input
                  v-model="form.video_url"
                  type="url"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  URL Audio (podcast, interview)
                </label>
                <input
                  v-model="form.audio_url"
                  type="url"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne latérale -->
        <div class="space-y-6">
          <!-- Image de couverture -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Image de couverture</h2>
            
            <div class="space-y-3">
              <div 
                class="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-secondary/30 transition-colors"
                @click="triggerCoverUpload"
              >
                <input
                  ref="coverInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleCoverUpload"
                />
                
                <div v-if="form.cover_preview || form.cover_image">
                  <img 
                    :src="form.cover_preview || form.cover_url" 
                    alt="Cover preview"
                    class="max-h-40 mx-auto rounded-lg mb-2"
                  />
                  <button
                    type="button"
                    @click.stop="removeCover"
                    class="text-sm text-destructive hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
                
                <div v-else>
                  <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p class="text-sm text-muted-foreground">
                    Cliquez pour télécharger
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    JPG, PNG, GIF • Max 5 Mo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Galerie d'images -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Galerie d'images</h2>
            
            <div class="space-y-3">
              <div 
                class="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-secondary/30 transition-colors"
                @click="triggerGalleryUpload"
              >
                <input
                  ref="galleryInput"
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="handleGalleryUpload"
                />
                <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p class="text-sm text-muted-foreground">
                  Cliquez pour ajouter des images
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                         JPG, PNG, GIF • Max 5 Mo par image
                </p>
              </div>

              <!-- Images déjà enregistrées sur le serveur -->
              <div v-if="form.gallery_images && form.gallery_images.length" class="mt-3">
                <p class="text-xs font-medium text-muted-foreground mb-2">
                  Images enregistrées ({{ form.gallery_images.length }})
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <div 
                    v-for="(image, index) in form.gallery_images" 
                    :key="image"
                    class="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img 
                      :src="image" 
                      :alt="'Galerie ' + (index + 1)"
                      class="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      @click="removeExistingGalleryImage(index)"
                      :disabled="saving"
                      aria-label="Retirer cette image de la galerie"
                      class="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- File d'envoi : nouvelles images pas encore confirmées par le serveur -->
              <div v-if="form.gallery_previews && form.gallery_previews.length" class="mt-3">
                <p class="text-xs font-medium text-muted-foreground mb-2">
                  En attente d'envoi ({{ form.gallery_previews.length }})
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <div 
                    v-for="(image, index) in form.gallery_previews" 
                    :key="image"
                    class="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img 
                      :src="image" 
                      :alt="'Nouvelle image ' + (index + 1)"
                      class="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      @click="removeGalleryImage(index)"
                      :disabled="saving"
                      aria-label="Retirer cette image de la file d'envoi"
                      class="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <X class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents joints -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Documents joints</h2>
            
            <div class="space-y-3">
              <div 
                class="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-secondary/30 transition-colors"
                @click="triggerDocumentUpload"
              >
                <input
                  ref="documentInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  class="hidden"
                  @change="handleDocumentUpload"
                />
                <FileText class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p class="text-sm text-muted-foreground">
                  Cliquez pour ajouter des documents
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX • Max 10 Mo par document
                </p>
              </div>

              <!-- Liste des nouveaux documents -->
              <div v-if="form.new_documents && form.new_documents.length" class="space-y-2 mt-3">
                <div 
                  v-for="(doc, index) in form.new_documents" 
                  :key="'new-'+index"
                  class="flex items-center justify-between p-2 bg-secondary/30 rounded-lg"
                >
                  <div class="flex items-center gap-2 overflow-hidden">
                    <FileText class="w-4 h-4 text-primary flex-shrink-0" />
                    <span class="text-sm truncate">{{ doc.name }}</span>
                    <span class="text-xs text-muted-foreground flex-shrink-0">({{ formatFileSize(doc.size) }})</span>
                  </div>
                  <button
                    type="button"
                    @click="removeNewDocument(index)"
                    class="text-destructive hover:text-destructive/80"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Liste des documents existants -->
              <div v-if="form.existing_documents && form.existing_documents.length" class="space-y-2 mt-3">
                <div 
                  v-for="(doc, index) in form.existing_documents" 
                  :key="'existing-'+index"
                  class="flex items-center justify-between p-2 bg-secondary/30 rounded-lg"
                >
                  <div class="flex items-center gap-2 overflow-hidden">
                    <FileText class="w-4 h-4 text-primary flex-shrink-0" />
                    <span class="text-sm truncate">{{ doc.name || 'Document' }}</span>
                    <span v-if="doc.size" class="text-xs text-muted-foreground flex-shrink-0">({{ formatFileSize(doc.size) }})</span>
                  </div>
                  <button
                    type="button"
                    @click="removeExistingDocument(index)"
                    class="text-destructive hover:text-destructive/80"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Catégorie et tags -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Catégorie et tags</h2>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium block mb-1">
                  Catégorie *
                </label>
                <select
                  v-model="form.category"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="interview">Interview</option>
                  <option value="critique">Critique</option>
                  <option value="reportage">Reportage</option>
                  <option value="article">Article</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Tags
                </label>
                <div class="flex flex-wrap gap-2 p-2 border border-input rounded-md bg-background min-h-[42px]">
                  <span 
                    v-for="(tag, index) in form.tags" 
                    :key="index"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-foreground rounded-md text-sm"
                  >
                    #{{ tag }}
                    <button 
                      type="button"
                      @click="removeTag(index)"
                      class="text-muted-foreground hover:text-foreground"
                    >
                      <X class="w-3 h-3" />
                    </button>
                  </span>
                  <input
                    v-model="newTag"
                    type="text"
                    placeholder="Ajouter un tag..."
                    class="flex-1 min-w-[120px] border-none outline-none bg-transparent text-sm"
                    @keydown.enter.prevent="addTag"
                    @keydown.comma.prevent="addTag"
                    @keydown.space.prevent="addTag"
                    @blur="addTag"
                  />
                </div>
                <p class="text-xs text-muted-foreground mt-1">
                  Appuyez sur Entrée, Virgule ou Espace pour ajouter un tag
                </p>
              </div>
            </div>
          </div>

          <!-- Options -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">Options</h2>
            
            <div class="space-y-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="rounded border-input text-primary focus:ring-primary"
                />
                <span class="text-sm">Mettre à la une</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="form.is_published"
                  type="checkbox"
                  class="rounded border-input text-primary focus:ring-primary"
                  @change="togglePublished"
                />
                <span class="text-sm">Publier immédiatement</span>
              </label>

              <div v-if="!form.is_published" class="pt-2">
                <label class="text-sm font-medium block mb-1">
                  Date de publication programmée
                </label>
                <input
                  v-model="form.published_at"
                  type="datetime-local"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div class="pt-2">
                <label class="text-sm font-medium block mb-1">
                  Statut
                </label>
                <select
                  v-model="form.status"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>
          </div>

          <!-- SEO -->
          <div class="bg-card rounded-lg p-6">
            <h2 class="text-lg font-semibold text-foreground mb-4">SEO</h2>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium block mb-1">
                  Slug (URL)
                </label>
                <input
                  v-model="form.slug"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="titre-de-l-article"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  Laissez vide pour générer automatiquement
                </p>
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Méta-titre
                </label>
                <input
                  v-model="form.meta_title"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Titre SEO (optionnel)"
                />
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Méta-description
                </label>
                <textarea
                  v-model="form.meta_description"
                  rows="3"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Description pour les moteurs de recherche"
                ></textarea>
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">
                  Mots-clés SEO
                </label>
                <input
                  v-model="form.meta_keywords"
                  type="text"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="mot-clé1, mot-clé2, mot-clé3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ArrowLeft, Upload, FileText, X } from 'lucide-vue-next'

export default {
  name: 'AdminPressReviewForm',

  components: {
    ArrowLeft,
    Upload,
    FileText,
    X
  },

  data() {
    return {
      isEditing: false,
      form: {
        title: '',
        subtitle: '',
        summary: '',
        content: '',
        author: '',
        source: '',
        source_url: '',
        publication_date: '',
        cover_image: null,
        cover_preview: null,
        cover_url: '',
        gallery_images: [],
        gallery_previews: [],
        new_gallery_images: [],
        existing_gallery_images: [],
        documents: [],
        new_documents: [],
        existing_documents: [],
        video_url: '',
        audio_url: '',
        category: 'article',
        tags: [],
        is_featured: false,
        is_published: false,
        status: 'draft',
        published_at: '',
        slug: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
      },
      newTag: '',
      loading: false,
      saving: false,
      loadFailed: false,
      saveError: ''
    }
  },

  computed: {
    // Chargement initial OU envoi en cours : aucune action d'enregistrement possible.
    isBusy() {
      return this.loading || this.saving
    }
  },

  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.isEditing = true
      this.loadPressReview(id)
    }
  },

  methods: {
    async loadPressReview(id) {
      this.loading = true
      try {
        const response = await this.$store.dispatch('adminFetchPressReview', id)
        const data = response.data

        // cover_image / gallery_images sont stockées en chemin relatif côté
        // backend ("press-reviews/covers/x.jpg") : résoudre en URL absolue pour
        // l'affichage. existing_gallery_images reste brut (renvoyé tel quel au
        // save) ; le save n'envoie cover_image que si un nouveau File est choisi.
        const origin = this.$store.state.presse

        this.form = {
          ...this.form,
          ...data,
          is_published: data.status === 'published',
          cover_url: data.cover_image ? origin + data.cover_image : '',
          gallery_images: (data.gallery_images || []).map(p => origin + p),
          existing_gallery_images: data.gallery_images || [],
          existing_documents: data.documents || [],
          meta_title: data.meta_data?.title || '',
          meta_description: data.meta_data?.description || '',
          meta_keywords: data.meta_data?.keywords || ''
        }
      } catch (error) {
        console.error('Erreur chargement:', error)
        this.loadFailed = true
        if (error.response?.status === 404) {
          this.$router.push('/admin/press-reviews')
        }
      } finally {
        this.loading = false
      }
    },

    // Gestion des images
    triggerCoverUpload() {
      this.$refs.coverInput.click()
    },

    handleCoverUpload(event) {
      const file = event.target.files[0]
      if (file) {
        if (this.form.cover_preview) URL.revokeObjectURL(this.form.cover_preview)
        this.form.cover_image = file
        this.form.cover_preview = URL.createObjectURL(file)
      }
    },

    removeCover() {
      if (this.form.cover_preview) URL.revokeObjectURL(this.form.cover_preview)
      this.form.cover_image = null
      this.form.cover_preview = null
      this.form.cover_url = ''
      this.$refs.coverInput.value = ''
    },

    triggerGalleryUpload() {
      this.$refs.galleryInput.click()
    },

    handleGalleryUpload(event) {
      const files = Array.from(event.target.files)
      
      files.forEach(file => {
        if (!this.form.new_gallery_images) {
          this.form.new_gallery_images = []
        }
        if (!this.form.gallery_previews) {
          this.form.gallery_previews = []
        }
        
        this.form.new_gallery_images.push(file)
        this.form.gallery_previews.push(URL.createObjectURL(file))
      })
      
      this.$refs.galleryInput.value = ''
    },

    removeGalleryImage(index) {
      if (this.form.gallery_previews && this.form.gallery_previews[index]) {
        URL.revokeObjectURL(this.form.gallery_previews[index])
        this.form.gallery_previews.splice(index, 1)
      }
      if (this.form.new_gallery_images && this.form.new_gallery_images[index]) {
        this.form.new_gallery_images.splice(index, 1)
      }
    },

    // Vide la file d'envoi et libère les URLs objet des aperçus.
    clearGalleryQueue() {
      if (this.form.gallery_previews) {
        this.form.gallery_previews.forEach(url => URL.revokeObjectURL(url))
      }
      this.form.gallery_previews = []
      this.form.new_gallery_images = []
    },

    // Après un envoi réussi : la galerie du serveur fait foi (existantes + nouvelles,
    // dédupliquées côté backend). On remplace l'état local et on vide la file.
    syncGalleryFromServer(saved) {
      if (!saved || !Array.isArray(saved.gallery_images)) return
      const origin = this.$store.state.presse
      this.form.existing_gallery_images = saved.gallery_images
      this.form.gallery_images = saved.gallery_images.map(p => origin + p)
      this.clearGalleryQueue()
    },

    // Message d'échec : la file d'images reste intacte, le backend déduplique par contenu.
    describeSaveError(error) {
      const errors = error.response?.data?.errors
      if (error.response?.status === 422 && errors) {
        return 'Certains champs sont invalides : ' + Object.values(errors).flat().join(' ')
      }
      const queued = this.form.new_gallery_images ? this.form.new_gallery_images.length : 0
      if (this.isEditing) {
        const kept = queued
          ? ` Les ${queued} image(s) en attente sont conservées dans la file d'envoi.`
          : ''
        return 'Envoi interrompu, vous pouvez réessayer sans risque de doublon.' + kept
      }
      return 'Envoi interrompu. Avant de réessayer, vérifiez dans la liste des articles que celui-ci n\'a pas déjà été créé.'
    },

    removeExistingGalleryImage(index) {
      if (this.form.gallery_images && this.form.gallery_images[index]) {
        this.form.gallery_images.splice(index, 1)
      }
      if (this.form.existing_gallery_images && this.form.existing_gallery_images[index]) {
        this.form.existing_gallery_images.splice(index, 1)
      }
    },

    // Gestion des documents
    triggerDocumentUpload() {
      this.$refs.documentInput.click()
    },

    handleDocumentUpload(event) {
      const files = Array.from(event.target.files)
      
      files.forEach(file => {
        if (!this.form.new_documents) {
          this.form.new_documents = []
        }
        this.form.new_documents.push(file)
      })
      
      this.$refs.documentInput.value = ''
    },

    removeNewDocument(index) {
      if (this.form.new_documents && this.form.new_documents[index]) {
        this.form.new_documents.splice(index, 1)
      }
    },

    removeExistingDocument(index) {
      if (this.form.existing_documents && this.form.existing_documents[index]) {
        this.form.existing_documents.splice(index, 1)
      }
    },

    formatFileSize(bytes) {
      if (!bytes) return '0 B'
      if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GB`
      if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`
      if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`
      return bytes + ' B'
    },

    // Gestion des tags
    addTag() {
      const tag = this.newTag.trim().toLowerCase()
      if (tag && !this.form.tags.includes(tag)) {
        this.form.tags.push(tag)
      }
      this.newTag = ''
    },

    removeTag(index) {
      this.form.tags.splice(index, 1)
    },

    // Gestion du statut
    togglePublished() {
      if (this.form.is_published) {
        this.form.status = 'published'
        if (!this.form.published_at) {
          this.form.published_at = new Date().toISOString().slice(0, 16)
        }
      } else {
        this.form.status = 'draft'
        this.form.published_at = ''
      }
    },

    // Sauvegarde
    async saveDraft() {
      if (this.isBusy) return
      this.form.status = 'draft'
      this.form.is_published = false
      await this.save()
    },

    async saveAndPublish() {
      if (this.isBusy) return
      this.form.status = 'published'
      this.form.is_published = true
      if (!this.form.published_at) {
        this.form.published_at = new Date().toISOString().slice(0, 16)
      }
      await this.save()
    },

    async save() {
      // Garde anti double envoi (bouton, touche Entrée, double clic)
      if (this.saving) return
      if (this.loadFailed) {
        this.saveError = 'Le chargement de la revue a échoué : rechargez la page avant d\'enregistrer.'
        return
      }
      this.saving = true
      this.saveError = ''

      try {
        const formData = new FormData()

        // Ajouter tous les champs du formulaire
        const fields = [
          'title', 'subtitle', 'summary', 'content', 'author',
          'source', 'source_url', 'publication_date', 'video_url',
          'audio_url', 'category', 'status', 'is_featured',
          'published_at', 'slug'
        ]

        fields.forEach(field => {
          if (this.form[field] !== null && this.form[field] !== undefined) {
            // En multipart les booléens arrivent en "true"/"false" ; le backend
            // fait !empty() → "false" devenait 1 (à la une à tort). On envoie 0/1.
            const value = field === 'is_featured' ? (this.form[field] ? 1 : 0) : this.form[field]
            formData.append(field, value)
          }
        })

        // Tags
        if (this.form.tags && this.form.tags.length) {
          formData.append('tags', JSON.stringify(this.form.tags))
        }

        // Meta data
        const metaData = {
          title: this.form.meta_title || '',
          description: this.form.meta_description || '',
          keywords: this.form.meta_keywords || ''
        }
        formData.append('meta_data', JSON.stringify(metaData))

        // Image de couverture
        if (this.form.cover_image instanceof File) {
          formData.append('cover_image', this.form.cover_image)
        }

        // Nouvelles images de galerie
        if (this.form.new_gallery_images && this.form.new_gallery_images.length) {
          this.form.new_gallery_images.forEach((image, index) => {
            formData.append(`gallery_images[${index}]`, image)
          })
        }

        // Images de galerie existantes à conserver
        // En édition on l'envoie TOUJOURS (même vide) : sinon retirer la dernière image est ignoré.
        if (this.isEditing && Array.isArray(this.form.existing_gallery_images)) {
          formData.append('existing_gallery_images', JSON.stringify(this.form.existing_gallery_images))
        } else if (this.form.existing_gallery_images && this.form.existing_gallery_images.length) {
          formData.append('existing_gallery_images', JSON.stringify(this.form.existing_gallery_images))
        }

        // Nouveaux documents
        if (this.form.new_documents && this.form.new_documents.length) {
          this.form.new_documents.forEach((doc, index) => {
            formData.append(`documents[${index}]`, doc)
          })
        }

        // Documents existants à conserver
        if (this.form.existing_documents && this.form.existing_documents.length) {
          formData.append('existing_documents', JSON.stringify(this.form.existing_documents))
        }

        let result
        if (this.isEditing) {
          formData.append('_method', 'PUT')
          result = await this.$store.dispatch('adminUpdatePressReview', {
            id: this.$route.params.id,
            formData
          })
        } else {
          result = await this.$store.dispatch('adminCreatePressReview', formData)
        }

        // Succès : l'état local est remplacé par la galerie serveur, la file est vidée.
        this.syncGalleryFromServer(result?.data)
        this.$router.push('/admin/press-reviews')
      } catch (error) {
        // File d'envoi conservée (new_gallery_images / aperçus) pour un retry sans doublon.
        this.saveError = this.describeSaveError(error)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } finally {
        this.saving = false
      }
    }
  },

  beforeUnmount() {
    // Nettoyer les URLs des previews
    if (this.form.cover_preview) {
      URL.revokeObjectURL(this.form.cover_preview)
    }
    this.clearGalleryQueue()
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>