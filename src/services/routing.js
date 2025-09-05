// src/services/routing.js
export class RoutingService {
  static async calculateRoute(start, end) {
    try {
      const [startLng, startLat] = start;
      const [endLng, endLat] = end;
      
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
      );
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        return {
          distance: data.routes[0].distance, // en mètres
          duration: data.routes[0].duration, // en secondes
          geometry: data.routes[0].geometry
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erreur calcul itinéraire:', error);
      return null;
    }
  }
}