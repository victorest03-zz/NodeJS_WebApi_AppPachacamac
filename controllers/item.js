var mongoose = require('mongoose'),
    gridfs = require('gridfs-stream'),
    fs = require('fs');

var Items  = mongoose.model('Items');

exports.listarItems = function(req, res) {
   Items.find(function(err, item){
       if(!err) res.send(item);
       else console.log('ERROR : ' + err);
   });
};

exports.listarItemsxart = function(req, res){
    Items.find({article: req.params.art},function(err, item){
        if(!err) res.send(item);
        else console.log('ERROR : ' + err);
    });
}

//GET - Busqueda por Id autogenerado por mongo
exports.busquedaxID = function(req, res) {
   Items.findById(req.params.id,function(err, item){
       if(!err) res.send(item);
       else console.log('ERROR : ' + err);
   });
};



//POST - Agregar
exports.agregarItem = function(req, res) {
    var itemId =  mongoose.Types.ObjectId();
    var item = new Items({
        title: req.body.title,
        description:req.body.description,
        attention:req.body.attention,
        location:req.body.location,
        coordinates:req.body.coordinates,
        article:req.body.article,
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
        console.log('save!');
    });

    item.save(function(err, item){
        if(err) return res.status(500).send( err.message);
        res.send("Registro Completado <br> <a href='/index'>Regresar a Menu</a>");
    });
};


//PUT - Actualizar
exports.actualizarItem = function(req, res) {

    Items.findByID(req.param.id,function(req, item){
        item.title= req.body.title,
        item.description=req.body.description,
        item.attention=req.body.attention,
        item.location=req.body.location,
        item.coordinates=req.body.titcoordinatesle,
        item.article=req.body.article
    });

    item.save(function(err){
       if(!err) console.log('Item Actualizado');
       else console.log('ERROR : ' + err);
    });
};

//DELETE
exports.eliminarItem = function(req, res) {

    Items.findByID(req.param.id,function(req, item){

        item.remove(function(err){
            if(!err) console.log('Item Eliminado');
            else console.log('ERROR : ' + err);
        });
    });
};