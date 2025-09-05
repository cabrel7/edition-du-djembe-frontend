<template>
  <div class="paris-vtc-app">
    <!-- Header de l'application -->
    <div class="app-header">
      <h1>🚖 VTC Paris</h1>
      <p>Service de transport dans Paris intra-muros</p>
    </div>

    <!-- Carte de Paris -->
    <div class="paris-map-container">
      <div ref="mapContainer" class="paris-map"></div>
      
      <!-- Contrôles de la carte -->
      <div class="map-controls">
        <button @click="locateUser" class="control-btn" title="Me localiser">
          <span class="btn-icon">📍</span>
        </button>
        <button @click="resetToParis" class="control-btn" title="Recenter Paris">
          <span class="btn-icon">🗼</span>
        </button>
      </div>

      <!-- Sélection des points -->
      <div class="location-buttons">
        <button @click="setPickup" class="location-btn pickup-btn">
          <span class="btn-icon">🚗</span>
          Départ
        </button>
        <button @click="setDestination" class="location-btn destination-btn">
          <span class="btn-icon">🎯</span>
          Arrivée
        </button>
      </div>
    </div>

    <!-- Informations de course -->
    <div v-if="routeInfo" class="ride-info">
      <div class="info-card">
        <h3>📊 Détails de la course</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Distance:</span>
            <span class="value">{{ (routeInfo.distance / 1000).toFixed(1) }} km</span>
          </div>
          <div class="info-item">
            <span class="label">Durée:</span>
            <span class="value">{{ Math.round(routeInfo.duration / 60) }} min</span>
          </div>
          <div class="info-item">
            <span class="label">Prix:</span>
            <span class="value price">{{ calculatePrice(routeInfo.distance) }} €</span>
          </div>
        </div>
        <button @click="confirmRide" class="confirm-btn">
          🚗 Confirmer la course
        </button>
      </div>
    </div>

    <!-- Instructions -->
    <div class="instructions">
      <p>📍 Sélectionnez votre point de départ et d'arrivée sur la carte</p>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RoutingService } from '../../services/routing';

// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default {
  name: 'ParisMobileMap',
  data() {
    return {
      map: null,
      routeLayer: null,
      pickupMarker: null,
      destinationMarker: null,
      pickupLocation: null,
      destinationLocation: null,
      routeInfo: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initParisMap();
    });
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    initParisMap() {
      // Centre de Paris - Hôtel de Ville
      const parisCenter = [48.8566, 2.3522];
      
      this.map = L.map(this.$refs.mapContainer, {
        center: parisCenter,
        zoom: 13,
        minZoom: 12,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: true,
        maxBounds: this.getParisBounds(),
        maxBoundsViscosity: 0.9
      });

      // Carte OpenStreetMap en FRANÇAIS
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs | <a href="https://www.openstreetmap.fr/">OSM France</a>',
        bounds: this.getParisBounds()
      }).addTo(this.map);

      // Contrôle de zoom personnalisé en français
      L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Zoomer',
        zoomOutTitle: 'Dézoomer'
      }).addTo(this.map);

      // Contrôle d'attribution en français
      this.map.attributionControl.setPrefix('Carte ©');

      // Ajouter les limites de Paris
      this.addParisBoundary();

      // Ajouter les principaux quartiers de Paris
      this.addParisDistricts();
    },

    getParisBounds() {
      // Limites strictes de Paris intra-muros
      return [
        [48.815, 2.225], // Sud-Ouest
        [48.902, 2.470]  // Nord-Est
      ];
    },

    addParisBoundary() {
      // Rectangle pour Paris intra-muros
      const parisBounds = this.getParisBounds();
      L.rectangle(parisBounds, {
        color: '#ff6b35',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.1,
        fillColor: '#ff6b35'
      }).addTo(this.map).bindTooltip('Paris Intra-muros', {
        permanent: false,
        direction: 'center',
        className: 'french-tooltip'
      });
    },

    addParisDistricts() {
      // Ajouter quelques labels de quartiers importants
      const districts = [
        { name: 'Champs-Élysées', coords: [48.873, 2.295], size: [100, 30] },
        { name: 'Le Marais', coords: [48.857, 2.360], size: [80, 30] },
        { name: 'Saint-Germain', coords: [48.853, 2.333], size: [100, 30] },
        { name: 'Montmartre', coords: [48.886, 2.343], size: [90, 30] },
        { name: 'Latin', coords: [48.849, 2.345], size: [60, 30] },
        { name: 'Bastille', coords: [48.853, 2.370], size: [70, 30] }
      ];

      districts.forEach(district => {
        L.marker(district.coords, {
          icon: L.divIcon({
            html: `<div style="
              background: rgba(255, 107, 53, 0.9);
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 10px;
              font-weight: bold;
              text-align: center;
              border: 1px solid white;
            ">${district.name}</div>`,
            className: 'district-label',
            iconSize: district.size
          })
        }).addTo(this.map);
      });
    },

    resetToParis() {
      this.map.setView([48.8566, 2.3522], 13);
    },

    locateUser() {
      if (!navigator.geolocation) {
        alert('La géolocalisation n\'est pas supportée par votre navigateur');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos = [latitude, longitude];
          
          if (this.isInParis(userPos)) {
            this.map.setView(userPos, 15);
            
            // Ajouter un marqueur temporaire en français
            L.marker(userPos, {
              icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                iconSize: [20, 32],
                iconAnchor: [10, 32],
              })
            })
            .addTo(this.map)
            .bindPopup('📍 Votre position actuelle')
            .openPopup();
            
          } else {
            alert('Vous êtes en dehors de Paris. Notre service est disponible uniquement dans Paris intra-muros.');
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'accéder à votre position. Vérifiez les paramètres de géolocalisation.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    },

    isInParis(coords) {
      const [lat, lng] = coords;
      const bounds = this.getParisBounds();
      return lat >= bounds[0][0] && lat <= bounds[1][0] &&
             lng >= bounds[0][1] && lng <= bounds[1][1];
    },

    setPickup() {
      const center = this.map.getCenter();
      
      if (!this.isInParis([center.lat, center.lng])) {
        alert('Veuillez sélectionner un point dans Paris intra-muros');
        return;
      }

      if (this.pickupMarker) {
        this.map.removeLayer(this.pickupMarker);
      }
      
      this.pickupLocation = [center.lat, center.lng];
      
      this.pickupMarker = L.marker(center, {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        zIndexOffset: 1000
      }).addTo(this.map)
      .bindPopup('📍 Point de départ')
      .openPopup();
    },

    setDestination() {
      const center = this.map.getCenter();
      
      if (!this.isInParis([center.lat, center.lng])) {
        alert('Veuillez sélectionner un point dans Paris intra-muros');
        return;
      }

      if (this.destinationMarker) {
        this.map.removeLayer(this.destinationMarker);
      }
      
      this.destinationLocation = [center.lat, center.lng];
      
      this.destinationMarker = L.marker(center, {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        zIndexOffset: 900
      }).addTo(this.map)
      .bindPopup('🎯 Point d\'arrivée')
      .openPopup();
    },

    async calculateRoute() {
      if (!this.pickupLocation || !this.destinationLocation) {
        alert('Veuillez sélectionner un point de départ et d\'arrivée');
        return;
      }
      
      try {
        const route = await RoutingService.calculateRoute(
          [this.pickupLocation[1], this.pickupLocation[0]],
          [this.destinationLocation[1], this.destinationLocation[0]]
        );
        
        if (route) {
          this.routeInfo = route;
          
          if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
          }
          
          this.routeLayer = L.geoJSON(route.geometry, {
            style: {
              color: '#ff6b35',
              weight: 5,
              opacity: 0.8,
              lineJoin: 'round'
            }
          }).addTo(this.map)
          .bindTooltip('Itinéraire VTC', { permanent: false });
          
          this.map.fitBounds(this.routeLayer.getBounds().pad(0.1));
        }
      } catch (error) {
        console.error('Erreur calcul itinéraire:', error);
        alert('Erreur lors du calcul de l\'itinéraire. Veuillez réessayer.');
      }
    },

    confirmRide() {
      if (!this.routeInfo) {
        this.calculateRoute();
        return;
      }

      alert(`🎉 Course confirmée !\nPrix: ${this.calculatePrice(this.routeInfo.distance)} €\nDurée: ${Math.round(this.routeInfo.duration / 60)} minutes`);
      
      // Réinitialiser pour une nouvelle course
      this.resetSelection();
    },

    resetSelection() {
      if (this.pickupMarker) this.map.removeLayer(this.pickupMarker);
      if (this.destinationMarker) this.map.removeLayer(this.destinationMarker);
      if (this.routeLayer) this.map.removeLayer(this.routeLayer);
      
      this.pickupLocation = null;
      this.destinationLocation = null;
      this.routeInfo = null;
      this.pickupMarker = null;
      this.destinationMarker = null;
      this.routeLayer = null;
    },

    calculatePrice(distanceMeters) {
      const distanceKm = distanceMeters / 1000;
      const basePrice = 2.50;
      const pricePerKm = 1.80;
      return (basePrice + (distanceKm * pricePerKm)).toFixed(2);
    }
  }
};
</script>

<style scoped>
.paris-vtc-app {
  max-width: 100%;
  height: 100vh;
  padding: 10px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-header {
  text-align: center;
  margin-bottom: 10px;
}

.app-header h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.app-header p {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 5px 0 0 0;
}

.paris-map-container {
  position: relative;
  width: 100%;
  height: 50vh;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.paris-map {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.map-controls {
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-icon {
  font-size: 1.2rem;
}

.location-buttons {
  position: absolute;
  bottom: 15px;
  left: 15px;
  z-index: 1000;
  display: flex;
  gap: 10px;
}

.location-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.pickup-btn {
  background: #27ae60;
  color: white;
}

.destination-btn {
  background: #e74c3c;
  color: white;
}

.ride-info {
  margin-top: 10px;
}

.info-card {
  background: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.info-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 2px;
}

.value {
  font-weight: bold;
  color: #2c3e50;
}

.price {
  color: #27ae60;
  font-size: 1.1rem;
}

.confirm-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.instructions {
  text-align: center;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #7f8c8d;
}

/* Styles pour les éléments de la carte */
:deep(.french-tooltip) {
  background: rgba(255, 107, 53, 0.9);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  font-size: 12px;
}

:deep(.district-label) {
  background: transparent !important;
  border: none !important;
}

:deep(.leaflet-control-attribution) {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.8);
}

/* Responsive pour mobile */
@media (max-width: 768px) {
  .paris-map-container {
    height: 45vh;
  }
  
  .location-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  .location-btn {
    font-size: 0.7rem;
    padding: 8px 12px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>