var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados:', resp);
        renderChatTitle(resp[0].sala);
        renderUsers(resp);
    });
});


socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });


socket.on('crearMsg', function(mensaje) {
    console.log('Servidor:', mensaje);
    renderizarMsg(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    console.log(personas);
    renderUsers(personas);
});

// Mensajes privados
socket.on('msgPrivate', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});