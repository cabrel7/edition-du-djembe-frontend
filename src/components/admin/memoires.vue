<template>
    <div class="animate-fade-in space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-foreground">Gestion des Mémoires</h1>
                <p class="text-muted-foreground mt-1">
                    {{ filteredMemoirs.length }} mémoire{{ filteredMemoirs.length !== 1 ? 's' : '' }}
                    • {{ approvedCount }} approuvé{{ approvedCount !== 1 ? 's' : '' }}
                </p>
            </div>
            <button @click="openAddDialog"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Ajouter un mémoire
            </button>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="relative max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Rechercher par titre, auteur ou université..." :value="searchQuery"
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
                    Approuvés
                </button>
                <button @click="filterStatus = 0"
                    :class="filterStatus === 0 ? 'bg-yellow-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    En attente
                </button>
                <button @click="filterStatus = 2"
                    :class="filterStatus === 2 ? 'bg-red-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Rejetés
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-card rounded-lg shadow overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-border">
                        <th class="w-16 text-left py-3 px-4 font-semibold text-sm">Statut</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Titre/Auteur</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Université</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Domaine</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Année</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Stats</th>
                        <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="memoir in filteredMemoirs" :key="memoir.id"
                        class="border-b border-border hover:bg-secondary/50">
                        <td class="py-3 px-4">
                            <div class="flex flex-col gap-1">
                                <img :src="memoir.cover" :alt="memoir.title" class="w-12 h-16 rounded object-cover" />
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <div>
                                <div class="font-medium truncate max-w-xs">{{ memoir.title }}</div>
                                <div class="text-xs text-muted-foreground mt-1">
                                    {{ memoir.author }}
                                </div>
                            </div>
                        </td>
                        <td class="py-3 px-4 truncate max-w-xs">{{ memoir.university }}</td>
                        <td class="py-3 px-4">
                            <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {{ getDomainName(memoir.domain) }}
                            </span>
                        </td>
                        <td class="py-3 px-4">{{ memoir.year }}</td>
                        <td class="py-3 px-4">
                            <div class="text-xs text-muted-foreground">
                                <div>👁️ {{ memoir.views_count }}</div>
                                <div>⬇️ {{ memoir.downloads_count }}</div>
                            </div>
                        </td>
                        <td class="py-3 px-4 text-right">
                            <div class="flex items-center justify-end gap-1">
                                <button @click="viewMemoir(memoir)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Voir">
                                    <Eye class="w-4 h-4" />
                                </button>
                                <button @click="openEditDialog(memoir)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Éditer">
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button @click="downloadMemoir(memoir)"
                                    :class="memoir.status === 1 ? 'text-blue-600' : 'text-gray-400'"
                                    class="p-2 hover:bg-secondary rounded-md" title="Télécharger">
                                    <Download class="w-4 h-4" />
                                </button>
                                <button @click="changeStatus(memoir, 1)" v-if="memoir.status !== 1"
                                    class="p-2 text-green-600 hover:bg-secondary rounded-md" title="Approuver">
                                    ✓
                                </button>
                                <button @click="changeStatus(memoir, 2)" v-if="memoir.status !== 2"
                                    class="p-2 text-red-600 hover:bg-secondary rounded-md" title="Rejeter">
                                    ✗
                                </button>
                                <button @click="deleteMemoir(memoir.id)"
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
    <!-- Memoir Dialog -->
    <div v-if="isDialogOpen"
        class="fixed inset-0 w-full animate-fade-in h-screen z-50 bg-foreground/80 flex items-center justify-center p-4"
        @click="closeDialog">
        <div class="relative bg-card rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop>
            <button @click="closeDialog"
                class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <X class="w-4 h-4" />
            </button>
            <div class="p-6">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                    {{ editingMemoir ? "Modifier le mémoire" : "Ajouter un mémoire" }}
                </h2>
                <div class="space-y-4">
                    <!-- Titre -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Titre du mémoire *
                        </label>
                        <input type="text" v-model="dialogData.title"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>

                    <!-- Auteur et Université -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Auteur *
                            </label>
                            <input type="text" v-model="dialogData.author"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Université *
                            </label>
                            <input type="text" v-model="dialogData.university"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Domaine et Année -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Domaine *
                            </label>
                            <select v-model="dialogData.domain"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
                                <option value="">Sélectionner</option>
                                <option v-for="domain in domains" :key="domain.id" :value="domain.id">
                                    {{ domain.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Année *
                            </label>
                            <input type="number" v-model="dialogData.year" :placeholder="currentYear.toString()"
                                min="2000" :max="currentYear"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Directeur et Date de soutenance -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Directeur de mémoire
                            </label>
                            <input type="text" v-model="dialogData.supervisor" placeholder="Nom du directeur"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Date de soutenance
                            </label>
                            <input type="date" v-model="dialogData.defense_date"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Mention et Statut -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Mention/Note
                            </label>
                            <input type="text" v-model="dialogData.grade" placeholder="Mention Très Bien, 16/20, etc."
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Statut
                            </label>
                            <select v-model="dialogData.status"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                                <option :value="0">En attente</option>
                                <option :value="1">Approuvé</option>
                                <option :value="2">Rejeté</option>
                            </select>
                        </div>
                    </div>

                    <!-- Abstract -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Résumé *
                        </label>
                        <textarea v-model="dialogData.abstract" rows="6" placeholder="Résumé complet du mémoire..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
                    </div>

                    <!-- Mots-clés -->
                    <!-- <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Mots-clés (séparés par des virgules)
                        </label>
                        <input type="text" v-model="keywordsInput"
                            placeholder="économie, développement, politique, analyse"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div> -->

                    <!-- Fichiers et Extensions -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>



                            <div class="mb-4">
                                <label class="block text-sm font-medium text-foreground mb-2">
                                    Image de Couverture
                                </label>
                                <div @click="triggerMainImageUpload"
                                    class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                                    <div v-if="dialogData.cover">
                                        <img :src="image" class="h-40 w-40 object-cover rounded-lg mx-auto mb-2" />
                                        <p class="text-sm text-muted-foreground">Cliquer pour changer l'image</p>
                                    </div>
                                    <div v-else>
                                        <Image name="Image" :size="40" class="mx-auto text-muted-foreground mb-2" />
                                        <p class="text-sm text-muted-foreground">Cliquer pour ajouter une image
                                            principale
                                        </p>
                                        <p class="text-xs text-muted-foreground mt-1">Taille recommandée: 800x800px</p>
                                    </div>
                                    <input type="file" ref="mainImageInput" @change="handleMainImageUpload"
                                        accept="image/*" class="hidden" />
                                </div>
                            </div>


                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-2">
                                Document
                            </label>
                            <div class="space-y-2">
                                <div @click="triggerdocumentUpload"
                                    class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                                    <div v-if="dialogData.document">
                                        <!-- <img :src="image" class="h-40 w-40 object-cover rounded-lg mx-auto mb-2" /> -->
                                        <p class="text-sm text-muted-foreground">succes ! Cliquer pour changer le
                                            fichier</p>
                                    </div>
                                    <div v-else>
                                        <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                        <p class="text-sm text-muted-foreground">Télécharger le document</p>
                                    </div>
                                    <input type="file" ref="maindocumentInput" @change="handledocumentUpload"
                                        accept="application/pdf" class="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-2 pt-4 border-t border-border">
                        <button @click="closeDialog"
                            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium">
                            Annuler
                        </button>
                        <button @click="saveMemoir"
                            class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all">
                            {{ editingMemoir ? "Enregistrer" : "Ajouter" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Plus, Search, Edit, Trash2, Download, Upload, X, Eye } from 'lucide-vue-next'

export default {
    name: 'MemoirsAdminPage',

    components: {
        Plus,
        Search,
        Edit,
        Trash2,
        Download,
        Upload,
        X,
        Eye
    },

    data() {
        return {
            searchQuery: '',
            filterStatus: 'all',
            isDialogOpen: false,
            editingMemoir: null,
            keywordsInput: '',
            image: null,

            // Données du formulaire du dialog
            dialogData: {
                title: '',
                id: null,
                slug:'',
                author: '',
                image: null,
                university: '',
                domain: '',
                year: new Date().getFullYear(),
                abstract: '',
                cover: '',
                extension: 'pdf',
                supervisor: '',
                defense_date: '',
                document: null,
                grade: '',
                status: 0
            },

            // Domaines
           

            // Auteurs
            authors: [
                { id: 1, name: "Thomas Dubois" },
                { id: 2, name: "Alice Martin" },
                { id: 3, name: "Marc Lefebvre" },
                { id: 4, name: "Sophie Bernard" }
            ],

            // Données mockées avec le nouveau format

        }
    },

    computed: {
        memoirs() {
            return this.$store.state.memoirs || []
        },
        domains(){
             return this.$store.state.adminData.domaine || []
        },
        filteredMemoirs() {
            let filtered = this.memoirs

            // Filtre par recherche
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase()
                filtered = filtered.filter(memoir =>
                    memoir.title.toLowerCase().includes(query) ||
                    memoir.university.toLowerCase().includes(query) ||
                    (memoir.author_name && memoir.author_name.toLowerCase().includes(query))
                )
            }

            // Filtre par statut
            if (this.filterStatus !== 'all') {
                filtered = filtered.filter(memoir => memoir.status === this.filterStatus)
            }

            return filtered
        },

        approvedCount() {
            return this.memoirs.filter(m => m.status === 1).length
        },

        currentYear() {
            return new Date().getFullYear()
        }
    },

    methods: {
        updateSearchQuery(event) {
            this.searchQuery = event.target.value
        },

        getDomainName(domainId) {
            const domain = this.domains.find(d => d.id === domainId)
            return domain ? domain.name : `Domaine #${domainId}`
        },

        openAddDialog() {
            this.editingMemoir = null
            this.dialogData = {
                title: '',
                author: '',
                university: '',
                domain: '',
                year: this.currentYear,
                abstract: '',
                cover: '',
                extension: 'pdf',
                document: null,
                supervisor: '',
                defense_date: '',
                grade: '',
                status: 0
            }
            this.keywordsInput = ''
            this.isDialogOpen = true
        },

        openEditDialog(memoir) {
            this.editingMemoir = memoir
            this.image = memoir.cover
            this.dialogData = {
                id: memoir.id,
                title: memoir.title,
                author: memoir.author,
                university: memoir.university,
                domain: memoir.domain,
                year: memoir.year,
                abstract: memoir.abstract,
                cover: memoir.cover || '',
                extension: memoir.extension || 'pdf',
                supervisor: memoir.supervisor || '',
                defense_date: memoir.defense_date ? memoir.defense_date.split('T')[0] : '',
                grade: memoir.grade || '',
                status: memoir.status
            }
            // this.keywordsInput = memoir.keywords ? memoir.keywords.join(', ') : ''
            this.isDialogOpen = true
        },

        closeDialog() {
            this.isDialogOpen = false
            this.editingMemoir = null
        },

        async saveMemoir() {
            // Validation
            if (!this.dialogData.title.trim()) {
                alert("Le titre est requis")
                return
            }
             if (this.dialogData.title.trim()) {
                this.dialogData.slug = this.dialogData.title
                   .toLowerCase()
    // Autorise lettres (avec accents), chiffres et tirets
    .replace(/[^a-z0-9àâäéèêëîïôöùûüç-]+/gi, '-')
    // Regroupe tous les tirets multiples en un seul
    .replace(/-+/g, '-')
    // Supprime les tirets au début et à la fin
    .replace(/^-+|-+$/g, '');
            }

            if (!this.dialogData.author) {
                alert("L'auteur est requis")
                return
            }

            if (!this.dialogData.university.trim()) {
                alert("L'université est requise")
                return
            }

            if (!this.dialogData.domain) {
                alert("Le domaine est requis")
                return
            }

            if (!this.dialogData.year || this.dialogData.year < 2000 || this.dialogData.year > this.currentYear) {
                alert("L'année est invalide")
                return
            }

            if (!this.dialogData.abstract.trim() || this.dialogData.abstract.length < 100) {
                alert("Le résumé est requis et doit contenir au moins 100 caractères")
                return
            }

            // // Convertir les mots-clés
            // const keywords = this.keywordsInput
            //     ? this.keywordsInput.split(',').map(k => k.trim()).filter(k => k)
            //     : []


            // Ajouter un nouveau mémoire
            // const author = this.authors.find(a => a.id === this.dialogData.author)
            const newMemoir = {

                ...this.dialogData,

                // keywords: keywords,

            }
            let token = localStorage.getItem('token')
            try {
                const res = await this.axios.post(
                    this.$store.state.localhost + 'saveMemoir',
                    newMemoir,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                if (res.status !== 500 || res.status !== 404 || res.status !== 401) {
                    let memoir = res.data.memoir
                      
                        memoir.cover = this.$store.state.memoircover + '/' + memoir.cover
                        memoir.domain=this.getDomainName(memoir.domain)
                    if (this.editingMemoir) {
                        //  à jour le mémoire existant
                        Object.assign(this.editingMemoir, {
                            ...this.dialogData,
                            // keywords: keywords,
                            updated_at: new Date().toISOString(),

                        })

                        // // Mettre à jour le nom d'auteur si l'auteur a changé
                        // if (this.dialogData.author) {
                        //     const author = this.authors.find(a => a.id === this.dialogData.author)
                        //     this.editingMemoir.author_name = author ? author.name : ` ${this.dialogData.author}`
                        // }

                        this.showToast("Mémoire mis à jour", "Les modifications ont été enregistrées.")
                    } else {
                        
                        this.memoirs.unshift(memoir)
                        this.showToast("Mémoire ajouté", "Le mémoire a été ajouté avec succès.")
                    }

                    this.image = null
                    this.closeDialog()

                }


            } catch (e) {
                // tu gères → plus d'erreur console
                // console.log("yo",e.message)
                this.showToast(e.message, '')
            }






        },

        viewMemoir(memoir) {
            this.$router.push(`/memoires/${memoir.slug}`)
        },

        async downloadMemoir(memoir) {
          try {

        const response = await this.axios.get(this.$store.state.localhost + 'downloadmemoir/' + memoir.id, {
          responseType: 'blob'
        })


        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url


        const filename = memoir.title+'.pdf'

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

        async changeStatus(memoir, newStatus) {
            const statusNames = { 0: 'en attente', 1: 'approuvé', 2: 'rejeté' }
            const oldStatus = memoir.status

            if (!confirm(`Changer le statut de ce mémoire de "${statusNames[oldStatus]}" à "${statusNames[newStatus]}" ?`)) {
                return
            }

            const token = localStorage.getItem('token')
            try {
                await this.axios.post(
                    this.$store.state.localhost + 'saveMemoir',
                    { id: memoir.id, status: newStatus },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                memoir.status = newStatus
                this.showToast(
                    "Statut modifié",
                    `Le mémoire a été ${statusNames[newStatus]}.`
                )
            } catch (error) {
                console.error('Erreur lors du changement de statut:', error)
                alert("Impossible de modifier le statut du mémoire")
            }
        },

        async deleteMemoir(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce mémoire ?")) {
                let token = localStorage.getItem('token')
                await this.axios.delete(this.$store.state.localhost + `deleteMemoir/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    this.$store.commit('deleteMemoir', id)
                    this.showToast("Mémoire supprimé", "Le mémoire a été supprimé avec succès.")
                })


            }
        },

        triggerMainImageUpload() {
            this.$refs.mainImageInput.click()
        },
        handleMainImageUpload(event) {
            const file = event.target.files[0]

            if (file) {
                this.dialogData.cover = file
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = e.target.result
                }
                //  console.log( this.dialogData.mainImage)
                reader.readAsDataURL(file)
            }
        },
        triggerdocumentUpload() {
            this.$refs.maindocumentInput.click()
        },
        handledocumentUpload(event) {
            const file = event.target.files[0]

            if (file) {
                this.dialogData.document = file
                // const reader = new FileReader()
                // reader.onload = (e) => {
                //     this.document = e.target.result
                // }
                //  console.log( this.dialogData.mainImage)
                // reader.readAsDataURL(file)
            }
        },

         showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
        }
    },

    mounted() {
       
    }
}
</script>
