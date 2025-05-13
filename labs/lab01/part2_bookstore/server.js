const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

function serveFile(res, filePath, contentType, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 - Internal Error');
    }
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`${method} request for ${url}`);

  if (method === 'GET') {
    let filePath;
    switch (url) {
      case '/':
        filePath = path.join(__dirname, 'pages', 'index.html');
        serveFile(res, filePath, 'text/html');
        break;
      case '/store':
        filePath = path.join(__dirname, 'pages', 'store.html');
        serveFile(res, filePath, 'text/html');
        break;
      case '/about':
        filePath = path.join(__dirname, 'pages', 'about.html');
        serveFile(res, filePath, 'text/html');
        break;
      case '/contact':
        filePath = path.join(__dirname, 'pages', 'contact.html');
        serveFile(res, filePath, 'text/html');
        break;
      default:
        filePath = path.join(__dirname, 'pages', '404.html');
        serveFile(res, filePath, 'text/html', 404);
    }
  } else if (method === 'POST' && url === '/contact') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });
    req.on('end', () => {
      const formData = querystring.parse(body);
      console.log('Form submission received:', formData);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Thank You</title>
        </head>
        <body>
          <h1>Thank You, ${formData.name}!</h1>
          <p>Your message has been received. We will get back to you at ${formData.email} soon.</p>
        </body>
        </html>
      `);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
