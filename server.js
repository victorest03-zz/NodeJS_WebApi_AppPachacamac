var express         = require("express"),
    assert          = require('assert'),
    app             = express(),
    http            = require('http'),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    gridfs = require('gridfs-stream'),
    multipart       = require('connect-multiparty'),
    jade            = require('jade');

app.set('port', process.env.PORT || 3000);

app.set("view engine","jade");
app.use(express.static("public"));

app.get("/inputcategoria",function(req,res){
    res.render("inputcategoria");
});

app.get("/inputitems",function(req,res){
    res.render("inputitems");
});

app.get("/index",function(req,res){
    res.render("index");
});
// Connection to DB
mongoose.connect('mongodb://vestrada:Vuca4424@ds058508.mongolab.com:58508/pachacamac', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});
gridfs.mongo = mongoose.mongo;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multipart());

// Import Models and controllers
var Itemsmodels = require('./models/item')(app, mongoose);
var ItemCtrl = require('./controllers/item');

var Categoriasmodels     = require('./models/categoria')(app, mongoose);
var CategoriaCtrl = require('./controllers/categoria');

var Feedbackmodels      = require('./models/feedback')(app, mongoose);
var FeedbackCtrl = require('./controllers/feedback');

var ImgCtrl = require('./controllers/img.js');

//var FileCtrl = requiere('./controllers/file');

// Ejemplo de Route
var router = express.Router();
router.get('/', function(req, res) {
    res.render("index");
});

// Permisos para conexion externa
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    // Pass to next layer of middleware
    next();
});

app.use(router);

// API routes
var items = express.Router();

//API Items
items.route('/items')
    .get(ItemCtrl.listarItems)
    .post(ItemCtrl.agregarItem);

items.route('/items/:id')
    .get(ItemCtrl.busquedaxID)
    .put(ItemCtrl.actualizarItem)
    .delete(ItemCtrl.eliminarItem);

app.use('/api', items);

//API Itemsxid
var itemsxart = express.Router();

itemsxart.route('/itemsxart/:art').get(ItemCtrl.listarItemsxart);

app.use('/api', itemsxart);

//API Categoria
var categoria = express.Router();
categoria.route('/categorias')
    .get(CategoriaCtrl.listarCategoria)
    .post(CategoriaCtrl.agregarCategoria);

categoria.route('/categorias/:id')
    .get(CategoriaCtrl.busquedaxID);

app.use('/api', categoria);

//API File
var img = express.Router();
img.route('/img/:id')
    .get(ImgCtrl.getimg);

app.use('/api',img);


//API Feelback
var feelback = express.Router();

feelback.route('/feedback')
    .get(FeedbackCtrl.listarFeedbacks)
    .post(FeedbackCtrl.agregarFeedback);

app.use('/api',feelback);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Node server running on http://localhost:"+app.get('port'));
});
