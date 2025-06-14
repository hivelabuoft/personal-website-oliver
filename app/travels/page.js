'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import personalTravelData from '@/data/personal_travel.json';
import conferenceTravelData from '@/data/conference_travel.json';
import internshipTravelData from '@/data/internship_travel.json';
import '../../styles/travels.css';

// Dynamically import the map component with no SSR to avoid window not defined errors
const MapComponent = dynamic(() => import('@/components/TravelMap'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
});

export default function TravelsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  
  // Calculate statistics
  const cityCount = Array.from(new Set([
    ...personalTravelData.travels.map(item => item.city),
    ...conferenceTravelData.travels.map(item => item.city),
    ...internshipTravelData.travels.map(item => item.city)
  ])).length;
  
  const countryCount = Array.from(new Set([
    ...personalTravelData.travels.map(item => item.city.split(', ')[1]),
    ...conferenceTravelData.travels.map(item => item.city.split(', ')[1]),
    ...internshipTravelData.travels.map(item => item.city.split(', ')[1])
  ].filter(Boolean))).length;
  
  useEffect(() => {
    // Combine and format travel data based on active filter
    let combinedData = [];
    
    if (activeFilter === 'all' || activeFilter === 'personal') {
      combinedData = [
        ...combinedData,
        ...personalTravelData.travels.map(item => ({
          ...item,
          type: 'personal'
        }))
      ];
    }
    
    if (activeFilter === 'all' || activeFilter === 'conference') {
      combinedData = [
        ...combinedData,
        ...conferenceTravelData.travels.map(item => ({
          ...item,
          type: 'conference'
        }))
      ];
    }
    
    if (activeFilter === 'all' || activeFilter === 'internship') {
      combinedData = [
        ...combinedData,
        ...internshipTravelData.travels.map(item => ({
          ...item,
          type: 'internship'
        }))
      ];
    }
    
    setFilteredData(combinedData);
  }, [activeFilter]);

  return (
    <div className="travels-container">
      <div className="travels-header">
        <div className="travel-stats-top">
          <span className="stat-item"><strong>{cityCount}</strong> Cities</span>
          <span className="stat-separator">•</span>
          <span className="stat-item"><strong>{countryCount}</strong> Countries/Regions</span>
        </div>
        
        <div className="travel-filters">
          <button 
            className={`travel-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Travels
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveFilter('personal')}
          >
            Personal
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'conference' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conference')}
          >
            Academic Conferences
          </button>
          <button 
            className={`travel-filter-btn ${activeFilter === 'internship' ? 'active' : ''}`}
            onClick={() => setActiveFilter('internship')}
          >
            Internships
          </button>
        </div>
      </div>
      
      <div className="map-container-full">
        <MapComponent locations={filteredData} />
      </div>
    </div>
  );
}

