//Procedimientos para el funcionamiento compra de productos 

//Creamos variables, array y objetos
let productoscarrito;
let cantidadTotal = 0;
let subtotal = 0;
let total = 0;
let NombreCli = "";
let TelefonoCli = "";
let DireccionCli = "";
let prodID;
let pedido = { items: [] };
let articulos = [];
let carrito = document.getElementById("cantidad_carrito");
let iconoCarrito = document.getElementById("icono_carrito");
let textoCarrito = document.getElementById("texto_carrito");
let listaCarrito = document.getElementById("lista_carrito");

//Carga de pagina al iniciar:Inicio

//Cargamos desde la DB externa en archivo .json los productos
fetch('./js/datos.json')
  .then(response => response.json())
  .then(data => cargarDatos(data, articulos))
  .catch(error => console.error('Error:', error)
  );

//funcion JavaScript que se dispara cuando el documento HTML ha sido completamente cargado, No espera a que los estilos CSS, las imagenes, etc. 
document.addEventListener('DOMContentLoaded', (event) => {
  //Verificamos si hay alguna preferencia guardada en localStorage 'modo'
  let modo = localStorage.getItem('modo');
  if (modo === 'noche') {
    document.body.classList.add('dark-mode');
    checkbox.checked = true;
    checkboxtxt.textContent = 'Modo Noche';
  } else {
    document.body.classList.add('light-mode');
    checkbox.checked = false;
    checkboxtxt.textContent = 'Modo Claro';
  }
  dibujarPedido_dos
});

//Cargamos los datos de los productos en articulos
function cargarDatos(productos, articulos) {
  productos.forEach((producto, indice) => {
    let articulo = new Articulo(producto.id, producto.nombre, producto.precio, producto.destacado, producto.imagen);
    articulos.push(articulo);

    //Si el Producto esta disponible, creamos su tarjeta html
    if (articulo.destacado) {
      generarHtmlProducto(articulo);
    }
    else {
      //Si el Producto no esta disponible, no creamos su tarjeta html
    }

    cargarSelect(articulo);
    if (indice == 0) {
      $("#precio").val(articulo.precio);
    }
  });
  verificarHoraPedido();
  cargarProductosLocalStorage();
}

//Constructor del Objeto Articulo
function Articulo(id, nombre, precio, destacado, imagen) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.destacado = destacado;
  this.imagen = imagen;
}

//Agregamos al html el producto disponible
function generarHtmlProducto(producto) {
  let html = `<div class="col-sm col-md-6 col-xl-3 prodweb">
      <img src="${producto.imagen}" class="imgprodweb">
      <div class="description">
        <div class="product-name">
        ${producto.nombre}
        </div>
        <div class="price">
        $${producto.precio}
        </div>
        <button class="shop btn-principal" onclick="seleccionarProducto(${producto.id})">Agregar producto a Carrito</button>
      </div>
    </div>`;
  $("#prodlact").append(html);
}

function cargarSelect(producto) {
  let option = `<option value="${producto.id}">${producto.nombre}</option>`;
  $("#prodlacteos").append(option);
}

//Si existe en localstorage pedidocarrito, obtenemos los datos y cargamos el carrito
function cargarProductosLocalStorage() {
  let pedidoGuardado = localStorage.getItem('pedidocarrito');
  if (pedidoGuardado) {
    pedido = JSON.parse(pedidoGuardado);

    pedido.items.forEach((item, indice) => {
      let articulo = articulos.find(articulo => articulo.id == item.itemId);
      total += parseInt(item.cantidad) * parseFloat(articulo.precio);
    });
    cantidadTotal = parseInt(localStorage.getItem('pedidocarritocantT'));
    carrito.textContent = cantidadTotal;
    //Dibujamos el carrito de pedido
    dibujarPedido_dos();

  }
}

