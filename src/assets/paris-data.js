// paris-data.js
export const parisLocations = {
  // Arrondissements de Paris
  arrondissements: [
    { id: 1, name: "1er Arrondissement - Louvre", lat: 48.8590, lng: 2.3410, type: "arrondissement" },
    { id: 2, name: "2ème Arrondissement - Bourse", lat: 48.8670, lng: 2.3410, type: "arrondissement" },
    { id: 3, name: "3ème Arrondissement - Temple", lat: 48.8640, lng: 2.3620, type: "arrondissement" },
    { id: 4, name: "4ème Arrondissement - Hôtel-de-Ville", lat: 48.8550, lng: 2.3560, type: "arrondissement" },
    { id: 5, name: "5ème Arrondissement - Panthéon", lat: 48.8440, lng: 2.3460, type: "arrondissement" },
    { id: 6, name: "6ème Arrondissement - Luxembourg", lat: 48.8490, lng: 2.3320, type: "arrondissement" },
    { id: 7, name: "7ème Arrondissement - Palais-Bourbon", lat: 48.8560, lng: 2.3180, type: "arrondissement" },
    { id: 8, name: "8ème Arrondissement - Élysée", lat: 48.8730, lng: 2.3130, type: "arrondissement" },
    { id: 9, name: "9ème Arrondissement - Opéra", lat: 48.8740, lng: 2.3370, type: "arrondissement" },
    { id: 10, name: "10ème Arrondissement - Enclos-St-Laurent", lat: 48.8720, lng: 2.3560, type: "arrondissement" },
    { id: 11, name: "11ème Arrondissement - Popincourt", lat: 48.8570, lng: 2.3790, type: "arrondissement" },
    { id: 12, name: "12ème Arrondissement - Reuilly", lat: 48.8410, lng: 2.3880, type: "arrondissement" },
    { id: 13, name: "13ème Arrondissement - Gobelins", lat: 48.8320, lng: 2.3550, type: "arrondissement" },
    { id: 14, name: "14ème Arrondissement - Observatoire", lat: 48.8330, lng: 2.3260, type: "arrondissement" },
    { id: 15, name: "15ème Arrondissement - Vaugirard", lat: 48.8410, lng: 2.3000, type: "arrondissement" },
    { id: 16, name: "16ème Arrondissement - Passy", lat: 48.8630, lng: 2.2760, type: "arrondissement" },
    { id: 17, name: "17ème Arrondissement - Batignolles-Monceau", lat: 48.8830, lng: 2.3220, type: "arrondissement" },
    { id: 18, name: "18ème Arrondissement - Butte-Montmartre", lat: 48.8920, lng: 2.3440, type: "arrondissement" },
    { id: 19, name: "19ème Arrondissement - Buttes-Chaumont", lat: 48.8800, lng: 2.3820, type: "arrondissement" },
    { id: 20, name: "20ème Arrondissement - Ménilmontant", lat: 48.8650, lng: 2.3980, type: "arrondissement" }
  ],

  // Quartiers 
  quartiers: [
    { id: 101, name: "Le Marais", lat: 48.8570, lng: 2.3600, type: "quartier", arrondissement: 3 },
    { id: 102, name: "Saint-Germain-des-Prés", lat: 48.8530, lng: 2.3330, type: "quartier", arrondissement: 6 },
    { id: 103, name: "Montmartre", lat: 48.8860, lng: 2.3430, type: "quartier", arrondissement: 18 },
    { id: 104, name: "Pigalle", lat: 48.8820, lng: 2.3380, type: "quartier", arrondissement: 9 },
    { id: 105, name: "Bastille", lat: 48.8530, lng: 2.3700, type: "quartier", arrondissement: 11 },
    { id: 106, name: "Champs-Élysées", lat: 48.8730, lng: 2.2950, type: "quartier", arrondissement: 8 },
    { id: 107, name: "Quartier Latin", lat: 48.8490, lng: 2.3450, type: "quartier", arrondissement: 5 },
    { id: 108, name: "Belleville", lat: 48.8720, lng: 2.3830, type: "quartier", arrondissement: 19 },
    { id: 109, name: "Ménilmontant", lat: 48.8650, lng: 2.3980, type: "quartier", arrondissement: 20 },
    { id: 110, name: "Opéra", lat: 48.8710, lng: 2.3320, type: "quartier", arrondissement: 9 },
    { id: 111, name: "Ternes", lat: 48.8770, lng: 2.2950, type: "quartier", arrondissement: 17 },
    { id: 112, name: "Passy", lat: 48.8570, lng: 2.2800, type: "quartier", arrondissement: 16 },
    { id: 113, name: "Vaugirard", lat: 48.8400, lng: 2.3000, type: "quartier", arrondissement: 15 },
    { id: 114, name: "Gobelins", lat: 48.8320, lng: 2.3550, type: "quartier", arrondissement: 13 },
    { id: 115, name: "Buttes-Chaumont", lat: 48.8800, lng: 2.3820, type: "quartier", arrondissement: 19 },
    { id: 116, name: "Saint-Sulpice", lat: 48.8511, lng: 2.3347, type: "quartier", arrondissement: 6 },
    { id: 117, name: "Odéon", lat: 48.8511, lng: 2.3392, type: "quartier", arrondissement: 6 },
    { id: 118, name: "Châtelet", lat: 48.8580, lng: 2.3470, type: "quartier", arrondissement: 1 },
    { id: 119, name: "Les Halles", lat: 48.8610, lng: 2.3470, type: "quartier", arrondissement: 1 },
    { id: 120, name: "Invalides", lat: 48.8566, lng: 2.3125, type: "quartier", arrondissement: 7 },
    { id: 121, name: "Trocadéro", lat: 48.8632, lng: 2.2877, type: "quartier", arrondissement: 16 },
    { id: 122, name: "Oberkampf", lat: 48.8646, lng: 2.3710, type: "quartier", arrondissement: 11 },
    { id: 123, name: "République", lat: 48.8670, lng: 2.3630, type: "quartier", arrondissement: 3 },
    { id: 124, name: "Nation", lat: 48.8480, lng: 2.3960, type: "quartier", arrondissement: 11 },
    { id: 125, name: "Père Lachaise", lat: 48.8614, lng: 2.3933, type: "quartier", arrondissement: 20 }
  ],

  // Gares et transports
  transports: [
    { id: 201, name: "Gare du Nord", lat: 48.8800, lng: 2.3550, type: "transport" },
    { id: 202, name: "Gare de l'Est", lat: 48.8760, lng: 2.3590, type: "transport" },
    { id: 203, name: "Gare de Lyon", lat: 48.8440, lng: 2.3740, type: "transport" },
    { id: 204, name: "Gare Montparnasse", lat: 48.8410, lng: 2.3220, type: "transport" },
    { id: 205, name: "Gare Saint-Lazare", lat: 48.8760, lng: 2.3240, type: "transport" },
    { id: 206, name: "Gare d'Austerlitz", lat: 48.8434, lng: 2.3648, type: "transport" },
    { id: 207, name: "Aéroport CDG", lat: 49.0097, lng: 2.5478, type: "transport" },
    { id: 208, name: "Aéroport Orly", lat: 48.7253, lng: 2.3594, type: "transport" },
    { id: 209, name: "Métro Châtelet", lat: 48.8580, lng: 2.3470, type: "transport" },
    { id: 210, name: "Métro République", lat: 48.8670, lng: 2.3630, type: "transport" },
    { id: 211, name: "Métro Opéra", lat: 48.8710, lng: 2.3320, type: "transport" },
    { id: 212, name: "Métro Bastille", lat: 48.8530, lng: 2.3690, type: "transport" },
    { id: 213, name: "RER Châtelet-Les Halles", lat: 48.8622, lng: 2.3470, type: "transport" },
    { id: 214, name: "RER La Défense", lat: 48.8919, lng: 2.2386, type: "transport" },
    { id: 215, name: "Gare de Bercy", lat: 48.8405, lng: 2.3859, type: "transport" },
    { id: 216, name: "Port de Javel", lat: 48.8439, lng: 2.2730, type: "transport" },
    { id: 217, name: "Aéroport Le Bourget", lat: 48.9694, lng: 2.4414, type: "transport" }
  ],

  // Monuments et lieux touristiques
  monuments: [
    { id: 301, name: "Tour Eiffel", lat: 48.8584, lng: 2.2945, type: "monument" },
    { id: 302, name: "Arc de Triomphe", lat: 48.8738, lng: 2.2950, type: "monument" },
    { id: 303, name: "Notre-Dame de Paris", lat: 48.8530, lng: 2.3499, type: "monument" },
    { id: 304, name: "Louvre", lat: 48.8606, lng: 2.3376, type: "monument" },
    { id: 305, name: "Sacré-Cœur", lat: 48.8867, lng: 2.3431, type: "monument" },
    { id: 306, name: "Opéra Garnier", lat: 48.8710, lng: 2.3320, type: "monument" },
    { id: 307, name: "Panthéon", lat: 48.8462, lng: 2.3461, type: "monument" },
    { id: 308, name: "Hôtel des Invalides", lat: 48.8566, lng: 2.3125, type: "monument" },
    { id: 309, name: "Centre Pompidou", lat: 48.8606, lng: 2.3522, type: "monument" },
    { id: 310, name: "Sainte-Chapelle", lat: 48.8554, lng: 2.3450, type: "monument" },
    { id: 311, name: "Conciergerie", lat: 48.8564, lng: 2.3456, type: "monument" },
    { id: 312, name: "Place de la Concorde", lat: 48.8656, lng: 2.3210, type: "monument" },
    { id: 313, name: "Place Vendôme", lat: 48.8674, lng: 2.3294, type: "monument" },
    { id: 314, name: "Place des Vosges", lat: 48.8556, lng: 2.3656, type: "monument" },
    { id: 315, name: "Père Lachaise", lat: 48.8614, lng: 2.3933, type: "monument" },
    { id: 316, name: "Basilique Saint-Denis", lat: 48.9356, lng: 2.3599, type: "monument" },
    { id: 317, name: "Palais de Justice", lat: 48.8559, lng: 2.3456, type: "monument" },
    { id: 318, name: "Hôtel de Ville", lat: 48.8566, lng: 2.3522, type: "monument" },
    { id: 319, name: "Palais du Luxembourg", lat: 48.8484, lng: 2.3373, type: "monument" },
    { id: 320, name: "Église Saint-Sulpice", lat: 48.8511, lng: 2.3347, type: "monument" },
    { id: 321, name: "Église de la Madeleine", lat: 48.8704, lng: 2.3243, type: "monument" },
    { id: 322, name: "Château de Vincennes", lat: 48.8422, lng: 2.4361, type: "monument" },
    { id: 323, name: "Grande Arche de la Défense", lat: 48.8919, lng: 2.2364, type: "monument" },
    { id: 324, name: "Palais de Chaillot", lat: 48.8632, lng: 2.2877, type: "monument" },
    { id: 325, name: "Institut de France", lat: 48.8580, lng: 2.3366, type: "monument" }
  ],

  // Parcs et jardins
  parcs: [
    { id: 401, name: "Jardin du Luxembourg", lat: 48.8462, lng: 2.3372, type: "parc" },
    { id: 402, name: "Jardin des Tuileries", lat: 48.8636, lng: 2.3272, type: "parc" },
    { id: 403, name: "Parc des Buttes-Chaumont", lat: 48.8800, lng: 2.3820, type: "parc" },
    { id: 404, name: "Bois de Boulogne", lat: 48.8630, lng: 2.2500, type: "parc" },
    { id: 405, name: "Bois de Vincennes", lat: 48.8300, lng: 2.4300, type: "parc" },
    { id: 406, name: "Parc Monceau", lat: 48.8790, lng: 2.3090, type: "parc" },
    { id: 407, name: "Jardin des Plantes", lat: 48.8420, lng: 2.3590, type: "parc" },
    { id: 408, name: "Parc de Belleville", lat: 48.8710, lng: 2.3830, type: "parc" },
    { id: 409, name: "Parc Montsouris", lat: 48.8223, lng: 2.3369, type: "parc" },
    { id: 410, name: "Parc de la Villette", lat: 48.8939, lng: 2.3900, type: "parc" },
    { id: 411, name: "Parc André Citroën", lat: 48.8384, lng: 2.2723, type: "parc" },
    { id: 412, name: "Parc de Bercy", lat: 48.8365, lng: 2.3813, type: "parc" },
    { id: 413, name: "Square du Vert-Galant", lat: 48.8570, lng: 2.3404, type: "parc" },
    { id: 414, name: "Jardin du Palais-Royal", lat: 48.8638, lng: 2.3374, type: "parc" },
    { id: 415, name: "Champ de Mars", lat: 48.8555, lng: 2.2986, type: "parc" },
    { id: 416, name: "Esplanade des Invalides", lat: 48.8566, lng: 2.3125, type: "parc" },
    { id: 417, name: "Parc Floral", lat: 48.8369, lng: 2.4444, type: "parc" },
    { id: 418, name: "Jardin d'Acclimatation", lat: 48.8756, lng: 2.2692, type: "parc" },
    { id: 419, name: "Square Saint-Julien-le-Pauvre", lat: 48.8520, lng: 2.3473, type: "parc" },
    { id: 420, name: "Promenade Plantée", lat: 48.8472, lng: 2.3706, type: "parc" }
  ],

  // Places importantes
  places: [
    { id: 501, name: "Place de la Bastille", lat: 48.8530, lng: 2.3690, type: "place" },
    { id: 502, name: "Place de la République", lat: 48.8670, lng: 2.3630, type: "place" },
    { id: 503, name: "Place de la Nation", lat: 48.8480, lng: 2.3960, type: "place" },
    { id: 504, name: "Place d'Italie", lat: 48.8310, lng: 2.3550, type: "place" },
    { id: 505, name: "Place de Clichy", lat: 48.8830, lng: 2.3270, type: "place" },
    { id: 506, name: "Place Pigalle", lat: 48.8820, lng: 2.3380, type: "place" },
    { id: 507, name: "Place du Tertre", lat: 48.8860, lng: 2.3410, type: "place" },
    { id: 508, name: "Place Saint-Michel", lat: 48.8530, lng: 2.3430, type: "place" },
    { id: 509, name: "Place Dauphine", lat: 48.8570, lng: 2.3423, type: "place" },
    { id: 510, name: "Place de l'Étoile", lat: 48.8738, lng: 2.2950, type: "place" },
    { id: 511, name: "Place du Châtelet", lat: 48.8583, lng: 2.3470, type: "place" },
    { id: 512, name: "Place de l'Opéra", lat: 48.8710, lng: 2.3320, type: "place" },
    { id: 513, name: "Place Saint-Germain-des-Prés", lat: 48.8540, lng: 2.3336, type: "place" },
    { id: 514, name: "Place des Victoires", lat: 48.8644, lng: 2.3418, type: "place" },
    { id: 515, name: "Place du Palais-Royal", lat: 48.8638, lng: 2.3374, type: "place" }
  ],

  // Grands boulevards et rues
  rues: [
    { id: 601, name: "Champs-Élysées", lat: 48.8730, lng: 2.2950, type: "rue" },
    { id: 602, name: "Boulevard Haussmann", lat: 48.8730, lng: 2.3320, type: "rue" },
    { id: 603, name: "Rue de Rivoli", lat: 48.8560, lng: 2.3470, type: "rue" },
    { id: 604, name: "Boulevard Saint-Germain", lat: 48.8530, lng: 2.3330, type: "rue" },
    { id: 605, name: "Boulevard Saint-Michel", lat: 48.8490, lng: 2.3430, type: "rue" },
    { id: 606, name: "Avenue Montaigne", lat: 48.8650, lng: 2.3050, type: "rue" },
    { id: 607, name: "Rue du Faubourg Saint-Honoré", lat: 48.8700, lng: 2.3180, type: "rue" },
    { id: 608, name: "Rue Mouffetard", lat: 48.8410, lng: 2.3490, type: "rue" },
    { id: 609, name: "Rue de la Huchette", lat: 48.8520, lng: 2.3460, type: "rue" },
    { id: 610, name: "Boulevard Voltaire", lat: 48.8570, lng: 2.3790, type: "rue" },
    { id: 611, name: "Avenue des Gobelins", lat: 48.8350, lng: 2.3520, type: "rue" },
    { id: 612, name: "Rue de la Paix", lat: 48.8690, lng: 2.3314, type: "rue" },
    { id: 613, name: "Avenue de l'Opéra", lat: 48.8650, lng: 2.3350, type: "rue" },
    { id: 614, name: "Boulevard de Sébastopol", lat: 48.8630, lng: 2.3500, type: "rue" },
    { id: 615, name: "Rue Saint-Antoine", lat: 48.8550, lng: 2.3600, type: "rue" },
    { id: 616, name: "Avenue de la Grande Armée", lat: 48.8770, lng: 2.2840, type: "rue" },
    { id: 617, name: "Boulevard de Magenta", lat: 48.8720, lng: 2.3520, type: "rue" },
    { id: 618, name: "Rue de Rennes", lat: 48.8500, lng: 2.3280, type: "rue" },
    { id: 619, name: "Avenue Kléber", lat: 48.8700, lng: 2.2900, type: "rue" },
    { id: 620, name: "Boulevard Raspail", lat: 48.8450, lng: 2.3300, type: "rue" }
  ],

  // Hôtels importants
  hotels: [
    { id: 701, name: "Hôtel Ritz Paris", lat: 48.8680, lng: 2.3290, type: "hotel" },
    { id: 702, name: "Hôtel Plaza Athénée", lat: 48.8650, lng: 2.3050, type: "hotel" },
    { id: 703, name: "Hôtel de Crillon", lat: 48.8680, lng: 2.3210, type: "hotel" },
    { id: 704, name: "Hôtel George V", lat: 48.8710, lng: 2.3000, type: "hotel" },
    { id: 705, name: "Hôtel Lutetia", lat: 48.8510, lng: 2.3260, type: "hotel" },
    { id: 706, name: "Hôtel Meurice", lat: 48.8650, lng: 2.3290, type: "hotel" },
    { id: 707, name: "Hôtel Bristol", lat: 48.8720, lng: 2.3140, type: "hotel" },
    { id: 708, name: "Hôtel Costes", lat: 48.8660, lng: 2.3280, type: "hotel" },
    { id: 709, name: "Shangri-La Paris", lat: 48.8632, lng: 2.2877, type: "hotel" },
    { id: 710, name: "Hôtel Lancaster", lat: 48.8720, lng: 2.3050, type: "hotel" },
    { id: 711, name: "Mandarin Oriental Paris", lat: 48.8680, lng: 2.3280, type: "hotel" },
    { id: 712, name: "Le Grand Hôtel", lat: 48.8710, lng: 2.3320, type: "hotel" }
  ],

  // Centres commerciaux
  commerciaux: [
    { id: 801, name: "Galeries Lafayette", lat: 48.8730, lng: 2.3320, type: "commercial" },
    { id: 802, name: "Printemps Haussmann", lat: 48.8730, lng: 2.3300, type: "commercial" },
    { id: 803, name: "Le Bon Marché", lat: 48.8510, lng: 2.3220, type: "commercial" },
    { id: 804, name: "Forum des Halles", lat: 48.8610, lng: 2.3470, type: "commercial" },
    { id: 805, name: "Les Quatre Temps", lat: 48.8919, lng: 2.2386, type: "commercial" },
    { id: 806, name: "BHV Marais", lat: 48.8566, lng: 2.3522, type: "commercial" },
    { id: 807, name: "Samaritaine", lat: 48.8606, lng: 2.3422, type: "commercial" },
    { id: 808, name: "Bercy Village", lat: 48.8365, lng: 2.3813, type: "commercial" },
    { id: 809, name: "Centre Commercial Italie 2", lat: 48.8310, lng: 2.3550, type: "commercial" },
    { id: 810, name: "Montparnasse 56", lat: 48.8410, lng: 2.3220, type: "commercial" }
  ],

  // Universités et écoles
  education: [
    { id: 901, name: "Sorbonne", lat: 48.8480, lng: 2.3430, type: "education" },
    { id: 902, name: "Collège de France", lat: 48.8490, lng: 2.3450, type: "education" },
    { id: 903, name: "Lycée Louis-le-Grand", lat: 48.8460, lng: 2.3440, type: "education" },
    { id: 904, name: "École Normale Supérieure", lat: 48.8420, lng: 2.3450, type: "education" },
    { id: 905, name: "Université Assas", lat: 48.8490, lng: 2.3430, type: "education" },
    { id: 906, name: "Sciences Po Paris", lat: 48.8548, lng: 2.3269, type: "education" },
    { id: 907, name: "HEC Paris", lat: 48.7596, lng: 2.1656, type: "education" },
    { id: 908, name: "École Polytechnique", lat: 48.7139, lng: 2.2078, type: "education" },
    { id: 909, name: "ESSEC", lat: 49.0347, lng: 2.0769, type: "education" },
    { id: 910, name: "Université Paris Dauphine", lat: 48.8707, lng: 2.2739, type: "education" },
    { id: 911, name: "ESCP Business School", lat: 48.8490, lng: 2.3430, type: "education" },
    { id: 912, name: "Lycée Henri-IV", lat: 48.8462, lng: 2.3461, type: "education" }
  ],

  // Hôpitaux
  hopitaux: [
    { id: 1001, name: "Hôpital Pitié-Salpêtrière", lat: 48.8360, lng: 2.3620, type: "hopital" },
    { id: 1002, name: "Hôpital Necker", lat: 48.8430, lng: 2.3140, type: "hopital" },
    { id: 1003, name: "Hôpital Saint-Louis", lat: 48.8730, lng: 2.3700, type: "hopital" },
    { id: 1004, name: "Hôpital Cochin", lat: 48.8370, lng: 2.3350, type: "hopital" },
    { id: 1005, name: "Hôpital Georges-Pompidou", lat: 48.8360, lng: 2.2750, type: "hopital" },
    { id: 1006, name: "Hôpital Lariboisière", lat: 48.8800, lng: 2.3550, type: "hopital" },
    { id: 1007, name: "Hôpital Tenon", lat: 48.8650, lng: 2.3980, type: "hopital" },
    { id: 1008, name: "Hôpital Saint-Antoine", lat: 48.8470, lng: 2.3750, type: "hopital" },
    { id: 1009, name: "Hôpital Bichat", lat: 48.8900, lng: 2.3300, type: "hopital" },
    { id: 1010, name: "Hôpital Robert-Debré", lat: 48.8800, lng: 2.4000, type: "hopital" },
    { id: 1011, name: "Hôpital La Pitié", lat: 48.8360, lng: 2.3620, type: "hopital" },
    { id: 1012, name: "Hôtel-Dieu", lat: 48.8540, lng: 2.3470, type: "hopital" }
  ],

  // Musées
  musees: [
    { id: 1101, name: "Musée d'Orsay", lat: 48.8600, lng: 2.3266, type: "musee" },
    { id: 1102, name: "Musée Rodin", lat: 48.8556, lng: 2.3150, type: "musee" },
    { id: 1103, name: "Musée de l'Orangerie", lat: 48.8638, lng: 2.3226, type: "musee" },
    { id: 1104, name: "Musée Picasso", lat: 48.8599, lng: 2.3623, type: "musee" },
    { id: 1105, name: "Musée du Quai Branly", lat: 48.8606, lng: 2.2976, type: "musee" },
    { id: 1106, name: "Musée Carnavalet", lat: 48.8570, lng: 2.3620, type: "musee" },
    { id: 1107, name: "Musée Cluny", lat: 48.8506, lng: 2.3434, type: "musee" },
    { id: 1108, name: "Musée Gustave Moreau", lat: 48.8780, lng: 2.3330, type: "musee" },
    { id: 1109, name: "Musée Marmottan", lat: 48.8590, lng: 2.2700, type: "musee" },
    { id: 1110, name: "Musée Jacquemart-André", lat: 48.8750, lng: 2.3100, type: "musee" },
    { id: 1111, name: "Petit Palais", lat: 48.8660, lng: 2.3140, type: "musee" },
    { id: 1112, name: "Grand Palais", lat: 48.8660, lng: 2.3120, type: "musee" },
    { id: 1113, name: "Musée de l'Armée", lat: 48.8566, lng: 2.3125, type: "musee" },
    { id: 1114, name: "Musée de la Marine", lat: 48.8632, lng: 2.2877, type: "musee" },
    { id: 1115, name: "Musée des Arts Décoratifs", lat: 48.8606, lng: 2.3340, type: "musee" },
    { id: 1116, name: "Musée National d'Histoire Naturelle", lat: 48.8420, lng: 2.3590, type: "musee" },
    { id: 1117, name: "Palais de la Découverte", lat: 48.8660, lng: 2.3120, type: "musee" },
    { id: 1118, name: "Cité des Sciences", lat: 48.8939, lng: 2.3900, type: "musee" },
    { id: 1119, name: "Musée Delacroix", lat: 48.8540, lng: 2.3336, type: "musee" },
    { id: 1120, name: "Musée Zadkine", lat: 48.8440, lng: 2.3320, type: "musee" }
  ],

  // Théâtres et salles de spectacle
  theatres: [
    { id: 1201, name: "Théâtre Mogador", lat: 48.8761, lng: 2.3316, type: "theatre" },
    { id: 1202, name: "Théâtre du Châtelet", lat: 48.8583, lng: 2.3470, type: "theatre" },
    { id: 1203, name: "Comédie-Française", lat: 48.8638, lng: 2.3374, type: "theatre" },
    { id: 1204, name: "Philharmonie de Paris", lat: 48.8853, lng: 2.3932, type: "theatre" },
    { id: 1205, name: "Accor Arena (Bercy)", lat: 48.8380, lng: 2.3788, type: "theatre" },
    { id: 1206, name: "Opéra Bastille", lat: 48.8530, lng: 2.3690, type: "theatre" },
    { id: 1207, name: "Théâtre des Champs-Élysées", lat: 48.8650, lng: 2.3050, type: "theatre" },
    { id: 1208, name: "Olympia", lat: 48.8730, lng: 2.3280, type: "theatre" },
    { id: 1209, name: "Bataclan", lat: 48.8630, lng: 2.3710, type: "theatre" },
    { id: 1210, name: "Théâtre de la Ville", lat: 48.8583, lng: 2.3470, type: "theatre" },
    { id: 1211, name: "Casino de Paris", lat: 48.8780, lng: 2.3330, type: "theatre" },
    { id: 1212, name: "Folies Bergère", lat: 48.8730, lng: 2.3440, type: "theatre" },
    { id: 1213, name: "Théâtre de l'Odéon", lat: 48.8511, lng: 2.3392, type: "theatre" },
    { id: 1214, name: "Théâtre du Marais", lat: 48.8570, lng: 2.3600, type: "theatre" },
    { id: 1215, name: "La Cigale", lat: 48.8820, lng: 2.3380, type: "theatre" }
  ],

  // Sites sportifs
  sports: [
    { id: 1301, name: "Stade de France", lat: 48.9244, lng: 2.3601, type: "sport" },
    { id: 1302, name: "Parc des Princes", lat: 48.8414, lng: 2.2530, type: "sport" },
    { id: 1303, name: "Roland-Garros", lat: 48.8470, lng: 2.2530, type: "sport" },
    { id: 1304, name: "Hippodrome de Longchamp", lat: 48.8622, lng: 2.2383, type: "sport" },
    { id: 1305, name: "Palais Omnisports de Paris-Bercy", lat: 48.8380, lng: 2.3788, type: "sport" },
    { id: 1306, name: "Hippodrome de Vincennes", lat: 48.8255, lng: 2.4361, type: "sport" },
    { id: 1307, name: "Stade Charléty", lat: 48.8177, lng: 2.3456, type: "sport" },
    { id: 1308, name: "Piscine Molitor", lat: 48.8470, lng: 2.2530, type: "sport" },
    { id: 1309, name: "Coubertin Stadium", lat: 48.8470, lng: 2.2530, type: "sport" },
    { id: 1310, name: "Racing Club de France", lat: 48.8580, lng: 2.2800, type: "sport" }
  ],

  // Ponts
  ponts: [
    { id: 1401, name: "Pont Alexandre III", lat: 48.8630, lng: 2.3134, type: "pont" },
    { id: 1402, name: "Pont Neuf", lat: 48.8575, lng: 2.3426, type: "pont" },
    { id: 1403, name: "Pont des Arts", lat: 48.8583, lng: 2.3376, type: "pont" },
    { id: 1404, name: "Pont de Bir-Hakeim", lat: 48.8530, lng: 2.2870, type: "pont" },
    { id: 1405, name: "Pont d'Iéna", lat: 48.8625, lng: 2.2881, type: "pont" },
    { id: 1406, name: "Pont de l'Alma", lat: 48.8630, lng: 2.3000, type: "pont" },
    { id: 1407, name: "Pont Royal", lat: 48.8590, lng: 2.3320, type: "pont" },
    { id: 1408, name: "Pont de la Concorde", lat: 48.8620, lng: 2.3220, type: "pont" },
    { id: 1409, name: "Pont Marie", lat: 48.8520, lng: 2.3560, type: "pont" },
    { id: 1410, name: "Pont de Sully", lat: 48.8510, lng: 2.3580, type: "pont" },
    { id: 1411, name: "Pont Notre-Dame", lat: 48.8570, lng: 2.3480, type: "pont" },
    { id: 1412, name: "Pont au Change", lat: 48.8570, lng: 2.3450, type: "pont" },
    { id: 1413, name: "Pont Mirabeau", lat: 48.8470, lng: 2.2730, type: "pont" },
    { id: 1414, name: "Pont de Grenelle", lat: 48.8500, lng: 2.2820, type: "pont" },
    { id: 1415, name: "Pont Charles de Gaulle", lat: 48.8440, lng: 2.3740, type: "pont" }
  ],

  // Restaurants célèbres
  restaurants: [
    { id: 1501, name: "Le Jules Verne (Tour Eiffel)", lat: 48.8583, lng: 2.2945, type: "restaurant" },
    { id: 1502, name: "L'Ambroisie (Place des Vosges)", lat: 48.8558, lng: 2.3653, type: "restaurant" },
    { id: 1503, name: "Le Meurice Alain Ducasse", lat: 48.8651, lng: 2.3284, type: "restaurant" },
    { id: 1504, name: "Septime", lat: 48.8538, lng: 2.3806, type: "restaurant" },
    { id: 1505, name: "Pierre Gagnaire", lat: 48.8722, lng: 2.3015, type: "restaurant" },
    { id: 1506, name: "L'Astrance", lat: 48.8632, lng: 2.2877, type: "restaurant" },
    { id: 1507, name: "Guy Savoy", lat: 48.8580, lng: 2.3366, type: "restaurant" },
    { id: 1508, name: "L'Arpège", lat: 48.8560, lng: 2.3180, type: "restaurant" },
    { id: 1509, name: "Taillevent", lat: 48.8740, lng: 2.3080, type: "restaurant" },
    { id: 1510, name: "Le Grand Véfour", lat: 48.8638, lng: 2.3374, type: "restaurant" },
    { id: 1511, name: "Epicure (Bristol)", lat: 48.8720, lng: 2.3140, type: "restaurant" },
    { id: 1512, name: "Le Cinq (George V)", lat: 48.8710, lng: 2.3000, type: "restaurant" },
    { id: 1513, name: "Restaurant David Toutain", lat: 48.8560, lng: 2.3180, type: "restaurant" },
    { id: 1514, name: "Bistrot Paul Bert", lat: 48.8530, lng: 2.3700, type: "restaurant" },
    { id: 1515, name: "L'Ami Jean", lat: 48.8560, lng: 2.3180, type: "restaurant" },
    { id: 1516, name: "Breizh Café", lat: 48.8570, lng: 2.3600, type: "restaurant" },
    { id: 1517, name: "Le Comptoir du Relais", lat: 48.8530, lng: 2.3330, type: "restaurant" },
    { id: 1518, name: "Pink Mamma", lat: 48.8820, lng: 2.3380, type: "restaurant" },
    { id: 1519, name: "Le Mary Celeste", lat: 48.8570, lng: 2.3600, type: "restaurant" },
    { id: 1520, name: "Du Pain et des Idées", lat: 48.8720, lng: 2.3560, type: "restaurant" }
  ],

  // Cafés célèbres
  cafes: [
    { id: 1601, name: "Café de Flore", lat: 48.8540, lng: 2.3330, type: "cafe" },
    { id: 1602, name: "Les Deux Magots", lat: 48.8540, lng: 2.3336, type: "cafe" },
    { id: 1603, name: "Café Procope", lat: 48.8530, lng: 2.3390, type: "cafe" },
    { id: 1604, name: "Café de la Paix", lat: 48.8710, lng: 2.3320, type: "cafe" },
    { id: 1605, name: "Brasserie Lipp", lat: 48.8540, lng: 2.3330, type: "cafe" },
    { id: 1606, name: "Angelina", lat: 48.8640, lng: 2.3280, type: "cafe" },
    { id: 1607, name: "Café Marly", lat: 48.8606, lng: 2.3376, type: "cafe" },
    { id: 1608, name: "Le Consulat", lat: 48.8860, lng: 2.3410, type: "cafe" },
    { id: 1609, name: "Café des 2 Moulins", lat: 48.8860, lng: 2.3430, type: "cafe" },
    { id: 1610, name: "Ten Belles", lat: 48.8670, lng: 2.3630, type: "cafe" }
  ],

  // Marchés
  marches: [
    { id: 1701, name: "Marché des Enfants Rouges", lat: 48.8640, lng: 2.3620, type: "marche" },
    { id: 1702, name: "Marché Saint-Germain", lat: 48.8530, lng: 2.3330, type: "marche" },
    { id: 1703, name: "Marché aux Fleurs", lat: 48.8550, lng: 2.3460, type: "marche" },
    { id: 1704, name: "Marché aux Puces", lat: 48.9010, lng: 2.3320, type: "marche" },
    { id: 1705, name: "Marché de Belleville", lat: 48.8720, lng: 2.3830, type: "marche" },
    { id: 1706, name: "Marché Raspail", lat: 48.8450, lng: 2.3300, type: "marche" },
    { id: 1707, name: "Marché des Batignolles", lat: 48.8830, lng: 2.3220, type: "marche" },
    { id: 1708, name: "Marché Place Monge", lat: 48.8430, lng: 2.3510, type: "marche" },
    { id: 1709, name: "Marché Président Wilson", lat: 48.8630, lng: 2.2760, type: "marche" },
    { id: 1710, name: "Marché Cours de Vincennes", lat: 48.8480, lng: 2.3960, type: "marche" }
  ],

  // Cinémas
  cinemas: [
    { id: 1801, name: "Grand Rex", lat: 48.8720, lng: 2.3480, type: "cinema" },
    { id: 1802, name: "Gaumont Opéra", lat: 48.8710, lng: 2.3320, type: "cinema" },
    { id: 1803, name: "UGC Ciné Cité Bercy", lat: 48.8380, lng: 2.3788, type: "cinema" },
    { id: 1804, name: "Cinémathèque Française", lat: 48.8365, lng: 2.3813, type: "cinema" },
    { id: 1805, name: "Studio des Ursulines", lat: 48.8440, lng: 2.3460, type: "cinema" },
    { id: 1806, name: "Le Champo", lat: 48.8490, lng: 2.3430, type: "cinema" },
    { id: 1807, name: "MK2 Bibliothèque", lat: 48.8270, lng: 2.3760, type: "cinema" },
    { id: 1808, name: "Forum des Images", lat: 48.8610, lng: 2.3470, type: "cinema" },
    { id: 1809, name: "Pathé Wepler", lat: 48.8830, lng: 2.3270, type: "cinema" },
    { id: 1810, name: "Le Brady", lat: 48.8720, lng: 2.3560, type: "cinema" }
  ],

  // Lieux de culte
  culte: [
    { id: 1901, name: "Église Saint-Eustache", lat: 48.8620, lng: 2.3450, type: "culte" },
    { id: 1902, name: "Église Saint-Étienne-du-Mont", lat: 48.8462, lng: 2.3461, type: "culte" },
    { id: 1903, name: "Église Saint-Paul-Saint-Louis", lat: 48.8550, lng: 2.3620, type: "culte" },
    { id: 1904, name: "Grande Mosquée de Paris", lat: 48.8420, lng: 2.3550, type: "culte" },
    { id: 1905, name: "Synagogue de la rue de la Victoire", lat: 48.8750, lng: 2.3400, type: "culte" },
    { id: 1906, name: "Église Saint-Germain-l'Auxerrois", lat: 48.8606, lng: 2.3400, type: "culte" },
    { id: 1907, name: "Temple du Marais", lat: 48.8570, lng: 2.3600, type: "culte" },
    { id: 1908, name: "Église Russe", lat: 48.8560, lng: 2.3180, type: "culte" },
    { id: 1909, name: "Cathédrale Sainte-Croix", lat: 48.8630, lng: 2.2760, type: "culte" },
    { id: 1910, name: "Église Saint-Merri", lat: 48.8606, lng: 2.3522, type: "culte" }
  ],

  // Ambassades importantes
  ambassades: [
    { id: 2001, name: "Ambassade des États-Unis", lat: 48.8650, lng: 2.3050, type: "ambassade" },
    { id: 2002, name: "Ambassade du Royaume-Uni", lat: 48.8700, lng: 2.3180, type: "ambassade" },
    { id: 2003, name: "Ambassade d'Allemagne", lat: 48.8580, lng: 2.3180, type: "ambassade" },
    { id: 2004, name: "Ambassade d'Italie", lat: 48.8700, lng: 2.3180, type: "ambassade" },
    { id: 2005, name: "Ambassade du Japon", lat: 48.8580, lng: 2.2950, type: "ambassade" },
    { id: 2006, name: "Ambassade de Chine", lat: 48.8630, lng: 2.2760, type: "ambassade" },
    { id: 2007, name: "Ambassade d'Espagne", lat: 48.8580, lng: 2.2950, type: "ambassade" },
    { id: 2008, name: "Ambassade de Russie", lat: 48.8580, lng: 2.2950, type: "ambassade" }
  ]
};

