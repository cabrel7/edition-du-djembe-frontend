// src/plugins/seo.js

export const setSeoTags = (config) => {
  // Title
  if (config.title) {
    document.title = config.title
  }

  // Meta Description
  setMetaTag('description', config.description)

  // Keywords
  if (config.keywords) {
    setMetaTag('keywords', config.keywords)
  }

  // Canonical URL
  setCanonicalUrl(config.url)

  // Robots
  setMetaTag('robots', config.robots || 'index, follow')

  // Open Graph
  setMetaTag('og:title', config.ogTitle || config.title, 'property')
  setMetaTag('og:description', config.ogDescription || config.description, 'property')
  setMetaTag('og:image', config.ogImage || config.image, 'property')
  setMetaTag('og:url', config.ogUrl || config.url, 'property')
  setMetaTag('og:type', config.ogType || 'website', 'property')
  setMetaTag('og:locale', 'fr_CA', 'property')
  setMetaTag('og:site_name', 'Éditions du Djembé d\'Ébène', 'property')

  // Twitter Card
  setMetaTag('twitter:card', config.twitterCard || 'summary_large_image')
  setMetaTag('twitter:title', config.twitterTitle || config.title)
  setMetaTag('twitter:description', config.twitterDescription || config.description)
  setMetaTag('twitter:image', config.twitterImage || config.image)
}

const setMetaTag = (name, content, attribute = 'name') => {
  if (!content) return

  let element = document.querySelector(`meta[${attribute}="${name}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

const setCanonicalUrl = (url) => {
  if (!url) return

  let link = document.querySelector('link[rel="canonical"]')
  
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  
  link.setAttribute('href', url)
}

export const setJsonLd = (schema) => {
  if (!schema) return
  
  // Supprimer l'ancien script s'il existe
  const oldScript = document.querySelector('script[data-vue-meta="ssr"][type="application/ld+json"]')
  if (oldScript) {
    oldScript.remove()
  }

  // Créer le nouveau script
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-vue-meta', 'ssr')
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}

// Fonction pour nettoyer les meta tags
export const clearSeoTags = () => {
  // Cette fonction peut être appelée avant de définir de nouveaux tags
  const metaTags = document.querySelectorAll('meta[data-vue-meta]')
  metaTags.forEach(tag => tag.remove())
}
