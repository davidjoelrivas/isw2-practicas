// Infraestructura simulada, sin servicios de red ni paquetes externos.
const estado = { ventas: [], mensajes: [], tickets: [] };
function limpiar() {
  estado.ventas.length = 0;
  estado.mensajes.length = 0;
  estado.tickets.length = 0;
}
function guardar(venta) { estado.ventas.push(venta); }
function notificar(nombre, texto) { estado.mensajes.push({ nombre, texto }); }
function imprimir(texto) { estado.tickets.push(texto); }
module.exports = { estado, limpiar, guardar, notificar, imprimir };
