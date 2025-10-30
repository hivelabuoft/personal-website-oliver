'use client';

export default function Home() {
  return (
    <div className="home-container">
      <section className="bio-section">
        <h2><Annotated text="Bio" imageNumber={2} /></h2>
        <p>
          I'm <Annotated text="Oliver" imageNumber={1} />, a first-year Master of Science student in Computer Science at the{' '}
          <a href="https://web.cs.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            University of Toronto
          </a>
          , where I'm fortunate to be advised by{' '}
          <a href="https://carolinanobre.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Carolina Nobre
          </a>{' '}
          in the{' '}
          <a href="https://www.dgp.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Dynamic Graphics Project (DGP) Lab
          </a>
          . My research focuses on <strong className="highlight-text">data visualization for decision-making</strong>,{' '}
          <strong className="highlight-text">human-AI collaboration</strong>, and improving{' '}
          <strong className="highlight-text">explainable AI (XAI)</strong> in educational contexts.
        </p>

        <p>
          Before beginning my master's, I completed an Honours Bachelor of Science in Computer Science and Statistics at the{' '}
          <a href="https://www.artsci.utoronto.ca/" target="_blank" rel="noopener noreferrer" className="styled-link">
            University of Toronto
          </a>
          , where I had the privilege of working with{' '}
          <a href="https://www.tovigrossman.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Tovi Grossman
          </a>{' '}
          and{' '}
          <a href="https://carolinanobre.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Carolina Nobre
          </a>
          . During this time, I led the design and development of{' '}
          <strong className="highlight-text">generative AI tools for computer science education</strong> and contributed to{' '}
          <strong className="highlight-text">novel time-series data visualizations</strong>.
        </p>

        <p>
          As a junior researcher, I am actively exploring new opportunities and research topics within my areas of interest. 
          I'm particularly excited about advancing the use of <strong className="highlight-text">XAI and visualization techniques</strong> to assist 
          people in making more informed decisions.
        </p>
      </section>

      <section className="publications-section">
        <h2><Annotated text="Recent Papers (2025)" imageNumber={3} /></h2>
        <div className="featured-publications-container">
          <PublicationsList maxCount={3} />
        </div>
        <div className="section-link">
          <a href="/publications" className="styled-link view-all-link">
            View all publications →
          </a>
        </div>
      </section>
    </div>
  );
}

// Annotated Text Component
function Annotated({ text, imageNumber }) {
  // Convert imageNumber to styleNumber (1-7) to use different highlight styles
  const styleNumber = ((imageNumber - 1) % 7) + 1;
  
  return (
    <span className={`brush-highlight brush-style-${styleNumber}`}>
      {text}
    </span>
  );
}

// Component to render a limited list of publications with focus on conference papers
function PublicationsList({ maxCount = 3 }) {
  // Lazy-require client components/data when this runs in the browser
  const PdfTeaser = require('@/components/PdfTeaser').default;
  const publicationsData = require('@/data/publications.json');

  // Filter all 2025 papers and sort by authorship (first-authored first, then co-authored)
  const papers2025 = publicationsData.publications
    .filter(pub => pub.year === 2025)
    .sort((a, b) => {
      // Check if Oliver Huang is first author
      const aIsFirstAuthor = a.authors[0] === "Oliver Huang";
      const bIsFirstAuthor = b.authors[0] === "Oliver Huang";
      
      // First authored papers come first
      if (aIsFirstAuthor && !bIsFirstAuthor) return -1;
      if (!aIsFirstAuthor && bIsFirstAuthor) return 1;
      
      // Within same authorship category, sort by venue importance/alphabetical
      // Special ordering: VIS main paper first, then VIS EA second
      const venueOrder = {
        "VIS 2025": 1,
        "VIS 2025 (Extended Abstract)": 2,
        "EuroVis 2025": 3, 
        "IUI 2025": 4,
        "CHIWORK 2025": 5,
        "VL/HCC 2025": 6,
        "arXiv 2025": 7
      };
      
      return (venueOrder[a.venue.shortName] || 999) - (venueOrder[b.venue.shortName] || 999);
    });

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

  return (
    <div className="publications-list">
      {papers2025.map((pub) => {
        return (
          <div className="publication-item" key={pub.id}>
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
                  {pub.links?.pdf && (
                    <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="pub-link pdf-link">PDF</a>
                  )}
                  {pub.links?.code && (
                    <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="pub-link code-link">Code</a>
                  )}
                  {pub.links?.['try-live'] && (
                    <a href={pub.links['try-live']} target="_blank" rel="noopener noreferrer" className="pub-link try-live-link">Try Live</a>
                  )}
                  {pub.links?.presentation && (
                    <a href={pub.links.presentation} target="_blank" rel="noopener noreferrer" className="pub-link presentation-link">Presentation</a>
                  )}
                  {pub.links?.project && (
                    <a href={pub.links.project} target="_blank" rel="noopener noreferrer" className="pub-link">Project Page</a>
                  )}
                  {pub.links?.doi && (
                    <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" className="pub-link">DOI</a>
                  )}
                  {pub.links?.poster && (
                    <a href={pub.links.poster} target="_blank" rel="noopener noreferrer" className="pub-link presentation-link">Poster</a>
                  )}
                </div>
              </div>

              <div className="publication-right">
                {pub.links?.pdf && (
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
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .publication-item {
          display: flex;
          flex-direction: column;
          padding: 25px;
          margin-bottom: 0px;
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
        }
      `}</style>
    </div>
  );
}
