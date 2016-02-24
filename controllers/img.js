var mongoose = require('mongoose'),
    gridfs = require('gridfs-stream'),
    fs = require('fs');

exports.getimg = function(req, res){

    console.log(req.params.id);
    var grid = gridfs(mongoose.connection, mongoose.mongo);
    res.writeHead(200, { "Content-Type" : "image/png"});
    grid.createReadStream({ _id: req.params.id}).pipe(res);
}