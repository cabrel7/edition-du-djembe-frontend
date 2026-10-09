<template>
    <div class="animate-fade-in space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-foreground">Gestion des Vidéos</h1>
                <p class="text-muted-foreground mt-1">
                    {{ filteredVideos.length }} vidéo{{ filteredVideos.length !== 1 ? 's' : '' }}
                    • {{ publishedCount }} publiée{{ publishedCount !== 1 ? 's' : '' }}
                </p>
            </div>
            <button @click="openAddDialog"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Ajouter une vidéo
            </button>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="relative max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Rechercher par titre ou slug..." :value="searchQuery"
                    @input="updateSearchQuery"
                    class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <!-- Status Filter -->
            <div class="flex gap-2">
                <button @click="filterStatus = 'all'"
                    :class="filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Tous
                </button>
                <button @click="filterStatus = 1"
                    :class="filterStatus === 1 ? 'bg-green-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Publiées
                </button>
                <button @click="filterStatus = 0"
                    :class="filterStatus === 0 ? 'bg-gray-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Brouillons
                </button>
                <button @click="filterStatus = 2"
                    :class="filterStatus === 2 ? 'bg-blue-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Privées
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-card rounded-lg shadow overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-border">
                        <th class="w-16 text-left py-3 px-4 font-semibold text-sm">Statut</th>
                        <th class="w-32 text-left py-3 px-4 font-semibold text-sm">Miniature</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Titre/Slug</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">URL Vidéo</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Date</th>
                        <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="video in filteredVideos" :key="video.id"
                        class="border-b border-border hover:bg-secondary/50">
                        <td class="py-3 px-4">
                            <span v-if="video.status === 0"
                                class="text-xs px-2 py-1 bg-gray-500/10 text-gray-600 rounded">
                                B
                            </span>
                            <span v-if="video.status === 1"
                                class="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded">
                                P
                            </span>
                            <span v-if="video.status === 2"
                                class="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded">
                                PR
                            </span>
                        </td>
                        <td class="py-3 px-4">
                            <div class="relative w-24 aspect-video rounded overflow-hidden">
                                <img  :src="$store.state.videocover+'/'+video.thumbnail" :alt="video.title" class="w-full h-full object-cover" />
                                <div  class="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                                    <Play class="w-6 h-6 text-primary-foreground" />
                                </div>
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <div>
                                <p class="font-medium truncate max-w-xs">{{ video.title }}</p>
                                <p class="text-xs text-muted-foreground mt-1">{{ video.slug }}</p>
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <div class="truncate max-w-xs text-sm">
                                <a :href="video.video_url" target="_blank" class="text-primary hover:underline">
                                    {{ getVideoPlatform(video.video_url) }}
                                </a>
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            {{ formatDate(video.created_at, 'short') }}
                        </td>
                        <td class="py-3 px-4 text-right">
                            <div class="flex items-center justify-end gap-1">
                                <button @click="openEditDialog(video)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Éditer">
                                    <Edit class="w-4 h-4" />
                                </button>
                               
                                <button @click="deleteVideo(video.id)"
                                    class="p-2 text-destructive hover:bg-secondary rounded-md" title="Supprimer">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
    <!-- Video Dialog -->
    <div v-if="isDialogOpen"
        class="fixed inset-0 animate-fade-in w-full h-screen z-50 bg-foreground/80 flex items-center justify-center p-4"
        @click="closeDialog">
        <div class="relative bg-card rounded-lg overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop>
            <button @click="closeDialog"
                class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <X class="w-4 h-4" />
            </button>
            <div class="p-6">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                    {{ editingVideo ? "Modifier la vidéo" : "Ajouter une vidéo" }}
                </h2>
                <div class="space-y-4">
                    <!-- Titre et Slug -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Titre *
                            </label>
                            <input type="text" v-model="dialogData.title"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                           <label class="text-sm font-medium leading-none block mb-1">
                            Statut
                        </label>
                        <select v-model="dialogData.status"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                            <option :value="0">Brouillon</option>
                            <option :value="1">Publiée</option>
                            <option :value="2">Privée</option>
                        </select>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Description *
                        </label>
                        <textarea v-model="dialogData.description" rows="3"
                            placeholder="Description complète de la vidéo..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
                    </div>

                    <!-- URL Vidéo -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            URL de la vidéo *
                        </label>
                        <input type="url" v-model="dialogData.video_url"
                            placeholder="https://www.youtube.com/watch?v=..., https://vimeo.com/..., etc."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        <p class="text-xs text-muted-foreground mt-1">
                            Supporte : YouTube, Vimeo, Dailymotion, fichiers vidéo
                        </p>
                    </div>

                    <!-- Miniature -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Miniature (Image uniquement) *
                        </label>
                       
                        <div @click="triggerMainImageUpload"
                            class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                            <div v-if="imagePreview">
                                <img :src="imagePreview" class="h-40 w-auto max-w-full object-cover rounded-lg mx-auto mb-2" />
                                <p class="text-sm text-muted-foreground">Cliquer pour changer l'image</p>
                            </div>
                            <div v-else>
                                <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <p class="text-sm text-muted-foreground">Cliquez pour télécharger une image</p>
                                <p class="text-xs text-muted-foreground mt-1">Formats acceptés : JPG, PNG, GIF, WebP</p>
                            </div>
                            <input 
                                type="file" 
                                ref="mainImageInput" 
                                @change="handleMainImageUpload"
                                accept="image/*" 
                                class="hidden" 
                            />
                        </div>
                        
                        <!-- Message d'erreur pour les fichiers non-image -->
                        <p v-if="fileError" class="text-xs text-red-500 mt-1">
                            {{ fileError }}
                        </p>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-2 pt-4 border-t border-border">
                    <button @click="closeDialog"
                        class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium">
                        Annuler
                    </button>
                    <button @click="saveVideo"
                        class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all"
                        :disabled="!isFormValid">
                        {{ editingVideo ? "Enregistrer" : "Ajouter" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
import { Plus, Search, Edit, Trash2, Play, Upload, X, Eye } from 'lucide-vue-next'

export default {
    name: 'VideosAdminPage',

    components: {
        Plus,
        Search,
        Edit,
        Trash2,
        Play,
        Upload,
        X,
        Eye
    },

    data() {
        return {
            imagePreview: null,
            fileError: null,
            searchQuery: '',
            filterStatus: 'all',
            isDialogOpen: false,
            editingVideo: null,

            // Données du formulaire du dialog
            dialogData: {
                title: '',
                slug: '',
                description: '',
                thumbnail: null,
                video_url: '',
                status: 0
            },
        }
    },

    computed: {
        videos(){
            return this.$store.state.adminData.videos||[]
        },
        
        isFormValid() {
            return this.dialogData.title.trim() && 
                   this.dialogData.description.trim() && 
                   this.dialogData.video_url.trim()
        },
        
        filteredVideos() {
            let filtered = this.videos

            // Filtre par recherche
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase()
                filtered = filtered.filter(video =>
                    video.title.toLowerCase().includes(query) ||
                    video.slug.toLowerCase().includes(query)
                )
            }

            // Filtre par statut
            if (this.filterStatus !== 'all') {
                filtered = filtered.filter(video => video.status === this.filterStatus)
            }

            return filtered
        },

        publishedCount() {
            return this.videos.filter(v => v.status === 1).length
        }
    },

    methods: {
        updateSearchQuery(event) {
            this.searchQuery = event.target.value
        },

        formatDate(dateString, format = 'short') {
            if (!dateString) return 'Non définie'
            const date = new Date(dateString)
            const options = format === 'short'
                ? { day: 'numeric', month: 'short', year: 'numeric' }
                : { day: 'numeric', month: 'long', year: 'numeric' }
            return date.toLocaleDateString('fr-FR', options)
        },

        getVideoPlatform(url) {
            if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
            if (url.includes('vimeo.com')) return 'Vimeo'
            if (url.includes('dailymotion.com')) return 'Dailymotion'
            return 'Lien direct'
        },

        openAddDialog() {
            this.editingVideo = null
            this.imagePreview = null
            this.fileError = null
            this.dialogData = {
                title: '',
                slug: '',
                description: '',
                thumbnail: null,
                video_url: '',
                status: 0
            }
            this.isDialogOpen = true
        },

        openEditDialog(video) {
            this.editingVideo = video
            this.fileError = null
            this.imagePreview = this.$store.state.videocover + '/' + video.thumbnail
            this.dialogData = {
                title: video.title,
                id: video.id,
                slug: video.slug,
                description: video.description,
                thumbnail: video.thumbnail,
                video_url: video.video_url,
                status: video.status
            }
            this.isDialogOpen = true
        },

        closeDialog() {
            this.isDialogOpen = false
            this.editingVideo = null
            this.imagePreview = null
            this.fileError = null
            // Réinitialiser l'input file
            if (this.$refs.mainImageInput) {
                this.$refs.mainImageInput.value = ''
            }
        },

        async saveVideo() {
            // Validation
            if (!this.dialogData.title.trim()) {
                this.showToast("Erreur", "Le titre est requis")
                return
            }

            if (!this.dialogData.description.trim()) {
                this.showToast("Erreur", "La description est requise")
                return
            }

            if (!this.dialogData.video_url.trim()) {
                this.showToast("Erreur", "L'URL de la vidéo est requise")
                return
            }

            if (!this.dialogData.thumbnail && !this.editingVideo) {
                this.showToast("Erreur", "La miniature est requise")
                return
            }

            const newVideo = {
                ...this.dialogData,
            }
          
            let token = localStorage.getItem('token')
            try {
                const res = await this.axios.post(
                    this.$store.state.localhost + 'saveVideo',
                    newVideo,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                if (res.status !== 500 && res.status !== 404 && res.status !== 401) {
                    let video = res.data.video
                    video.image = this.$store.state.videocover + '/' + video.image
                       
                    if (this.editingVideo) {
                        // Mettre à jour la vidéo existante
                        Object.assign(this.editingVideo, {
                            ...this.dialogData,
                            updated_at: new Date().toISOString()
                        })
                        this.showToast("Vidéo mise à jour", "Les modifications ont été enregistrées.")
                    } else {
                        this.videos.unshift(video)
                        this.showToast("Vidéo ajoutée", "La vidéo a été ajoutée avec succès.")
                    }
                   
                    this.closeDialog()
                }
            } catch (e) {
                this.showToast("Erreur", e.message || "Une erreur est survenue")
            }
        },

        playVideo(video) {
            if (video.status === 2) {
                alert("Cette vidéo est privée et ne peut pas être visionnée.")
                return
            }

            window.open(video.video_url, '_blank')
        },

        async deleteVideo(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
                let token = localStorage.getItem('token')
                try {
                    await this.axios.delete(this.$store.state.localhost + `deleteVideo/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.$store.commit('deleteVideo', id)
                    this.showToast("Vidéo supprimée", "La vidéo a été supprimée avec succès.")
                } catch (e) {
                    this.showToast("Erreur", "Impossible de supprimer la vidéo")
                }
            }
        },

        showToast(title, description) {
            let message = {
                title: title,
                description: description
            }
            this.$emit('showtoast', message)
        },
        
        triggerMainImageUpload() {
            this.$refs.mainImageInput.click()
        },
        
        handleMainImageUpload(event) {
            const file = event.target.files[0]
            this.fileError = null

            if (file) {
                // Vérifier que le fichier est bien une image
                if (!file.type.startsWith('image/')) {
                    this.fileError = "Seuls les fichiers image sont acceptés (JPG, PNG, GIF, WebP)"
                    // Réinitialiser l'input
                    event.target.value = ''
                    return
                }

                // Vérifier la taille du fichier (limite à 5MB par exemple)
                const maxSize = 5 * 1024 * 1024 // 5MB
                if (file.size > maxSize) {
                    this.fileError = "L'image ne doit pas dépasser 5MB"
                    event.target.value = ''
                    return
                }

                // Vérifier les extensions autorisées
                const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
                if (!allowedExtensions.includes(file.type)) {
                    this.fileError = "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WebP"
                    event.target.value = ''
                    return
                }

                this.dialogData.thumbnail = file
               
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imagePreview = e.target.result
                }
                reader.onerror = () => {
                    this.fileError = "Erreur lors de la lecture du fichier"
                    this.dialogData.thumbnail = null
                    this.imagePreview = null
                }
       
                reader.readAsDataURL(file)
            }
        },
    },
}
</script>