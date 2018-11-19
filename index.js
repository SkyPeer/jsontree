const express = require('express'),
    helmet = require('helmet'),
    path = require('path'),
    compression = require('compression'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    multer = require('multer'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    fileContents = fs.readFileSync('./default.json', 'utf8');



app.get('/getDefaultJsonData', function(req, res, next){
    res.sendFile('default.json', {root: __dirname});
    console.log('default.json');
});

app.use(helmet());
app.use(compression());

app.use('/build', express.static(path.join(__dirname, 'build')));
app.use('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname})
});

server.listen(3100, function () {
    console.log(`SteelApp Start http://localhost:3100`);
});
