//se especifica la url de nuestro socket (nuestra ip) para la conexion
var socket = io.connect('http://tu_ipv4:6677', {'forceNew': true});

//el cliente recibe el mensaje enviado por el socket
//data son los mensajes que llegan del servidor
socket.on('mensajes', function (data) {
    //se recibe el mensaje y se lo renderiza
    mostrarMensajes(data);
});

//data es el array de mensajes
//con map se recorre el array de mensajes
function mostrarMensajes(data){
    //se recibe el contenido de cada elemento del array
    var html = data.map(function (mensaje, index){

        //el msj de bienvenida en azul
        if(index == 0){
          return (`
         <div class="mensaje">
         
         <strong>${mensaje.nombre}</strong>
         <p style="color: blue;">${mensaje.texto}</p>
         <p style="text-align: right;font-size: 12px">${mensaje.hora}</p>
        
        </div>
        
        `);    
      }
        return (`
         <div class="mensaje">
         
         <strong>${mensaje.nombre}</strong>
         <p>${mensaje.texto}</p>
         <p style="text-align: right;font-size: 12px">${mensaje.hora}</p>
        
        </div>
        
        `);
    
//con join se inserta un espacio entre elementos
    }).join(' ');

    //se obtiene el div mensajes
    //y se agrega la variable html al HTML del div de mensajes
    var divMsjs = document.getElementById('mensajes');
    divMsjs.innerHTML = html;
    //a medida que aparezcan nuevos mensajes la altura del scroll baja
    divMsjs.scrollTop = divMsjs.scrollHeight;
}

//se recupera el mensaje y se lo envia al servidor para agregarlo al socket
function agregarMensaje(e){

    //se obtiene hora actual
    let hora = getHora();
    //se crea un nuevo mensaje

    var msj = {
        nombre: document.getElementById('nombre').value,
        texto: document.getElementById('texto').value,
        hora: hora
    };

    //una vez se envia el mensaje no se puede cambiar el nombre
    document.getElementById('nombre').disabled = true;
    
    //se limpia el textarea para el siguiente mensaje
    document.getElementById('texto').value = "";

    //se agrega el msj al socket para guardarlo en el server
    socket.emit('agregarMensaje', msj);

    //cortar ejecucion de la funcion
    return false;
}

function getHora(){

  let hoy = new Date();
  let minutos;

    if(hoy.getMinutes()<10){
        minutos = '0' + hoy.getMinutes();

    } else{
        minutos = hoy.getMinutes();
    }

    let hora = hoy.getHours()+ ':'+ minutos;

    return hora;
}
