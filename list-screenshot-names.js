const fs = require('fs');
const path = require('path');

// Function to list all the required screenshot names based on the PDFs in the publications.json file
function listRequiredScreenshots() {
  try {
    // Read the publications.json file
    const publicationsPath = path.join(__dirname, 'data', 'publications.json');
    const publicationsData = JSON.parse(fs.readFileSync(publicationsPath, 'utf8'));
    
    console.log('Required Screenshot Names:');
    console.log('=========================');
    console.log('');
    console.log('For each PDF in your publications.json file, you need to create a PNG screenshot with the following filename:');
    console.log('');
    
    let pdfUrls = [];
    
    // Extract all PDF URLs from the publications data
    if (publicationsData.publications && Array.isArray(publicationsData.publications)) {
      publicationsData.publications.forEach(pub => {
        if (pub.links && pub.links.pdf) {
          pdfUrls.push(pub.links.pdf);
        }
      });
    }
    
    // List the required screenshot names
    if (pdfUrls.length === 0) {
      console.log('No PDF URLs found in publications.json');
    } else {
      console.log('PDF URL → Required Screenshot Filename:');
      console.log('');
      
      pdfUrls.forEach(pdfUrl => {
        const filename = pdfUrl.split('/').pop().replace('.pdf', '');
        const screenshotPath = `/static/uploads/pdf/screenshot/${filename}.png`;
        console.log(`${pdfUrl} → ${screenshotPath}`);
      });
      
      console.log('');
      console.log(`Total: ${pdfUrls.length} screenshots needed`);
      console.log('');
      console.log('Place these PNG files in the public/static/uploads/pdf/screenshot/ directory.');
    }
  } catch (error) {
    console.error('Error reading publications data:', error);
  }
}

listRequiredScreenshots();
