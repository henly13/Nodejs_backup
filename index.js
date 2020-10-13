const http = require('http');

const config = require('./config').config;

const fs = require('fs');


const server = http.createServer((req, res) => {
    switch (req.url) {

        case '/':
            fs.readFile(__dirname + '/index.html', 'utf-8',
                function(err, data) {
                    if (err) {
                        res.setHeader('Content-Type', 'text/plain');
                        res.statusCode = 404;
                        res.end('not found');
                    } else {
                        res.setHeader('Content-Type', 'text/html');
                        res.statusCode = 200;
                        res.end(data);
                    }
                });
            break;

        case '/about':
            res.end('About Page');
            break;
        case '/pages':
            res.end('home Pages');
            break;

        case '/index.css':
            {
                fs.readFile(__dirname + '/public/css/index.css', function(err, data) {
                    if (err) { console.log(err); }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                });
                break;
            }

        default:
            res.statusCode = 404;
            res.end("404 Not Found Error");
    }
});

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});