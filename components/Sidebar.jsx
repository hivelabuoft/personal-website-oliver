'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import updatesData from '../data/updates.json';

const Sidebar = () => {
  // Social links
  const socialLinks = [
    { 
      name: 'Google Scholar', 
      url: 'https://scholar.google.com/citations?user=1upDPnEAAAAJ&hl=en', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z" />
          <path d="M10 12H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2h-6" />
          <path d="M12 22v-9" />
          <path d="M12 9.5V7.5l7-5.5L21 5" />
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: 'mailto:oliver@cs.toronto.edu', 
      displayText: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/oliphant0803', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/oliver-huang-2398661aa/', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    }
  ];

  // We've removed page links as requested

  // Get the top 3 latest updates
  const latestUpdates = updatesData.slice(0, 3);

  return (
    <div className={styles.sidebar}>
      <div className={styles.profileContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src="/static/uploads/profile.png" // Update this path to your actual profile image
            alt="Oliver Huang"
            width={180}
            height={180}
            className={styles.profileImage}
            priority
          />
        </div>
        <h2 className={styles.name}>Oliver Huang</h2>
        <p className={styles.title}>MSc Student @ UofT</p>
        <p className={styles.title}>oliver[at]cs[dot]toronto[dot]edu</p>
      </div>

      {/* Social Links */}
      <div className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.url} 
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
          >
            {link.icon}
            <span className={styles.socialName}>
              {link.displayText || link.name}
            </span>
          </a>
        ))}
      </div>
      
      {/* Latest Updates */}
      <div className={styles.latestUpdateSection}>
        <h3 className={styles.sectionTitle}>Latest Updates</h3>
        {latestUpdates.map(update => {
          // Format date: Replace "2025" with "'25", "2024" with "'24", etc.
          const formattedDate = update.date.replace(/\b20(\d{2})\b/g, "'$1");
          
          return (
            <div className={styles.updateContent} key={update.id}>
              <p className={styles.updateText}>
                <span className={styles.updateDate}>{formattedDate}</span>
                {update.hasPaper ? (
                  <>
                    {update.content}
                    <a 
                      href={update.paperLink} 
                      className={styles.paperLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {update.paperTitle}
                    </a>
                    {update.contentAfter}
                  </>
                ) : (
                  update.content
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
