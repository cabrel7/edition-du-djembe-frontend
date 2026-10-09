<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">À propos de nous</h1>
          <p class="text-xl text-primary-foreground/90 leading-relaxed">
            Depuis plus de quelques annees, notre maison d'édition œuvre pour la diffusion 
            du savoir et la promotion de la création littéraire.
          </p>
        </div>
      </div>
    </section>

    <!-- History -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-6">Notre Histoire</h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Les Éditions du Djembé d’Ébène sont nées en 2025 de la conviction de leur fondateur, Dr Nono Gaël Tanguy, qu’un nombre considérable de travaux d’envergure mémoires, thèses et essais universitaires sur l’éveil, le changement et la contribution sociétale demeurent trop souvent confinés aux étagères des bibliothèques et aux tiroirs de leurs auteur·rice·s. Frustré de voir ces recherches de haute qualité inaccessibles au public, il a décidé de créer une maison d’édition indépendante dont la vocation première est de faire éclore ces idées pertinentes. Rapidement, cette initiative s’est élargie pour accueillir non seulement des publications académiques, mais également des romans engagés, de la poésie militante et d’autres genres porteurs de sens
            </p>
           
          </div>
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop"
              alt="Bibliothèque historique"
              class="rounded-lg shadow-xl"
            />
            <!-- <div class="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <p class="text-4xl font-bold">15+</p>
              <p class="text-sm opacity-90">Années d'expérience</p>
            </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission -->
          <div class="bg-card p-8 rounded-lg card-shadow">
            <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Target class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-4">Notre Mission</h3>
            <p class="text-muted-foreground leading-relaxed">
            La mission du Djembé d’Ébène est simple et ambitieuse : sortir du domaine fermé de l’université et des cercles savants les écrits qui interrogent, inspirent et éveillent les consciences. Nous offrons un accompagnement éditorial complet de la relecture universitaire à la mise en page, de l’ISBN à la diffusion en librairies et plateformes numériques afin de garantir à chaque auteur, qu’il vienne du monde de la recherche ou de la création littéraire, une visibilité et une portée maximales. Nous voulons faire résonner ces voix, pour que leurs rythmes de pensée battent au cœur du grand public
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-card p-8 rounded-lg card-shadow">
            <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Eye class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-4">Notre Vision</h3>
            <p class="text-muted-foreground leading-relaxed">
              Devenir la référence de l'édition francophone en matière de qualité 
              éditoriale et d'accompagnement des auteurs, tout en contribuant 
              activement à la promotion du savoir.
            </p>
          </div>

          <!-- Values -->
          <div class="bg-card p-8 rounded-lg card-shadow">
            <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Heart class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-4">Nos Valeurs</h3>
            <p class="text-muted-foreground leading-relaxed">
             Portée par l’image du djembé instrument d’alerte, de lien et d’éveil  et par l’ébène – symbole de résistance et de noblesse, notre maison défend une édition fière, exigeante et engagée. Nous valorisons :
<br><li class="font-bold  ">L’excellence</li>  scientifique et littéraire, garantissant la rigueur des contenus ;
<br><li class="font-bold  "> La diversité des genres</li>   de la recherche académique aux romans à dimension sociale, en passant par la poésie et l’oraliture ;
<br> <li class="font-bold  "> L’engagement</li>  de chaque auteur·e, qu’il s’agisse de transmission de savoirs ou de combats contemporains ;
<br> <li class="font-bold  "> décoloniale</li>  qui fait entendre les voix africaines, diasporiques et alliées, tout en bâtissant des passerelles entre cultures.
Ainsi, à chaque nouveau titre, Le Djembé d’Ébène réaffirme son pari : honorer, amplifier et transmettre les paroles vraies, pour que leur rythme transforme le monde.

            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Detail -->
    <section class="section-padding">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-foreground text-center mb-12">
          Ce qui nous définit
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(value, index) in coreValues" :key="index" class="text-center p-6">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">{{ value.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <!-- <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Notre Équipe</h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Une équipe passionnée et expérimentée, dédiée à l'excellence éditoriale.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(member, index) in teamMembers" :key="index" class="bg-card rounded-lg overflow-hidden card-shadow text-center">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full aspect-square object-cover"
            />
            <div class="p-4">
              <h3 class="font-semibold text-foreground">{{ member.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Legal Mentions -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-foreground mb-6">Mentions Légales</h2>
          <div class="prose prose-gray max-w-none">
            <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Éditeur</h3>
            <p class="text-muted-foreground mb-4">
              Les Editions du Djembe d'Ebene<br />
            12263 boulevard Saint Claude<br />
             Québec, Canada<br />
             
              Directeur de la publication :Dr Nono Gaël Tanguy
            </p>

            <!-- <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Hébergement</h3>
            <p class="text-muted-foreground mb-4">
              Ce site est hébergé par Lovable<br />
              Adresse : San Francisco, CA, USA
            </p> -->

            <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Propriété intellectuelle</h3>
            <p class="text-muted-foreground">
              L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé 
              par le droit d'auteur. Toute reproduction, même partielle, est interdite 
              sans autorisation préalable.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Target, Eye, Heart, Users, Award, BookOpen } from 'lucide-vue-next'

export default {
  name: 'AboutPage',
  
  components: {
    Target,
    Eye,
    Heart,
    Users,
    Award,
    BookOpen
  },
  
  data() {
    return {
      // Valeurs fondamentales
      coreValues: [
        {
          icon: 'Award',
          title: "Excellence",
          description: "Nous visons la plus haute qualité dans chacune de nos publications.",
        },
        {
          icon: 'Users',
          title: "Accompagnement",
          description: "Un suivi personnalisé pour chaque auteur, à chaque étape du projet.",
        },
        {
          icon: 'BookOpen',
          title: "Accessibilité",
          description: "Rendre le savoir accessible au plus grand nombre est notre priorité.",
        },
        {
          icon: 'Heart',
          title: "Passion",
          description: "L'amour des livres et de la transmission anime notre équipe.",
        },
      ],
      
      // Membres de l'équipe
      teamMembers: [
        { 
          name: "Jean-Pierre Dubois", 
          role: "Directeur Général", 
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
        },
        { 
          name: "Marie Laurent", 
          role: "Directrice Éditoriale", 
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" 
        },
        { 
          name: "Amadou Diallo", 
          role: "Responsable Commercial", 
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
        },
        { 
          name: "Sophie Martin", 
          role: "Responsable Communication", 
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" 
        },
      ],
      
      // Informations légales
      legalInfo: {
        company: "Éditions - Maison d'Édition",
        address: "123 Rue de l'Édition",
        city: "75001 Paris, France",
        siret: "123 456 789 00012",
        director: "Jean-Pierre Dubois",
        hosting: {
          provider: "Lovable",
          address: "San Francisco, CA, USA"
        }
      }
    }
  },
  
  methods: {
    // Méthodes utilitaires si nécessaire
    formatSiret(siret) {
      return siret.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4')
    }
  },
  
  mounted() {
    console.log('About page mounted')
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* Style pour le contenu de la section légale */
.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

/* Style pour la carte d'expérience */
.absolute {
  position: absolute;
}

.-bottom-6 {
  bottom: -1.5rem;
}

.-left-6 {
  left: -1.5rem;
}

/* Style pour les images d'équipe */
.aspect-square {
  aspect-ratio: 1 / 1;
}

/* Animation au survol */
.bg-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

/* Responsive design pour les valeurs */
@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}

/* Style pour les titres */
h1, h2, h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: -0.025em;
}
</style>
