// Refactor en proceso: paso 1, nombres con intención.
const infra = require('./infraestructura');
const UMBRAL_DESCUENTO = 500;
const TASA_DESCUENTO = 0.1;
const TASA_ISV = 0.15;
const FACTOR_REDONDEO = 100;
function validarPedido(pedido, cliente) {
  if (!pedido || !Array.isArray(pedido.items)) {
    throw new Error('Pedido inválido');
  }
  if (!cliente || !cliente.nombre) {
    throw new Error('Cliente inválido');
  }
}
function validarProducto(producto) {
  if (!producto || !producto.nombre || !Number.isInteger(producto.cantidad) || producto.cantidad <= 0) {
    throw new Error('Producto inválido');
  }
  if (!Number.isFinite(producto.precio) || producto.precio < 0 || !Number.isInteger(producto.stock) || producto.stock < producto.cantidad) {
    throw new Error('Producto inválido');
  }
}
function procesarVenta(pedido, cliente) {
  validarPedido(pedido, cliente);
  let total = 0;
  let detalle = [];
  for (const producto of pedido.items) {
    validarProducto(producto);
    total = total + producto.cantidad * producto.precio;
    detalle.push(`${producto.nombre}: ${producto.cantidad} x L ${producto.precio.toFixed(2)}`);
  }
  if (cliente.frecuente === true) {
    if (total >= UMBRAL_DESCUENTO) {
      total = total - total * TASA_DESCUENTO;
    }
  }
  total = Math.round((total + total * TASA_ISV) * FACTOR_REDONDEO) / FACTOR_REDONDEO;
  const venta = { cliente: cliente.nombre, total: total, detalle: detalle };
  infra.guardar(venta);
  infra.notificar(cliente.nombre, `Compra L ${total.toFixed(2)}`);
  infra.imprimir(`Ticket ${cliente.nombre}: L ${total.toFixed(2)}`);
  return venta;
}
module.exports = { procesarVenta: procesarVenta };
