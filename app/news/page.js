'use client';

import updatesData from '@/data/updates.json';

export default function News() {
  return (
    <div className="page-container">
      <h1 className="page-title">News & Updates</h1>
      
      <div className="news-list">
        {updatesData.map((item) => (
          <div key={item.id} className="news-item">
            <div className="news-date">{item.date}</div>
            <div className="news-content">
              <h3 className="news-title">{item.title || 'Update'}</h3>
              <div className="news-text">
                {item.hasPaper ? (
                  <>
                    {item.content}
                    <a href={item.paperLink} className="paper-link">
                      {item.paperTitle}
                    </a>
                    {item.contentAfter}
                    {item.hasSecondPaper && (
                      <>
                        <a href={item.secondPaperLink} className="paper-link">
                          {item.secondPaperTitle}
                        </a>
                        {item.finalContent}
                      </>
                    )}
                  </>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .news-item {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .news-item:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .news-date {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .news-title {
          color: #1f2937;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .news-text {
          color: #374151;
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
        }

        .paper-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: inline-block;
          position: relative;
        }

        .paper-link:hover {
          color: #1d4ed8;
          background-color: #eff6ff;
          text-decoration: underline;
        }

        .paper-link:before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #2563eb;
          transition: width 0.3s ease;
        }

        .paper-link:hover:before {
          width: 100%;
        }

        .news-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-container {
          padding: 20px;
        }

        .page-title {
          text-align: center;
          color: #1f2937;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .news-item {
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .news-title {
            font-size: 18px;
          }
          
          .news-text {
            font-size: 15px;
          }
          
          .page-title {
            font-size: 28px;
            margin-bottom: 30px;
          }
        }
      `}</style>
    </div>
  );
}
