const infraestructuraPorDefecto = require('./infraestructura');
const UMBRAL_DESCUENTO = 500;
const TASA_DESCUENTO = 0.1;
const TASA_ISV = 0.15;
const FACTOR_REDONDEO = 100;

function validarPedido(pedido, cliente) {
  if (!pedido || !Array.isArray(pedido.items)) throw new Error('Pedido inválido');
  if (!cliente || !cliente.nombre) throw new Error('Cliente inválido');
}

function validarProducto(producto) {
  if (!producto || !producto.nombre || !Number.isInteger(producto.cantidad) || producto.cantidad <= 0) {
    throw new Error('Producto inválido');
  }
  if (!Number.isFinite(producto.precio) || producto.precio < 0 || !Number.isInteger(producto.stock) || producto.stock < producto.cantidad) {
    throw new Error('Producto inválido');
  }
}

function aplicarDescuento(total, cliente) {
  if (cliente.frecuente !== true || total < UMBRAL_DESCUENTO) return total;
  return total - total * TASA_DESCUENTO;
}

function calcularVenta(pedido, cliente) {
  validarPedido(pedido, cliente);
  let total = 0;
  const detalle = [];
  for (const producto of pedido.items) {
    validarProducto(producto);
    total += producto.cantidad * producto.precio;
    detalle.push(`${producto.nombre}: ${producto.cantidad} x L ${producto.precio.toFixed(2)}`);
  }
  total = aplicarDescuento(total, cliente);
  total = Math.round((total + total * TASA_ISV) * FACTOR_REDONDEO) / FACTOR_REDONDEO;
  return { cliente: cliente.nombre, total, detalle };
}

function guardarVenta(venta, repositorio) { repositorio.guardar(venta); }
function notificarCliente(venta, mensajeria) {
  mensajeria.notificar(venta.cliente, `Compra L ${venta.total.toFixed(2)}`);
}
function imprimirTicket(venta, impresora) {
  impresora.imprimir(`Ticket ${venta.cliente}: L ${venta.total.toFixed(2)}`);
}

function procesarVenta(pedido, cliente, servicios = infraestructuraPorDefecto) {
  const venta = calcularVenta(pedido, cliente);
  guardarVenta(venta, servicios);
  notificarCliente(venta, servicios);
  imprimirTicket(venta, servicios);
  return venta;
}
module.exports = { procesarVenta, calcularVenta };
