//se carga la biblioteca de express desde node_modules

var express = require('express');
var app = express();
//server se pasa al socket 
//se carga la biblioteca http que utiliza como servidor la app de express
var server = require('http').Server(app);
//Se carga la biblioteca de socket.io
var io = require('socket.io')(server);

//se da acceso a los html estáticos de la carpeta Cliente
//para cargar dichos archivos
app.use(express.static('Cliente'));

//array donde se guardan los mensajes
//el primero es un mensaje de bienvenida
var mensajes = [{
        id: 1,
        texto: 'Bienvenido a la sala de chat...',
        nombre: 'Bot',
        hora: ''
    }];


//se crea un servidor con express
//se pasa el puerto donde escuchará dicho servidor
server.listen(6677, function () {
    console.log('El servidor esta funcionando en http://localhost:6677');
});

//Abrir la conexion al socket
//recibe las conexiones de los clientes al socket
io.on('connection', function (socket) {
    console.log('El cliente con IP: ' + socket.handshake.address + ' se ha conectado al socket...');

    //los mensajes se emiten por el socket a todos los clientes
    socket.emit('mensajes', mensajes);

    //se recibe el evento agregarMensaje cuando este suceda
    //se reciben los datos en la funcion de callback
    socket.on('agregarMensaje', function(data){
    	//se guarda el nuevo mensaje en el array temporalmente
    	//hasta que se detenga el servidor
    	mensajes.push(data);

    	//se emite a todos los clientes conectados
    	//con el array actualizado
    	io.sockets.emit('mensajes', mensajes);
    });
});

