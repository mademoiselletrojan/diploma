const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/register') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // собираем данные
    });

    req.on('end', () => {
      // Здесь можно обработать полученные данные, например, вывести в консоль
      console.log('Received data:', body);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Registration received' }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