//Verificamos la permanencia de los productos en el carrito, si supera el tiempo permitido se borra pedidocarrito del localstorage y mostramos un mensaje
// Tiempo deseado 6hs = 6, tiempo para este practico 6 minutos = 0.1 (10% de 60 minutos)
function verificarHoraPedido() {
  let tiempoEsperahora = 0.1;
  let horaPedido = new Date(localStorage.getItem('horaPedido'));
  let horaUltimopedido = new Date();

  let diferenciaHoras = Math.abs(horaUltimopedido - horaPedido) / 36e5;

  // Si la diferencia es mayor al permitido
  if (diferenciaHoras > tiempoEsperahora) {
    // Elimina el pedido de localStorage   
    if (localStorage.getItem("horaPedido")) {
      Swal.fire({
        icon: 'info',
        title: 'Se vencio el tiempo de reserva de productos en el carrito. Agrega los productos que desees nuevamente.',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    } else { }
    localStorage.removeItem("pedidocarrito");
    localStorage.removeItem("pedidocarritocantT");
    localStorage.removeItem("horaPedido");
  }
  else {
    //Todavia esta en tiempo de reserva permitido
  }
}
//Carga de pagina al iniciar: Fin


//Clic en Icono/Texto Mi Carrito:Inicio
iconoCarrito.addEventListener("click", function () {
  let listaProductos = '';
  let precioFinal = 0;
  dibujarPedido_dos();
});

textoCarrito.addEventListener("click", function () {
  let listaProductos = '';
  let precioFinal = 0;
  dibujarPedido_dos();
});
//Clic en Icono/Texto Mi Carrito:Fin


//Agregar item a Carrito:Inicio

//Cuando hacemos clic en Agregar a carrito de un producto
function seleccionarProducto(productoId) {
  prodID = productoId;
  agregarProducto();
}

//Agregamos el producto
function agregarProducto() {
  let cantidad = 1;
  cantidadTotal += cantidad;

  if (cantidad > 0) {
    let itemId = prodID;
    let indiceYaExiste = pedido.items.findIndex((item) => {
      return item.itemId == itemId;
    });
    if (indiceYaExiste == -1) {
      pedido.items.push({ itemId, cantidad });
    } else {
      pedido.items[indiceYaExiste].cantidad += cantidad;
    }
    //Guardamos la fecha y hora actual en localStorage del ultimo producto agregado
    let horaUltimopedido = new Date();
    localStorage.setItem('horaPedido', horaUltimopedido);

    //Actualizamos la cantidad en el carrito
    let cantidadCarritoElement = document.getElementById('cantidad_carrito');
    cantidadCarritoElement.textContent = cantidadTotal;

    //Mostramos animacion con un circulo en el carrito
    let cantidadCarritoContainer = document.querySelector('.cantidad_carrito_container');
    let cantidadCarrito = document.createElement('div');
    cantidadCarrito.classList.add('cantidad_carrito');
    cantidadCarrito.textContent = cantidadTotal;
    cantidadCarritoContainer.appendChild(cantidadCarrito);

    //Remover la animación después de un tiempo
    setTimeout(() => {
      cantidadCarritoContainer.removeChild(cantidadCarrito);
    }, 1400);

    //Mostramos un mensaje del producto agregado
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito. Clic en el "Mi Carrito" para acceder a los productos.',
      showConfirmButton: false,
      timer: 2500
    })

    dibujarPedido_dos();
  } else {
    $("#error").html("Debe ingresar cantidad");
  }
}
//Agregar item a Carrito:Fin

