// ANTES: preservar para comparar; NO modificar al refactorizar.
const infra = require('./infraestructura');
function x(a, b) {
  if (!a || !Array.isArray(a.items)) {
    throw new Error('Pedido inválido');
  }
  if (!b || !b.nombre) {
    throw new Error('Cliente inválido');
  }
  let t = 0;
  let r = [];
  for (const q of a.items) {
    if (!q || !q.nombre || !Number.isInteger(q.cantidad) || q.cantidad <= 0) {
      throw new Error('Producto inválido');
    }
    if (!Number.isFinite(q.precio) || q.precio < 0 || !Number.isInteger(q.stock) || q.stock < q.cantidad) {
      throw new Error('Producto inválido');
    }
    t = t + q.cantidad * q.precio;
    r.push(`${q.nombre}: ${q.cantidad} x L ${q.precio.toFixed(2)}`);
  }
  if (b.frecuente === true) {
    if (t >= 500) {
      t = t - t * 0.1;
    }
  }
  t = Math.round((t + t * 0.15) * 100) / 100;
  const v = { cliente: b.nombre, total: t, detalle: r };
  infra.guardar(v);
  infra.notificar(b.nombre, `Compra L ${t.toFixed(2)}`);
  infra.imprimir(`Ticket ${b.nombre}: L ${t.toFixed(2)}`);
  return v;
}
module.exports = { procesarVenta: x };
