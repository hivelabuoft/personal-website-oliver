'use client';

import { useState, useEffect } from 'react';
import publicationsData from '@/data/publications.json';
import PdfTeaser from '@/components/PdfTeaser';

export default function AllPublications() {
  const [activeTag, setActiveTag] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [filteredPublications, setFilteredPublications] = useState(publicationsData.publications);
  
  // Get unique tags and statuses
  const allTags = [...new Set(publicationsData.publications.flatMap(pub => pub.tags || []))].sort();
  const allStatuses = [...new Set(publicationsData.publications.map(pub => pub.status).filter(Boolean))].sort();
  
  // Function to format author list with your name bolded
  const formatAuthors = (authors) => {
    return authors.map((author, index) => {
      const isLastAuthor = index === authors.length - 1;
      const separator = isLastAuthor ? '' : ', ';
      
      if (author === 'Oliver Huang') {
        return <span key={index}><strong>{author}</strong>{separator}</span>;
      } else {
        return <span key={index}>{author}{separator}</span>;
      }
    });
  };
  
  // Apply filters whenever activeTag or activeStatus changes
  useEffect(() => {
    let filtered = publicationsData.publications;
    
    if (activeTag) {
      filtered = filtered.filter(pub => pub.tags && pub.tags.includes(activeTag));
    }
    
    if (activeStatus) {
      filtered = filtered.filter(pub => pub.status === activeStatus);
    }
    
    setFilteredPublications(filtered);
  }, [activeTag, activeStatus]);
  
  // Function to toggle a tag filter
  const toggleTagFilter = (tag) => {
    if (activeTag === tag) {
      setActiveTag(null); // Clear filter if clicking the active tag
    } else {
      setActiveTag(tag);
    }
  };
  
  // Function to toggle a status filter
  const toggleStatusFilter = (status) => {
    if (activeStatus === status) {
      setActiveStatus(null); // Clear filter if clicking the active status
    } else {
      setActiveStatus(status);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">All Publications</h1>
      
      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="filter-section">
          <h3 className="filter-title">Filter by Research Area:</h3>
          <div className="filter-buttons">
            {allTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => toggleTagFilter(tag)}
                className={`filter-button tag-button ${activeTag === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="publications-list">
        {filteredPublications.map((pub) => (
          <div className="publication-item" key={pub.id}>
            <div className="publication-content">
              <div className="paper-title-line">
                <span className="venue-shortname">{pub.venue.shortName}</span> {pub.title}
              </div>
              
              <div className="tags-container">
                {/* Publication Status Tag */}
                {pub.status && (
                  <div className="pub-status-tag">
                    <span className={`status-${pub.status.toLowerCase()}`}>
                      {pub.status.charAt(0).toUpperCase() + pub.status.slice(1)}
                    </span>
                  </div>
                )}
                
                {/* Research Area Tags */}
                {pub.tags && pub.tags.length > 0 && (
                  <div className="pub-tags">
                    {pub.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`pub-tag ${activeTag === tag ? 'active-tag' : ''}`}
                        onClick={() => toggleTagFilter(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="venue-fullname">
                {pub.venue.fullName}
              </div>
              <p className="authors">{formatAuthors(pub.authors)}</p>
              
              {pub.abstract && (
                <p className="abstract">{pub.abstract}</p>
              )}
              <div className="publication-links">
                {pub.links.pdf && (
                  <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="pub-link pdf-link">PDF</a>
                )}
                {pub.links.code && (
                  <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="pub-link code-link">Code</a>
                )}
                {pub.links['try-live'] && (
                  <a href={pub.links['try-live']} target="_blank" rel="noopener noreferrer" className="pub-link try-live-link">Try Live</a>
                )}
                {pub.links.presentation && (
                  <a href={pub.links.presentation} target="_blank" rel="noopener noreferrer" className="pub-link presentation-link">Presentation</a>
                )}
                {pub.links['participants-data'] && (
                  <a href={pub.links['participants-data']} target="_blank" rel="noopener noreferrer" className="pub-link participants-link">Participants Data</a>
                )}
                {pub.links.project && (
                  <a href={pub.links.project} target="_blank" rel="noopener noreferrer" className="pub-link">Project Page</a>
                )}
                {pub.links.doi && (
                  <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" className="pub-link">DOI</a>
                )}
              </div>
            </div>
            {pub.links.pdf && (
              <div className="publication-teaser">
                <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" aria-label={`View ${pub.title} PDF`}>
                  <PdfTeaser 
                    pdfUrl={pub.links.pdf}
                    title={pub.title}
                  />
                </a>
              </div>
            )}
          </div>
        ))}
        
        {filteredPublications.length === 0 && (
          <div className="no-results">
            <p>No publications match the current filters.</p>
            <button 
              onClick={() => {setActiveTag(null); setActiveStatus(null);}}
              className="filter-button clear-button"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
