var socket = io();
let params = new URLSearchParams( window.location.search );

if( !params.has('nombre') || !params.has('sala')){
    window.location  = 'index.html';
    throw new Error( 'El nombre es obligatorio')
}

let usuario = {
    nombre: params.get('nombre'),
    sala : params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat' , usuario, function( resp){
        console.log("Usuarios conectados" , JSON.stringify(resp) );
    });
});

// escuchar
socket.on('disconnect', function() {
    
});

socket.on( 'crearMensaje', (data) => {
    console.log( "Servidor: " + JSON.stringify(data) )
})

//Cuando un usuario entra o sale de un chat.
socket.on('listaPersonas', (data) => {
    console.log('lista de personas: '  , JSON.stringify(data))
});

/*socket.emit('crearMensaje' , 
    { nombre: this.params.get('nombre'), "mensaje": "Enviando mensaje.." }
    ,function(resp){

    });*/


//Escuchando Menajes privados.
socket.on('mensajePrivado', function(data){
    console.log( 'Mensaje privado' , data);
})