var mongoose = require('mongoose');

var Feedbacks  = mongoose.model('Feedback');

exports.listarFeedbacks = function(req, res) {
    Feedbacks.find(function(err, item){
        if(!err) res.send(item);
        else console.log('ERROR : ' + err);
    });
};

//POST - Agregar
exports.agregarFeedback = function(req, res) {
    var feedback = new Feedbacks({
        name: req.body.name,
        description:req.body.description,
        item:req.body.item,
    });

    feedback.save(function(err, item){
        if(err) return res.status(500).send( err.message);
        res.send('Feelback guardado.');
    });
};