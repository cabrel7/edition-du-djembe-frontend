// src/plugins/analytics.js

export const initGoogleAnalytics = (measurementId) => {
  // Charger le script Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialiser gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  
  gtag('js', new Date())
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  })
}

export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', '	G-2F1E0XH40B', {
      page_path: url,
    })
  }
}

export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}
