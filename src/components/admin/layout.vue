<template>
  <div class="min-h-screen bg-secondary">
    <!-- Mobile sidebar backdrop -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
      @click="mobileMenuOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-primary transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-20',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo -->
      <div class="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
         <router-link to="/admin" class="flex p-1 items-center gap-2 group">
          <div :class="sidebarOpen?'w-16 h-16':' w-8 h-8'" class="flex items-center  p-1 justify-center  rounded-lg bg-primary-foreground">
             <img class="object-cover  h-full w-full" src="/logo.png" alt="">
            </div>
          <div v-if=" sidebarOpen" class="flex flex-col">
            <span class="text-lg font-semibold text-foreground leading-tight">
              Les Editions 
            </span>
            <span class="text-xs text-muted-foreground leading-tight">
              du Djembé d'Ebène
            </span>
          </div>
        </router-link>
       
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="hidden lg:flex items-center justify-center w-8 h-8 rounded-md text-primary-foreground hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft :class="['w-4 h-4 transition-transform', !sidebarOpen && 'rotate-180']" />
        </button>
        <button
          @click="mobileMenuOpen = false"
          class="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-primary-foreground hover:bg-sidebar-accent"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <router-link
          v-for="item in sidebarNavigation"
          :key="item.name"
          :to="item.href"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-sidebar-accent text-primary-foreground'
              : 'text-primary-foreground/80 hover:bg-sidebar-accent hover:text-primary-foreground'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen">{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-sidebar-border">
        <router-link
          to="/"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-sidebar-accent hover:text-primary-foreground transition-colors'
          ]"
        >
          <LogOut class="w-5 h-5" />
          <span v-if="sidebarOpen">Retour au site</span>
        </router-link>
      </div>
    </aside>

    <!-- Main content -->
    <div
      :class="[
        'transition-all duration-300',
        sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
      ]"
    >
      <!-- Top bar -->
      <header class="sticky top-0 z-30 flex h-16 items-center gap-4 bg-background border-b border-border px-4 lg:px-6">
        <button
          @click="mobileMenuOpen = true"
          class="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary"
        >
          <Menu class="w-5 h-5" />
        </button>
        <div class="flex-1" />
        <div class="flex items-center gap-3">
          <div class="text-right">
        <p class="text-sm font-medium">{{$store.state.user.name}}</p>
            <p class="text-xs text-muted-foreground">{{$store.state.user.email}}</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-primary uppercase   flex items-center justify-center text-primary-foreground font-medium">
           {{ $store.state.user.name.charAt()}}
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 lg:p-6 relative">
                 <div v-if="isdispo"
                  class="bg-primary  z-50 absolute top-4 flex   right-4 animate-fade-in  text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all flex-col items-center justify-center mb-2">
                <br><h1 class=" font-bold"> {{ message.title }}</h1> 
                 <br>  <p> {{ message.description }}</p>
              </div>
       <router-view  @showtoast="showtoast" name="tree"></router-view>

      </main>
    </div>
  </div>
</template>

<script>
import { 
  BookOpen,
  LayoutDashboard,
  BookMarked,
  GraduationCap,
  Newspaper,
  FolderOpen,
  Users,
  Briefcase,Handshake,
  Video,
  Settings,
  Menu,
  X,
  Contact,
  DownloadCloud,
  ChevronLeft,
  LogOut
} from 'lucide-vue-next'

export default {
  name: 'AdminLayout',
  components: {
    BookOpen,
    LayoutDashboard,
    DownloadCloud,
    Contact,
    BookMarked,
    GraduationCap,
    Newspaper,
    FolderOpen,
    Users,Handshake,
    Briefcase,
    Video,
    Settings,
    Menu,
    X,
    ChevronLeft,
    LogOut

  },
  data() {
    return {
      sidebarOpen: true,
      mobileMenuOpen: false,
      message:{
            title:'',
            description:''
       },
        isdispo: false,
      sidebarNavigation: [
        { name: "Tableau de bord", href: "/admin", icon: 'LayoutDashboard' },
        { name: "Livres", href: "/admin/livres", icon: 'BookMarked' },
        { name: "Mémoires", href: "/admin/memoires", icon: 'GraduationCap' },
        { name: "Actualités", href: "/admin/actualites", icon: 'Newspaper' },
      
        { name: "Catégories", href: "/admin/categories", icon: 'FolderOpen' },
        { name: "domaines", href: "/admin/domaines", icon: 'FolderOpen' },
           { name: "Les Cahiers du Djembe", href: "/admin/press-reviews", icon: 'Newspaper' },
        { name: "contact", href: "/admin/contact", icon: 'Contact' },
         { name: "soumissions", href: "/admin/submit_data", icon: 'DownloadCloud' },
        { name: "Vidéos", href: "/admin/videos", icon: 'Video' },
         { name: "partenaires et  membres", href: "/admin/addorther", icon: 'Handshake' },
      ]
    }
  },
  methods: {
    isActive(href) {
      return this.$route.path === href
    }
,
    showtoast(message){
       this.isdispo=true
       this.message=message
      setTimeout(() => {
        this.isdispo=false
      }, 5000)
    }
  }
  ,
 async mounted(){
    await this.$store.dispatch("fetchAdminBase")
 this.$store.dispatch('fetchMemoirs')
  this.$store.dispatch('fetchBooks')
     this.$store.dispatch("fetchArticles");
  }
}
</script>
