const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname === '/upload' && req.method === 'POST') {
    console.log("New upload request:", req.method, req.url);

    let bytes = 0;

    req.on('data', chunk => {
      bytes += chunk.length;
      console.log("Received bytes:", bytes);
    });

    req.on('end', () => {
      console.log("Upload finished:", bytes);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("Upload complete\n");
    });

    req.on('close', () => {
      console.log("Connection closed early");
    });

  } else {
    // default response for other routes
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello from server\n");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
