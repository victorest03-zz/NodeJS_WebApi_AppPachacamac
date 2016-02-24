exports = module.exports = function(app, mongoose) {

    var itemSchema = new mongoose.Schema({
        title: {type: String},
        description:{type: String},
        attention:{type: String},
        location:{type: String},
        coordinates:{type: String},
        article:{type:String},
        img:{type: String}
    });

    mongoose.model('Items', itemSchema);

};