exports = module.exports = function(app, mongoose) {

    var categoriaSchema = new mongoose.Schema({
        title: {type: String},
        description:{type: String},
        img:{type: String}
    });

    mongoose.model('Categorias', categoriaSchema);

};