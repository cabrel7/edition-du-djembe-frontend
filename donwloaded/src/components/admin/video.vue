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
                                <!-- <button @click="playVideo(video)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Voir">
                                    <Eye class="w-4 h-4" />
                                </button> -->
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

                    <!-- Miniature et Statut -->
                    <div class="">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Miniature (URL)
                            </label>
                           
                                <div @click="triggerMainImageUpload"
                                    class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                                    <div v-if="dialogData.thumbnail">
                                        <img :src="image" class="h-40 w-40 object-cover rounded-lg mx-auto mb-2" />
                                        <p class="text-sm text-muted-foreground">Cliquer pour changer l'image</p>
                                    </div>
                                    <div v-else>
                                        <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p class="text-xs text-muted-foreground">Ou cliquez pour télécharger</p>
                                    </div>
                                    <input type="file" ref="mainImageInput" @change="handleMainImageUpload"
                                        accept="image/*" class="hidden" />
                                </div>
                          
                           
                        </div>
                  
                    <div>
                        
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-2 pt-4 border-t border-border">
                    <button @click="closeDialog"
                        class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium">
                        Annuler
                    </button>
                    <button @click="saveVideo"
                        class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all">
                        {{ editingVideo ? "Enregistrer" : "Ajouter" }}
                    </button>
                </div>
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
            image:null,
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

            // Données mockées avec le nouveau format
          
        }
    },

    computed: {
        videos(){
            return this.$store.state.adminData.videos||[]
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

        getStatusButtonClass(status) {
            switch (status) {
                case 0: return 'text-gray-600'
                case 1: return 'text-green-600'
                case 2: return 'text-blue-600'
                default: return 'text-gray-600'
            }
        },

        getStatusButtonTitle(status) {
            switch (status) {
                case 0: return 'Publier'
                case 1: return 'Mettre en privé'
                case 2: return 'Publier'
                default: return 'Changer le statut'
            }
        },

        getStatusButtonIcon(status) {
            switch (status) {
                case 0: return 'P'
                case 1: return 'PR'
                case 2: return 'P'
                default: return '?'
            }
        },

        openAddDialog() {
            this.editingVideo = null
            this.dialogData = {
                title: '',
                slug: '',
                description: '',
                thumbnail: '',
                video_url: '',
                status: 0
            }
            this.isDialogOpen = true
        },

        openEditDialog(video) {
            this.editingVideo = video
            this.image= this.$store.state.videocover+'/'+video.thumbnail
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
        },

        async saveVideo() {
            // Validation
            if (!this.dialogData.title.trim()) {
                alert("Le titre est requis")
                return
            }

            if (!this.dialogData.description.trim()) {
                alert("La description est requise")
                return
            }

            if (!this.dialogData.video_url.trim()) {
                alert("L'URL de la vidéo est requise")
                return
            }

            // Générer le slug si vide
            // if (!this.dialogData.slug.trim() && this.dialogData.title) {
            //     this.dialogData.slug = this.dialogData.title
            //         .toLowerCase()
            //         .replace(/[^\w\s]/gi, '')
            //         .replace(/\s+/g, '-')
            // }

            
            // Ajouter une nouvelle vidéo
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

                if (res.status !== 500 || res.status !== 404 || res.status !== 401) {
                      let video = res.data.video
                      
                        video.image = this.$store.state.videocover + '/' + video.image
                       
                    if (this.editingVideo) {
                // Mettre à jour la vidéo existante
                Object.assign(this.editingVideo, {
                    ...this.dialogData,
                    updated_at: new Date().toISOString()
                })
                this.showToast("Vidéo mise à jour", "Les modifications ont été enregistrées.")
            }else{
                 this.videos.unshift(video)
                    this.showToast("Vidéo ajoutée", "La vidéo a été ajoutée avec succès.")
            }
                   
                    this.closeDialog()

                }
               

            } catch (e) {
                // tu gères → plus d'erreur console
                // console.log("yo",e.message)
                this.showToast(e.message, '')
            }




        },

        playVideo(video) {
            if (video.status === 2) {
                alert("Cette vidéo est privée et ne peut pas être visionnée.")
                return
            }

            window.open(video.video_url, '_blank')
        },

        toggleStatus(video) {
            let newStatus
            let message

            if (video.status === 0) {
                newStatus = 1
                message = "publiée"
            } else if (video.status === 1) {
                newStatus = 2
                message = "mise en privé"
            } else {
                newStatus = 1
                message = "publiée"
            }

            video.status = newStatus
            video.updated_at = new Date().toISOString()

            this.showToast(
                "Statut modifié",
                `La vidéo a été ${message}.`
            )
        },

        async deleteVideo(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
                let token =localStorage.getItem('token')
                await this.axios.delete(this.$store.state.localhost+`deleteVideo/${id}`, {headers:{
                    Authorization: `Bearer ${token}`
                }}).then(()=>{
                    this.$store.commit('deleteVideo', id)
                this.showToast("Vidéo supprimée", "La vidéo a été supprimée avec succès.")
                })
                
            }
        },


        showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
        }
        , triggerMainImageUpload() {
            this.$refs.mainImageInput.click()
        },
        handleMainImageUpload(event) {
            const file = event.target.files[0]

            if (file) { 
                this.dialogData.thumbnail = file
               
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = e.target.result
                }
       
                reader.readAsDataURL(file)

            }
        },
    },

}
</script>