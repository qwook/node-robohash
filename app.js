
var v2 = require('./lib/v2.js');
var express = require('express');

var app = express();

app.get('/:hash', function(req, res) {

  res.setHeader('content-type', 'image/png');

  v2(req.params.hash, (stream) => {

    if (!stream) return res.end();

    stream.on('data', (chunk) => {
      res.write(chunk);
    })

    stream.on('end', () => {
      res.end();
    })

  });

});

app.listen(3030);
console.log("listening at port 3030");
