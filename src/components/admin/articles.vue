<template>
  <div class="animate-fade-in space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-foreground">Gestion des Articles</h1>
        <p class="text-muted-foreground mt-1">
          {{ filteredArticles.length }} article{{
            filteredArticles.length !== 1 ? "s" : ""
          }}
          • {{ publishedCount }} publié{{ publishedCount !== 1 ? "s" : "" }}
        </p>
      </div>
      <button
        @click="openAddDialog"
        class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
      >
        <Plus class="w-4 h-4" />
        Nouvel article
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search -->
      <div class="relative max-w-md">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Rechercher un article..."
          :value="searchQuery"
          @input="updateSearchQuery"
          class="w-full pl-10 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Status Filter -->
      <div class="flex gap-2">
        <button
          @click="filterStatus = 'all'"
          :class="
            filterStatus === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground'
          "
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Tous
        </button>
        <button
          @click="filterStatus = 1"
          :class="
            filterStatus === 1
              ? 'bg-green-600 text-white'
              : 'bg-secondary text-foreground'
          "
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Publiés
        </button>
        <button
          @click="filterStatus = 0"
          :class="
            filterStatus === 0
              ? 'bg-gray-600 text-white'
              : 'bg-secondary text-foreground'
          "
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Brouillons
        </button>
        <button
          @click="filterStatus = 2"
          :class="
            filterStatus === 2
              ? 'bg-blue-600 text-white'
              : 'bg-secondary text-foreground'
          "
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Archivés
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-card rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-3 px-4 font-semibold text-sm">Statut</th>
            <th class="w-20 text-left py-3 px-4 font-semibold text-sm">
              Image
            </th>
            <th class="text-left py-3 px-4 font-semibold text-sm">
              Titre/Slug
            </th>

            <th class="text-left py-3 px-4 font-semibold text-sm">Date</th>
            <th class="text-left py-3 px-4 font-semibold text-sm">Vues</th>
            <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in filteredArticles"
            :key="article.id"
            class="border-b border-border hover:bg-secondary/50"
          >
            <td class="py-3 px-4">
              <div class="flex flex-col gap-1">
                <span
                  v-if="article.featured"
                  class="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded text-center"
                >
                  ★
                </span>
                <span
                  v-if="article.status === 0"
                  class="text-xs px-2 py-1 bg-gray-500/10 text-gray-600 rounded text-center"
                >
                  B
                </span>
                <span
                  v-if="article.status === 1"
                  class="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded text-center"
                >
                  P
                </span>
                <span
                  v-if="article.status === 2"
                  class="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-center"
                >
                  A
                </span>
              </div>
            </td>
            <td class="py-3 px-4">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-16 h-10 rounded object-cover"
              />
            </td>
            <td class="py-3 px-4">
              <div>
                <div class="font-medium">{{ article.title }}</div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ article.slug }}
                </div>
              </div>
            </td>

            <td class="py-3 px-4">
              {{ formatDate(article.published_date, "short") }}
            </td>
            <td class="py-3 px-4">
              {{ article.views_count }}
            </td>
            <td class="py-3 px-4 text-right">
              <div class="flex items-center justify-end gap-1">
                <button
                  @click="viewArticle(article)"
                  class="p-2 text-foreground hover:bg-secondary rounded-md"
                  title="Voir"
                >
                  <Eye class="w-4 h-4" />
                </button>
                <button
                  @click="openEditDialog(article)"
                  class="p-2 text-foreground hover:bg-secondary rounded-md"
                  title="Éditer"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <!-- <button @click="toggleFeatured(article)"
                                    :class="article.featured ? 'text-yellow-600' : 'text-muted-foreground'"
                                    class="p-2 hover:bg-secondary rounded-md" title="Mettre en vedette">
                                    <Star class="w-4 h-4" />
                                </button> -->
                <button
                  @click="deleteArticle(article.id)"
                  class="p-2 text-destructive hover:bg-secondary rounded-md"
                  title="Supprimer"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Article Dialog -->
  </div>
  <div
    v-if="isDialogOpen"
    class="fixed inset-0 w-full h-screen z-50 animate-fade-in bg-foreground/80 flex items-center justify-center p-4"
    @click="closeDialog"
  >
    <div
      class="relative bg-card rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <button
        @click="closeDialog"
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
      <div class="p-6">
        <h2 class="text-xl font-semibold text-foreground mb-6">
          {{ editingArticle ? "Modifier l'article" : "Nouvel article" }}
        </h2>
        <div class="space-y-4">
          <!-- Titre et Slug -->
          <div class="">
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Titre *
              </label>
              <input
                type="text"
                v-model="dialogData.title"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <!-- <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Slug
                            </label>
                            <input type="text" v-model="dialogData.slug"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div> -->
          </div>

          <!-- Catégorie, Statut et Auteur -->
          <div class="">
              <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Auteur
                            </label>
                            <input type="text" v-model="dialogData.author"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
            <!-- <div>
                            <label class="text-sm font-medium leading-none block mb-1">
                                Catégorie *
                            </label>
                            <select v-model="dialogData.category"
                                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
                                <option value="">Sélectionner</option>
                                <option v-for="cat in articleCategories" :key="cat" :value="cat">
                                    {{ cat }}
                                </option>
                            </select>
                        </div> -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Statut *
              </label>
              <select
                v-model="dialogData.status"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option :value="0">Brouillon</option>
                <option :value="1">Publié</option>
                <option :value="2">Archivé</option>
              </select>
            </div>
          </div>

          <!-- Extrait et Contenu -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Extrait *
            </label>
            <textarea
              v-model="dialogData.excerpt"
              rows="2"
              placeholder="Court résumé de l'article..."
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
          </div>
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Contenu *
            </label>
            
            <textarea v-model="dialogData.content" id="editor" rows="8" placeholder="Contenu complet de l'article..."
                            class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
          </div>

          <!-- Tags -->
          <div>
            <label class="text-sm font-medium leading-none block mb-1">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              v-model="tagsInput"
              placeholder="philosophie, nouveautés, livres"
              class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <!-- SEO -->
          <div class="space-y-4 p-4 bg-secondary/30 rounded-lg">
            <h3 class="text-sm font-medium text-foreground">SEO</h3>
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Meta Title
              </label>
              <input
                type="text"
                v-model="dialogData.meta_title"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Meta Description
              </label>
              <textarea
                v-model="dialogData.meta_description"
                rows="2"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              ></textarea>
            </div>
          </div>

          <!-- Image et Document -->
          <div class=" ">
            <div class="mb-4">
              <label class="block text-sm font-medium text-foreground mb-2">
                Image principale
              </label>
              <div
                @click="triggerMainImageUpload"
                class="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-ring transition-normal"
              >
                <div v-if="dialogData.image">
                  <img
                    :src="image"
                    class="h-40 w-40 object-cover rounded-lg mx-auto mb-2"
                  />
                  <p class="text-sm text-muted-foreground">
                    Cliquer pour changer l'image
                  </p>
                </div>
                <div v-else>
                  <Image
                    name="Image"
                    :size="40"
                    class="mx-auto text-muted-foreground mb-2"
                  />
                  <p class="text-sm text-muted-foreground">
                    Cliquer pour ajouter une image principale
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    Taille recommandée: 800x800px
                  </p>
                </div>
                <input
                  type="file"
                  ref="mainImageInput"
                  @change="handleMainImageUpload"
                  accept="image/*"
                  class="hidden"
                />
              </div>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="dialogData.featured"
                class="rounded border-input text-primary focus:ring-ring"
              />
              <span class="text-sm font-medium">Mettre en vedette</span>
            </label>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-4 border-t border-border">
            <button
              @click="closeDialog"
              class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
            >
              Annuler
            </button>
            <button
              @click="saveArticle"
              class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all"
            >
              {{ editingArticle ? "Enregistrer" : "Créer" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
    
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
  Star,
} from "lucide-vue-next";

export default {
  name: "ArticlesAdminPage",

  components: {
    Plus,
  
    Search,
    Edit,
    Trash2,
    Eye,
    Upload,
    X,
    Star,
  },

  data() {
    return {
         editorOptions: {
        placeholder: "Écris ton article ici...",
        theme: "snow"
      },
      searchQuery: "",
      filterStatus: "all",
      isDialogOpen: false,
      editingArticle: null,

      // Catégories d'articles
      articleCategories: [
        "Actualités",
        "Événements",
        "Distinctions",
        "Nouveautés",
        "Innovation",
        "Partenariats",
      ],
      image: null,
      // Données du formulaire du dialog
      dialogData: {
        title: "",
        slug: "",
        category: "",
        author: '', // ID d'auteur
        excerpt: "",
        image: null,
        content: "",
        document: "",
        published_date: "",
        meta_title: "",
        meta_description: "",
        reading_time: 5,
        status: 0, // Brouillon par défaut
        featured: false,
      },

      tagsInput: "",

      // Données mockées des articles avec le nouveau format
    };
  },

  computed: {
    articles() {
      return this.$store.state.articles;
    },
    // Articles filtrés
    filteredArticles() {
      let filtered = this.articles;

      // Filtre par recherche
      if (this.searchQuery) {
        filtered = filtered.filter(
          (article) =>
            article.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            article.slug.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Filtre par statut
      if (this.filterStatus !== "all") {
        filtered = filtered.filter(
          (article) => article.status === this.filterStatus
        );
      }

      return filtered;
    },

    // Compte des articles publiés
    publishedCount() {
      return this.articles.filter((a) => a.status === 1).length;
    },
  },

  methods: {
    updateSearchQuery(event) {
      this.searchQuery = event.target.value;
    },

    formatDate(dateString, format = "short") {
      if (!dateString) return "Non publié";
      const date = new Date(dateString);
      const options =
        format === "short"
          ? { day: "numeric", month: "short", year: "numeric" }
          : {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            };
      return date.toLocaleDateString("fr-FR", options);
    },

    openAddDialog() {
      this.editingArticle = null;
      this.dialogData = {
        title: "",
        slug: "",
        category: "",
        author: '',
        excerpt: "",
        content: "",
        document: "",
        published_date: new Date().toISOString().slice(0, 16),
        meta_title: "",
        meta_description: "",
        reading_time: 5,
        status: 0,
        featured: false,
      };
      this.tagsInput = "";
      this.isDialogOpen = true;
    },

    openEditDialog(article) {
      this.editingArticle = article;
      this.image = this.$store.state.articlecover + "/" + article.image;
      this.dialogData = {
        title: article.title,
        slug: article.slug,
        category: article.category,
        author: article.author,

        excerpt: article.excerpt,
        content: article.content || "",
        image: article.image || "",
        published_date: article.published_date
          ? article.published_date.slice(0, 16)
          : "",
        meta_title: article.meta_title || "",
        meta_description: article.meta_description || "",
        reading_time: article.reading_time || 5,
        status: article.status,
        featured: article.featured || false,
      };
      this.tagsInput = article.tags ? article.tags.join(", ") : "";
      this.isDialogOpen = true;
    },

    closeDialog() {
      this.isDialogOpen = false;
      this.editingArticle = null;
    },

    async saveArticle() {
      // Validation
      if (!this.dialogData.title.trim()) {
        alert("Le titre est requis");
        return;
      }

      // if (!this.dialogData.category) {
      //     alert("La catégorie est requise")
      //     return
      // }

      if (!this.dialogData.excerpt.trim()) {
        alert("L'extrait est requis");
        return;
      }

      // Générer le slug si vide
      if (this.dialogData.title) {
        this.dialogData.slug = this.dialogData.title
         .toLowerCase()
    // Autorise lettres (avec accents), chiffres et tirets
    .replace(/[^a-z0-9àâäéèêëîïôöùûüç-]+/gi, '-')
    // Regroupe tous les tirets multiples en un seul
    .replace(/-+/g, '-')
    // Supprime les tirets au début et à la fin
    .replace(/^-+|-+$/g, '');
      }

      // Convertir les tags
      const tags = this.tagsInput
        ? this.tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      // Ajouter un nouvel article
      const newArticle = {
        ...this.dialogData,
        tags: tags,
        id: this.editingArticle ? this.editingArticle.id : null,
      };
      let token = localStorage.getItem("token");

      try {
        const res = await this.axios.post(
          this.$store.state.localhost + "saveArticle",
          newArticle,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status !== 500 || res.status !== 404 || res.status !== 401) {
          let article = res.data.article;

          article.image = res.data.article.image;
          // article.domain=this.getDomainName(article.domain)
          if (this.editingArticle) {
            // Mettre à jour l'article existant
            Object.assign(this.editingArticle, {
              ...this.dialogData,
              tags: tags,
              updated_at: new Date().toISOString(),
            });
            this.showToast(
              "Article mis à jour",
              "Les modifications ont été enregistrées."
            );
          } else {
            this.articles.unshift(article);
          }
          this.image = null;
          this.closeDialog();
          // this.showToast("Article créé", "L'article a été créé avec succès.")
        }
      } catch (e) {
        // tu gères → plus d'erreur console
        // console.log("yo",e.message)
        this.showToast(e.message, "");
      }

      // }catch(()=>{

      // })
    },

    viewArticle(article) {
      this.$router.push(`/actualites/${article.slug}`);
    },

    async toggleFeatured(article) {
      const newFeatured = !article.featured;
      const token = localStorage.getItem("token");
      try {
        await this.axios.post(
          this.$store.state.localhost + "saveArticle",
          { id: article.id, featured: newFeatured },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        article.featured = newFeatured;
        this.showToast(
          newFeatured ? "Mis en vedette" : "Retiré des vedettes",
          `L'article "${article.title}" a été ${
            newFeatured ? "mis en vedette" : "retiré des vedettes"
          }.`
        );
      } catch (error) {
        console.error("Erreur lors du changement de vedette:", error);
        alert("Impossible de modifier l'article");
      }
    },

    async deleteArticle(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        let token = localStorage.getItem("token");
        await this.axios
          .delete(this.$store.state.localhost + `deleteArticle/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            this.$store.commit("deleteArticle", id);
            this.showToast(
              "Article supprimé",
              "L'article a été supprimé avec succès."
            );
          });
      }
    },

     showToast(title, description) {
            let message={
                title:title,
                description:description
            }
            this.$emit('showtoast',message)
            
        },
    triggerMainImageUpload() {
      this.$refs.mainImageInput.click();
    },
    handleMainImageUpload(event) {
      const file = event.target.files[0];

      if (file) {
        this.dialogData.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        //  console.log( this.dialogData.mainImage)
        reader.readAsDataURL(file);
      }
    },
  },

  mounted() {
 
  },
};
</script>