var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var user = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', user, function(resp) {
        console.log('Usuarios conectados:', resp);
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

});


socket.on('listaPersonas', function(mensaje) {

    console.log('Activos en sala:', mensaje);

});


socket.on('msgPrivate', function(msg) {
    console.log('Mensaje Privado:', msg);
})