var mongoose = require('mongoose'),
    gridfs = require('gridfs-stream'),
    fs = require('fs');
var Categorias  = mongoose.model('Categorias');

//GET - Return all tvshows in the DB
exports.listarCategoria = function(req, res) {
    Categorias.find(function(err, cat){
        if(!err) res.send(cat);
        else console.log('ERROR : ' + err);
    });
};

//GET - Busqueda por Id autogenerado por mongo
exports.busquedaxID = function(req, res) {
    Categorias.findById(req.params.id,function(err, item){
        if(!err) res.send(item);
        else console.log('ERROR : ' + err);
    });
};

//POST - Agregar
exports.agregarCategoria = function(req, res) {
    var itemId =  mongoose.Types.ObjectId();

    var categoria = new Categorias({
        title: req.body.title,
        description:req.body.description,
        img:itemId
    });

    var gfs = gridfs(mongoose.connection.db);
    var writestream = gfs.createWriteStream({
        _id:itemId,
        filename:req.files.pic.name
    });
    fs.createReadStream(req.files.pic.path).
    pipe(writestream).
    on('finish', function() {
        console.log('save');
    });

    categoria.save(function(err, categoria){
        if(err) return res.status(500).send( err.message);
        res.send("Registro Completado <br> <a href='/index'>Regresar a Menu</a>");
    });


};