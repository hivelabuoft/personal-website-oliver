export const metadata = {
  title: 'Travels | Oliver Huang',
  description: 'Travel history and upcoming events for Oliver Huang',
};

export default function Travels() {
  return (
    <div className="page-container">
      <h1 className="page-title">Travels & Events</h1>
      
      <div className="travels-list">
        <h2>Upcoming</h2>
        <div className="travel-item">
          <div className="travel-date">June 15-20, 2025</div>
          <div className="travel-info">
            <h3>Conference Name</h3>
            <p>City, Country</p>
            <p>Presenting: "Paper Title"</p>
          </div>
        </div>
        
        <h2>Past</h2>
        <div className="travel-item">
          <div className="travel-date">March 5-10, 2025</div>
          <div className="travel-info">
            <h3>University Visit</h3>
            <p>City, Country</p>
            <p>Talk: "Research Topic"</p>
          </div>
        </div>
        
        <div className="travel-item">
          <div className="travel-date">January 20-25, 2025</div>
          <div className="travel-info">
            <h3>Workshop Name</h3>
            <p>City, Country</p>
            <p>Poster Presentation: "Paper Title"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
