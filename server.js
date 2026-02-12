const http = require('http');

const server = http.createServer((req, res) => {
  console.log("New request:", req.method, req.url);

  if (req.method === 'POST' && req.url.startsWith('/upload')) {
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
    // Fallback for other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not found\n");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
