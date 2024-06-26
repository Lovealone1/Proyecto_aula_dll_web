var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var port = process.env.PORT || 4201; 
const {createServer} = require('http');
const { Server } = require("socket.io");

var app = express();
app.listen(process.env.PORT || 4201);
console.log('Server on port', process.env.PORT || 4201);
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {origin: '*'}
});
io.on("connection", (socket) => {
  socket.on('send_cart', function(data){
    io.emit('listen_cart', data)
  });
});

var cliente_router = require('./routes/cliente');
var usuario_router = require('./routes/usuario');
var producto_router = require('./routes/producto');
var public_router = require('./routes/public');
var customer_router = require('./routes/customer');
var venta_router = require('./routes/venta');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://dan:admin123@cluster0.ktrer9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}
connectDB();

  app.use((req,res,next)=>{
    var scriptSrc = ["'self'", "'unsafe-inline'", 'https://http2.mlstatic.com/analytics/ga/mco-mp-analytics.min.js'];
  
    res.header('Content-Security-Policy', `script-src ${scriptSrc.join(' ')}`);
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_router);
app.use('/api',usuario_router);
app.use('/api',producto_router);
app.use('/api',public_router);
app.use('/api',customer_router);
app.use('/api',venta_router);
module.exports = app;