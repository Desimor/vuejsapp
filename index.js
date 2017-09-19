var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var biblekey = require('./secrets.js').bibleAPIkey;
var axios = require('axios');

server.use(express.static(__dirname + '/public'));
server.get('/', function(req, res){
    res.sendFile('index.html', {root:__dirname + '/public/html'});
});

var instance = axios.create({
    baseURL: 'https://bibles.org/v2/verses/',
    auth: {
      username: biblekey,
      password: '...',
    },
  });

server.get('/random/verse/', function(req, res){
    var url = 'eng-NASB:Acts.8.34.js';
    instance.get(url)
        .then(function(results){
        res.send(results.data);
        })
        .catch(function(err){
         res.send(err.message);
        })
})

server.get('/verse/:id', function(req, res){
    var url = req.params.id + '.js';
    instance.get(url)
        .then(function(results){
        res.send(results.data);
        })
        .catch(function(err){
         res.send(err.message);
        })
})

server.listen(port, function(){
    console.log('Now listening on port ' + port);
})