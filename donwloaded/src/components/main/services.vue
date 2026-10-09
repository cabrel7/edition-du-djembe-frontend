<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="bg-primary text-primary-foreground py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
          <p class="text-xl text-primary-foreground/90 leading-relaxed">
            Un accompagnement complet pour concrétiser vos projets d'édition, 
            de la première ligne à la dernière page.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            class="bg-card rounded-xl p-8 card-shadow-lg hover-lift"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <component :is="service.icon" class="w-8 h-8 text-primary" />
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-semibold text-foreground mb-3">
                  {{ service.title }}
                </h2>
                <p class="text-muted-foreground mb-6">
                  {{ service.description }}
                </p>
                <ul class="space-y-2">
                  <li 
                    v-for="(feature, i) in service.features" 
                    :key="i" 
                    class="flex items-start gap-2"
                  >
                    <CheckCircle class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span class="text-sm text-muted-foreground">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Notre Processus</h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Un accompagnement structuré pour garantir le succès de votre projet éditorial.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div 
            v-for="(item, index) in processSteps" 
            :key="item.step"
            class="text-center relative"
          >
            <div class="w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
              {{ item.step }}
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">{{ item.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ item.description }}</p>
            <div v-if="index < 3" class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
              <ArrowRight class="w-6 h-6 text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing CTA -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-3xl font-bold text-primary-foreground mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p class="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Chaque projet est unique. Contactez-nous pour discuter de vos besoins 
            et recevoir une proposition adaptée.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contact">
              <button class="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
                Demander un devis
              </button>
            </router-link>
            <router-link to="/contact">
              <button class="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-6 py-3 rounded-lg font-medium transition-all">
                Soumettre un manuscrit
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-secondary">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-foreground text-center mb-12">
            Questions Fréquentes
          </h2>
          <div class="space-y-6">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="bg-card rounded-lg p-6 card-shadow"
            >
              <h3 class="text-lg font-semibold text-foreground mb-2">{{ faq.question }}</h3>
              <p class="text-muted-foreground">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BookOpen, FileCheck, Printer, Hash, GraduationCap,Languages, ArrowRight, CheckCircle } from 'lucide-vue-next'

