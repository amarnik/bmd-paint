
/**
 * Module dependencies.
 */

var express = require('express')
, app = express()
, routes = require('./server/controllers')
, user = require('./server/controllers/user')
, api = require('./server/controllers/api')
, server = require('http').createServer(app)
, io = require('socket.io').listen(server)
, path = require('path')
, mongoose = require('mongoose');

//var ;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('mY.vErY!sEcReT!pAsS.'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({
        src: __dirname + '/client'
    }));
    app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/api', api.index);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var userId = 0;

io.sockets.on('connection', function (socket) {
    
    socket.on('init', function (data) {
        userId++;
        socket.emit('accepted', { userId: userId });
        console.log("new client connected");
    });
    
    socket.on('newLine', function (data) {
        console.log("broadcast new line");
        socket.broadcast.emit('newLine', data);
    });
    
    socket.on('continueLine', function (data) {
        console.log("broadcast continueline");
        socket.broadcast.emit('continueLine', data);
    });
  
});

var db = mongoose.createConnection('localhost', 'fms');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
    });

user.init(app);