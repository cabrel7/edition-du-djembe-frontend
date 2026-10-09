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
      <div class="flex gap-2">
        <button 
          @click="fetchTeamMembers"
          class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium inline-flex items-center gap-1"
          :class="{ 'opacity-50': loadingTeam }"
          :disabled="loadingTeam"
        >
          <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loadingTeam }" />
          {{ loadingTeam ? 'Chargement...' : 'Actualiser' }}
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-border">
      <div class="flex space-x-8">
        <button
          @click="activeTab = 'team'"
          class="py-2 px-1 border-b-2 text-sm font-medium transition-all"
          :class="activeTab === 'team' 
            ? 'border-primary text-primary' 
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30'"
        >
          <span class="inline-flex items-center gap-2">
            <Users class="w-4 h-4" />
            Membres d'équipe
            <span class="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
              {{ teamMembers.length }}
            </span>
          </span>
        </button>
        <button
          @click="activeTab = 'partners'"
          class="py-2 px-1 border-b-2 text-sm font-medium transition-all"
          :class="activeTab === 'partners' 
            ? 'border-primary text-primary' 
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30'"
        >
          <span class="inline-flex items-center gap-2">
            <Handshake class="w-4 h-4" />
            Partenaires
            <span class="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
              {{ partners.length }}
            </span>
          </span>
        </button>
      </div>
    </div>

    <!-- Team Members Tab -->
    <div v-if="activeTab === 'team'" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-foreground">Membres de l'équipe</h2>
          <p class="text-sm text-muted-foreground">
            Gérez les membres qui apparaîtront sur votre site
          </p>
        </div>
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
          class="bg-card rounded-lg overflow-hidden card-shadow hover-lift transition-all border border-border"
        >
          <div class="p-6">
            <!-- Status Badge -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-2">
                <span 
                  class="text-xs px-2 py-1 rounded-full"
                  :class="member.is_active ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'"
                >
                  {{ member.is_active ? 'Actif' : 'Inactif' }}
                </span>
                <span class="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  Ordre: {{ member.display_order || 1 }}
                </span>
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatDate(member.created_at) }}
              </div>
            </div>

            <!-- Avatar -->
            <div class="flex items-start gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  <img 
                    v-if="member.photo" 
                    :src="member.photo" 
                    :alt="member.nom"
                    class="w-full h-full object-cover"
                  />
                  <User class="w-8 h-8 text-primary/60" v-else />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-foreground truncate">
                  {{ member.prenom }} {{ member.nom }}
                </h3>
                <p class="text-sm text-primary font-medium truncate">{{ member.role }}</p>
                <p v-if="member.email" class="text-xs text-muted-foreground mt-1 truncate">
                  {{ member.email }}
                </p>
              </div>
            </div>

            <!-- Bio -->
            <p v-if="member.bio" class="text-sm text-muted-foreground line-clamp-2 mb-4">
              {{ member.bio }}
            </p>

            <!-- Social Links -->
            <div v-if="member.social_links && member.social_links.length > 0" class="flex gap-2 mb-4 flex-wrap">
              <a 
                v-for="link in member.social_links" 
                :key="link.platform"
                :href="link.url"
                target="_blank"
                class="text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                :title="link.platform"
              >
                <Globe class="w-3 h-3" />
                {{ link.platform }}
              </a>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-2 border-t border-border pt-4">
              <button 
                @click="openTeamDialog(member)"
                class="p-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                title="Modifier"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button 
                @click="deleteTeamMember(member.id)"
                class="p-2 text-destructive hover:bg-secondary rounded-md transition-colors"
                title="Supprimer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Team State -->
      <div v-else class="bg-secondary/50 rounded-lg p-12 text-center border border-dashed border-border">
        <div class="w-20 h-20 mx-auto mb-4 text-muted-foreground/50">
          <Users class="w-full h-full" />
        </div>
        <p class="text-lg text-muted-foreground mb-2">Aucun membre d'équipe</p>
        <p class="text-sm text-muted-foreground mb-6">Commencez par ajouter votre premier membre d'équipe</p>
        <button 
          @click="openTeamDialog"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <UserPlus class="w-4 h-4" />
          Ajouter un membre
        </button>
      </div>
    </div>

    <!-- Partners Tab -->
    <div v-if="activeTab === 'partners'" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-foreground">Partenaires</h2>
          <p class="text-sm text-muted-foreground">
            Gérez les partenaires qui apparaîtront sur votre site
          </p>
        </div>
        <button 
          @click="openPartnerDialog"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Handshake class="w-4 h-4" />
          Ajouter un partenaire
        </button>
      </div>

      <!-- Partners Grid -->
      <div v-if="partners.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="partner in partners" 
          :key="partner.id"
          class="bg-card rounded-lg overflow-hidden card-shadow hover-lift transition-all border border-border"
        >
          <div class="p-6">
            <!-- Status Badge -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-2">
                <span 
                  class="text-xs px-2 py-1 rounded-full"
                  :class="partner.is_active ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'"
                >
                  {{ partner.is_active ? 'Actif' : 'Inactif' }}
                </span>
                <span class="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  {{ partner.type || 'Partenaire' }}
                </span>
                <span class="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded-full">
                  Ordre: {{ partner.display_order || 1 }}
                </span>
              </div>
              <div class="text-xs text-muted-foreground">
                {{ formatDate(partner.created_at) }}
              </div>
            </div>

            <!-- Partner Logo -->
            <div class="flex items-center justify-center mb-4">
              <div class="w-32 h-32 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden border border-border">
                <img 
                  v-if="partner.image" 
                  :src="partner.image" 
                  :alt="partner.nom"
                  class="w-full h-full object-contain p-4"
                />
                <Building2 class="w-12 h-12 text-muted-foreground/50" v-else />
              </div>
            </div>

            <!-- Partner Info -->
            <div class="text-center">
              <h3 class="text-lg font-semibold text-foreground mb-2 truncate">{{ partner.nom }}</h3>
              <p v-if="partner.website" class="text-sm text-primary mb-1">
                <a 
                  :href="partner.website" 
                  target="_blank" 
                  class="hover:underline inline-flex items-center gap-1"
                >
                  <ExternalLink class="w-3 h-3" />
                  Site web
                </a>
              </p>
              <p v-if="partner.description" class="text-sm text-muted-foreground line-clamp-2 mt-2">
                {{ partner.description }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
              <button 
                @click="openPartnerDialog(partner)"
                class="p-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                title="Modifier"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button 
                @click="deletePartner(partner.id)"
                class="p-2 text-destructive hover:bg-secondary rounded-md transition-colors"
                title="Supprimer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Partners State -->
      <div v-else class="bg-secondary/50 rounded-lg p-12 text-center border border-dashed border-border">
        <div class="w-20 h-20 mx-auto mb-4 text-muted-foreground/50">
          <Handshake class="w-full h-full" />
        </div>
        <p class="text-lg text-muted-foreground mb-2">Aucun partenaire</p>
        <p class="text-sm text-muted-foreground mb-6">Commencez par ajouter votre premier partenaire</p>
        <button 
          @click="openPartnerDialog"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Handshake class="w-4 h-4" />
          Ajouter un partenaire
        </button>
      </div>
    </div>

    <!-- Dialogs -->
    <TeamMemberDialog 
      v-if="showTeamDialog"
      :member="editingTeamMember"
      @close="closeDialog"
      @save="saveTeamMember"
    />

    <PartnerDialog 
      v-if="showPartnerDialog"
      :partner="editingPartner"
      @close="closeDialog"
      @save="savePartner"
    />
  </div>
</template>

<script>
import { 
  UserPlus, Building2, Users, Handshake, User, Edit, Trash2, 
  Upload, Plus, Globe, RefreshCw, ExternalLink
} from 'lucide-vue-next'
import TeamMemberDialog from '@/components/admin/TeamMemberDialog.vue'
import PartnerDialog from '@/components/admin/PartnerDialog.vue'
import { mapState, mapActions } from 'vuex'

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
    Upload,
    Plus,
    Globe,
    RefreshCw,
    ExternalLink,
    TeamMemberDialog,
    PartnerDialog
  },
  
  data() {
    return {
      activeTab: 'team',
      showTeamDialog: false,
      showPartnerDialog: false,
      editingTeamMember: null,
      editingPartner: null,
      loadingTeam: false,
      loadingPartners: false
    }
  },
  
  computed: {
  teamMembers(){
  	return this.$store.state.adminData.team_members
  },partners(){
  	return this.$store.state.adminData.partners
  }
   
  },
  methods: {
  async openTeamDialog(member = null) {
    this.editingTeamMember = member
    this.showTeamDialog = true
  },

  async openPartnerDialog(partner = null) {
    this.editingPartner = partner
    this.showPartnerDialog = true
  },

  closeDialog() {
    this.showTeamDialog = false
    this.showPartnerDialog = false
    this.editingTeamMember = null
    this.editingPartner = null
  },

  // =======================
  // TEAM
  // =======================

  async fetchTeamMembers() {
    return this.$store.dispatch('fetchTeamMembers')
  },

  async saveTeamMember(memberData) {
    try {
      await this.$store.dispatch('saveTeamMember', memberData)
      this.closeDialog()
      await this.fetchTeamMembers()
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la sauvegarde du membre')
    }
  },

  async deleteTeamMember(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return

    try {
      await this.$store.dispatch('deleteTeamMember', id)
      await this.fetchTeamMembers()
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression')
    }
  },

  // =======================
  // PARTNERS
  // =======================

  async fetchPartners() {
    return this.$store.dispatch('fetchPartners')
  },

  async savePartner(partnerData) {
    try {
      await this.$store.dispatch('savePartner', partnerData)
      this.closeDialog()
      await this.fetchPartners()
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la sauvegarde du partenaire')
    }
  },

  async deletePartner(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return

    try {
      await this.$store.dispatch('deletePartner', id)
      await this.fetchPartners()
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression')
    }
  },

  formatDate(dateString) {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR')
  }
}
,
  
  async mounted() {
  try {
    this.loadingTeam = true
    this.loadingPartners = true

    await Promise.all([
      this.fetchTeamMembers(),
      this.fetchPartners()
    ])
  } catch (e) {
    console.error(e)
  } finally {
    this.loadingTeam = false
    this.loadingPartners = false
  }
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

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Style pour les transitions */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Style pour les badges */
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

/* Animation de spin */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
