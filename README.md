Proyecto Final para Javascript

El proyecto HTML esta basado en el proyecto final del curso de Desarrollo Web de mi repositorio y adaptado para este trabajo.
Solo funcionan los enlaces vinculados a este trabajo de una aplicacion tipo ecommerce.

Funcionamiento de la app:

En el codigo js (app.js y main.js) se deja breve comentario de lo que hace cada funcion.

Se puede optar por elegir el modo noche o claro. esto queda guardado en localstorage y esta config se recupera en cada carga de la pagina

Al ingresar al sitio este corrobora si existe algun pedido en el carrito(localstorage), si este pedido no supera el tiempo de reserva se mantiene y se muestra en el carrito, caso contrario se elimina. Esto lo puse por manejo de stock.
Este tiempo esta puesto en 6 minutos (0.1 = 10% de 60 minutos) para la presentacion de este trabajo.

Luego el proceso de compra standart, 
* clic en agregar producto del/os producto/s que se desee/n. Se muesta un mensaje y se aplica una animacion al contador de cantidad de productos.
* clic en icono de Mi carrito
* Si se desea se puede borrar el producto o vaciar el carrito entero.
* clic en boton de Finalizar la compra te pedira datos de usuario obligatorios. (No permite finalizar compra si no hay productos en el carrito.)
* Se informara la confirmacion del pedido
* Se mostrara ticket en pantalla y se vacia el carrito


Repo: https://github.com/Tincho83/FullStack_2Javascript_TP3
Web: https://tincho83.github.io/FullStack_2Javascript_TP3/
