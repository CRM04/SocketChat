var params = new URLSearchParams(window.location.search);

let divUsuarios = $("#divUsuarios");
let formEnviar = $("#formEnviar");
let txtMensaje = $("#txtMensaje");
let divChatbox = $("#divChatbox");

//Funciones para rendirzar usuarios.
function renderUsuarios(personas) {
    let html = `<li>
            <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('sala')} </span></a>
        </li>`;

    personas.forEach(persona => {
        html += `<li>
                    <a data-id="${ persona.id}" href="javascript:void(0)">
                        <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
                        <span> ${ persona.nombre}
                            <small class="text-success">online</small>
                        </span>
                    </a>
                </li>`;
    });
    divUsuarios.html(html);
}

divUsuarios.on('click', 'a', function () {
    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
})


function renderMensajes(mensaje, yo) {
    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ' : ' +fecha.getSeconds();
    if (yo) {
        html = `<li class="reverse">
                    <div class="chat-content">
                        <h5>${mensaje.nombre}</h5>
                        <div class="box bg-light-inverse">
                            ${mensaje.mensaje}
                        </div>
                    </div>
                    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                    <div class="chat-time">${hora}</div>
                </li>`;

    } else {
        html = `<li class="animated fadeInUp">
                        <div class="chat-img">
                            <img src="assets/images/users/1.jpg" alt="user" />
                        </div>
                        <div class="chat-content">
                            <h5>${mensaje.nombre}</h5>
                            <div class="box bg-light-info">
                                ${mensaje.mensaje}
                            </div>
                        </div>
                        <div class="chat-time">${hora}</div>
                    </li>`;
    }
    divChatbox.append(html);
}

formEnviar.on('submit', function (e) {
    e.preventDefault();

    if (txtMensaje.val().trim().length == 0) {
        return;
    }
    console.log(txtMensaje.val());

    //Enviar información
    socket.emit('crearMensaje', {
        nombre: 'Fernando',
        mensaje: txtMensaje.val(),
        sala: params.get('sala')
    }, function (resp) {
        txtMensaje.val('').focus();
        renderMensajes(resp, true);
    });

    scrollBottom();

});

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