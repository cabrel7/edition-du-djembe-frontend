<template>
    <div class="animate-fade-in space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-foreground">Gestion des Livres</h1>
                <p class="text-muted-foreground mt-1">
                    {{ filteredBooks.length }} livre{{ filteredBooks.length !== 1 ? 's' : '' }}
                    • {{ inStockCount }} en stock
                </p>
            </div>
            <button @click="openAddDialog"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Ajouter un livre
            </button>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="relative max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Rechercher par titre, ISBN ou auteur..." :value="searchQuery"
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
                <button @click="filterStatus = true"
                    :class="filterStatus === true ? 'bg-green-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Actifs
                </button>
                <button @click="filterStatus = false"
                    :class="filterStatus === false ? 'bg-gray-600 text-white' : 'bg-secondary text-foreground'"
                    class="px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Inactifs
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-card rounded-lg shadow overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-border">
                        <th class="w-20 text-left py-3 px-4 font-semibold text-sm">Couverture</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Titre/ISBN</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Auteur</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Catégorie</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Prix/Stock</th>
                        <th class="text-left py-3 px-4 font-semibold text-sm">Publication</th>
                        <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in filteredBooks" :key="book.id"
                        class="border-b border-border hover:bg-secondary/50">
                        <td class="py-3 px-4">
                            <img :src="book.cover" :alt="book.title" class="w-12 h-16 rounded object-cover" />
                        </td>
                        <td class="py-3 px-4">
                            <div class="font-medium">{{ book.title }}</div>
                            <div class="text-xs text-muted-foreground mt-1">{{ book.isbn }}</div>
                        </td>
                        <td class="py-3 px-4">{{ book.author_name || ` ${book.author}` }}</td>
                        <td class="py-3 px-4">
                            <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {{ getCategoryName(book.category) }}
                            </span>
                        </td>
                        <td class="py-3 px-4">
                            <div class="font-medium">{{ book.price }} €</div>
                            <div class="text-xs" :class="getStockClass(book.stock_quantity)">
                                {{ book.stock_quantity !== null ? `${book.stock_quantity} en stock` : 'Stock illimité'
                                }}
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <div>{{ formatDate(book.published_date, 'short') }}</div>
                            <div class="text-xs text-muted-foreground">{{ book.language.toUpperCase() }}</div>
                        </td>
                        <td class="py-3 px-4 text-right">
                            <div class="flex items-center justify-end gap-1">
                                <button @click="viewBook(book)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Voir">
                                    <Eye class="w-4 h-4" />
                                </button>
                                <button @click="openEditDialog(book)"
                                    class="p-2 text-foreground hover:bg-secondary rounded-md" title="Éditer">
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button @click="toggleStatus(book)"
                                    :class="book.status ? 'text-green-600' : 'text-gray-600'"
                                    class="p-2 hover:bg-secondary rounded-md"
                                    :title="book.status ? 'Désactiver' : 'Activer'">
                                    <span v-if="book.status">✓</span>
                                    <span v-else>✗</span>
                                </button>
                                <button @click="deleteBook(book.id)"
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
    <!-- Book Dialog -->
    <div v-if="isDialogOpen"
        class="fixed inset-0 animate-fade-in z-50 bg-foreground/80 w-full h-screen flex items-center justify-center p-4"
        @click="closeDialog">
        <div class="relative bg-card rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop>
            <button @click="closeDialog"
                class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <X class="w-4 h-4" />
            </button>
            <div class="p-6">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                    {{ editingBook ? "Modifier le livre" : "Ajouter un livre" }}
                </h2>
                <div class="space-y-4">
                    <!-- Titre et ISBN -->
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
                                ISBN *
                            </label>
                            <input type="text" v-model="dialogData.isbn"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Auteur et Catégorie -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Auteur *
                        </label>
                        <input type="text" v-model="dialogData.author"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Catégorie *
                        </label>
                        <select v-model="dialogData.category"
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
                            <option value="">Sélectionner</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                {{ cat.name }} (ID: {{ cat.id }})
                            </option>
                        </select>
                    </div>


                    <!-- Prix, Pages et Stock -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Prix (€) *
                            </label>
                            <input type="number" step="0.01" min="0" v-model="dialogData.price"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Nombre de pages *
                            </label>
                            <input type="number" min="1" v-model="dialogData.pages"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Quantité en stock
                            </label>
                            <input type="number" min="0" v-model="dialogData.stock_quantity"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Date et Langue -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Date de publication
                            </label>
                            <input type="date" v-model="dialogData.published_date"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Langue *
                            </label>
                            <select v-model="dialogData.language"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                                <option value="fr">Français</option>
                                <option value="en">Anglais</option>
                                <option value="es">Espagnol</option>
                                <option value="de">Allemand</option>
                                <option value="it">Italien</option>
                            </select>
                        </div>
                    </div>

                    <!-- Éditeur et Édition -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Éditeur
                            </label>
                            <input type="text" v-model="dialogData.publisher"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Édition
                            </label>
                            <input type="text" v-model="dialogData.edition"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Description *
                        </label>
                        <textarea v-model="dialogData.description" rows="4"
                            placeholder="Description complète du livre..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
                    </div>




                    <!-- Uploads et Options -->
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
                            <label class="text-sm font-medium leading-none block mb-1">
                                Extrait du livre
                            </label>
                            <div class="space-y-2">
                                <div @click="triggerdocumentextraitUpload"
                                    class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                                    <div v-if="dialogData.extraitdocument">
                                      <FileText class="w-12 mx-auto h-12 text-primary mb-4" />
                                        <p class="text-sm text-muted-foreground">{{ extraitname }} Cliquer pour changer le
                                            fichier</p>
                                    </div>
                                    <div v-else>
                                        <Upload class="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                        <p class="text-sm text-muted-foreground">Télécharger le document</p>
                                    </div>
                                    <input type="file" ref="extraitdocumentInput" @change="handledocumentextraitUpload"
                                        accept="application/pdf" class="hidden" />
                                </div>
                            </div>
                        </div>

                    </div>
                     <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Document Complet
                            </label>
                            <div class="space-y-2">
                                <div @click="triggerdocumentUpload"
                                    class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal">
                                    <div v-if="dialogData.document">
                                        <FileText class="w-12 mx-auto h-12  text-primary mb-4" />
                                        <p class="text-sm text-muted-foreground">  {{fileName}}Cliquer pour changer le
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
                    <div>
                        <label class="text-sm font-medium leading-none block mb-1">
                            Statut
                        </label>
                        <div class="space-y-2 mt-2">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" v-model="dialogData.status" :true-value="1" :false-value="0"
                                    class="rounded border-input text-primary focus:ring-ring" />
                                <span class="text-sm font-medium">Actif</span>
                            </label>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-2 pt-4 border-t border-border">
                        <button @click="closeDialog"
                            class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium">
                            Annuler
                        </button>
                        <button @click="saveBook"
                            class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all">
                            {{ editingBook ? "Enregistrer" : "Ajouter" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { Plus, Search, Edit, Trash2,FileText, Eye, Upload, X } from 'lucide-vue-next'

export default {
    name: 'BooksAdminPage',

    components: {
        Plus,
        FileText,
        Search,
        Edit,
        Trash2,
        Eye,
        Upload,
        X
    },

    data() {
        return {
            searchQuery: '',
            filterStatus: 'all',
            isDialogOpen: false,
            editingBook: null,
            image: null,
            fileName :'',
            extraitname:'',
            // Données du formulaire du dialog
            dialogData: {
                title: '',
                author: '', // ID d'auteur
                category: '',
                extraitdocument:null,
                cover: '',
                description: '',
                published_date: '',
                price: 0,
                isbn: '',
                slug:'',
                pages: 0,
                document: null,
                stock_quantity: null,
                language: 'fr',
                publisher: '',
                edition: '',
                rating: null,
                status: 1
            },

            // Catégories avec IDs
            

            // Auteurs avec IDs
            authors: [
                { id: 1, name: "Jean Dupont" },
                { id: 2, name: "Marie Laurent" },
                { id: 3, name: "Pierre Martin" },
                { id: 4, name: "Sophie Bernard" },
                { id: 5, name: "Luc Moreau" }
            ],

            // Données mockées avec le nouveau format
          
        }
    },

    computed: {
        // Livres filtrés
         books(){
            return this.$store.state.books|| []
        },
        categories(){
            return this.$store.state.adminData.categories|| []
        },
        filteredBooks() {
            let filtered = this.books

            // Filtre par recherche
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase()
                filtered = filtered.filter(book =>
                    book.title.toLowerCase().includes(query) ||
                    book.isbn.toLowerCase().includes(query) ||
                    (book.author_name && book.author_name.toLowerCase().includes(query))
                )
            }

            // Filtre par statut
            if (this.filterStatus !== 'all') {
                filtered = filtered.filter(book => book.status === this.filterStatus)
            }

            return filtered
        },

        // Compte des livres en stock
        inStockCount() {
            return this.books.filter(b => b.stock_quantity === null || b.stock_quantity > 0).length
        }
    },

    methods: {
        // Mise à jour de la recherche
        updateSearchQuery(event) {
            this.searchQuery = event.target.value
        },

        // Formatage des dates
        formatDate(dateString, format = 'short') {
            if (!dateString) return 'Non publié'
            const date = new Date(dateString)
            const options = format === 'short'
                ? { day: 'numeric', month: 'short', year: 'numeric' }
                : { day: 'numeric', month: 'long', year: 'numeric' }
            return date.toLocaleDateString('fr-FR', options)
        },

        // Obtenir le nom de la catégorie
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId)
            return category ? category.name : `ID: ${categoryId}`
        },

        // Classe CSS pour le stock
        getStockClass(stock) {
            if (stock === null) return 'text-blue-600'
            if (stock === 0) return 'text-red-600'
            if (stock < 10) return 'text-yellow-600'
            return 'text-green-600'
        },

        // Ouvrir le dialog d'ajout
        openAddDialog() {
            this.editingBook = null
            this.dialogData = {
                title: '',
                extraitdocument:null,
                author: '',
                category: '',
                cover: '',
                description: '',
                published_date: new Date().toISOString().split('T')[0],
                price: 0,
                isbn: '',
                pages: 0,
                document: null,
                stock_quantity: null,
                language: 'fr',
                publisher: '',
                edition: '',

                status: 1
            }
            this.isDialogOpen = true
        },

        // Ouvrir le dialog d'édition
        openEditDialog(book) {
            this.editingBook = book
            this.image=book.cover
            this.dialogData = {
                extraitdocument:book.extraitdocument ||'',
                title: book.title,
                author: book.author,
                category: book.category,
                cover: book.cover || '',
                description: book.description,
                published_date: book.published_date ?
                    book.published_date.split('T')[0] : '',
                price: book.price,
                isbn: book.isbn,
                pages: book.pages,
                document: book.document || '',
                stock_quantity: book.stock_quantity,
                language: book.language,
                publisher: book.publisher || '',
                edition: book.edition || '',
                id: book.id,
                status: book.status
            }
            this.isDialogOpen = true
        },

        // Fermer le dialog
        closeDialog() {
            this.isDialogOpen = false
            this.editingBook = null
        },

        // Sauvegarder le livre
        async saveBook() {
            // Validation
            if (!this.dialogData.title.trim()) {
                alert("Le titre est requis")
                return
            }
             if ( this.dialogData.title.trim()) {
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

            if (!this.dialogData.category) {
                alert("La catégorie est requise")
                return
            }

            if (!this.dialogData.isbn.trim()) {
                alert("L'ISBN est requis")
                return
            }

            if (!this.dialogData.price || this.dialogData.price <= 0) {
                alert("Le prix est requis et doit être positif")
                return
            }

            if (!this.dialogData.pages || this.dialogData.pages <= 0) {
                alert("Le nombre de pages est requis")
                return
            }

            if (!this.dialogData.description.trim()) {
                alert("La description est requise")
                return
            }

            
                // Ajouter un nouveau livre
               
                const newBook = {

                    ...this.dialogData,

                }
                let token = localStorage.getItem('token')
                try {
                    const res = await this.axios.post(
                        this.$store.state.localhost + 'saveBook',
                        newBook,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    )

                    if (res.status !== 500 || res.status !== 404 || res.status !== 401) {
                          let book = res.data.book
                      
                        book.cover = this.$store.state.bookcover + '/' + book.cover
                        book.category=this.getCategoryName(book.category)
                        if (this.editingBook) {
                // Mettre à jour le livre existant
                Object.assign(this.editingBook, {
                    ...this.dialogData,
                    updated_at: new Date().toISOString()
                })
                this.showToast("Livre mis à jour", "Les modifications ont été enregistrées.")
            } else{
                 this.books.unshift(book)
                        this.image = null
                          this.showToast("Livre ajouté", "Le livre a été ajouté avec succès.")
            }
                       
                        this.closeDialog()

                      
                    }
                    console.log(res)

                } catch (e) {
                    // tu gères → plus d'erreur console
                    // console.log("yo",e.message)
                    this.showToast(e.message, '')
                }

            

            this.closeDialog()
        },

        // Voir un livre
        viewBook(book) {
            this.$router.push(`/catalogue/${book.id}`)
        },

        // Changer le statut
        toggleStatus(book) {
            book.status = !book.status
            this.showToast(
                book.status ? "Activé" : "Désactivé",
                `Le livre "${book.title}" a été ${book.status ? 'activé' : 'désactivé'}.`
            )
        },

        // Supprimer un livre
      async  deleteBook(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
                
                   let token =localStorage.getItem('token')
                await this.axios.delete(this.$store.state.localhost+`deleteBook/${id}`, {headers:{
                    Authorization: `Bearer ${token}`
                }}).then(()=>{
                    this.$store.commit('deleteBook', id)
                this.showToast("Livre supprimé", "Le livre a été supprimé avec succès.")
                })
                
            }
        },

        // Upload image de couverture
        uploadCoverImage() {
            alert("Fonctionnalité d'upload d'image de couverture (à implémenter)")
        },

        // Afficher une notification
        showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
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
        }
        , triggerdocumentUpload() {
            this.$refs.maindocumentInput.click()
        },
        handledocumentUpload(event) {
            const file = event.target.files[0]

            if (file) {
                this.dialogData.document = file
                  this.fileName = file.name
               
            }
        },
        triggerdocumentextraitUpload() {
            this.$refs.extraitdocumentInput.click()
        },
        handledocumentextraitUpload(event) {
            const file = event.target.files[0]

            if (file) {
                this.dialogData.extraitdocument = file
                  this.extraitname = file.name
                
            }
        }
    },

    mounted() {
     
    }
}
</script>