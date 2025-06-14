const http = require('http');
const fs = require('fs');
const path = require('path');

// Check if the PDF exists in the file system
const pdfPath = path.join(process.cwd(), 'public', 'static', 'uploads', 'papers', 'productive_friction.pdf');
console.log('Checking if PDF exists at:', pdfPath);
console.log('File exists:', fs.existsSync(pdfPath));

if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log('File size:', stats.size, 'bytes');
  console.log('Full path:', fs.realpathSync(pdfPath));
}

// Create a simple server to serve the PDF
const server = http.createServer((req, res) => {
  if (req.url === '/static/uploads/papers/productive_friction.pdf') {
    console.log('Request for PDF received');
    
    if (fs.existsSync(pdfPath)) {
      console.log('Serving PDF from:', pdfPath);
      
      // Set headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="productive_friction.pdf"');
      
      // Stream the file
      const fileStream = fs.createReadStream(pdfPath);
      fileStream.pipe(res);
      
      fileStream.on('error', (err) => {
        console.error('Error streaming file:', err);
        res.statusCode = 500;
        res.end('Error serving PDF');
      });
    } else {
      console.log('PDF not found');
      res.statusCode = 404;
      res.end('PDF not found');
    }
  } else {
    console.log('Request for:', req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>PDF Tester</h1><p>Go to <a href="/static/uploads/papers/productive_friction.pdf">/static/uploads/papers/productive_friction.pdf</a> to test PDF access</p>');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`PDF test server running at http://localhost:${PORT}`);
  console.log(`Access the PDF at http://localhost:${PORT}/static/uploads/papers/productive_friction.pdf`);
});
