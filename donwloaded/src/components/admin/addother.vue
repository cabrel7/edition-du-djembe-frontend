<template>
  <div class="animate-fade-in space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Équipe & Partenaires</h1>
        <p class="text-muted-foreground mt-1">
          Gérez les membres de l'équipe et vos partenaires
        </p>
      </div>
    </div>

    <!-- Team Members Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">Membres de l'équipe</h2>
        <button 
          @click="openTeamDialog"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <UserPlus class="w-4 h-4" />
          Ajouter un membre
        </button>
      </div>

      <!-- Team Members Grid -->
      <div v-if="teamMembers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="member in teamMembers" 
          :key="member.id"
          class="bg-card rounded-lg overflow-hidden card-shadow hover-lift transition-all"
        >
          <div class="p-6">
            <!-- Avatar -->
            <div class="flex items-start gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="member.photo" 
                    :src="member.photo" 
                    :alt="member.nom"
                    class="w-full h-full object-cover"
                  />
                  <User class="w-8 h-8 text-primary" v-else />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-foreground">{{ member.prenom }} {{ member.nom }}</h3>
                <p class="text-sm text-primary font-medium">{{ member.role }}</p>
                <p v-if="member.email" class="text-xs text-muted-foreground mt-1">{{ member.email }}</p>
              </div>
            </div>

            <!-- Bio -->
            <p v-if="member.bio" class="text-sm text-muted-foreground line-clamp-2 mb-4">
              {{ member.bio }}
            </p>

            <!-- Social Links -->
            <div v-if="member.social_links && member.social_links.length > 0" class="flex gap-2 mb-4">
              <a 
                v-for="link in member.social_links" 
                :key="link.platform"
                :href="link.url"
                target="_blank"
                class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                :title="link.platform"
              >
                <Globe class="w-4 h-4 text-muted-foreground" />
              </a>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-2">
              <button 
                @click="openTeamDialog(member)"
                class="p-2 text-foreground hover:bg-secondary rounded-md"
                title="Modifier"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button 
                @click="deleteTeamMember(member.id)"
                class="p-2 text-destructive hover:bg-secondary rounded-md"
                title="Supprimer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Team State -->
      <div v-else class="bg-secondary rounded-lg p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-muted-foreground/50">
          <Users class="w-full h-full" />
        </div>
        <p class="text-lg text-muted-foreground mb-2">Aucun membre d'équipe</p>
        <p class="text-sm text-muted-foreground">Ajoutez votre premier membre d'équipe</p>
      </div>
    </div>

    <!-- Partners Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">Partenaires</h2>
        <button 
          @click="openPartnerDialog"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Building2 class="w-4 h-4" />
          Ajouter un partenaire
        </button>
      </div>

      <!-- Partners Grid -->
      <div v-if="partners.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="partner in partners" 
          :key="partner.id"
          class="bg-card rounded-lg overflow-hidden card-shadow hover-lift transition-all"
        >
          <div class="p-6">
            <!-- Partner Logo -->
            <div class="flex items-center justify-center mb-4">
              <div class="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                <img 
                  v-if="partner.image" 
                  :src="partner.image" 
                  :alt="partner.nom"
                  class="w-full h-full object-contain p-2"
                />
                <Building2 class="w-12 h-12 text-muted-foreground" v-else />
              </div>
            </div>

            <!-- Partner Info -->
            <div class="text-center">
              <h3 class="text-lg font-semibold text-foreground mb-2">{{ partner.nom }}</h3>
              <p v-if="partner.website" class="text-sm text-primary mb-1">
                <a :href="partner.website" target="_blank" class="hover:underline">
                  Site web
                </a>
              </p>
              <p v-if="partner.description" class="text-xs text-muted-foreground line-clamp-2">
                {{ partner.description }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-center gap-2 mt-4">
              <button 
                @click="openPartnerDialog(partner)"
                class="p-2 text-foreground hover:bg-secondary rounded-md"
                title="Modifier"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button 
                @click="deletePartner(partner.id)"
                class="p-2 text-destructive hover:bg-secondary rounded-md"
                title="Supprimer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Partners State -->
      <div v-else class="bg-secondary rounded-lg p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-muted-foreground/50">
          <Handshake class="w-full h-full" />
        </div>
        <p class="text-lg text-muted-foreground mb-2">Aucun partenaire</p>
        <p class="text-sm text-muted-foreground">Ajoutez votre premier partenaire</p>
      </div>
    </div>

    <!-- Team Member Dialog -->
    <div 
      v-if="showTeamDialog"
      class="fixed inset-0 animate-fade-in z-50 bg-foreground/80 w-full h-screen flex items-center justify-center p-4"
      @click="closeDialog"
    >
      <div 
        class="relative bg-card rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
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
            {{ editingTeamMember ? "Modifier le membre" : "Nouveau membre d'équipe" }}
          </h2>
          <div class="space-y-4">
            <!-- Nom et Prénom -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium leading-none block mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  v-model="teamData.nom"
                  placeholder="Dupont"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label class="text-sm font-medium leading-none block mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  v-model="teamData.prenom"
                  placeholder="Jean"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <!-- Email et Rôle -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium leading-none block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  v-model="teamData.email"
                  placeholder="jean.dupont@email.com"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label class="text-sm font-medium leading-none block mb-1">
                  Rôle *
                </label>
                <select 
                  v-model="teamData.role"
                  class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="Directeur">Directeur</option>
                  <option value="Éditeur">Éditeur</option>
                  <option value="Correcteur">Correcteur</option>
                  <option value="Graphiste">Graphiste</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Support">Support</option>
                  <option value="Développeur">Développeur</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            <!-- Photo -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Photo
              </label>
              <div class="flex items-center gap-4">
                <div 
                  class="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
                >
                  <img 
                    v-if="teamData.photo" 
                    :src="teamData.photo" 
                    :alt="teamData.prenom"
                    class="w-full h-full object-cover"
                  />
                  <User class="w-10 h-10 text-muted-foreground" v-else />
                </div>
                <div class="flex-1">
                  <input
                    type="text"
                    v-model="teamData.photo"
                    placeholder="URL de la photo..."
                    class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button 
                    @click="uploadPhoto"
                    class="mt-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium inline-flex items-center gap-1"
                  >
                    <Upload class="w-3 h-3" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>

            <!-- Bio -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Bio
              </label>
              <textarea
                v-model="teamData.bio"
                rows="3"
                placeholder="Courte description..."
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              ></textarea>
            </div>

            <!-- Social Links -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Liens sociaux
              </label>
              <div class="space-y-2">
                <div 
                  v-for="(link, index) in teamData.social_links" 
                  :key="index"
                  class="flex gap-2"
                >
                  <select 
                    v-model="link.platform"
                    class="w-32 py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Site web">Site web</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <input
                    type="text"
                    v-model="link.url"
                    placeholder="URL..."
                    class="flex-1 py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button 
                    @click="removeSocialLink(index)"
                    class="p-2 text-destructive hover:bg-secondary rounded-md"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                <button 
                  @click="addSocialLink"
                  class="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Plus class="w-3 h-3" />
                  Ajouter un lien social
                </button>
              </div>
            </div>

            <!-- Ordre d'affichage -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Ordre d'affichage
              </label>
              <input
                type="number"
                v-model="teamData.display_order"
                min="1"
                class="w-32 py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p class="text-xs text-muted-foreground mt-1">
                Définit l'ordre d'affichage (1 = premier)
              </p>
            </div>

            <!-- Statut -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Statut
              </label>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="teamData.is_active" 
                    :value="true"
                    class="rounded-full border-input text-primary focus:ring-ring" 
                  />
                  <span class="text-sm font-medium">Actif</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="teamData.is_active" 
                    :value="false"
                    class="rounded-full border-input text-primary focus:ring-ring" 
                  />
                  <span class="text-sm font-medium">Inactif</span>
                </label>
              </div>
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
                @click="saveTeamMember"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all"
              >
                {{ editingTeamMember ? "Enregistrer" : "Ajouter" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Partner Dialog -->
    <div 
      v-if="showPartnerDialog"
      class="fixed inset-0 animate-fade-in z-50 bg-foreground/80 w-full h-screen flex items-center justify-center p-4"
      @click="closeDialog"
    >
      <div 
        class="relative bg-card rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
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
            {{ editingPartner ? "Modifier le partenaire" : "Nouveau partenaire" }}
          </h2>
          <div class="space-y-4">
            <!-- Nom -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Nom du partenaire *
              </label>
              <input
                type="text"
                v-model="partnerData.nom"
                placeholder="Entreprise ou organisation"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <!-- Logo -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Logo
              </label>
              <div class="flex items-center gap-4">
                <div 
                  class="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center overflow-hidden"
                >
                  <img 
                    v-if="partnerData.image" 
                    :src="partnerData.image" 
                    :alt="partnerData.nom"
                    class="w-full h-full object-contain p-2"
                  />
                  <Building2 class="w-12 h-12 text-muted-foreground" v-else />
                </div>
                <div class="flex-1">
                  <input
                    type="text"
                    v-model="partnerData.image"
                    placeholder="URL du logo..."
                    class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button 
                    @click="uploadLogo"
                    class="mt-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-md text-sm font-medium inline-flex items-center gap-1"
                  >
                    <Upload class="w-3 h-3" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>

            <!-- Site web -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Site web
              </label>
              <input
                type="url"
                v-model="partnerData.website"
                placeholder="https://www.exemple.com"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Description
              </label>
              <textarea
                v-model="partnerData.description"
                rows="3"
                placeholder="Description du partenariat..."
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              ></textarea>
            </div>

            <!-- Type de partenaire -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Type de partenaire
              </label>
              <select 
                v-model="partnerData.type"
                class="w-full py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Sélectionner un type</option>
                <option value="Éditeur">Éditeur</option>
                <option value="Distributeur">Distributeur</option>
                <option value="Technologique">Technologique</option>
                <option value="Institutionnel">Institutionnel</option>
                <option value="Média">Média</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <!-- Ordre d'affichage -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Ordre d'affichage
              </label>
              <input
                type="number"
                v-model="partnerData.display_order"
                min="1"
                class="w-32 py-2 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <!-- Statut -->
            <div>
              <label class="text-sm font-medium leading-none block mb-1">
                Statut
              </label>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="partnerData.is_active" 
                    :value="true"
                    class="rounded-full border-input text-primary focus:ring-ring" 
                  />
                  <span class="text-sm font-medium">Actif</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="partnerData.is_active" 
                    :value="false"
                    class="rounded-full border-input text-primary focus:ring-ring" 
                  />
                  <span class="text-sm font-medium">Inactif</span>
                </label>
              </div>
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
                @click="savePartner"
                class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all"
              >
                {{ editingPartner ? "Enregistrer" : "Ajouter" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  UserPlus, Building2, Users, Handshake, User, Edit, Trash2, X, 
  Upload, Plus, Globe 
} from 'lucide-vue-next'

export default {
  name: 'AdminTeamPartnersPage',
  
  components: {
    UserPlus,
    Building2,
    Users,
    Handshake,
    User,
    Edit,
    Trash2,
    X,
    Upload,
    Plus,
    Globe
  },
  
  data() {
    return {
      showTeamDialog: false,
      showPartnerDialog: false,
      editingTeamMember: null,
      editingPartner: null,
      
      // Données pour les membres d'équipe
      teamData: {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        photo: '',
        bio: '',
        social_links: [],
        display_order: 1,
        is_active: true
      },
      
      // Données pour les partenaires
      partnerData: {
        nom: '',
        image: '',
        website: '',
        description: '',
        type: '',
        display_order: 1,
        is_active: true
      },
      
      // Données mockées des membres d'équipe
      teamMembers: [
        {
          id: 1,
          nom: "Dupont",
          prenom: "Jean",
          email: "jean.dupont@editions-savoir.fr",
          role: "Directeur éditorial",
          photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
          bio: "20 ans d'expérience dans l'édition universitaire",
          social_links: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/jeandupont" },
            { platform: "Twitter", url: "https://twitter.com/jeandupont" }
          ],
          display_order: 1,
          is_active: true,
          created_at: "2024-01-10T14:20:00"
        },
        {
          id: 2,
          nom: "Laurent",
          prenom: "Marie",
          email: "marie.laurent@editions-savoir.fr",
          role: "Éditrice scientifique",
          photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
          bio: "Spécialiste en sciences humaines et sociales",
          social_links: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/marielaurent" }
          ],
          display_order: 2,
          is_active: true,
          created_at: "2024-01-15T11:30:00"
        },
        {
          id: 3,
          nom: "Martin",
          prenom: "Pierre",
          email: "pierre.martin@editions-savoir.fr",
          role: "Correcteur",
          photo: "",
          bio: "Expert en correction et mise en page",
          social_links: [],
          display_order: 3,
          is_active: true,
          created_at: "2024-01-20T09:15:00"
        }
      ],
      
      // Données mockées des partenaires
      partners: [
        {
          id: 1,
          nom: "Université Paris 1 Panthéon-Sorbonne",
          image: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop",
          website: "https://www.pantheonsorbonne.fr",
          description: "Partenariat académique pour la publication de recherches",
          type: "Institutionnel",
          display_order: 1,
          is_active: true,
          created_at: "2024-01-05T14:20:00"
        },
        {
          id: 2,
          nom: "CNRS Éditions",
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=200&fit=crop",
          website: "https://www.cnrseditions.fr",
          description: "Co-édition de publications scientifiques",
          type: "Éditeur",
          display_order: 2,
          is_active: true,
          created_at: "2024-01-12T11:30:00"
        },
        {
          id: 3,
          nom: "Amazon Publishing",
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=200&h=200&fit=crop",
          website: "https://www.amazon.com/publishing",
          description: "Distribution numérique",
          type: "Distributeur",
          display_order: 3,
          is_active: true,
          created_at: "2024-01-18T09:15:00"
        }
      ]
    }
  },
  
  methods: {
    // === Méthodes pour les membres d'équipe ===
    openTeamDialog(member = null) {
      this.editingTeamMember = member
      this.showTeamDialog = true
      this.showPartnerDialog = false
      
      if (member) {
        this.teamData = {
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          role: member.role,
          photo: member.photo || '',
          bio: member.bio || '',
          social_links: [...(member.social_links || [])],
          display_order: member.display_order || 1,
          is_active: member.is_active !== undefined ? member.is_active : true
        }
      } else {
        this.resetTeamData()
      }
    },
    
    resetTeamData() {
      this.teamData = {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        photo: '',
        bio: '',
        social_links: [],
        display_order: 1,
        is_active: true
      }
    },
    
    addSocialLink() {
      this.teamData.social_links.push({
        platform: 'LinkedIn',
        url: ''
      })
    },
    
    removeSocialLink(index) {
      this.teamData.social_links.splice(index, 1)
    },
    
    saveTeamMember() {
      // Validation
      if (!this.teamData.nom.trim() || !this.teamData.prenom.trim() || !this.teamData.role.trim()) {
        alert("Veuillez remplir les champs obligatoires (nom, prénom, rôle)")
        return
      }
      
      if (this.editingTeamMember) {
        // Mettre à jour le membre existant
        Object.assign(this.editingTeamMember, {
          ...this.teamData,
          updated_at: new Date().toISOString()
        })
        this.showToast("Membre mis à jour", "Les modifications ont été enregistrées.")
      } else {
        // Ajouter un nouveau membre
        const newMember = {
          id: Date.now(),
          ...this.teamData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        this.teamMembers.push(newMember)
        this.showToast("Membre ajouté", "Le membre a été ajouté à l'équipe.")
      }
      
      this.closeDialog()
    },
    
    deleteTeamMember(id) {
      const member = this.teamMembers.find(m => m.id === id)
      if (!member) return
      
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${member.prenom} ${member.nom} de l'équipe ?`)) {
        this.teamMembers = this.teamMembers.filter(m => m.id !== id)
        this.showToast("Membre supprimé", "Le membre a été supprimé de l'équipe.")
      }
    },
    
    // === Méthodes pour les partenaires ===
    openPartnerDialog(partner = null) {
      this.editingPartner = partner
      this.showPartnerDialog = true
      this.showTeamDialog = false
      
      if (partner) {
        this.partnerData = {
          nom: partner.nom,
          image: partner.image || '',
          website: partner.website || '',
          description: partner.description || '',
          type: partner.type || '',
          display_order: partner.display_order || 1,
          is_active: partner.is_active !== undefined ? partner.is_active : true
        }
      } else {
        this.resetPartnerData()
      }
    },
    
    resetPartnerData() {
      this.partnerData = {
        nom: '',
        image: '',
        website: '',
        description: '',
        type: '',
        display_order: 1,
        is_active: true
      }
    },
    
    savePartner() {
      // Validation
      if (!this.partnerData.nom.trim()) {
        alert("Veuillez saisir le nom du partenaire")
        return
      }
      
      if (this.editingPartner) {
        // Mettre à jour le partenaire existant
        Object.assign(this.editingPartner, {
          ...this.partnerData,
          updated_at: new Date().toISOString()
        })
        this.showToast("Partenaire mis à jour", "Les modifications ont été enregistrées.")
      } else {
        // Ajouter un nouveau partenaire
        const newPartner = {
          id: Date.now(),
          ...this.partnerData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        this.partners.push(newPartner)
        this.showToast("Partenaire ajouté", "Le partenaire a été ajouté.")
      }
      
      this.closeDialog()
    },
    
    deletePartner(id) {
      const partner = this.partners.find(p => p.id === id)
      if (!partner) return
      
      if (confirm(`Êtes-vous sûr de vouloir supprimer le partenaire "${partner.nom}" ?`)) {
        this.partners = this.partners.filter(p => p.id !== id)
        this.showToast("Partenaire supprimé", "Le partenaire a été supprimé.")
      }
    },
    
    // === Méthodes communes ===
    closeDialog() {
      this.showTeamDialog = false
      this.showPartnerDialog = false
      this.editingTeamMember = null
      this.editingPartner = null
      this.resetTeamData()
      this.resetPartnerData()
    },
    
    uploadPhoto() {
      // Dans une application réelle, intégrer un uploader d'image
      alert("Fonctionnalité d'upload de photo (à implémenter)")
    },
    
    uploadLogo() {
      // Dans une application réelle, intégrer un uploader d'image
      alert("Fonctionnalité d'upload de logo (à implémenter)")
    },
    
    showToast(title, description) {
      alert(`${title}: ${description}`)
    }
  },
  
  mounted() {
    console.log('Admin team & partners page mounted')
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.bg-card {
  background-color: hsl(var(--card));
}

.border-border {
  border-color: hsl(var(--border));
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground));
}

.text-foreground {
  color: hsl(var(--foreground));
}

.text-destructive {
  color: hsl(var(--destructive));
}

/* Style pour les cartes */
.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour le dialog */
.fixed {
  position: fixed;
}

.z-50 {
  z-index: 50;
}

.bg-foreground\/80 {
  background-color: rgba(0, 0, 0, 0.8);
}

.max-h-\[90vh\] {
  max-height: 90vh;
}

.overflow-y-auto {
  overflow-y: auto;
}

/* Style pour les inputs */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Style pour les boutons radio */
input[type="radio"]:checked {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

/* Animation pour les transitions */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Style pour les avatars */
.w-16.h-16 {
  min-width: 4rem;
  min-height: 4rem;
}

.w-20.h-20 {
  min-width: 5rem;
  min-height: 5rem;
}

.w-24.h-24 {
  min-width: 6rem;
  min-height: 6rem;
}
</style>
