const express = require('express')
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const http = require('http')
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server)

//when client connect function will run
io.on('connection', socket =>{
    console.log('New Connection')
    socket.emit('message', 'Welcome')
})

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(allRoutes);

server.listen(PORT, ()=> {
    console.log('listening on server http://localhost:3000/')
})