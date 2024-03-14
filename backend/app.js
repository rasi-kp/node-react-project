var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors')
const socket= require('socket.io');
const msgcontoller=require('./controller/usercontroller')
const Messagemodel=require('./model/message')

var indexRouter = require('./routes/index');
var app = express();
require('./config/dbconnection')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

const server = app.listen(5001, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('message',async (data) => {

    console.log('Message received:', data);
    await msgcontoller.message(data)
    // const newMessage = new Messagemodel(data);
    // await newMessage.save();
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;