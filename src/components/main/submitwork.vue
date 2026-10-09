<template>
  <div class="animate-fade-in">
    <!-- Success Message -->
    <div v-if="isSubmitted">
      <section class="section-padding">
        <div class="container-custom">
          <div class="max-w-2xl mx-auto text-center">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle class="w-10 h-10 text-primary" />
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-4">
              Manuscrit envoyé avec succès !
            </h1>
            <p class="text-muted-foreground mb-8">
              Nous avons bien reçu votre soumission. Notre comité de lecture 
              examinera votre manuscrit et vous contactera dans les meilleurs délais.
            </p>
            <button 
              @click="resetForm"
              class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium"
            >
              Soumettre une autre œuvre
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Form Section -->
    <div v-else>
      <!-- Hero Section -->
      <section class="bg-primary text-primary-foreground py-16">
        <div class="container-custom">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Soumettre une Œuvre ou un Article</h1>
          <p class="text-xl text-primary-foreground/90 max-w-2xl">
            Vous avez un manuscrit ou un article à nous proposer ? Remplissez le formulaire ci-dessous 
            et notre équipe éditoriale l'examinera avec attention.
          </p>
        </div>
      </section>

      <!-- Modal pour le protocole -->
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
        <div class="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-foreground">PROTOCOLE DE PRÉSENTATION DES MANUSCRITS</h2>
            <button 
              @click="isOpen = false"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[70vh] p-6">
            <div class="prose prose-lg max-w-none">
              <div class="text-center mb-8">
                <h3 class="text-xl font-semibold italic text-muted-foreground">Les Éditions du Djembé d'Ébène</h3>
              </div>

              <h4 class="text-lg font-bold mt-6 mb-4">1. PRÉSENTATION MATÉRIELLE</h4>
              <ul class="space-y-2 mb-6">
                <li>Rédiger le manuscrit dans un seul fichier Word complet et définitif, incluant la date dans le nom du fichier.</li>
                <li>Utiliser la police <strong>Times New Roman</strong>, taille <strong>12 points</strong>, interligne <strong>double</strong>.</li>
                <li>Appliquer le double interligne à l'ensemble du texte, y compris les notes de bas de page, les citations, les bibliographies ou lectures suggérées.</li>
              </ul>

              <h4 class="text-lg font-bold mt-6 mb-4">2. DÉTAILS MÉTHODOLOGIQUES</h4>
              
              <h5 class="font-semibold mb-2">2.1 Caractères typographiques</h5>
              <ul class="space-y-2 mb-4">
                <li>Respecter les accents, trémas et cédilles même sur les majuscules.</li>
                <li>Différencier clairement les chiffres (0, 1) des lettres (O, l).</li>
                <li>Utiliser les guillemets français (« ») ; les guillemets anglais sont réservés aux citations à l'intérieur de citations.</li>
                <li>Employer le tiret demi-cadratin ( -- ) pour isoler une portion de phrase.</li>
                <li>Privilégier le symbole <strong>%</strong> au mot « pour cent ».</li>
              </ul>

              <h5 class="font-semibold mb-2">2.2 Appels de notes</h5>
              <p class="mb-4">Placer les appels de notes <strong>avant</strong> toute ponctuation.<br>Exemple : « ... et les populations aiment le partage¹ ».</p>

              <h5 class="font-semibold mb-2">2.3 Titres et sous-titres</h5>
              <ul class="space-y-2 mb-4">
                <li>Choisir des titres courts, saisir en majuscules (titres des parties et chapitres) /minuscules (sous-titres) (pas tout en majuscules).</li>
                <li>Ne pas mettre de point final aux titres.</li>
                <li>Structurer les niveaux de titres avec le système décimal : 1, 1.1, 1.1.1, etc.</li>
              </ul>

              <h5 class="font-semibold mb-2">2.4 Sigles et acronymes</h5>
              <ul class="space-y-2 mb-4">
                <li>Préparer une liste préliminaire des acronymes (inclure ceux récurrents dans un chapitre).</li>
                <li>Au début de chaque chapitre : écrire le nom complet suivi du sigle. Par la suite : utiliser uniquement le sigle.</li>
              </ul>

              <h5 class="font-semibold mb-2">2.5 À éviter</h5>
              <ul class="space-y-2 mb-4">
                <li>Points médians (sauf dans les tableaux)</li>
                <li>Soulignement ou gras dans le texte courant</li>
                <li>Styles automatiques Word, formatage excessif, coupures manuelles</li>
                <li>Justification à droite, doubles espaces, sauts de paragraphe multiples, alinéas</li>
              </ul>

              <h5 class="font-semibold mb-2">2.6 Usage des italiques</h5>
              <p class="mb-4">Utiliser les italiques pour :</p>
              <ul class="space-y-2 mb-6">
                <li>Titres d'ouvrages et périodiques</li>
                <li>Mots en langue étrangère non traduits</li>
                <li><em>Verbatim</em></li>
                <li>Mises en relief stylistiques</li>
              </ul>

              <h4 class="text-lg font-bold mt-6 mb-4">3. CHIFFRES, CITATIONS, TABLEAUX ET FIGURES</h4>
              
              <h5 class="font-semibold mb-2">3.1 Chiffres et nombres</h5>
              <ul class="space-y-2 mb-4">
                <li>Nombres en lettres jusqu'à <strong>dix</strong>, puis en chiffres.</li>
                <li>À partir de 1 000 : utiliser l'espace insécable (1 150) ; pour les décimales, utiliser la <strong>virgule</strong> (1,5 %).</li>
              </ul>

              <h5 class="font-semibold mb-2">3.2 Citations</h5>
              <ul class="space-y-2 mb-4">
                <li>Fidèles à la source.</li>
                <li><strong>Courtes (3 lignes maximum)</strong> : intégrées dans le texte entre guillemets.</li>
                <li><strong>Longues</strong> : paragraphe distinct en retrait sans guillemets.</li>
                <li>Utiliser « [...] » pour les retraits.</li>
                <li>Les citations sont en romain, sauf italique pour langue étrangère ou verbatim.</li>
              </ul>

              <h5 class="font-semibold mb-2">3.3 Tableaux</h5>
              <ul class="space-y-2 mb-4">
                <li>Titre et numérotation obligatoire.</li>
                <li>Création avec la fonction "Insertion > Tableau" de Word.</li>
                <li>Indiquer les sources sous les tableaux.</li>
              </ul>

              <h5 class="font-semibold mb-2">3.4 Figures</h5>
              <ul class="space-y-2 mb-6">
                <li>Inclut : graphiques, cartes, images, dessins, diagrammes...</li>
                <li>Fichier séparé, haute résolution (300 dpi).</li>
                <li>Titre, numéro et source requis.</li>
                <li>Formats acceptés : Excel, jpg, png, eps, tiff.</li>
              </ul>

              <h4 class="text-lg font-bold mt-6 mb-4">4. BIBLIOGRAPHIE ET RÉFÉRENCES</h4>
              <p class="mb-4">En ce qui concerne <strong>les notes références</strong>, nous privilégions le style Chicago (également appelé format classique ou traditionnel), les références sont présentées en notes de bas de page ou en fin de chapitre (ou à la fin du document). Chaque note doit inclure <strong>:</strong> le prénom et le nom (en majuscule) de l'auteur.e., le titre de l'ouvrage, le lieu de publication, la maison d'édition, la date de publication, et, le cas échéant, les pages spécifiques consultées et éventuellement la/les pages citées.</p>
              
              <div class="bg-muted p-4 rounded mb-4">
                <p class="text-sm italic">Exemple : Mélanie OUELLETTE, « Les Canadiens français, l'histoire et la démocratie : l'interprétation de Pierre Elliott Trudeau », <em>Mens. Revue du Centre de recherche en civilisation canadienne-française</em>, vol. 1, no 1, 2000, p. 37–50.</p>
              </div>

              <h5 class="font-semibold mb-2">4.1 Ouvrage (un seul auteur.e.s)</h5>
              <p class="mb-2">MENGUELE MENYENGUE Aristide Michel, <em>Forces occultes, religion et politique au Cameroun</em>, Verlaag, Presses Universitaires Francophones, 2014</p>

              <h5 class="font-semibold mb-2">4.2 Ouvrage (deux auteur.e.s)</h5>
              <p class="mb-2">LEMAIRE Louis‑Philippe et TREMBLAY Bertrand, <em>Les politiques publiques au Québec</em>, Presses de l'Université Laval, Québec, 2014.</p>

              <h5 class="font-semibold mb-2">4.3 Ouvrage (plus de deux auteur.e.s)</h5>
              <p class="mb-2">BATTISTELLA (Dario) <em>et al.</em>, <em>Dictionnaire des relations internationales</em>, Paris, Dalloz, 2012.</p>

              <h5 class="font-semibold mb-2">4.4 Ouvrage collectif</h5>
              <p class="mb-2">EKAMBI DIBONGUÈ Guillaume (dir.), <em>Le chef, la famille et le pouvoir</em>, Yaoundé, Ifrikiya, 2016.</p>

              <h5 class="font-semibold mb-2">4.5 Article de revue</h5>
              <p class="mb-2">TSANA NGUEGANG Ramses, « Entrepreneurs-politiciens... », <em>Cahiers d'Études africaines</em>, n° 220, 2015, pp. 811-835.</p>

              <h5 class="font-semibold mb-2">4.6 Contribution à un ouvrage collectif</h5>
              <p class="mb-2">OWONA NGUINI Mathias Éric, « les crises de la politique et de la démocratie au Cameroun : des dynamiques en lien avec les luttes sociales autour du changement polyarchique » in ONANA janvier (dir), <em>leçons sur le changement politique en Afrique subsaharienne regard croise sur le Cameroun</em>, 2016 p. 45</p>

              <h5 class="font-semibold mb-2">4.7 Thèse ou mémoire</h5>
              <p class="mb-2">NONO Gael Tanguy, <em>Militer dans une ville rebelle contribution à la sociohistoire du leadership militant à Douala (1948-2022)</em>, Thèse de Doctorat Université de Douala, 2023, 429 p.</p>

              <h5 class="font-semibold mb-2">4.8 Source Internet</h5>
              <p class="mb-6">KENMOGNE Faustin Marie, « Des chercheurs en science sociale veulent... », <em>Lebled-parle</em>, 11 nov. 2021, https://... (consulté le 27 oct. 2024).</p>

              <h4 class="text-lg font-bold mt-6 mb-4">5. RÉDACTION ÉPICÈNE</h4>
              <p class="mb-6">Les Éditions du Djembé d'Ébène recommandent la <strong>rédaction inclusive</strong> et se basent sur les normes proposées par l'Office québécois de la langue française (OQLF).</p>
            </div>
          </div>
          
          <div class="sticky bottom-0 bg-background border-t px-6 py-4 flex justify-end">
            <button 
              @click="isOpen = false"
              class="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="max-w-2xl mx-auto">
            <div class="mb-8 flex justify-end">
              <button  
                @click="isOpen = !isOpen"
                class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
              >
                <BookOpen class="w-4 h-4" />
                Avis aux auteurs
              </button>
            </div>
            
            <form @submit.prevent="handleSubmit" class="space-y-8">
              <!-- Personal Info -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Informations personnelles
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      v-model="formData.firstName"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.firstName" class="text-sm text-destructive mt-1">
                      {{ errors.firstName }}
                    </p>
                  </div>
                  <div>
                    <label for="lastName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      v-model="formData.lastName"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.lastName" class="text-sm text-destructive mt-1">
                      {{ errors.lastName }}
                    </p>
                  </div>
                  <div>
                    <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      v-model="formData.email"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.email" class="text-sm text-destructive mt-1">
                      {{ errors.email }}
                    </p>
                  </div>
                  <div>
                    <label for="phone" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      v-model="formData.phone"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <!-- Work Info -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Informations sur l'œuvre
                </h2>
                <div class="space-y-4">
                  <div>
                    <label for="title" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Titre de l'œuvre *
                    </label>
                    <input
                      id="title"
                      type="text"
                      v-model="formData.title"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <p v-if="errors.title" class="text-sm text-destructive mt-1">
                      {{ errors.title }}
                    </p>
                  </div>
                 
                  <div>
                    <label for="summary" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1">
                      Résumé *
                    </label>
                    <textarea
                      id="summary"
                      v-model="formData.summary"
                      rows="6"
                      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Décrivez votre œuvre en quelques paragraphes..."
                    ></textarea>
                    <p v-if="errors.summary" class="text-sm text-destructive mt-1">
                      {{ errors.summary }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- File Upload -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <h2 class="text-xl font-semibold text-foreground mb-6">
                  Manuscrit
                </h2>
                <div class="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    @change="handleFileChange"
                    class="hidden"
                    id="manuscript"
                  />
                  <label
                    for="manuscript"
                    class="cursor-pointer flex flex-col items-center"
                  >
                    <div v-if="fileName">
                      <FileText class="w-12 h-12 text-primary mb-4" />
                      <p class="text-foreground font-medium">{{ fileName }}</p>
                      <p class="text-sm text-muted-foreground mt-1">
                        Cliquez pour changer le fichier
                      </p>
                    </div>
                    <div v-else>
                      <Upload class="w-12 h-12 text-muted-foreground mb-4" />
                      <p class="text-foreground font-medium">
                        Cliquez pour télécharger votre manuscrit
                      </p>
                      <p class="text-sm text-muted-foreground mt-1">
                        Format PDF uniquement • Max 20 Mo
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- RGPD Consent -->
              <div class="bg-card rounded-lg p-6 card-shadow">
                <div class="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rgpdConsent"
                    v-model="formData.rgpdConsent"
                    class="h-4 w-4 rounded border-input bg-background mt-0.5"
                  />
                  <div>
                    <label for="rgpdConsent" class="text-sm leading-relaxed">
                      J'accepte que mes données personnelles soient traitées par les Éditions 
                      conformément à leur politique de confidentialité. Je comprends que mes 
                      données seront utilisées uniquement dans le cadre de l'évaluation de mon manuscrit. *
                    </label>
                    <p v-if="errors.rgpdConsent" class="text-sm text-destructive mt-1">
                      {{ errors.rgpdConsent }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="isSubmitting"
                :class="[
                  'w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all inline-flex items-center justify-center gap-2',
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <template v-if="isSubmitting">
                  Envoi en cours...
                </template>
                <template v-else>
                  <Send class="w-4 h-4" />
                  Envoyer ma soumission
                </template>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Upload, CheckCircle, FileText, Send, X, BookOpen } from 'lucide-vue-next'

export default {
  name: 'SubmitWorkPage',
  
  components: {
    Upload,
    CheckCircle,
    FileText,
    Send,
    X,
    BookOpen
  },
  
  data() {
    return {
      isOpen: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        summary: '',
        rgpdConsent: false
      },
      
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        summary: '',
        rgpdConsent: ''
      },
      
      fileName: null,
      isSubmitting: false,
      isSubmitted: false,
    }
  },
  
  methods: {
    // Validation du formulaire
    validateForm() {
      // Réinitialiser les erreurs
      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        summary: '',
        rgpdConsent: ''
      }
      
      let isValid = true
      
      // Validation du prénom
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = "Le prénom est requis"
        isValid = false
      } else if (this.formData.firstName.length < 2) {
        this.errors.firstName = "Le prénom doit contenir au moins 2 caractères"
        isValid = false
      } else if (this.formData.firstName.length > 50) {
        this.errors.firstName = "Le prénom ne peut pas dépasser 50 caractères"
        isValid = false
      }
      
      // Validation du nom
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = "Le nom est requis"
        isValid = false
      } else if (this.formData.lastName.length < 2) {
        this.errors.lastName = "Le nom doit contenir au moins 2 caractères"
        isValid = false
      } else if (this.formData.lastName.length > 50) {
        this.errors.lastName = "Le nom ne peut pas dépasser 50 caractères"
        isValid = false
      }
      
      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.formData.email.trim()) {
        this.errors.email = "L'email est requis"
        isValid = false
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = "Adresse email invalide"
        isValid = false
      }
      
      // Validation du titre
      if (!this.formData.title.trim()) {
        this.errors.title = "Le titre est requis"
        isValid = false
      } else if (this.formData.title.length < 3) {
        this.errors.title = "Le titre doit contenir au moins 3 caractères"
        isValid = false
      } else if (this.formData.title.length > 200) {
        this.errors.title = "Le titre ne peut pas dépasser 200 caractères"
        isValid = false
      }
      
      // Validation du résumé
      if (!this.formData.summary.trim()) {
        this.errors.summary = "Le résumé est requis"
        isValid = false
      } else if (this.formData.summary.length < 100) {
        this.errors.summary = "Le résumé doit contenir au moins 100 caractères"
        isValid = false
      } else if (this.formData.summary.length > 2000) {
        this.errors.summary = "Le résumé ne peut pas dépasser 2000 caractères"
        isValid = false
      }
      
      // Validation RGPD
      if (!this.formData.rgpdConsent) {
        this.errors.rgpdConsent = "Vous devez accepter les conditions"
        isValid = false
      }
      
      return isValid
    },
    
    // Gestion du fichier
    handleFileChange(event) {
      const file = event.target.files?.[0]
      if (file) {
        if (file.type !== "application/pdf") {
          alert("Format invalide : seuls les fichiers PDF sont acceptés.")
          return
        }
        if (file.size > 20 * 1024 * 1024) {
          alert("Fichier trop volumineux : le fichier ne doit pas dépasser 20 Mo.")
          return
        }
        this.fileName = file.name
      }
    },
    
    // Soumission du formulaire
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.isSubmitting = true

      try {
        const formData = new FormData()
        formData.append('type', this.formData.type || 'book')
        formData.append('first_name', this.formData.firstName)
        formData.append('last_name', this.formData.lastName)
        formData.append('email', this.formData.email)
        formData.append('phone', this.formData.phone || '')
        formData.append('title', this.formData.title)
        formData.append('category', this.formData.category || '')
        formData.append('summary', this.formData.summary)
        formData.append('rgpd_consent', this.formData.rgpdConsent)
        
        // Ajouter le fichier
        const fileInput = document.getElementById('manuscript')
        if (fileInput.files[0]) {
          formData.append('file', fileInput.files[0])
        }

        // Envoyer à l'API
        const response = await axios.post(
          `${this.$store.state.localhost}submissions`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            }
          }
        )

        this.isSubmitted = true
        alert('Votre soumission a été envoyée avec succès !')

      } catch (error) {
        console.error('Erreur lors de la soumission:', error)
        
        if (error.response?.status === 422) {
          const errors = error.response.data.errors
          Object.keys(errors).forEach(field => {
            if (this.errors.hasOwnProperty(field)) {
              this.errors[field] = errors[field][0]
            }
          })
          alert('Veuillez corriger les erreurs dans le formulaire.')
        } else {
          alert('Une erreur est survenue lors de l\'envoi de votre soumission.')
        }
      } finally {
        this.isSubmitting = false
      }
    },
    
    // Simulation d'envoi
    submitFormData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Formulaire soumis:', {
            ...this.formData,
            fileName: this.fileName
          })
          resolve()
        }, 1500)
      })
    },
    
    // Réinitialiser le formulaire
    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        category: '',
        summary: '',
        rgpdConsent: false
      }
      this.fileName = null
      this.isSubmitted = false
      this.errors = {}
    }
  },
  
  mounted() {
    
  }
}
</script>

<style scoped>
/* Styles spécifiques */
.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.text-destructive {
  color: hsl(var(--destructive));
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour le téléchargement de fichier */
.border-dashed {
  border-style: dashed;
}

/* Style pour les inputs */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring));
  outline: none;
}

/* Style pour les états désactivés */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation pour le succès */
.w-20.h-20 {
  animation: scale-up 0.3s ease-out;
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Styles pour le modal */
.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.5em;
}
</style>