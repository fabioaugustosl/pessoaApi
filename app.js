var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
var mongoose = require('mongoose');


var app = express();

var db = mongoose.connect('mongodb://localhost/db_pessoa');
//var db = mongoose.connect('mongodb://some-mongo/db_pessoa');


var port = process.env.PORT || 3003;

// diretorios publicos
app.use(express.static('public'));

//middlaware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(cookieParser());
//app.use(session({secret: 'library'}));

//require('./src/config/passport')(app);

//isso funcionou localhost
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.set('views','./src/views');


//rotas
var pessoaRouter = require('./src/routes/PessoaRoutes');
var enderecoRouter = require('./src/routes/EnderecoPessoaRoutes');

app.use('/api/pessoa/v1', pessoaRouter);
app.use('/api/enderecoPessoa/v1', enderecoRouter);


app.get('/', function(req, res){
	res.send('de buenas pessoas');
	console.log('de buenas pessoas');
});

// start servidor
app.listen(port, function(err){
	console.log('running pessoa api on '+port);
});


module.exports = app;

