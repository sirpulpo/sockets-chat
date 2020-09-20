var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');


// Referencias jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMsg = $('#txtMsg');
var divChatbox = $('#divChatbox');
var divTituloChat = $('#divTituloChat');


function renderChatTitle(sala) {
    var html = '';

    html += '<h3 class="box-title">Sala de chat <small>' + sala + '</small></h3>';

    divTituloChat.html(html);
}


function renderUsers(personas) {
    console.log(personas);

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ';
    html += params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-user_id="' + personas[i].id;
        html += '" href="javascript:void(0)">';
        // html += '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> ';
        html += '<span>';
        html += personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}


function renderizarMsg(msg, yo) {
    var fecha = new Date(msg.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';
    var html = '';

    if (msg.nombre === 'Admin') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + msg.msg + '</div>';
        html += '    </div>';
        // html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';

    } else {
        html += '<li class="animated fadeIn">';
        // if (msg.nombre !== 'Admin') {
        //     html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        // }
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + msg.msg + '</div>';
        html += '    </div>';
    }

    html += '<div class="chat-time">' + hora + '</div>';
    html += '</li>';

    divChatbox.append(html);
}


function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners
divUsuarios.on('click', 'a', function() {
    var user_id = $(this).data('user_id');

    if (user_id) {
        console.log(user_id);
    }
});


formEnviar.on('submit', function(e) {
    e.preventDefault();

    if (txtMsg.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMsg', {
        nombre: nombre,
        msg: txtMsg.val()
    }, function(msg) {
        renderizarMsg(msg, true);
        txtMsg.val('').focus();
        scrollBottom();
    });
});