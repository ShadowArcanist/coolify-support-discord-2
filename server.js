const http = require('http');

const server = http.createServer((req, res) => {
  console.log("New request:", req.method, req.url);

  if (req.url === '/upload' && req.method === 'POST') {
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
      console.log("Connection closed early at", bytes, "bytes");
    });

    req.on('error', err => {
      console.error("Request error:", err);
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not Found\n");
  }
});

/*
 * 🔥 CRITICAL PART
 * Disable all automatic Node timeouts
 */

// Disable request timeout (default ~5 min)
server.requestTimeout = 0;

// Disable headers timeout
server.headersTimeout = 0;

// Disable keep-alive timeout
server.keepAliveTimeout = 0;

// Optional: completely disable socket timeout
server.setTimeout(0);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