export default {
  name: 'ServicesPage',
  
  components: {
  Languages,
    BookOpen,
    FileCheck,
    Printer,
    Hash,
    GraduationCap,
    ArrowRight,
    CheckCircle
  },
  
  data() {
    return {
      // Services
      services: [
        {
          id: 1,
          icon: 'BookOpen',
          title: "Édition Traditionnelle",
          description: "Accompagnement complet pour la publication de vos ouvrages, de la correction à la distribution.",
          features: [
            "Correction et relecture professionnelle",
            "Mise en page et conception graphique",
            "Impression papier de qualité",
            "Distribution en librairies"
          ]
        },
        {
          id: 2,
          icon: 'FileCheck',
          title: "Correction et Relecture",
          description: "Un travail minutieux sur vos textes pour garantir leur qualité linguistique et stylistique.",
          features: [
            "Correction orthographique et grammaticale",
            "Relecture syntaxique et stylistique",
            "Harmonisation typographique",
            "Conseils éditoriaux personnalisés"
          ]
        },
        {
          id: 3,
          icon: 'Printer',
          title: "Impression et Fabrication",
          description: "Fabrication de vos ouvrages dans nos ateliers avec des matériaux de première qualité.",
          features: [
            "Choix des papiers et couvertures",
            "Reliure professionnelle",
            "Impression numérique et offset",
            "Packaging et expédition"
          ]
        },
        {
          id: 4,
          icon: 'Hash',
          title: "Édition Numérique",
          description: "Création et distribution de vos ouvrages au format numérique (PDF, EPUB, etc.).",
          features: [
            "Conversion aux formats numériques",
            "Mise en page adaptative",
            "Distribution sur les plateformes en ligne",
            "Protection des droits d'auteur"
          ]
        },
        {
          id: 5,
          icon: 'GraduationCap',
          title: "Édition Universitaire",
          description: "Publication spécialisée pour les travaux de recherche, thèses et mémoires académiques.",
          features: [
            "Comité de lecture spécialisé",
            "Normes académiques respectées",
            "Indexation dans les bases de données",
            "Distribution institutionnelle"
          ]
        },
         {
          id: 6,
          icon: 'Languages',
          title: "Traduction",
          description: "Ce processus essentiel permet de diffuser des livres, essais, revues et autres contenus à un public international.",
          features: [
            "Traduction littéraire ",
            "Localisation",
            "Révision et contrôle qualités",
            "Post-édition"
          ]
        }
      ],
      
      // Étapes du processus
      processSteps: [
        {
          step: "01",
          title: "Consultation",
          description: "Étude de votre projet et de vos objectifs",
        },
        {
          step: "02",
          title: "Évaluation",
          description: "Analyse du manuscrit et proposition éditoriale",
        },
        {
          step: "03",
          title: "Production",
          description: "Correction, mise en page et impression",
        },
        {
          step: "04",
          title: "Distribution",
          description: "Mise en vente et promotion de l'ouvrage",
        },
      ],
      
      // FAQ
     faqs: [
  {
    question: "Comment proposer un manuscrit aux Éditions du Djembé d’Ébène ?",
    answer: "Rendez-vous sur la page « Soumettre un manuscrit ». Remplissez le formulaire en ligne, téléversez votre fichier (PDF ou DOCX) et ajoutez une courte biographie. Un retour du comité de lecture vous sera donné sous 6 à 8 semaines."
  },
  {
    question: "Quels sont vos délais de publication ?",
    answer: "Après acceptation du manuscrit, le processus complet prend généralement entre 6 et 9 mois (édition, correction, mise en page, impression). Les délais peuvent varier selon le travail éditorial et la période de l’année."
  },
  {
    question: "Quels formats proposez-vous ?",
    answer: "Nous publions en format papier (broché) et numérique (e-book EPUB/PDF). Vous pourrez indiquer votre préférence lors de la signature du contrat."
  },
  {
    question: "Comment sont fixés vos tarifs et vos droits d’auteur ?",
    answer: "Nous fonctionnons à compte d’éditeur et à compte auteur. Tous les détails financiers et contractuels sont précisés dans le contrat d’édition."
  },
  {
    question: "Puis-je commander directement vos ouvrages ?",
    answer: "Oui, il est possible de commander directement via notre Boutique en ligne."
  },
  {
    question: "Comment suivre une commande ou un pré-achat ?",
    answer: "Après paiement, vous recevez un email de confirmation avec un numéro de suivi pour les envois physiques ou un lien de téléchargement pour les e-books. Pour toute question, contactez-nous via la page Contact, par email ou par appel direct."
  },
  {
    question: "Organisez-vous des ateliers ou des conférences ?",
    answer: "Oui, nous proposons régulièrement des ateliers d’écriture, des conférences et des résidences. Consultez la page « Événements & Ateliers » pour le calendrier et inscrivez-vous en ligne."
  },
  {
    question: "Comment devenir partenaire ou librairie affiliée ?",
    answer: "Nous collaborons avec librairies, bibliothèques, festivals et universités. Envoyez-nous un email présentant votre structure, vos attentes et votre proposition de partenariat."
  },
  {
    question: "Quels sont vos critères de sélection éditoriale ?",
    answer: "Nous privilégions les voix fortes et authentiques, une écriture engagée et esthétique. Nos axes éditoriaux principaux sont : Littérature, Poésie, Essais & pensée critique, Jeunesse et Voix de la diaspora."
  },
  {
    question: "Comment rester informé de vos nouveautés ?",
    answer: "Abonnez-vous à notre newsletter « Rejoignez le cercle du Djembé », suivez-nous sur Facebook, TikTok, Instagram et LinkedIn, ou consultez régulièrement notre rubrique Actualités."
  }
]

    }
  },
  
  mounted() {
    console.log('Services page mounted')
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.card-shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Animation pour les cartes */
[style*="animationDelay"] {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Style pour les étapes du processus */
.relative {
  position: relative;
}

.hidden {
  display: none;
}

@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .md\:block {
    display: block;
  }
}

/* Style pour la FAQ */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Style pour les boutons */
.transition-all {
  transition: all 0.2s ease;
}

/* Style pour les listes */
ul.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
