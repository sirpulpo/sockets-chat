const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMsg } = require('../utils/utilidades');

const users = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (user, callback) => {
        if (!user.nombre || !user.sala) {
            return callback({
                error: true,
                msg: 'Se requiere el nombre'
            });
        }

        client.join(user.sala);

        users.agregarPersona(client.id, user.nombre, user.sala);

        client.broadcast.to(user.sala)
            .emit('listaPersonas', users.getPersonasPorSala(user.sala));

        client.broadcast.to(user.sala)
            .emit('crearMsg', crearMsg('Admin', `${user.nombre} se unió`));

        callback(users.getPersonasPorSala(user.sala));
    });


    client.on('disconnect', () => {
        let personaDltd = users.borrarPersona(client.id);

        client.broadcast.to(personaDltd.sala)
            .emit('crearMsg', crearMsg('Admin', `${personaDltd.nombre} salió`));

        client.broadcast.to(personaDltd.sala)
            .emit('listaPersonas', users.getPersonasPorSala(personaDltd.sala));
    });


    client.on('crearMsg', (data, callback) => {
        let persona = users.getPersona(client.id);
        let msg = crearMsg(persona.nombre, data.msg);

        client.broadcast.to(persona.sala).emit('crearMsg', msg);

        callback(msg);
    });


    client.on('msgPrivate', data => {
        let persona = users.getPersona(client.id);
        let msg = crearMsg(persona.nombre, data.msg);

        client.broadcast.to(data.to).emit('msgPrivate', msg);
    });
});