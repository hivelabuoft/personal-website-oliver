'use client';

import { useState, useEffect } from 'react';
import publicationsData from '@/data/publications.json';
import PdfTeaser from '@/components/PdfTeaser';

export default function AllPublications() {
  const [activeTag, setActiveTag] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [filteredPublications, setFilteredPublications] = useState(publicationsData.publications);
  const [expandedAbstracts, setExpandedAbstracts] = useState(new Set());
  
  // Get unique tags and statuses
  const allTags = [...new Set(publicationsData.publications.flatMap(pub => pub.tags || []))].sort();
  const allStatuses = [...new Set(publicationsData.publications.map(pub => pub.status).filter(Boolean))].sort();
  
  // Function to toggle abstract visibility
  const toggleAbstract = (pubId) => {
    setExpandedAbstracts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pubId)) {
        newSet.delete(pubId);
      } else {
        newSet.add(pubId);
      }
      return newSet;
    });
  };

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
    <>
      <div className="page-container">
      <h1 className="page-title">All Publications</h1>
      
      {/* Tag filters */}
      <div className="filter-section">
        <div className="filter-buttons">
          <button 
            onClick={() => setActiveTag(null)}
            className={`filter-button ${activeTag === null ? 'active' : ''}`}
          >
            Show All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag} 
              onClick={() => toggleTagFilter(tag)}
              className={`filter-button ${activeTag === tag ? 'active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Full Conference Papers */}
      <div className="publication-section">
        <h2 className="section-title">Full Conference Papers</h2>
        <div className="publications-list">
          {filteredPublications
            .filter(pub => pub.venue.shortName !== "VIS 2025 (Extended Abstract)")
            .map((pub) => {
              const anchorId = pub.href ? pub.href.split('#')[1] : `publication-${pub.id}`;
              
              return (
                <div className="publication-item" id={anchorId} key={`conference-${pub.id}`}>
                  <div className="publication-main">
                    <div className="publication-content">
                      <div className="paper-title-line">
                        <span className="venue-shortname">{pub.venue.shortName}</span>{' '}
                        <span className="publication-title">{pub.title}</span>
                      </div>
                      
                      <div className="venue-fullname">
                        {pub.venue.fullName}
                      </div>
                      <p className="authors">{formatAuthors(pub.authors)}</p>
                      
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
                        {pub.links.poster && (
                          <a href={pub.links.poster} target="_blank" rel="noopener noreferrer" className="pub-link">Poster</a>
                        )}
                      </div>
                    </div>
                    
                    <div className="publication-right">
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
                      
                      {pub.abstract && (
                        <button 
                          onClick={() => toggleAbstract(pub.id)}
                          className="abstract-toggle-btn"
                        >
                          {expandedAbstracts.has(pub.id) ? 'Hide Abstract' : 'Show Abstract'}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {pub.abstract && expandedAbstracts.has(pub.id) && (
                    <div className="abstract-content-expanded">
                      <div className="abstract-text">
                        {pub.abstract}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Extended Abstracts */}
      <div className="publication-section" style={{marginTop: '60px'}}>
        <h2 className="section-title">Extended Abstracts</h2>
        <div className="publications-list">
          {filteredPublications
            .filter(pub => pub.venue.shortName === "VIS 2025 (Extended Abstract)")
            .map((pub) => {
              const anchorId = pub.href ? pub.href.split('#')[1] : `publication-${pub.id}`;
              
              return (
                <div className="publication-item" id={anchorId} key={`extended-${pub.id}`}>
                  <div className="publication-main">
                    <div className="publication-content">
                      <div className="paper-title-line">
                        <span className="venue-shortname">{pub.venue.shortName}</span>{' '}
                        <span className="publication-title">{pub.title}</span>
                      </div>
                      
                      <div className="venue-fullname">
                        {pub.venue.fullName}
                      </div>
                      <p className="authors">{formatAuthors(pub.authors)}</p>
                      
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
                        {pub.links.poster && (
                          <a href={pub.links.poster} target="_blank" rel="noopener noreferrer" className="pub-link">Poster</a>
                        )}
                      </div>
                    </div>
                    
                    <div className="publication-right">
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
                      
                      {pub.abstract && (
                        <button 
                          onClick={() => toggleAbstract(pub.id)}
                          className="abstract-toggle-btn"
                        >
                          {expandedAbstracts.has(pub.id) ? 'Hide Abstract' : 'Show Abstract'}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {pub.abstract && expandedAbstracts.has(pub.id) && (
                    <div className="abstract-content-expanded">
                      <div className="abstract-text">
                        {pub.abstract}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      
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

      <style jsx>{`
        .filter-section {
          margin-bottom: 40px;
          text-align: center;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          align-items: center;
        }

        .filter-button {
          background-color: #e3f2fd;
          color: #1976d2;
          border: 1px solid #bbdefb;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .filter-button:hover {
          background-color: #bbdefb;
          border-color: #90caf9;
          transform: translateY(-1px);
        }

        .filter-button.active {
          background-color: #1976d2;
          color: white;
          border-color: #1976d2;
          box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e7eb;
        }

        .publication-section {
          margin-bottom: 60px;
        }

        .publication-item {
          display: flex;
          flex-direction: column;
          padding: 25px;
          margin-bottom: 25px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          scroll-margin-top: 80px;
          border: 1px solid #e5e7eb;
        }

        .publication-item:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }

        .publication-main {
          display: flex;
          gap: 20px;
        }

        .publication-content {
          flex: 1;
          min-width: 0;
        }

        .publication-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 180px;
          flex-shrink: 0;
        }

        .paper-title-line {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 10px;
          color: #1f2937;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .publication-title {
          color: #1f2937;
          font-weight: 600;
        }

        .venue-shortname {
          background: #1976d2;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: 600;
          margin-right: 12px;
        }

        .publication-title-link {
          color: #1f2937;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .publication-title-link:hover {
          color: #1976d2;
          text-decoration: underline;
        }

        .venue-fullname {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 8px;
          font-style: italic;
        }

        .authors {
          font-size: 0.95rem;
          color: #4b5563;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .publication-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pub-link {
          padding: 0.35rem 0.75rem;
          border-radius: 5px;
          background-color: rgba(240, 240, 240, 0.7);
          color: #555;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          display: inline-block;
          text-decoration: none;
        }

        .pub-link:hover {
          background-color: rgba(220, 220, 220, 0.9);
          color: #333;
        }

        .pdf-link {
          background-color: rgba(244, 67, 54, 0.15);
          color: #d32f2f;
          border: 1px solid rgba(244, 67, 54, 0.3);
        }

        .pdf-link:hover {
          background-color: rgba(244, 67, 54, 0.25);
          color: #b71c1c;
        }

        .code-link {
          background-color: rgba(156, 39, 176, 0.15);
          color: #7b1fa2;
          border: 1px solid rgba(156, 39, 176, 0.3);
        }

        .code-link:hover {
          background-color: rgba(156, 39, 176, 0.25);
          color: #4a148c;
        }

        .try-live-link {
          background-color: rgba(76, 175, 80, 0.15);
          color: #2e7d32;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .try-live-link:hover {
          background-color: rgba(76, 175, 80, 0.25);
          color: #1b5e20;
        }

        .presentation-link {
          background-color: rgba(33, 150, 243, 0.15);
          color: #1976d2;
          border: 1px solid rgba(33, 150, 243, 0.3);
        }

        .presentation-link:hover {
          background-color: rgba(33, 150, 243, 0.25);
          color: #0d47a1;
        }

        .participants-link {
          background-color: rgba(156, 39, 176, 0.15);
          color: #7b1fa2;
          border: 1px solid rgba(156, 39, 176, 0.3);
        }

        .participants-link:hover {
          background-color: rgba(156, 39, 176, 0.25);
          color: #4a148c;
        }

        .publication-teaser {
          width: 180px;
          height: 240px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .abstract-toggle-btn {
          background: #e3f2fd;
          border: 1px solid #bbdefb;
          color: #1976d2;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          width: 100%;
          outline: none;
        }

        .abstract-toggle-btn:hover {
          background: #bbdefb;
          border-color: #90caf9;
          transform: translateY(-1px);
        }

        .abstract-toggle-btn:active {
          transform: translateY(0);
          background: #90caf9;
        }

        .abstract-content-expanded {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          animation: slideDown 0.3s ease-out;
        }

        .abstract-text {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #1976d2;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #374151;
          font-style: italic;
          border: 1px solid #bbdefb;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .publication-main {
            flex-direction: column;
            gap: 15px;
          }

          .publication-right {
            flex-direction: row;
            justify-content: center;
            width: 100%;
            gap: 20px;
          }

          .publication-teaser {
            width: 120px;
            height: 160px;
          }

          .abstract-toggle-btn {
            flex: 1;
            max-width: 200px;
          }

          .filter-buttons {
            gap: 6px;
          }
          
          .filter-button {
            padding: 6px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
