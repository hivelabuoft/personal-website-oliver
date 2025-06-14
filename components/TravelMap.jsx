'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/mapStyles.css';

// Get your own token from https://account.mapbox.com
// This is a temporary public token for development
mapboxgl.accessToken = 'pk.eyJ1IjoiaDJvc3Rhcm1lIiwiYSI6ImNtYndlYWw5ZzB6cGkyanExZW9vc3c5ZDAifQ.qOgFB9fV8hXE2hgS8_ZQ3g';

// More distinct but still minimal color palette
const colorsByType = {
  personal: '#546e7a',    // Slate blue-gray
  conference: '#d32f2f',  // Muted red
  internship: '#388e3c',  // Muted green
};

export default function TravelMap({ locations }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    // Wait for a tick to ensure DOM is ready
    setTimeout(() => {
      try {
        // Double-check that container exists and is visible
        if (!mapContainer.current) {
          console.error('Map container element not found');
          return;
        }
        
        // Check the dimensions of the container
        const container = mapContainer.current;
        console.log('Container dimensions:', container.clientWidth, container.clientHeight);
        
        if (container.clientWidth === 0 || container.clientHeight === 0) {
          console.error('Map container has zero width or height');
          return;
        }

        // Initialize map with a minimal monochrome style
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11', // Minimal light style
          center: [0, 20], // Center the map on a global view
          zoom: 1.5,
          attributionControl: true, // Show attribution to ensure proper loading
          preserveDrawingBuffer: true, // This can help with rendering issues
          projection: 'mercator', // Use simple mercator projection for a flat map
          renderWorldCopies: true // Show multiple copies of the world for a better global view
        });

        // Add event listener for map load
        map.current.on('load', () => {
          console.log('Map loaded successfully');
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          setMapLoaded(true);
          // No fog or 3D effects for a simple flat map
        });
        
        // Add error handling
        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100); // Small delay to ensure container is ready
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Update markers when locations or map changes
  useEffect(() => {
    if (!mapLoaded || !locations.length) return;
    
    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Add markers for each location
    locations.forEach(location => {
      const markerColor = colorsByType[location.type] || '#b0bec5'; // Default muted color
      
      // Create simple marker element
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.style.backgroundColor = markerColor;
      el.style.border = '1px solid #ffffff';  // Add white border for better contrast
      el.style.boxShadow = '0 0 2px rgba(0,0,0,0.1)';  // Subtle shadow
      
      // Add simple marker to map
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center', // Center alignment for cleaner look
        scale: 0.8 // Slightly smaller for a more minimal look
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: 'minimal-popup' })
            .setHTML(`
              <div class="map-popup">
                <h4>${location.city}</h4>
                <p>Year: ${location.year}</p>
                ${location.type === 'conference' ? `<p>Conference: ${location.conference}</p>` : ''}
                ${location.type === 'internship' ? `<p>Company: ${location.company}</p>` : ''}
              </div>
            `)
        )
        .addTo(map.current);
    });
    
    // Adjust map bounds to fit all markers if needed
    if (locations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(location => {
        bounds.extend([location.lng, location.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 3, // Lower max zoom for a more zoomed-out view
        duration: 500 // Faster animation
      });
    }
  }, [locations, mapLoaded]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div 
        ref={mapContainer} 
        className="map-canvas" 
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="map-legend" style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div className="legend-title" style={{ fontWeight: '500', marginBottom: '8px' }}>Legend</div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.personal, border: '1px solid #ffffff' }}></span>
          <span>Personal Travel</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.conference, border: '1px solid #ffffff' }}></span>
          <span>Conference Travel</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker" style={{ backgroundColor: colorsByType.internship, border: '1px solid #ffffff' }}></span>
          <span>Internship</span>
        </div>
      </div>
    </div>
  );
}
