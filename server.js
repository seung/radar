var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    Radar = require('radar').server;

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;

  if(/^\/radar_client.js$/.test(pathname)) {
    res.setHeader('content-type', 'text/javascript');
    res.end(fs.readFileSync('./public/radar_client.js'));
  } else if(pathname == '/') {
    res.setHeader('content-type', 'text/html');
    res.end(fs.readFileSync('./public/index.html'));
  } else {
    console.log('404', req.url);
    res.statusCode = 404;
    res.end();
  }
});

// attach Radar server to the http server
Radar.attach(server, {
  redis_host: 'localhost',
  redis_port: 6379
});

server.listen(8000);
console.log('Server listening on localhost:8000');
