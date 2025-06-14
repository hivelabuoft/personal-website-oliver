export const metadata = {
  title: 'News | Oliver Huang',
  description: 'Latest news and updates from Oliver Huang',
};

export default function News() {
  // Example news items
  const newsItems = [
    {
      id: 1,
      date: 'May 30, 2025',
      title: 'Paper accepted at Conference 2025',
      content: 'Our paper "Example Paper Title" has been accepted at the prestigious Conference 2025. Looking forward to presenting our work in July!'
    },
    {
      id: 2,
      date: 'April 15, 2025',
      title: 'Joining Research Lab as a Visiting Researcher',
      content: 'Excited to announce that I will be joining Research Lab as a visiting researcher this summer, working on advanced projects in my field.'
    },
    {
      id: 3,
      date: 'March 1, 2025',
      title: 'Received Research Grant',
      content: 'Our team has been awarded a significant grant to pursue our research on important topics. This funding will support our work for the next two years.'
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">News & Updates</h1>
      
      <div className="news-list">
        {newsItems.map((item) => (
          <div key={item.id} className="news-item">
            <div className="news-date">{item.date}</div>
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
