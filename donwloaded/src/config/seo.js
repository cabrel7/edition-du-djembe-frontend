// src/config/seo.js

export const seoConfig = {
  default: {
    siteName: 'Éditions du Djembé d\'Ébène',
    separator: '|',
    baseUrl: 'https://leseditionsdudjembe.com',
    defaultImage: 'https://leseditionsdudjembe.com/images/og-default.jpg',
    locale: 'fr_CA',
    twitterHandle: '@editionsdjembe'
  },
  
  routes: {
    'home': {
      title: 'Éditions du Djembé d\'Ébène | Maison d\'Édition Africaine',
      description: 'Maison d\'édition indépendante valorisant les voix africaines et diasporiques. Publiez vos manuscrits : littérature, essais, poésie engagée.',
      keywords: 'maison édition africaine, publier livre Afrique, édition diaspora, littérature africaine, édition indépendante Québec',
      image: 'https://leseditionsdudjembe.com/images/og-home.jpg',
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Éditions du Djembé d'Ébène",
        "url": "https://leseditionsdudjembe.com",
        "logo": "https://leseditionsdudjembe.com/logo.png"
      }
    },
    
    'contact': {
      title: 'Contact | Éditions du Djembé d\'Ébène',
      description: 'Contactez-nous pour toute question sur nos publications, soumissions de manuscrits ou partenariats. Téléphone: +1 (581) 928-8585',
      keywords: 'contact éditions djembé, soumettre manuscrit, partenariat maison édition',
      schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage"
      }
    },
    
    'memoires': {
      title: 'Mémoires universitaires | Éditions du Djembé d\'Ébène',
      description: 'Découvrez notre collection de mémoires universitaires publiés. Recherches académiques africaines et diasporiques de qualité.',
      keywords: 'mémoires universitaires, publications académiques Afrique, recherche universitaire',
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage"
      }
    },
    
    'actualites': {
      title: 'Actualités littéraires | Éditions du Djembé d\'Ébène',
      description: 'Suivez nos actualités, lancements de livres, interviews d\'auteurs et événements littéraires africains.',
      keywords: 'actualités littérature africaine, nouveautés livres, événements littéraires',
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog"
      }
    },
    
    'catalogue': {
      title: 'Catalogue | Livres africains et diasporiques | Éditions du Djembé',
      description: 'Explorez notre catalogue : littérature africaine, poésie, essais universitaires, jeunesse. Commandez vos livres en ligne.',
      keywords: 'catalogue livres africains, acheter livre Afrique, littérature diaspora',
      schema: {
        "@context": "https://schema.org",
        "@type": "ItemList"
      }
    },
    
    'services': {
      title: 'Nos Services | Éditions du Djembé d\'Ébène',
      description: 'Services éditoriaux complets : édition à compte d\'éditeur, accompagnement d\'auteurs, diffusion en librairies.',
      keywords: 'services éditoriaux, édition à compte éditeur, accompagnement auteur'
    },
    
    'soumettre-travail': {
      title: 'Soumettre un Manuscrit | Éditions du Djembé d\'Ébène',
      description: 'Soumettez votre manuscrit : thèse, roman, poésie, essai. Réponse sous 6-8 semaines. Protocole éditorial professionnel.',
      keywords: 'soumettre manuscrit, publier livre Afrique, appel à manuscrits, édition africaine',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage"
      }
    },
    
    'videos': {
      title: 'Vidéos | Interviews et événements | Éditions du Djembé',
      description: 'Interviews d\'auteurs, présentations de livres et événements littéraires en vidéo.',
      keywords: 'vidéos littérature africaine, interviews auteurs, événements littéraires'
    },
    
    'a-propos': {
      title: 'À propos | Mission et Valeurs | Éditions du Djembé d\'Ébène',
      description: 'Découvrez notre mission : valoriser les voix africaines, publier des recherches universitaires et faire résonner la littérature diasporique.',
      keywords: 'mission éditions djembé, maison édition africaine, Dr Nono Gaël Tanguy',
      schema: {
        "@context": "https://schema.org",
        "@type": "AboutPage"
      }
    }
  }
}

// Fonction pour obtenir les meta tags d'une route
export const getSeoForRoute = (routeName, dynamicData = null) => {
  const config = seoConfig.routes[routeName] || {}
  const defaults = seoConfig.default
  
  // Si des données dynamiques sont fournies (ex: détail d'un livre)
  if (dynamicData) {
    return {
      title: dynamicData.title || config.title,
      description: dynamicData.description || config.description,
      keywords: dynamicData.keywords || config.keywords,
      image: dynamicData.image || config.image || defaults.defaultImage,
      url: dynamicData.url || `${defaults.baseUrl}/${routeName}`,
      schema: dynamicData.schema || config.schema
    }
  }
  
  return {
    title: config.title || `${defaults.siteName}`,
    description: config.description || '',
    keywords: config.keywords || '',
    image: config.image || defaults.defaultImage,
    url: `${defaults.baseUrl}/${routeName}`,
    schema: config.schema
  }
}
