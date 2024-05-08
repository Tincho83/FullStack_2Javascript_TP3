// Procedimientos para el funcionamiento de la pagina

//Checkbox para Modo Oscuro. Creacion Variables Modo Claro Noche
let checkbox = document.querySelector('input[type="checkbox"]');
let checkboxtxt = document.querySelector('.texto');

// Se agrega un event listener para el evento 'change'
checkbox.addEventListener('change', function () {

  // Cuando el checkbox cambia, alterna entre las clases 'dark-mode' y 'light-mode' en el body
  if (this.checked) {

    //Activar Modo Noche
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    checkboxtxt.textContent = 'Modo Noche';
    localStorage.setItem('modo', 'noche');
  } else {
    //Activar Modo Claro
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    checkboxtxt.textContent = 'Modo Claro';
    localStorage.setItem('modo', 'claro');
  }
});

//función de jQuery que se ejecuta cuando el DOM está completamente cargado. Esto incluye imagenes, estilos, etc.
//Cuando se necesite esperar a que todo este cargado (imágenes, CSS).
$(document).ready(() => { });

//función de JavaScript puro (sin necesidad de libreria externa) que se dispara cuando el documento HTML ha sido completamente cargado y analizado.
//No espera a que los estilos CSS, las imágenes y los subframes se terminen de cargar. 
//Cuando se necesite que el código se ejecute lo más pronto posible.
document.addEventListener("DOMContentLoaded", function () { });

// Deslizamiento Div Carrito
$(document).ready(function () {
  $(".cabecera_divPanelWeb_divMenuflex_divPanelCuentaCarrito_ul_li_a").click(function () {
    if ($("#lista_carrito").css('display') != 'none') {

      $("#lista_carrito").removeClass('animate__slideInRight').addClass('animate__slideOutRight');
      setTimeout(function () {
        $("#lista_carrito").hide().removeClass('animate__slideOutRight');
      }, 1400); // Tiempo que tarda la animación en completarse
    } else {

      $("#lista_carrito").show().removeClass('animate__slideOutRight').addClass('animate__animated animate__slideInRight');
    }
  });

  $("#cerrar_carrito").click(function (e) {
    e.preventDefault();
    $("#lista_carrito").removeClass('animate__slideInRight').addClass('animate__slideOutRight');
    setTimeout(function () {
      $("#lista_carrito").hide().removeClass('animate__slideOutRight');
    }, 1400);
  });
});

// usado de manera provisoria para obtener un nro aleatorio para el nro de factura
function obtenerEnteroRandom(int) {
  return Math.floor(Math.random() * int);
}

//Simulacion de Ticket impreso
function generarTicket() {
  //Creando alert solo para simulacion de ticket.");
  let ticketGestion = obtenerEnteroRandom(9999999);
  let nombre = NombreCli;
  let telefono = TelefonoCli;
  let direccion = DireccionCli;
  let listaItems = '';
  let precioFinal = 0;

  for (let item of pedido.items) {
    let articulo = articulos.find(articulo => articulo.id == item.itemId);
    let nombreProducto = articulo.nombre;
    let precioProducto = articulo.precio;
    subtotal = item.cantidad * precioProducto;
    precioFinal += subtotal;
    listaItems += `Prod: ${nombreProducto} ($ ${precioProducto}) Cant: ${item.cantidad} Subtotal: $${subtotal}\n`;
  }

  //Generamos el mensaje del ticket
  //let mensajeTicket = `Simulacion de Ticket:\n\nFactura: Tipo C 0003-${ticketGestion}\n\nNombre: ${nombre}\nTeléfono: ${telefono}       Dirección: ${direccion}\n\n${listaItems}\nPrecio Final: $${precioFinal}`;
  let mensajeTicket = `Simulacion de Ticket:<br><br>Factura: Tipo C 0003-${ticketGestion}<br><br>Nombre: ${nombre}<br>Teléfono: ${telefono}       Dirección: ${direccion}<br><br>${listaItems}<br><br><br>Precio Final: $${precioFinal}`;

  //Mostramos el ticket en un alert o sweetalert  
  Swal.fire({
    title: 'Tu Ticket',
    html: mensajeTicket,
    icon: 'info',
    confirmButtonText: 'Cerrar'
  })

  vaciarCarrito();
  listaCarrito.style.display = "none";

}