//Diseñador estructura Carrito:Inicio
function dibujarPedido_dos() {
  let tablaHeader = `<table class="table table-hover table-dark finalizar-pedido">
  <thead>
    <tr class="items">
      <th scope="col">Producto</th>
      <th scope="col">Precio</th>
      <th scope="col">Cant.</th>
      <th scope="col">Subtot</th>
      <th scope="col">Borrar</th>
    </tr>
  </thead>
  <tbody>`;
  let tablaBody = '<a href="#pedido-final_dos" id="cerrar_carrito" class="cerrarcarritocss">Minimizar Carrito >>></a> <div class="carritocss"><h3>Carrito de Compras</h3>  ';
  let total = 0;
  let iconoEliminar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;
  let iconoEliminarTodo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
<path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
</svg>`;

  pedido.items.forEach((item, indice) => {
    let articulo = articulos.find(articulo => articulo.id == item.itemId);
    total += parseInt(item.cantidad) * parseFloat(articulo.precio);

    tablaBody += `<tr class="carritocss">      
      <td>${articulo.nombre}</td>
      <td>$${articulo.precio}</td>
      <td>${item.cantidad}</td>
      <td>$${parseInt(item.cantidad) * parseFloat(articulo.precio)}</td>
      <td><span class="icono-eliminar" onclick="eliminarItem(${indice})">${iconoEliminar}</span></td>      
    </tr>`;
  });

  let tablaFooter = `<tr> <td colspan="3">Vaciar Carrito <span class="icono-eliminartodo" onclick="vaciarCarrito()">${iconoEliminarTodo}</span></td>
  <td class="total">Total $${total}</td>
  <td class="monto"></td>  
  </tr>
  </tbody>
  </table>`;

  tablaBody += `</div><p></p>`;
  tablaBody += `<button id="btnfinalizarPedido_dos" onclick="finalizarPedido_dos()"><img src="imgs/botones/icono_pagar.jpg" alt="Eliminar ícono" class="btn_concluircompra">Finalizar compra</button>`;

  listaCarrito.innerHTML = tablaHeader + tablaBody + tablaFooter;

  $(document).ready(function () {
    $("#cerrar_carrito").click(function (e) {
      e.preventDefault();
      $("#lista_carrito").removeClass('animate__slideInRight').addClass('animate__slideOutRight');
      setTimeout(function () {
        $("#lista_carrito").hide().removeClass('animate__slideOutRight');
      }, 1400);
    });
  });

  //Guardamos pedidocarrito en localstorage
  localStorage.setItem('pedidocarrito', JSON.stringify(pedido));
  localStorage.setItem('pedidocarritocantT', cantidadTotal);
  productoscarrito = pedido.items.length;
}
//Diseñador estructura Carrito:Fin

//Borrar Item Vaciar Carrito:Inicio
function eliminarItem(indice) {
  cantidadTotal -= pedido.items[indice].cantidad;
  pedido.items.splice(indice, 1);
  dibujarPedido_dos();
  carrito.textContent = cantidadTotal;
  if (cantidadTotal == 0) {
    localStorage.removeItem("pedidocarrito");
    localStorage.removeItem("pedidocarritocantT");
    localStorage.removeItem("horaPedido");
  }
  else {
  }
}

function vaciarCarrito() {
  cantidadTotal = 0;
  pedido.items.splice(0, productoscarrito);

  dibujarPedido_dos();
  carrito.textContent = cantidadTotal;

  dibujarPedido_dos();
  //localStorage.clear();
  localStorage.removeItem("pedidocarrito");
  localStorage.removeItem("pedidocarritocantT");
  localStorage.removeItem("horaPedido");
}
//Borrar Item Vaciar Carrito:Fin

//Concluir Pedido:Inicio
function finalizarPedido_dos() {

  // Si el carrito esta vacio no poroseguimos con la compra y le mostramos un mensaje al cliente
  if (cantidadTotal === 0) {
    // Mostrar SweetAlert2 indicando que se debe agregar un producto al carrito
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'Por favor, agrega productos al carrito antes de finalizar la compra.',
      confirmButtonText: 'Aceptar'
    });
  } else {
    //Mostramos SweetAlert2 para ingresar los datos del cliente
    Swal.fire({
      title: 'Por favor, ingresa tus datos',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre y Apellido">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Teléfono">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Dirección">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Nro Tarjeta de Credito/Debito">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Fecha Vencimiento">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Codigo Seguridad">' +
        '<input id="swal-input7" class="swal2-input" placeholder="Nombre Completo Titular Tarjeta">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        NombreCli = result.value[0];
        TelefonoCli = result.value[1];
        DireccionCli = result.value[2];
        Swal.fire({
          title: 'Confirmacion de Compra',
          html:
            'Muchas gracias por tu compra ' + result.value[0] + ', en los proximos minutos te estaremos preparando tu pedido para el envio a la direccion ' + result.value[2] + '<br>' +
            'Teléfono de contacto: ' + result.value[1] + '<br>'
        })
        generarTicket();
      }
    })

  }

}
//Concluir Pedido:Fin