// Fonction utilitaire pour charger les données sur OpenStreetMap
export const loadParisDataOnMap = (map) => {
  if (!map) return;

  // Icônes personnalisées pour chaque type
  const icons = {
    // arrondissement: L.icon({
    //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    //   iconSize: [20, 32],
    //   iconAnchor: [10, 32],
    // }),
    // quartier: L.icon({
    //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    //   iconSize: [18, 30],
    //   iconAnchor: [9, 30],
    // }),
    // transport: L.icon({
    //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    //   iconSize: [22, 34],
    //   iconAnchor: [11, 34],
    // }),
    // monument: L.icon({
    //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    //   iconSize: [24, 36],
    //   iconAnchor: [12, 36],
    // }),
    parc: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      iconSize: [20, 32],
      iconAnchor: [10, 32],
    }),
    default: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      iconSize: [18, 30],
      iconAnchor: [9, 30],
    })
  };

  // Charger tous les lieux
  Object.values(parisLocations).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(location => {
        const icon = icons[location.type] || icons.default;
        const label=L.divIcon({
            html:`
            <div style="
            background:rgba(255,255,255,0.9);
            padding:4px,8px;
            border-radius:12px;
            border:1px solid #ccc;
            font-size:11px;
            font-weight:bold;
            white-space:nowrap;
            box-shadow:0 1px 3px,rgba(0,0,0,0.2);
            colors:#333;
            
            ">
            ${location.name}
            </div>
            `,className:'location-label',
            iconSize:[100,24],
            iconAnchor:[50,12]
        })
        L.marker([location.lat, location.lng], { icon:icon,interactive:false })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px;">
              <strong>${location.name}</strong><br>
              <small>Type: ${location.type}</small><br>
              ${location.arrondissement ? `Arrondissement: ${location.arrondissement}<br>` : ''}
              <small>Coordonnées: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</small>
            </div>
          `);
      });
    }
  });
};
import Fuse from 'fuse.js';
const allParisPlaces = [
  ...parisLocations.monuments,
  ...parisLocations.transports,
  ...parisLocations.restaurants,
  ...parisLocations.hotels,
  ...parisLocations.parcs,
  ...parisLocations.musees,
  ...parisLocations.theatres,
  ...parisLocations.sports,
  ...parisLocations.ponts,
  ...parisLocations.quartiers,
  ...parisLocations.arrondissements
];

const fuse = new Fuse(allParisPlaces, {
  keys: ['name'],  // champs à rechercher
  threshold: 0.3   // tolérance de correspondance floue (0 = exact, 1 = très large)
});

export const searchLocation = (query) => {
  return fuse.search(query).map(result => result.item);
};

// Fonction pour obtenir les lieux par type
export const getLocationsByType = (type) => {
  const results = [];
  
  Object.values(parisLocations).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(location => {
        if (location.type === type) {
          results.push(location);
        }
      });
    }
  });
  
  return results;
};

// Fonction pour obtenir les lieux par arrondissement
export const getLocationsByArrondissement = (arrondissement) => {
  const results = [];
  
  Object.values(parisLocations).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(location => {
        if (location.arrondissement === arrondissement) {
          results.push(location);
        }
      });
    }
  });
  
  return results;
};