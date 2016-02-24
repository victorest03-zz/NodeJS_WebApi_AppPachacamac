exports = module.exports = function(app, mongoose) {

    var feedbackSchema = new mongoose.Schema({
        name: {type: String},
        description:{type: String},
        item:{type: String}
    });

    mongoose.model('Feedback', feedbackSchema);

};