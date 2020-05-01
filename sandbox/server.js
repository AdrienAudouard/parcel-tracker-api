var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var server;

function pipeFileToResponse(res, file, type) {
    if (type) {
        res.writeHead(200, {
            'Content-Type': type
        });
    }

    fs.createReadStream(path.join(__dirname, file)).pipe(res);
}

server = http.createServer(function (req, res) {
    req.setEncoding('utf8');

    var parsed = url.parse(req.url, true);
    var pathname = parsed.pathname;

    console.log('[' + new Date() + ']', req.method, pathname);

    if (pathname === '/') {
        pathname = '/index.html';
    }

    if (pathname === '/index.html') {
        pipeFileToResponse(res, './index.html');
    } else if (pathname === '/bundle.js') {
        pipeFileToResponse(res, './bundle.js', 'text/javascript');
    } else {
        res.writeHead(404);
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000);