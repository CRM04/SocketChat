const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');


const usuarios = new Usuarios();

io.on('connection', (client) => {
    console.log('Usuario conectado');
   
    client.on('entrarChat', (data , callback) => {
        if( !data.nombre || !data.sala){
            callback({
                error: true,
                msg: "El nombre/sala es obligatorio"
            });
        }

        client.join(data.sala)

        usuarios.agregarPersona( client.id , data.nombre, data.sala );
        client.broadcast.to(data.sala).emit('listaPersonas' , usuarios.getPersonasBySala(data.sala) );
        callback( usuarios.getPersonasBySala(data.sala) );
    })


    client.on('crearMensaje' , (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje  = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit( 'crearMensaje' , mensaje );
        callback(mensaje)
    })

    client.on('mensajePrivado' , data => {
        let persona = usuarios.getPersona( client.id );
        let mensaje = crearMensaje(persona.nombre , data.mensaje);

        client.broadcast.to(data.idPersona).emit('mensajePrivado' , mensaje );
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona( client.id );
        client.broadcast.to(personaBorrada.sala).emit( 'crearMensaje' , crearMensaje('Admin' , `${personaBorrada.nombre } salió`) );
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas' , usuarios.getPersonasBySala(personaBorrada.sala) )
    });

});