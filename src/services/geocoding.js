// src/services/geocoding.js
export class GeocodingService {
  static async addressToCoordinates(address) {
    // Équivalent API de l'UI avec dedupe=0
// const address = "Montreuil";
const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&dedupe=0&limit=100&namedetails=1&addressdetails=1
&class=place&class=building&class=highway&class=amenity&class=natural&class=landuse&class=waterway&class=tourism&class=leisure&class=shop&class=historic&class=man_made
&type=city&type=town&type=village&type=hamlet&type=suburb&type=quarter&type=neighbourhood&type=locality&type=island&type=farm
`;
    try {
      const response = await fetch(url);
      console.log('adress:', encodeURIComponent(address));
      const data = await response.json();
      console.log('Données de géocodage:', data);
      if (data.length > 0) {
        return data
        
      
      }
     
      return null;
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      return null;
    }
  }

  static async coordinatesToAddress(lat, lng) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails&namedetails&lat=${lat}&lon=${lng}`
      );
      
      const data = await response.json();
      console.log('Données de reverse géocodage:', data);
      return data.namedetails.name?data.namedetails.name?data.namedetails.name:'':data.display_name || 'Adresse non trouvée';
    } catch (error) {
      console.error('Erreur de reverse géocodage:', error);
      return 'Adresse non disponible';
    }
  }
}