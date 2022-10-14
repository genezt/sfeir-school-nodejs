const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === '/google') {
    const logo =
      'https://www.google.fr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
    const options = url.parse(logo);

    res.setHeader('Content-Type', 'image/png');

    https.get(options, logoResponse => {
      logoResponse
        .on('data', function(chunk) {
          res.write(chunk);
        })
        .on('end', function() {
          res.end();
        });
    });
  } else if (req.url === '/404') {
    res.statusCode = 404;
    res.end('Not found !');
  } else {
    res.end(`Kikou ! you have a ${req.method} on ${req.url} !`);
  }
});

server.listen(9000);
module.exports = server
